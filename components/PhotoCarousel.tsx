"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type TouchEvent } from "react";

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
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const move = useCallback((direction: -1 | 1) => {
    setTrackDirection(direction);
    setTrackIndex((current) => current + direction);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(interval);
  }, [move, paused]);

  useEffect(() => {
    if (transitionEnabled) return;
    const frame = window.requestAnimationFrame(() => setTransitionEnabled(true));
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  function handleTransitionEnd() {
    if (trackIndex === photos.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(photos.length);
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    setTouchStartX(null);
  }

  const trackPhotos = [photos[photos.length - 1], ...photos, photos[0]];
  const activePhotoIndex = (trackIndex - 1 + photos.length) % photos.length;
  const slideWidth = 78;

  return (
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label="Wedding photo gallery">
      <div
        className="photo-carousel-viewport"
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`photo-carousel-track is-${trackDirection === 1 ? "next" : "previous"}${transitionEnabled ? "" : " is-resetting"}`}
          style={{ transform: `translateX(calc(11% - ${trackIndex * slideWidth}%))` }}
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
                  <figcaption>Riya & Rahul · {String(photoIndex + 1).padStart(2, "0")}</figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      <div className="photo-carousel-controls">
        <button
          className="photo-carousel-arrow"
          type="button"
          aria-label="Previous photo"
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="photo-carousel-dots" aria-label="Choose a photo">
          {photos.map((photo, index) => (
            <button
              className={`photo-carousel-dot${index === activePhotoIndex ? " is-active" : ""}`}
              type="button"
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === activePhotoIndex ? "true" : undefined}
              key={photo.fileName}
              onClick={() => {
                if (index !== activePhotoIndex) {
                  setTrackDirection(index > activePhotoIndex ? 1 : -1);
                  setTrackIndex(index + 1);
                }
              }}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          className="photo-carousel-arrow"
          type="button"
          aria-label="Next photo"
          onClick={() => move(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
        <button
          className="photo-carousel-pause"
          type="button"
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? "Play slideshow" : "Pause slideshow"}
        </button>
      </div>
      <p className="photo-carousel-status" aria-live="polite">
        Photo {activePhotoIndex + 1} of {photos.length}
      </p>
    </div>
  );
}
