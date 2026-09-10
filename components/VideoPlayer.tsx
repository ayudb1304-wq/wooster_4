"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  src: string;
  poster: string;
  posterWidth: number;
  posterHeight: number;
  captions: string;
};

/*
  Click-to-play. The poster is a lazy next/image with the single primary Button
  "Play" centred on it (the one allowed centred element on the page). On click
  the poster is replaced by a <video> with controls and a captions track.
  preload="none" plus the late mount means no video bytes load before the click.
  Motion spec item 5: poster to video is a 160ms crossfade; instant under
  reduced motion via the global rule. Fires the "video_play" event for analytics.
*/
export function VideoPlayer({ src, poster, posterWidth, posterHeight, captions }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    window.dispatchEvent(new CustomEvent("video_play"));
    // Mounts on the next paint; play once it exists.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => undefined));
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-screenshot bg-ink-deep shadow-screenshot">
      {playing ? (
        <video
          ref={videoRef}
          className="h-full w-full animate-[video-in_var(--duration-fast)_var(--ease-out)_both]"
          controls
          playsInline
          preload="none"
          poster={poster}
          aria-label="Wooster Prep Moneyball SAT overview video"
        >
          <source src={src} type="video/mp4" />
          <track kind="captions" src={captions} srcLang="en" label="English" default />
        </video>
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            width={posterWidth}
            height={posterHeight}
            loading="lazy"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" onClick={start} aria-label="Play the 90 second video">
              Play
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
