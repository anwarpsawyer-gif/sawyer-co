"use client";

import { motion } from "framer-motion";

const ATRIUM =
  "https://images.unsplash.com/photo-1622396481322-3b83d186701b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

const ARCS = [
  { r: 320, delay: "0s",   dur: "12s", opacity: 0.055 },
  { r: 430, delay: "0.4s", dur: "14s", opacity: 0.048 },
  { r: 540, delay: "0.8s", dur: "16s", opacity: 0.042 },
  { r: 650, delay: "1.2s", dur: "13s", opacity: 0.038 },
  { r: 760, delay: "1.6s", dur: "15s", opacity: 0.032 },
  { r: 870, delay: "2.0s", dur: "17s", opacity: 0.026 },
  { r: 980, delay: "2.4s", dur: "14s", opacity: 0.020 },
];

const MERIDIANS = [
  { angle: -54, opacity: 0.028 },
  { angle: -36, opacity: 0.022 },
  { angle: -18, opacity: 0.026 },
  { angle:   0, opacity: 0.020 },
  { angle:  18, opacity: 0.024 },
];

const OX = 1020;
const OY = 400;

function arcPath(r) {
  const startAngle = Math.PI * 0.45;
  const endAngle   = Math.PI * 1.55;
  const x1 = OX + r * Math.cos(startAngle);
  const y1 = OY + r * Math.sin(startAngle);
  const x2 = OX + r * Math.cos(endAngle);
  const y2 = OY + r * Math.sin(endAngle);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2}`;
}

function meridianPath(angleDeg, minR, maxR) {
  const rad = (angleDeg * Math.PI) / 180 + Math.PI;
  const x1 = OX + minR * Math.cos(rad);
  const y1 = OY + minR * Math.sin(rad);
  const x2 = OX + maxR * Math.cos(rad);
  const y2 = OY + maxR * Math.sin(rad);
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

// Nassau dot — 3rd arc, lat 25.5°N position
const DOT_R     = 540;
const DOT_ANGLE = Math.PI * 0.95;
const DOT_X     = OX + DOT_R * Math.cos(DOT_ANGLE);
const DOT_Y     = OY + DOT_R * Math.sin(DOT_ANGLE);

const instLabel = {
  fontFamily: "'Courier New',monospace",
  fontSize: "10px",
  letterSpacing: "0.18em",
  color: "rgba(196,175,130,0.45)",
};

const enterBtn = {
  fontFamily: "'Courier New',monospace",
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
};

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
              "linear-gradient(180deg,rgba(13,27,42,0.75) 0%,rgba(13,27,42,0.45) 45%,rgba(13,27,42,0.95) 100%)",
          }}
        />
      </div>

      {/* Atlantic latitude arcs — SVG, CSS animated */}
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arcFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0d1b2a" stopOpacity="1" />
            <stop offset="40%"  stopColor="#0d1b2a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d1b2a" stopOpacity="0" />
          </linearGradient>
          <mask id="arcMask">
            <rect x="0" y="0" width="1000" height="800" fill="url(#arcFade)" />
          </mask>
        </defs>

        <g mask="url(#arcMask)">
          {/* Latitude arcs */}
          {ARCS.map((arc, i) => (
            <path
              key={i}
              d={arcPath(arc.r)}
              fill="none"
              stroke={`rgba(210,190,150,${arc.opacity})`}
              strokeWidth="0.9"
              style={{
                animation: `arcBreathe ${arc.dur} ${arc.delay} ease-in-out infinite alternate`,
              }}
            />
          ))}

          {/* Meridian lines */}
          {MERIDIANS.map((m, i) => (
            <path
              key={i}
              d={meridianPath(m.angle, ARCS[0].r, ARCS[6].r)}
              fill="none"
              stroke={`rgba(210,190,150,${m.opacity})`}
              strokeWidth="0.5"
              style={{
                animation: `arcBreathe 18s ${i * 0.6}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </g>

        {/* Nassau dot — outside mask so it's always fully visible */}
        {/* Outermost ring */}
        <circle
          cx={DOT_X}
          cy={DOT_Y}
          r="14"
          fill="none"
          stroke="rgba(200,169,110,0.2)"
          strokeWidth="0.6"
          style={{
            transformOrigin: `${DOT_X}px ${DOT_Y}px`,
            animation: "ringPulse 3s 0s ease-out infinite",
          }}
        />
        {/* Middle ring */}
        <circle
          cx={DOT_X}
          cy={DOT_Y}
          r="14"
          fill="none"
          stroke="rgba(200,169,110,0.35)"
          strokeWidth="0.8"
          style={{
            transformOrigin: `${DOT_X}px ${DOT_Y}px`,
            animation: "ringPulse 3s 0.8s ease-out infinite",
          }}
        />
        {/* Core dot — always solid, no animation dependency */}
        <circle
          cx={DOT_X}
          cy={DOT_Y}
          r="3"
          fill="#c8a96e"
          opacity="0.9"
          style={{
            animation: "dotCore 3s ease-in-out infinite",
          }}
        />
        {/* Label */}
        <text
          x={DOT_X + 14}
          y={DOT_Y - 8}
          fill="rgba(200,169,110,0.5)"
          fontSize="9"
          fontFamily="'Courier New', monospace"
          letterSpacing="0.1em"
        >
          NASSAU · 25.5°N
        </text>
      </svg>

      {/* Left fade — keeps arcs off the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(90deg,#0d1b2a 30%,rgba(13,27,42,0.6) 55%,transparent 100%)",
        }}
      />

      {/* Top institutional plate */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute left-8 right-8 flex items-start justify-between"
        style={{ top: "110px", zIndex: 10 }}
      >
        <span style={instLabel}>[ ENV :: 01 ] — MAIN HALL · ATRIUM</span>
        <span style={instLabel}>LAT 25.5° N · LON 76.6° W</span>
      </motion.div>

      {/* Hero copy */}
      <div className="relative h-full flex items-center px-8" style={{ zIndex: 10 }}>
        <div style={{ maxWidth: 640 }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ ...instLabel, color: "rgba(196,175,130,0.6)", marginBottom: 32 }}
          >
            [ SOVEREIGN INSTITUTIONAL INFRASTRUCTURE ]
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.85 }}
            style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#e8dfd0",
              letterSpacing: "-0.01em",
            }}
          >
            Sovereign Risk Advisory and Institutional Capital.{" "}
            <em style={{ color: "#c8a96e" }}>
              Defending and Scaling Enterprises
            </em>{" "}
            Across The Bahamas, Cayman, Bermuda, Barbados, and Belize.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            style={{
              marginTop: 40,
              maxWidth: 480,
              color: "rgba(180,170,155,0.75)",
              fontFamily: "Georgia,serif",
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            The Architecture of Integrity. Built to International Standard. Enforced Locally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.35 }}
            style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 24 }}
          >
            <button style={enterBtn}>
              ENTER THE INSTITUTION
              <span style={{ color: "#c8a96e" }}>→</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 32, height: 1, background: "rgba(196,175,130,0.5)" }} />
              <span style={instLabel}>SCROLL TO TRAVERSE</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div
        className="absolute bottom-8 left-8 right-8 flex items-end justify-between"
        style={{ zIndex: 10 }}
      >
        <span style={instLabel}>[ EST. SAWYER &amp; CO. · NASSAU · MMXXIV ]</span>
        <span style={instLabel}>SEVEN ENVIRONMENTS · ONE INSTITUTION</span>
      </div>

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0)     translateY(0); }
          100% { transform: scale(1.08) translateX(-1.5%) translateY(-1%); }
        }
        @keyframes arcBreathe {
          0%   { opacity: 0.4; }
          100% { opacity: 1;   }
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes dotCore {
          0%,100% { opacity: 0.7; }
          50%     { opacity: 1;   }
        }
      `}</style>
    </section>
  );
}
