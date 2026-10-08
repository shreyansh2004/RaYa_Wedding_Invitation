"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type TransitionEvent,
} from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const photos = [
  { src: `${basePath}/photos/photo-1.JPG`, alt: "Riya and Rahul together", fileName: "photo-1.JPG" },
  { src: "", alt: "Wedding photo 2", fileName: "photo-2.jpg" },
  { src: "", alt: "Wedding photo 3", fileName: "photo-3.jpg" },
  { src: "", alt: "Wedding photo 4", fileName: "photo-4.jpg" },
  { src: "", alt: "Wedding photo 5", fileName: "photo-5.jpg" },
  { src: "", alt: "Wedding photo 6", fileName: "photo-6.jpg" },
] as const;

export function PhotoCarousel() {
  const [trackIndex, setTrackIndex] = useState(1);
  const [trackDirection, setTrackDirection] = useState<-1 | 1>(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const transitionInProgress = useRef(false);

  const move = useCallback((direction: -1 | 1) => {
    if (transitionInProgress.current) return;
    transitionInProgress.current = true;
    setTrackDirection(direction);
    setTrackIndex((current) => current + direction);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(interval);
  }, [move]);

  useEffect(() => {
    if (transitionEnabled) return;
    const frame = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
      transitionInProgress.current = false;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (trackIndex === photos.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(photos.length);
    } else {
      transitionInProgress.current = false;
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    setTouchStartX(null);
  }
  const trackPhotos = [photos[photos.length - 1], ...photos, photos[0]];

  return (
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label="Wedding photo gallery">
      <div
        className="photo-carousel-viewport"
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`photo-carousel-track is-${trackDirection === 1 ? "next" : "previous"}${transitionEnabled ? "" : " is-resetting"}`}
          style={{ transform: `translate3d(calc(11% - ${trackIndex * 78}%), 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackPhotos.map((photo, index) => {
            const photoIndex = (index - 1 + photos.length) % photos.length;
            return (
              <div
                className={`photo-carousel-slide${index === trackIndex ? " is-active" : ""}`}
                key={`${photo.fileName}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${photoIndex + 1} of ${photos.length}`}
                aria-hidden={index !== trackIndex}
              >
                <figure className={`photo-carousel-frame${photo.src ? "" : " is-placeholder"}`}>
                  {photo.src ? (
                    <Image
                      className="photo-carousel-image"
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 760px) 90vw, 720px"
                    />
                  ) : (
                    <div className="photo-placeholder">
                      <svg viewBox="0 0 48 48" aria-hidden="true">
                        <rect x="5" y="8" width="38" height="32" rx="3" />
                        <circle cx="17" cy="19" r="3" />
                        <path d="m8 35 12-11 8 7 6-5 7 8" />
                      </svg>
                      <span>Your photo here</span>
                      <small>public/photos/{photo.fileName}</small>
                    </div>
                  )}
                </figure>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
