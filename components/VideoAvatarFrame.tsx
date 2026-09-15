"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function VideoAvatarFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frameData, setFrameData] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      // Get a random frame between 0 and video duration
      const randomTime = Math.random() * video.duration;
      video.currentTime = randomTime;
    };

    const handleSeeked = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame
      ctx.drawImage(video, 0, 0);

      // Convert to data URL
      const imageData = canvas.toDataURL("image/webp", 0.85);
      setFrameData(imageData);

      // Clean up
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="/about-demo.mov"
        style={{ display: "none" }}
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={() => router.push("/about")}
        className="relative ml-0 size-[75px] shrink-0 overflow-hidden rounded-full bg-transparent hover:opacity-80 active:opacity-70 transition-opacity border-0 p-0 cursor-pointer sm:size-[107px] md:size-32"
        aria-label="Go to about page"
      >
        {frameData && (
          <img
            src={frameData}
            alt="Xiaoye Lin"
            className="scale-[1.45] object-cover object-[33%_12%] w-full h-full"
          />
        )}
      </button>
    </>
  );
}
