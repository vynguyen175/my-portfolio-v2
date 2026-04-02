"use client";

import { useState, useRef, useCallback } from "react";

const photos = [
  { src: "/me-1.jpg", alt: "Vy Nguyen", caption: "Toronto, ON" },
  { src: "/me-2.jpg", alt: "Vy Nguyen at graduation", caption: "Graduation Day" },
  { src: "/me-3.jpg", alt: "Vy Nguyen winning 2nd prize", caption: "Hackathon Win" },
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => {
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    []
  );

  const handleDragStart = (clientX: number) => {
    setDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!dragging) return;
    setDragOffset(clientX - startX.current);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset > 60) go(-1);
    else if (dragOffset < -60) go(1);
    setDragOffset(0);
  };

  return (
    <div className="carousel-wrapper">
      {/* Image track */}
      <div
        ref={containerRef}
        className="carousel-track"
        onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        role="region"
        aria-label="Photo gallery"
        aria-roledescription="carousel"
      >
        <div
          className="carousel-slider"
          style={{
            transform: `translateX(calc(-${current * 100}% + ${dragging ? dragOffset : 0}px))`,
            transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="carousel-slide"
              aria-hidden={i !== current}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="carousel-img"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays for prev/next hint */}
        <div className="carousel-fade carousel-fade-left" />
        <div className="carousel-fade carousel-fade-right" />

        {/* Nav arrows */}
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      {/* Dots + caption */}
      <div className="carousel-footer">
        <p className="carousel-caption">{photos[current].caption}</p>
        <div className="carousel-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
