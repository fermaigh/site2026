"use client";

import { useRef, useState } from "react";

export function PronunciationAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2">
      <span>pronounced as "shall-yay lin"</span>
      <button
        onClick={handlePlayAudio}
        className="inline-flex items-center justify-center shrink-0 text-foreground/45 hover:text-foreground/65 transition-colors active:text-foreground/35"
        aria-label="Play name pronunciation"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isPlaying ? "animate-pulse" : ""}`}
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a7 7 0 0 1 0 9.9M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </button>
      <audio
        ref={audioRef}
        src="/name-pronunciation.m4a"
        onEnded={handleAudioEnd}
      />
    </div>
  );
}
