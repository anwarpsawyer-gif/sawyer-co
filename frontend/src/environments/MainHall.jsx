import { motion } from "framer-motion";

const ATRIUM =
    "https://images.unsplash.com/photo-1622396481322-3b83d186701b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

// ─── Atlantic arc geometry ───────────────────────────────────────────────────
// Globe origin sits off the right edge of the 1000-wide viewBox.
// Arcs sweep left, representing latitude lines centred on 25.5°N 76.6°W.
const OX = 1020;
const OY = 400;

const ARCS = [
    { r: 300,  delay: "0.0s", dur: "13s", op: 0.07 },
    { r: 420,  delay: "0.5s", dur: "15s", op: 0.06 },
    { r: 540,  delay: "1.0s", dur: "12s", op: 0.055 },
    { r: 660,  delay: "1.5s", dur: "16s", op: 0.048 },
    { r: 780,  delay: "2.0s", dur: "14s", op: 0.038 },
    { r: 900,  delay: "2.5s", dur: "17s", op: 0.028 },
    { r: 1020, delay: "3.0s", dur: "15s", op: 0.018 },
];

const MERIDIANS = [
    { angle: -50, op: 0.035, delay: "0.0s" },
    { angle: -32, op: 0.028, delay: "0.3s" },
    { angle: -14, op: 0.032, delay: "0.6s" },
    { angle:   4, op: 0.024, delay: "0.9s" },
    { angle:  22, op: 0.028, delay: "1.2s" },
];

// Eleuthera coordinate dot — 3rd arc, lat 25.5°N
const DOT_R     = 540;
const DOT_ANGLE = Math.PI * 0.96;
const DOT_X     = OX + DOT_R * Math.cos(DOT_ANGLE);
const DOT_Y     = OY + DOT_R * Math.sin(DOT_ANGLE);

