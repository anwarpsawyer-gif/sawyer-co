import { motion } from "framer-motion";

const ATRIUM =
    "https://images.unsplash.com/photo-1622396481322-3b83d186701b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

// ─── Atlantic arc geometry ────────────────────────────────────────────────────
const OX = 1020;
const OY = 400;

const ARCS = [
    { r: 300,  delay: "0.0s", dur: "13s", op: 0.07  },
    { r: 420,  delay: "0.5s", dur: "15s", op: 0.06  },
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

// Harbour Island coordinate dot
const DOT_R     = 540;
const DOT_ANGLE = Math.PI * 0.96;
const DOT_X     = OX + DOT_R * Math.cos(DOT_ANGLE); // 484.3
const DOT_Y     = OY + DOT_R * Math.sin(DOT_ANGLE); // 467.7

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

// ─── Compass geometry ─────────────────────────────────────────────────────────
const TOP_X    = 880;  // vertical line origin — top right
const TOP_Y    = 40;
const INT_X    = 880;  // intersection — diamond lives here
const INT_Y    = 370;
const VERT_LEN = 330;  // exact pixel length of vertical line
const DIAG_LEN = 408;  // exact pixel length of diagonal from Harbour Island dot
const ORBIT_R  = 55;   // tight orbit ring around diamond
const ORBIT_C  = Math.round(2 * Math.PI * ORBIT_R); // ~345

const toRad = (deg) => (deg - 90) * (Math.PI / 180);
const labelR = ORBIT_R + 22;

const LABELS = [
    { deg: "000°", word: "REGULATION",  angle: 0,   anchor: "middle", delay: "3.1s",  cls: "label-regulation"  },
    { deg: "120°", word: "LIQUIDITY",   angle: 120, anchor: "start",  delay: "3.75s", cls: "label-liquidity"   },
    { deg: "240°", word: "DIGITIZATION",angle: 240, anchor: "end",    delay: "4.4s",  cls: "label-digitization"},
];

function orbitArcD(startDeg, endDeg, r) {
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1 = INT_X + r * Math.cos(s);
    const y1 = INT_Y + r * Math.sin(s);
    const x2 = INT_X + r * Math.cos(e);
    const y2 = INT_Y + r * Math.sin(e);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

export default function MainHall({ onEnter }) {
    return (
        <section
            id="main-hall"
            data-testid="env-main-hall"
            className="relative w-full h-[100vh] overflow-hidden bg-navy"
        >
            {/* ── Background ── */}
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

            {/* ── SVG — arcs + compass ── */}
            <svg
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMaxYMid slice"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2 }}
            >
                {/* Atlantic arcs */}
                {ARCS.map((arc, i) => (
                    <path key={`arc-${i}`} d={arcD(arc.r)} fill="none"
                        stroke={`rgba(210,190,150,${arc.op})`} strokeWidth="1"
                        style={{ animation: `sawyerBreathe ${arc.dur} ${arc.delay} ease-in-out infinite alternate` }}
                    />
                ))}

                {/* Meridians */}
                {MERIDIANS.map((m, i) => (
                    <path key={`mer-${i}`} d={meridianD(m.angle, ARCS[0].r, ARCS[6].r)} fill="none"
                        stroke={`rgba(210,190,150,${m.op})`} strokeWidth="0.6"
                        style={{ animation: `sawyerBreathe 20s ${m.delay} ease-in-out infinite alternate` }}
                    />
                ))}

                {/* Harbour Island sonar dot */}
                {[0, 1.2, 2.4].map((delay, i) => (
                    <circle key={`sonar-${i}`} cx={DOT_X} cy={DOT_Y} r="10"
                        fill="none" stroke="rgba(200,169,110,0.4)" strokeWidth="0.7"
                        style={{
                            transformOrigin: `${DOT_X.toFixed(1)}px ${DOT_Y.toFixed(1)}px`,
                            animation: `sawyerSonar 3.6s ${delay}s ease-out infinite`,
                        }}
                    />
                ))}
                <circle cx={DOT_X} cy={DOT_Y} r="2.5" fill="#c8a96e"
                    style={{ animation: "sawyerDotCore 3s ease-in-out infinite" }}
                />
                <text x={DOT_X + 14} y={DOT_Y - 7}
                    fill="rgba(200,169,110,0.55)" fontSize="8.5"
                    fontFamily="'Courier New', monospace" letterSpacing="0.12em"
                >
                    HARBOUR ISLAND · 25.5°N
                </text>

                {/* ════ COMPASS SYSTEM ════ */}

                {/* Top origin dot */}
                <circle cx={TOP_X} cy={TOP_Y} r="2.5" fill="#c8a96e" opacity="0.7" />

                {/* Line 1 — vertical, draws down */}
                <line x1={TOP_X} y1={TOP_Y} x2={INT_X} y2={INT_Y}
                    stroke="rgba(200,169,110,0.5)" strokeWidth="0.9" strokeLinecap="round"
                    style={{
                        strokeDasharray: VERT_LEN,
                        strokeDashoffset: VERT_LEN,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                {/* Line 2 — diagonal from Harbour Island dot */}
                <line x1={DOT_X} y1={DOT_Y} x2={INT_X} y2={INT_Y}
                    stroke="rgba(200,169,110,0.5)" strokeWidth="0.9" strokeLinecap="round"
                    style={{
                        strokeDasharray: DIAG_LEN,
                        strokeDashoffset: DIAG_LEN,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                {/* Intersection dot */}
                <circle cx={INT_X} cy={INT_Y} r="2" fill="#c8a96e"
                    style={{ opacity: 0, animation: "dotAppear 0.4s ease forwards 2.1s" }}
                />

                {/* ── Faceted Diamond ─────────────────────────────────────
                    Rendered as raw SVG shapes — no transform on the group
                    so diamondIn scale animation works correctly.
                    All coordinates relative to INT_X / INT_Y directly.
                ─────────────────────────────────────────────────────── */}
                <g style={{ opacity: 0, animation: "diamondIn 1.4s ease forwards 2.2s" }}>
                    {/* Glow halo */}
                    <circle cx={INT_X} cy={INT_Y} r="18" fill="rgba(200,169,110,0.05)" />

                    {/* Diamond body — classic 4-point elongated faceted gem */}
                    {/* Back/base */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X+9},${INT_Y-7} ${INT_X},${INT_Y+26} ${INT_X-9},${INT_Y-7}`}
                        fill="rgba(140,110,55,0.22)"
                    />
                    {/* Left dark face */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X-9},${INT_Y-7} ${INT_X-16},${INT_Y} ${INT_X},${INT_Y+26}`}
                        fill="rgba(155,122,60,0.28)"
                    />
                    {/* Right bright face */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X+9},${INT_Y-7} ${INT_X+16},${INT_Y} ${INT_X},${INT_Y+26}`}
                        fill="rgba(210,178,110,0.38)"
                    />
                    {/* Upper-left face */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X-16},${INT_Y} ${INT_X-9},${INT_Y-7}`}
                        fill="rgba(200,168,105,0.3)"
                    />
                    {/* Upper-right brightest — catches light */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X+16},${INT_Y} ${INT_X+9},${INT_Y-7}`}
                        fill="rgba(240,218,165,0.35)"
                    />
                    {/* Outline */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X+16},${INT_Y} ${INT_X},${INT_Y+26} ${INT_X-16},${INT_Y}`}
                        fill="none"
                        stroke="rgba(200,169,110,0.65)"
                        strokeWidth="0.7"
                    />
                    {/* Inner facet cross */}
                    <line x1={INT_X} y1={INT_Y-26} x2={INT_X} y2={INT_Y+26}
                        stroke="rgba(200,169,110,0.18)" strokeWidth="0.4"/>
                    <line x1={INT_X-16} y1={INT_Y} x2={INT_X+16} y2={INT_Y}
                        stroke="rgba(200,169,110,0.14)" strokeWidth="0.4"/>
                    {/* Specular highlight — top right */}
                    <polygon
                        points={`${INT_X},${INT_Y-26} ${INT_X+7},${INT_Y-10} ${INT_X+2},${INT_Y-14}`}
                        fill="rgba(255,252,235,0.6)"
                    />
                    {/* Centre jewel */}
                    <circle cx={INT_X} cy={INT_Y} r="1.8" fill="rgba(255,250,225,0.92)" />
                </g>

                {/* Diamond pulse overlay — separate element so it can loop independently */}
                <polygon
                    points={`${INT_X},${INT_Y-26} ${INT_X+16},${INT_Y} ${INT_X},${INT_Y+26} ${INT_X-16},${INT_Y}`}
                    fill="none"
                    stroke="rgba(200,169,110,0.0)"
                    style={{ animation: "diamondPulse 5s ease-in-out infinite 3.6s" }}
                />

                {/* ── Orbit arcs — draw as labels appear ── */}
                {[
                    { start: 0,   end: 120, delay: "3.1s"  },
                    { start: 120, end: 240, delay: "3.75s" },
                    { start: 240, end: 360, delay: "4.4s"  },
                ].map((arc, i) => (
                    <path key={`orbarc-${i}`}
                        d={orbitArcD(arc.start, arc.end, ORBIT_R)}
                        fill="none"
                        stroke="rgba(200,169,110,0.32)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: Math.round(ORBIT_C / 3),
                            strokeDashoffset: Math.round(ORBIT_C / 3),
                            animation: `orbitArcDraw 1.1s ease-in-out forwards ${arc.delay}`,
                        }}
                    />
                ))}

                {/* Full orbit ring — fades in then rotates */}
                <circle
                    cx={INT_X} cy={INT_Y} r={ORBIT_R}
                    fill="none"
                    stroke="rgba(200,169,110,0.26)"
                    strokeWidth="0.7"
                    strokeDasharray="3 7"
                    style={{
                        transformOrigin: `${INT_X}px ${INT_Y}px`,
                        opacity: 0,
                        animation: "orbitFadeIn 0.8s ease forwards 5.6s, orbitSpin 22s linear infinite 6.4s",
                    }}
                />

                {/* ── Degree mark labels ── */}
                {LABELS.map((lb) => {
                    const lx = INT_X + labelR * Math.cos(toRad(lb.angle));
                    const ly = INT_Y + labelR * Math.sin(toRad(lb.angle));
                    const tickInner = ORBIT_R - 5;
                    const tickOuter = ORBIT_R + 5;
                    const tx1 = INT_X + tickInner * Math.cos(toRad(lb.angle));
                    const ty1 = INT_Y + tickInner * Math.sin(toRad(lb.angle));
                    const tx2 = INT_X + tickOuter * Math.cos(toRad(lb.angle));
                    const ty2 = INT_Y + tickOuter * Math.sin(toRad(lb.angle));
                    return (
                        <g key={lb.cls} style={{ opacity: 0, animation: `labelReveal 0.9s ease forwards ${lb.delay}` }}>
                            {/* Tick mark on orbit ring */}
                            <line x1={tx1} y1={ty1} x2={tx2} y2={ty2}
                                stroke="rgba(200,169,110,0.65)" strokeWidth="0.9" />
                            {/* Degree */}
                            <text x={lx} y={ly - 3} textAnchor={lb.anchor}
                                fill="rgba(200,169,110,0.52)" fontSize="7.5"
                                fontFamily="'Courier New', monospace" letterSpacing="0.1em"
                            >
                                {lb.deg}
                            </text>
                            {/* Word */}
                            <text x={lx} y={ly + 9} textAnchor={lb.anchor}
                                fill="rgba(225,215,190,0.85)" fontSize="9.5"
                                fontFamily="'Courier New', monospace" letterSpacing="0.18em"
                            >
                                {lb.word}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* ── Left gradient — keeps arcs off the headline ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 3,
                    background: "linear-gradient(90deg, rgba(13,27,42,1) 25%, rgba(13,27,42,0.75) 48%, rgba(13,27,42,0.1) 72%, transparent 100%)",
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
                <div className="inst-label">[ ENV :: 01 ] — MAIN HALL · ATRIUM</div>
                <div className="inst-label hidden md:block">LAT 25.5° N · LON 76.6° W</div>
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
                        <span className="italic text-sand">Defending and Scaling Enterprises</span>{" "}
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
                        <button data-testid="enter-institution-btn" onClick={onEnter} className="inst-btn">
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
                <div className="inst-label">[ EST. SAWYER &amp; CO. · HARBOUR ISLAND · MMXXVI ]</div>
                <div className="inst-label hidden md:block">SEVEN ENVIRONMENTS · ONE INSTITUTION</div>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes sawyerBreathe {
                    0%   { opacity: 0.55; }
                    100% { opacity: 1; }
                }
                @keyframes sawyerSonar {
                    0%   { transform: scale(1);   opacity: 0.7; }
                    100% { transform: scale(3.2); opacity: 0;   }
                }
                @keyframes sawyerDotCore {
                    0%, 100% { opacity: 0.7; }
                    50%      { opacity: 1;   }
                }
                @keyframes compassDraw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes dotAppear {
                    to { opacity: 0.85; }
                }
                @keyframes diamondIn {
                    0%   { opacity: 0; transform: translate(${INT_X}px, ${INT_Y}px) scale(0.5) translate(-${INT_X}px, -${INT_Y}px); }
                    65%  { opacity: 1; transform: translate(${INT_X}px, ${INT_Y}px) scale(1.1) translate(-${INT_X}px, -${INT_Y}px); }
                    100% { opacity: 1; transform: translate(${INT_X}px, ${INT_Y}px) scale(1)   translate(-${INT_X}px, -${INT_Y}px); }
                }
                @keyframes diamondPulse {
                    0%, 100% { opacity: 0.78; }
                    50%      { opacity: 1; }
                }
                @keyframes orbitArcDraw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes orbitFadeIn {
                    to { opacity: 1; }
                }
                @keyframes orbitSpin {
                    to { transform: rotate(360deg); }
                }
                @keyframes labelReveal {
                    0%   { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
