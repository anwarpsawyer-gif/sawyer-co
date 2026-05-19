"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ATRIUM =
  "https://images.unsplash.com/photo-1622396481322-3b83d186701b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

function AtlanticArcs() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const t = tRef.current;

      // Globe origin — off-screen right, vertically centred
      const cx = W * 1.02;
      const cy = H * 0.48;

      const numArcs = 7;
      const baseR = W * 0.28;
      const gap = W * 0.12;

      // Latitude arcs
      for (let i = 0; i < numArcs; i++) {
        const r = baseR + i * gap;
        const breathe = Math.sin(t * 0.8 + i * 0.5) * 0.012;
        const alpha = 0.055 + breathe;

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI * 0.45, Math.PI * 1.55);
        ctx.strokeStyle = `rgba(210,190,150,${alpha})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Meridian cross-lines
      const meridianAngles = [0.62, 0.78, 0.95, 1.12, 1.28].map(
        (a) => Math.PI * a
      );
      meridianAngles.forEach((angle, j) => {
        const breathe = Math.sin(t * 0.6 + j * 0.8) * 0.006;
        const alpha = 0.028 + breathe;

        ctx.beginPath();
        for (let i = 0; i < numArcs; i++) {
          const r = baseR + i * gap;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(210,190,150,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Nassau coordinate dot — 3rd arc, ~lat 25.5°N
      const dotR = baseR + 2 * gap;
      const dotAngle = Math.PI * 0.95;
      const dotX = cx + dotR * Math.cos(dotAngle);
      const dotY = cy + dotR * Math.sin(dotAngle);
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);

      // outer ring
      ctx.beginPath();
      ctx.arc(dotX, dotY, 8 + pulse * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,169,110,${0.08 + pulse * 0.06})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // inner dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,110,${0.5 + pulse * 0.3})`;
      ctx.fill();

      tRef.current += 0.012;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2 }}
    />
  );
}

export default function MainHall() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#0d1b2a" }}
    >
      {/* Background atrium image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src={ATRIUM}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.38) contrast(1.1) saturate(0.95)",
            animation: "kenBurns 30s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,27,42,0.75) 0%, rgba(13,27,42,0.45) 45%, rgba(13,27,42,0.95) 100%)",
          }}
        />
      </div>

      {/* Atlantic latitude arc animation — sits above bg, below text */}
      <AtlanticArcs />

      {/* Left-side fade so arcs don't bleed into copy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(90deg, #0d1b2a 28%, rgba(13,27,42,0.7) 52%, transparent 100%)",
        }}
      />

      {/* Top institutional plate */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute top-[110px] left-8 right-8 flex items-start justify-between"
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "rgba(196,175,130,0.55)",
          }}
        >
          [ ENV :: 01 ] — MAIN HALL · ATRIUM
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "rgba(196,175,130,0.55)",
          }}
        >
          LAT 25.5° N · LON 76.6° W
        </div>
      </motion.div>

      {/* Hero copy */}
      <div
        className="relative h-full flex items-center px-8"
        style={{ zIndex: 10 }}
      >
        <div style={{ maxWidth: "640px" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(196,175,130,0.6)",
              marginBottom: "32px",
            }}
          >
            [ SOVEREIGN INSTITUTIONAL INFRASTRUCTURE ]
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.85 }}
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#e8dfd0",
              letterSpacing: "-0.01em",
            }}
          >
            Sovereign Risk Advisory and Institutional Capital.{" "}
            <span style={{ fontStyle: "italic", color: "#c8a96e" }}>
              Defending and Scaling Enterprises
            </span>{" "}
            Across The Bahamas, Cayman, Bermuda, Barbados, and Belize.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            style={{
              marginTop: "40px",
              maxWidth: "480px",
              color: "rgba(180,170,155,0.75)",
              fontFamily: "Georgia, serif",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            The Architecture of Integrity. Built to International Standard.
            Enforced Locally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.35 }}
            style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "24px" }}
          >
            <button
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#e8dfd0",
                background: "transparent",
                border: "1px solid rgba(196,175,130,0.4)",
                padding: "14px 28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              ENTER THE INSTITUTION
              <span style={{ color: "#c8a96e" }}>→</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  display: "block",
                  width: "32px",
                  height: "1px",
                  background: "rgba(196,175,130,0.5)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(196,175,130,0.45)",
                }}
              >
                SCROLL TO TRAVERSE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div
        className="absolute bottom-8 left-8 right-8 flex items-end justify-between"
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "rgba(196,175,130,0.35)",
          }}
        >
          [ EST. SAWYER &amp; CO. · NASSAU · MMXXIV ]
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "rgba(196,175,130,0.35)",
          }}
        >
          SEVEN ENVIRONMENTS · ONE INSTITUTION
        </div>
      </div>

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0)      translateY(0); }
          100% { transform: scale(1.08) translateX(-1.5%)  translateY(-1%); }
        }
      `}</style>
    </section>
  );
}
