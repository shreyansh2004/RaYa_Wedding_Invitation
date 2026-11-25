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
import { translations, type Language } from "../data/translations";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const photos = [
  { src: `${basePath}/photos/photo-1.webp`, fileName: "photo-1.webp" },
  { src: `${basePath}/photos/photo-2.webp`, fileName: "photo-2.webp" },
  { src: `${basePath}/photos/photo-3.webp`, fileName: "photo-3.webp" },
  { src: `${basePath}/photos/photo-4.webp`, fileName: "photo-4.webp" },
  { src: `${basePath}/photos/photo-5.webp`, fileName: "photo-5.webp" },
  { src: `${basePath}/photos/photo-6.webp`, fileName: "photo-6.webp" },
] as const;

export function PhotoCarousel({ language }: { language: Language }) {
  const copy = translations[language];
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
    <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label={copy.galleryLabel}>
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
                aria-label={copy.photoSlideLabel(photoIndex + 1, photos.length)}
                aria-hidden={index !== trackIndex}
              >
                <figure className="photo-carousel-frame">
                  <Image
                    className="photo-carousel-image"
                    src={photo.src}
                    alt={copy.photoAlt}
                    fill
                    sizes="(max-width: 760px) 90vw, 720px"
                  />
                </figure>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