function arcD(r) {
    const a1 = Math.PI * 0.44;
    const a2 = Math.PI * 1.56;
    const x1 = OX + r * Math.cos(a1);
    const y1 = OY + r * Math.sin(a1);
    const x2 = OX + r * Math.cos(a2);
    const y2 = OY + r * Math.sin(a2);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 0 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function meridianD(deg, rMin, rMax) {
    const rad = (deg * Math.PI) / 180 + Math.PI;
    const x1 = OX + rMin * Math.cos(rad);
    const y1 = OY + rMin * Math.sin(rad);
    const x2 = OX + rMax * Math.cos(rad);
    const y2 = OY + rMax * Math.sin(rad);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}
// ────────────────────────────────────────────────────────────────────────────

export default function MainHall({ onEnter }) {
    return (
        <section
            id="main-hall"
            data-testid="env-main-hall"
            className="relative w-full h-[100vh] overflow-hidden bg-navy"
        >
            {/* ── Background atrium with Ken Burns ── */}
            <div className="absolute inset-0">
                <img
                    src={ATRIUM}
                    alt=""
                    className="w-full h-full object-cover ken-burns"
                    style={{ filter: "brightness(0.38) contrast(1.1) saturate(0.95)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(13,27,42,0.75) 0%, rgba(13,27,42,0.45) 45%, rgba(13,27,42,0.95) 100%)",
                    }}
                />
            </div>

            {/* ── Atlantic latitude arc system ─────────────────────────────
                SVG sits above the background, below all text (z-index 2).
                No mask — the left-side gradient overlay handles the fade.
                All animation via CSS @keyframes so it works everywhere.
            ─────────────────────────────────────────────────────────────── */}
            <svg
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMaxYMid slice"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2 }}
            >
                {/* Latitude arcs */}
                {ARCS.map((arc, i) => (
                    <path
                        key={`arc-${i}`}
                        d={arcD(arc.r)}
                        fill="none"
                        stroke={`rgba(210,190,150,${arc.op})`}
                        strokeWidth="1"
                        style={{
                            animation: `sawyerBreathe ${arc.dur} ${arc.delay} ease-in-out infinite alternate`,
                        }}
                    />
                ))}

                {/* Meridian cross-lines */}
                {MERIDIANS.map((m, i) => (
                    <path
                        key={`mer-${i}`}
                        d={meridianD(m.angle, ARCS[0].r, ARCS[6].r)}
                        fill="none"
                        stroke={`rgba(210,190,150,${m.op})`}
                        strokeWidth="0.6"
                        style={{
                            animation: `sawyerBreathe 20s ${m.delay} ease-in-out infinite alternate`,
                        }}
                    />
                ))}

                {/* Eleuthera coordinate dot ── three concentric sonar rings + core */}
                {/* Ring 1 — slowest, most transparent */}
                <circle
                    cx={DOT_X}
                    cy={DOT_Y}
                    r="12"
                    fill="none"
                    stroke="rgba(200,169,110,0.3)"
                    strokeWidth="0.7"
                    style={{
                        transformOrigin: `${DOT_X.toFixed(2)}px ${DOT_Y.toFixed(2)}px`,
                        animation: "sawyerSonar 3.6s 0.0s ease-out infinite",
                    }}
                />
                {/* Ring 2 — offset timing */}
                <circle
                    cx={DOT_X}
                    cy={DOT_Y}
                    r="12"
                    fill="none"
                    stroke="rgba(200,169,110,0.45)"
                    strokeWidth="0.8"
                    style={{
                        transformOrigin: `${DOT_X.toFixed(2)}px ${DOT_Y.toFixed(2)}px`,
                        animation: "sawyerSonar 3.6s 1.2s ease-out infinite",
                    }}
                />
                {/* Ring 3 */}
                <circle
                    cx={DOT_X}
                    cy={DOT_Y}
                    r="12"
                    fill="none"
                    stroke="rgba(200,169,110,0.35)"
                    strokeWidth="0.6"
                    style={{
                        transformOrigin: `${DOT_X.toFixed(2)}px ${DOT_Y.toFixed(2)}px`,
                        animation: "sawyerSonar 3.6s 2.4s ease-out infinite",
                    }}
                />
                {/* Core dot — always solid */}
                <circle
                    cx={DOT_X}
                    cy={DOT_Y}
                    r="2.8"
                    fill="#c8a96e"
                    opacity="1"
                    style={{ animation: "sawyerDotCore 3s ease-in-out infinite" }}
                />
                {/* Coordinate label */}
                <text
                    x={DOT_X + 16}
                    y={DOT_Y - 6}
                    fill="rgba(200,169,110,0.55)"
                    fontSize="8.5"
                    fontFamily="'Courier New', monospace"
                    letterSpacing="0.12em"
                >
                    ELEUTHERA · 25.5°N
                </text>

               {/* Problem-axis / North Star overlay */}
                <g aria-hidden="true" className="problem-axis">
                    {(() => {
                        const TOP_X = DOT_X + 300;
                        const TOP_Y = DOT_Y - 210;
                
                        const INT_X = DOT_X + 300;
                        const INT_Y = DOT_Y + 140;
                
                        const COMPASS_R = 82;
                
                        return (
                            <>
                                {/* top dot */}
                                <circle cx={TOP_X} cy={TOP_Y} r="3" fill="#c8a96e" opacity="0.75" />
                
                                {/* vertical hand-drawn line */}
                                <line
                                    x1={TOP_X}
                                    y1={TOP_Y}
                                    x2={INT_X}
                                    y2={INT_Y}
                                    stroke="rgba(200,169,110,0.65)"
                                    strokeWidth="1.1"
                                    strokeLinecap="round"
                                    strokeDasharray="6 5"
                                    className="draw-line draw-line-vertical"
                                />
                
                                {/* diagonal hand-drawn line from Nassau */}
                                <line
                                    x1={DOT_X}
                                    y1={DOT_Y}
                                    x2={INT_X}
                                    y2={INT_Y}
                                    stroke="rgba(200,169,110,0.72)"
                                    strokeWidth="1.1"
                                    strokeLinecap="round"
                                    strokeDasharray="6 5"
                                    className="draw-line draw-line-diagonal"
                                />
                
                                {/* intersection dot */}
                                <circle cx={INT_X} cy={INT_Y} r="3" fill="#c8a96e" opacity="0.85" />
                
                                {/* North Star fades in at intersection */}
                                <g
                                    className="north-star"
                                    transform={`translate(${INT_X} ${INT_Y})`}
                                >
                                    <circle r="42" fill="none" stroke="rgba(200,169,110,0.22)" strokeWidth="0.8" />
                                    <circle r="64" fill="none" stroke="rgba(200,169,110,0.16)" strokeWidth="0.7" />
                
                                    <path
                                        d="M0,-54 L8,-9 L54,0 L8,9 L0,54 L-8,9 L-54,0 L-8,-9 Z"
                                        fill="rgba(200,169,110,0.75)"
                                    />
                                    <path
                                        d="M0,-30 L5,-5 L30,0 L5,5 L0,30 L-5,5 L-30,0 L-5,-5 Z"
                                        fill="rgba(232,225,210,0.55)"
                                    />
                                </g>
                
                                {/* rotating compass circle */}
                                <g className="compass-orbit" transform={`translate(${INT_X} ${INT_Y})`}>
                                    <circle
                                        r={COMPASS_R}
                                        fill="none"
                                        stroke="rgba(200,169,110,0.42)"
                                        strokeWidth="0.8"
                                        strokeDasharray="5 7"
                                    />
                                </g>
                
                                {/* labels appear one by one around compass */}
                                <g className="axis-label label-regulation">
                                    <circle cx={INT_X - 18} cy={INT_Y - 92} r="15" fill="none" stroke="rgba(200,169,110,0.72)" />
                                    <text x={INT_X - 23} y={INT_Y - 88} fill="#c8a96e" fontSize="10" fontFamily="'JetBrains Mono', monospace">1</text>
                                    <text x={INT_X + 8} y={INT_Y - 88} fill="rgba(232,225,210,0.78)" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.16em">
                                        REGULATION
                                    </text>
                                </g>
                
                                <g className="axis-label label-liquidity">
                                    <circle cx={INT_X + 98} cy={INT_Y} r="15" fill="none" stroke="rgba(200,169,110,0.72)" />
                                    <text x={INT_X + 93} y={INT_Y + 4} fill="#c8a96e" fontSize="10" fontFamily="'JetBrains Mono', monospace">2</text>
                                    <text x={INT_X + 124} y={INT_Y + 4} fill="rgba(232,225,210,0.78)" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.16em">
                                        LIQUIDITY
                                    </text>
                                </g>
                
                                <g className="axis-label label-digitization">
                                    <circle cx={INT_X - 18} cy={INT_Y + 92} r="15" fill="none" stroke="rgba(200,169,110,0.72)" />
                                    <text x={INT_X - 23} y={INT_Y + 96} fill="#c8a96e" fontSize="10" fontFamily="'JetBrains Mono', monospace">3</text>
                                    <text x={INT_X + 8} y={INT_Y + 96} fill="rgba(232,225,210,0.78)" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.16em">
                                        DIGITIZATION
                                    </text>
                                </g>
                            </>
                        );
                    })()}
                </g>
            </svg>

            {/* ── Left-side gradient — keeps arcs off the headline copy ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 3,
                    background:
                        "linear-gradient(90deg, rgba(13,27,42,1) 25%, rgba(13,27,42,0.75) 48%, rgba(13,27,42,0.1) 72%, transparent 100%)",
                }}
            />

            {/* ── Top institutional plate ── */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute top-[110px] left-[var(--sawyer-edge-pad)] right-[var(--sawyer-edge-pad)] flex items-start justify-between"
                style={{ zIndex: 10 }}
            >
                <div className="inst-label">
                    [ ENV :: 01 ] — MAIN HALL · ATRIUM
                </div>
                <div className="inst-label hidden md:block">
                    LAT 25.5° N · LON 76.6° W
                </div>
            </motion.div>

            {/* ── Hero copy ── */}
            <div className="relative z-10 h-full flex items-center px-[var(--sawyer-edge-pad)]">
                <div className="max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="inst-label text-sand mb-8"
                    >
                        [ SOVEREIGN INSTITUTIONAL INFRASTRUCTURE ]
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.85 }}
                        className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-ivory tracking-tight"
                    >
                        Sovereign Risk Advisory and Institutional Capital.{" "}
                        <span className="italic text-sand">
                            Defending and Scaling Enterprises
                        </span>{" "}
                        Across The Bahamas, Cayman, Bermuda, Barbados, and Belize.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.1 }}
                        className="mt-10 max-w-xl text-silver font-body text-base md:text-lg leading-relaxed"
                    >
                        The Architecture of Integrity. Built to International Standard. Enforced Locally.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.35 }}
                        className="mt-14 flex items-center gap-6"
                    >
                        <button
                            data-testid="enter-institution-btn"
                            onClick={onEnter}
                            className="inst-btn"
                        >
                            ENTER THE INSTITUTION
                            <span className="text-sand">→</span>
                        </button>
                        <div className="hidden md:flex items-center gap-3">
                            <span className="block w-8 h-px bg-sand opacity-60" />
                            <span className="inst-label">SCROLL TO TRAVERSE</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Bottom metadata strip ── */}
            <div
                className="absolute bottom-8 left-[var(--sawyer-edge-pad)] right-[var(--sawyer-edge-pad)] flex items-end justify-between"
                style={{ zIndex: 10 }}
            >
                <div className="inst-label">[ EST. SAWYER &amp; CO. · ELEUTHERA · MMXXIV ]</div>
                <div className="inst-label hidden md:block">
                    SEVEN ENVIRONMENTS · ONE INSTITUTION
                </div>
            </div>

            {/* ── Keyframes ── */}
               <style>{`
            @keyframes sawyerBreathe {
                0%   { opacity: 0.35; }
                100% { opacity: 1; }
            }
        
            @keyframes sawyerSonar {
                0%   { transform: scale(0.6); opacity: 0.9; }
                100% { transform: scale(2.8); opacity: 0; }
            }
        
            @keyframes sawyerDotCore {
                0%, 100% { opacity: 0.75; }
                50%      { opacity: 1; }
            }
        
            /* ───────────────────────────── */
            /* NORTH STAR / PROBLEM AXIS */
            /* ───────────────────────────── */
        
            .problem-axis {
                filter: drop-shadow(0 0 6px rgba(200,169,110,0.18));
            }
        
            .draw-line {
                stroke-dasharray: 420;
                stroke-dashoffset: 420;
                animation: drawTowardCenter 2.2s ease-in-out forwards;
            }
        
            .draw-line-diagonal {
                animation-delay: 0.15s;
            }
        
            @keyframes drawTowardCenter {
                to {
                    stroke-dashoffset: 0;
                }
            }
        
            .north-star {
                opacity: 0;
                transform-box: fill-box;
                transform-origin: center;
                animation:
                    starFadeIn 1.2s ease forwards 2.25s,
                    starPulse 4.8s ease-in-out infinite 3.4s;
            }
        
            @keyframes starFadeIn {
                to {
                    opacity: 1;
                }
            }
        
            @keyframes starPulse {
                0%, 100% {
                    opacity: 0.72;
                    filter: drop-shadow(0 0 4px rgba(200,169,110,0.18));
                }
                50% {
                    opacity: 0.95;
                    filter: drop-shadow(0 0 12px rgba(200,169,110,0.32));
                }
            }
        
            .compass-orbit {
                opacity: 0;
                transform-box: fill-box;
                transform-origin: center;
                animation:
                    orbitFadeIn 0.9s ease forwards 2.8s,
                    orbitRotate 18s linear infinite 3.7s;
            }
        
            @keyframes orbitFadeIn {
                to {
                    opacity: 1;
                }
            }
        
            @keyframes orbitRotate {
                to {
                    transform: rotate(360deg);
                }
            }
        
            .axis-label {
                opacity: 0;
                transform: translateY(6px);
            }
        
            .label-regulation {
                animation: labelReveal 0.9s ease forwards 3.1s;
            }
        
            .label-liquidity {
                animation: labelReveal 0.9s ease forwards 3.75s;
            }
        
            .label-digitization {
                animation: labelReveal 0.9s ease forwards 4.4s;
            }
        
            @keyframes labelReveal {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
        </section>
    );
}
