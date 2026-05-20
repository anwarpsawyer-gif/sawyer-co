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

                {/* Problem-axis overlay: Regulation / Liquidity / Digitization */}
                    <g aria-hidden="true">
                        {/* Geometry points */}
                        {(() => {
                            const TOP_X = DOT_X + 95;
                            const TOP_Y = DOT_Y - 165;
                            const INT_X = DOT_X + 95;
                            const INT_Y = DOT_Y + 18;
                    
                            return (
                                <>
                                    {/* Top reference dot */}
                                    <circle cx={TOP_X} cy={TOP_Y} r="2.4" fill="#c8a96e" opacity="0.65" />
                    
                                    {/* Vertical line */}
                                    <line
                                        x1={TOP_X}
                                        y1={TOP_Y + 8}
                                        x2={INT_X}
                                        y2={INT_Y}
                                        stroke="rgba(200,169,110,0.38)"
                                        strokeWidth="0.8"
                                        strokeDasharray="4 6"
                                    />
                    
                                    {/* Diagonal line from Nassau dot */}
                                    <line
                                        x1={DOT_X + 5}
                                        y1={DOT_Y}
                                        x2={INT_X}
                                        y2={INT_Y}
                                        stroke="rgba(200,169,110,0.45)"
                                        strokeWidth="0.9"
                                    />
                    
                                    {/* Intersection dot */}
                                    <circle cx={INT_X} cy={INT_Y} r="3" fill="#c8a96e" opacity="0.9" />
                    
                                    {/* Vertical labels */}
                                    <text x={INT_X + 16} y={INT_Y - 18} fill="rgba(232,225,210,0.72)" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="0.16em">
                                        REGULATION
                                    </text>
                                    <text x={INT_X + 16} y={INT_Y} fill="rgba(200,169,110,0.78)" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="0.16em">
                                        LIQUIDITY
                                    </text>
                                    <text x={INT_X + 16} y={INT_Y + 18} fill="rgba(232,225,210,0.72)" fontSize="10" fontFamily="'Courier New', monospace" letterSpacing="0.16em">
                                        DIGITIZATION
                                    </text>
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
            `}</style>
        </section>
    );
}
