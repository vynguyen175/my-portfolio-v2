"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-clickable]"
        ) || window.getComputedStyle(target).cursor === "pointer";
      setHovering(!!isClickable);
    };

    const animate = () => {
      glow.current.x += (mouse.current.x - glow.current.x) * 0.12;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x}px, ${glow.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Glow ring — only visible on hover */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "50px" : "0px",
          height: hovering ? "50px" : "0px",
          marginLeft: hovering ? "-25px" : "0px",
          marginTop: hovering ? "-25px" : "0px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          background: hovering
            ? "radial-gradient(circle, rgba(240,201,70,0.15) 0%, rgba(240,201,70,0.05) 40%, transparent 70%)"
            : "none",
          border: hovering ? "1.5px solid rgba(240,201,70,0.4)" : "none",
          boxShadow: hovering
            ? "0 0 20px rgba(240,201,70,0.2), inset 0 0 10px rgba(240,201,70,0.1)"
            : "none",
          transition:
            "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), margin 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Star particles on hover — 4 tiny stars that orbit */}
      {hovering && (
        <div
          ref={trailsRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            transform: `translate(${glow.current.x}px, ${glow.current.y}px)`,
            pointerEvents: "none",
            zIndex: 99999,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: "#F0C946",
                borderRadius: "50%",
                boxShadow: "0 0 6px rgba(240,201,70,0.6)",
                animation: `cursorOrbit 1.5s linear infinite`,
                animationDelay: `${i * -0.375}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes cursorOrbit {
          0% { transform: rotate(0deg) translateX(18px) scale(1); opacity: 0.8; }
          50% { transform: rotate(180deg) translateX(18px) scale(0.6); opacity: 0.4; }
          100% { transform: rotate(360deg) translateX(18px) scale(1); opacity: 0.8; }
        }

        @media (hover: none), (pointer: coarse) {
          body, *, *::before, *::after {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
