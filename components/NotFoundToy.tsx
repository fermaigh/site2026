"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  resting: boolean;
};

const GLYPHS = ["4", "0", "4"];

const GRAVITY = 2600; // px/s²
const AIR = 0.995; // per-frame drag
const BOUNCE = 0.52; // energy kept on impact
const FLOOR_FRICTION = 0.82;
const SPIN_DAMP = 0.6; // spin lost on floor contact
const REST_SPEED = 26; // px/s below which a grounded tile sleeps
const THROW_SCALE = 1.15;
const MAX_THROW = 2600;

function tileSize(width: number) {
  return Math.max(56, Math.min(132, width / 5));
}

/** Neat row, vertically centred — what the page looks like before anyone touches it. */
function restingLayout(width: number, height: number): Body[] {
  const size = tileSize(width);
  const gap = size * 0.16;
  const totalWidth = size * GLYPHS.length + gap * (GLYPHS.length - 1);
  const left = (width - totalWidth) / 2;
  const top = (height - size) / 2;
  return GLYPHS.map((_, i) => ({
    x: left + i * (size + gap),
    y: top,
    vx: 0,
    vy: 0,
    angle: 0,
    spin: 0,
    resting: true,
  }));
}

export function NotFoundToy() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Body[]>([]);
  const sizeRef = useRef({ width: 0, height: 0, tile: 0 });
  const frameRef = useRef(0);
  const dragRef = useRef<{
    index: number;
    pointerId: number;
    dx: number;
    dy: number;
    lastX: number;
    lastY: number;
    lastT: number;
    vx: number;
    vy: number;
  } | null>(null);
  // Gravity stays off until someone interacts, so the first paint is the
  // composed "404" rather than a pile on the floor.
  const liveRef = useRef(false);
  /** Set by the physics effect; restarts the loop after everything has settled. */
  const startLoopRef = useRef<(() => void) | null>(null);
  const [disturbed, setDisturbed] = useState(false);

  const paint = useCallback(() => {
    const { tile } = sizeRef.current;
    bodiesRef.current.forEach((body, i) => {
      const el = tilesRef.current[i];
      if (!el) return;
      el.style.width = `${tile}px`;
      el.style.height = `${tile}px`;
      el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.angle}rad)`;
    });
  }, []);

  const reset = useCallback(() => {
    const { width, height } = sizeRef.current;
    if (!width) return;
    bodiesRef.current = restingLayout(width, height);
    liveRef.current = false;
    setDisturbed(false);
    paint();
  }, [paint]);

  // Measure, lay out, and keep the arrangement sensible through resizes.
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const measure = () => {
      const rect = arena.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const previous = sizeRef.current;
      sizeRef.current = {
        width: rect.width,
        height: rect.height,
        tile: tileSize(rect.width),
      };

      if (!bodiesRef.current.length || !liveRef.current) {
        bodiesRef.current = restingLayout(rect.width, rect.height);
      } else if (previous.width) {
        // Keep thrown tiles proportionally placed, and inside the new bounds.
        const sx = rect.width / previous.width;
        const sy = rect.height / previous.height;
        for (const body of bodiesRef.current) {
          body.x = Math.min(
            Math.max(0, body.x * sx),
            rect.width - sizeRef.current.tile,
          );
          body.y = Math.min(
            Math.max(0, body.y * sy),
            rect.height - sizeRef.current.tile,
          );
        }
      }
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(arena);
    return () => observer.disconnect();
  }, [paint]);

  // One loop, running only while something is actually moving.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const { width, height, tile } = sizeRef.current;
      const drag = dragRef.current;
      let awake = false;

      bodiesRef.current.forEach((body, i) => {
        if (drag && drag.index === i) {
          awake = true;
          return; // the pointer owns this one
        }
        if (!liveRef.current) return;

        if (body.resting) {
          // Ease a settled tile flat. Collision uses the upright box, so a
          // tile left at an angle would hang its corner past the floor line.
          if (Math.abs(body.angle) > 0.002) {
            body.angle *= 0.82;
            awake = true;
          } else {
            body.angle = 0;
          }
          return;
        }

        body.vy += GRAVITY * dt;
        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.angle += body.spin * dt;
        body.vx *= AIR;
        body.vy *= AIR;
        body.spin *= AIR;

        const maxX = width - tile;
        const maxY = height - tile;

        if (body.x < 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx) * BOUNCE;
          body.spin *= -SPIN_DAMP;
        } else if (body.x > maxX) {
          body.x = maxX;
          body.vx = -Math.abs(body.vx) * BOUNCE;
          body.spin *= -SPIN_DAMP;
        }

        if (body.y < 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy) * BOUNCE;
        } else if (body.y > maxY) {
          body.y = maxY;
          body.vy = -Math.abs(body.vy) * BOUNCE;
          body.vx *= FLOOR_FRICTION;
          body.spin *= SPIN_DAMP;
          // Settle rather than jitter forever on tiny bounces.
          if (
            Math.abs(body.vy) < REST_SPEED &&
            Math.abs(body.vx) < REST_SPEED
          ) {
            body.vy = 0;
            body.vx = 0;
            body.spin = 0;
            body.resting = true;
          }
        }

        // Stay awake while a tile is still tilted, or the frame that settles it
        // would also be the frame that stops the loop — leaving it leaning.
        if (!body.resting || Math.abs(body.angle) > 0.002) awake = true;
      });

      // Cheap separation so tiles do not sit on top of each other.
      const bodies = bodiesRef.current;
      for (let a = 0; a < bodies.length; a++) {
        for (let c = a + 1; c < bodies.length; c++) {
          const ax = bodies[a].x - bodies[c].x;
          const ay = bodies[a].y - bodies[c].y;
          const dist = Math.hypot(ax, ay);
          // Squares side by side need their centres a full tile apart, plus a
          // little, or they visibly overlap once they come to rest.
          const min = tile * 1.04;
          // An epsilon matters here: resolving to exactly `min` leaves a
          // sub-pixel overlap next frame, which without this would re-wake the
          // pair forever and keep the loop running against a settled pile.
          if (dist > 0 && min - dist > 0.5) {
            const push = (min - dist) / 2;
            const nx = (ax / dist) * push;
            const ny = (ay / dist) * push;
            for (const [body, sign] of [
              [bodies[a], 1],
              [bodies[c], -1],
            ] as const) {
              if (drag && bodies[drag.index] === body) continue;
              body.x = Math.min(
                Math.max(0, body.x + nx * sign),
                width - tile,
              );
              body.y = Math.min(
                Math.max(0, body.y + ny * sign),
                height - tile,
              );
            }
            awake = true;
          }
        }
      }

      paint();
      frameRef.current = awake ? requestAnimationFrame(step) : 0;
    };

    const start = () => {
      if (!frameRef.current) {
        last = performance.now();
        frameRef.current = requestAnimationFrame(step);
      }
    };

    startLoopRef.current = start;

    return () => {
      startLoopRef.current = null;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [paint]);

  const wake = useCallback(() => {
    startLoopRef.current?.();
  }, []);

  const onPointerDown = (index: number) => (event: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const arena = arenaRef.current;
    const body = bodiesRef.current[index];
    if (!arena || !body) return;

    const rect = arena.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      dx: event.clientX - rect.left - body.x,
      dy: event.clientY - rect.top - body.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastT: performance.now(),
      vx: 0,
      vy: 0,
    };
    body.resting = false;
    body.vx = 0;
    body.vy = 0;

    // First touch is what brings the composition down.
    if (!liveRef.current) {
      liveRef.current = true;
      setDisturbed(true);
      for (const other of bodiesRef.current) other.resting = false;
    }
    wake();
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    const arena = arenaRef.current;
    if (!drag || !arena || drag.pointerId !== event.pointerId) return;

    const rect = arena.getBoundingClientRect();
    const { tile } = sizeRef.current;
    const body = bodiesRef.current[drag.index];
    body.x = Math.min(
      Math.max(0, event.clientX - rect.left - drag.dx),
      rect.width - tile,
    );
    body.y = Math.min(
      Math.max(0, event.clientY - rect.top - drag.dy),
      rect.height - tile,
    );

    const now = performance.now();
    const dt = Math.max(now - drag.lastT, 1) / 1000;
    drag.vx = (event.clientX - drag.lastX) / dt;
    drag.vy = (event.clientY - drag.lastY) / dt;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastT = now;

    paint();
  };

  const endDrag = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const body = bodiesRef.current[drag.index];
    const clamp = (v: number) =>
      Math.max(-MAX_THROW, Math.min(MAX_THROW, v * THROW_SCALE));
    body.vx = clamp(drag.vx);
    body.vy = clamp(drag.vy);
    body.spin = clamp(drag.vx) / 420;
    body.resting = false;
    dragRef.current = null;
    wake();
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div
        ref={arenaRef}
        className="relative h-[clamp(240px,36vh,380px)] w-full touch-none overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]"
        aria-hidden
      >
        {GLYPHS.map((glyph, index) => (
          <div
            key={index}
            ref={(node) => {
              tilesRef.current[index] = node;
            }}
            className="absolute left-0 top-0 grid cursor-grab touch-none select-none place-items-center rounded-[18px] bg-foreground font-sans text-[clamp(2rem,5.5vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-background shadow-[0_10px_24px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] will-change-transform active:cursor-grabbing"
            onPointerDown={onPointerDown(index)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {glyph}
          </div>
        ))}
      </div>

      <p className="mt-3 font-sans text-[13px] text-foreground/40">
        {disturbed ? (
          <button
            type="button"
            onClick={reset}
            className="font-sans text-[13px] text-foreground/60 underline underline-offset-4 transition-opacity hover:opacity-70 active:opacity-60"
          >
            Put it back
          </button>
        ) : (
          "Drag the numbers."
        )}
      </p>
    </div>
  );
}
