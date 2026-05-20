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

// ─── Compass geometry ─────────────────────────────────────────────────────────
const CX = 760;  // compass centre x — shifted left so E label fits
const CY = 420;  // compass centre y — vertically centred

const R1  = 100;  // outer degree ring
const R2  = 86;   // inner ring 1
const R3  = 74;   // inner ring 2 (innermost circle)
const ARM = 115;  // crosshair arm — shorter so labels fit beyond outer ring

const VERT_LEN = 365;  // pre-calculated: CY(420) - TOP_Y(55)
const DIAG_LEN = 280;  // pre-calculated for CX=760, CY=420   // harbour island to centre

const toRad = (deg) => (deg - 90) * (Math.PI / 180);

// Degree tick marks — every 10°, major every 30°
function buildTicks() {
    const ticks = [];
    for (let deg = 0; deg < 360; deg += 10) {
        const isMajor = deg % 30 === 0;
        const isCardinal = deg % 90 === 0;
        const inner = isCardinal ? R2 - 4 : isMajor ? R1 - 10 : R1 - 5;
        const outer = R1;
        const rad = toRad(deg);
        ticks.push({
            x1: CX + inner * Math.cos(rad),
            y1: CY + inner * Math.sin(rad),
            x2: CX + outer * Math.cos(rad),
            y2: CY + outer * Math.sin(rad),
            width: isCardinal ? 1.2 : isMajor ? 0.8 : 0.5,
            opacity: isCardinal ? 0.8 : isMajor ? 0.55 : 0.3,
            deg,
            isMajor,
            isCardinal,
        });
    }
    return ticks;
}

const TICKS = buildTicks();

// Non-cardinal degree labels (every 30° except cardinals)
const DEG_LABELS = [30,60,120,150,210,240,300,330].map(deg => ({
    deg,
    label: String(deg),
    x: CX + (R1 + 14) * Math.cos(toRad(deg)),
    y: CY + (R1 + 14) * Math.sin(toRad(deg)),
}));

// The three mandate labels
const LABELS = [
    { deg: "0°",   word: "REGULATION",   angle: 0,   anchor: "middle", delay: "3.1s",  yOff: -28 },
    { deg: "120°", word: "LIQUIDITY",    angle: 90,  anchor: "start",  delay: "3.75s", yOff: 0   },
    { deg: "240°", word: "DIGITIZATION", angle: 180, anchor: "middle", delay: "4.4s",  yOff: 28  },
];

// Diamond dimensions
const DH = 52;  // half-height
const DW = 32;  // half-width

export default function MainHall({ onEnter }) {
    return (
        <section
            id="main-hall"
            data-testid="env-main-hall"
            className="relative w-full h-[100vh] overflow-hidden bg-navy"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <img src={ATRIUM} alt=""
                    className="w-full h-full object-cover ken-burns"
                    style={{ filter: "brightness(0.38) contrast(1.1) saturate(0.95)" }}
                />
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(13,27,42,0.75) 0%, rgba(13,27,42,0.45) 45%, rgba(13,27,42,0.95) 100%)",
                }} />
            </div>

            {/* SVG layer */}
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
                    style={{ animation: "sawyerDotCore 3s ease-in-out infinite" }} />
                <text x={DOT_X - 10} y={DOT_Y - 14}
                    fill="rgba(200,169,110,0.6)" fontSize="9"
                    fontFamily="'Courier New', monospace" letterSpacing="0.12em">
                    HARBOUR ISLAND
                </text>
                <text x={DOT_X - 10} y={DOT_Y - 3}
                    fill="rgba(200,169,110,0.45)" fontSize="8"
                    fontFamily="'Courier New', monospace" letterSpacing="0.1em">
                    25.5°N
                </text>

                {/* ════ COMPASS SYSTEM ════ */}

                {/* Top origin dot */}
                <circle cx={CX} cy={55} r="2.5" fill="#c8a96e" opacity="0.75" />

                {/* Line 1 — vertical, draws down */}
                <line x1={CX} y1={55} x2={CX} y2={CY}
                    stroke="rgba(200,169,110,0.45)" strokeWidth="0.9" strokeLinecap="round"
                    style={{
                        strokeDasharray: VERT_LEN,
                        strokeDashoffset: VERT_LEN,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                {/* Line 2 — diagonal from Harbour Island */}
                <line x1={DOT_X} y1={DOT_Y} x2={CX} y2={CY}
                    stroke="rgba(200,169,110,0.45)" strokeWidth="0.9" strokeLinecap="round"
                    style={{
                        strokeDasharray: DIAG_LEN,
                        strokeDashoffset: DIAG_LEN,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                {/* ── Full compass rose — fades in after lines arrive ── */}
                <g style={{ opacity: 0, animation: "compassRoseFadeIn 1.8s ease forwards 2.2s" }}>

                    {/* Outer degree ring */}
                    <circle cx={CX} cy={CY} r={R1}
                        fill="none" stroke="rgba(200,169,110,0.35)" strokeWidth="0.8" />

                    {/* Inner ring 1 */}
                    <circle cx={CX} cy={CY} r={R2}
                        fill="none" stroke="rgba(200,169,110,0.2)" strokeWidth="0.6" />

                    {/* Inner ring 2 */}
                    <circle cx={CX} cy={CY} r={R3}
                        fill="none" stroke="rgba(200,169,110,0.15)" strokeWidth="0.5" />

                    {/* Degree tick marks */}
                    {TICKS.map((t, i) => (
                        <line key={`tick-${i}`}
                            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                            stroke={`rgba(200,169,110,${t.opacity})`}
                            strokeWidth={t.width}
                        />
                    ))}

                    {/* Degree number labels (non-cardinal) */}
                    {DEG_LABELS.map((dl) => (
                        <text key={`dl-${dl.deg}`}
                            x={dl.x} y={dl.y + 3.5}
                            textAnchor="middle"
                            fill="rgba(200,169,110,0.4)"
                            fontSize="7"
                            fontFamily="'Courier New', monospace"
                        >
                            {dl.label}
                        </text>
                    ))}

                    {/* Cardinal letters N S E W */}
                    {[
                        { letter: "N", deg: 0   },
                        { letter: "E", deg: 90  },
                        { letter: "S", deg: 180 },
                        { letter: "W", deg: 270 },
                    ].map(({ letter, deg }) => (
                        <text key={letter}
                            x={CX + (R2 - 14) * Math.cos(toRad(deg))}
                            y={CY + (R2 - 14) * Math.sin(toRad(deg)) + 4}
                            textAnchor="middle"
                            fill="rgba(200,169,110,0.75)"
                            fontSize="13"
                            fontFamily="'Courier New', monospace"
                            fontWeight="600"
                            letterSpacing="0.05em"
                        >
                            {letter}
                        </text>
                    ))}

                    {/* Crosshair arms — extend beyond outer ring */}
                    {[0, 90, 180, 270].map((deg) => {
                        const rad = toRad(deg);
                        const x1 = CX + R3 * Math.cos(rad);
                        const y1 = CY + R3 * Math.sin(rad);
                        const x2 = CX + ARM * Math.cos(rad);
                        const y2 = CY + ARM * Math.sin(rad);
                        return (
                            <line key={`arm-${deg}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="rgba(200,169,110,0.5)"
                                strokeWidth="0.8"
                            />
                        );
                    })}

                    {/* ── Faceted diamond ── */}
                    <g style={{
                        transformOrigin: `${CX}px ${CY}px`,
                        animation: "diamondIn 1.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                    }}>
                        {/* Ambient glow */}
                        <circle cx={CX} cy={CY} r="30" fill="rgba(200,169,110,0.07)" />

                        {/* Left dark face */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX-DW},${CY} ${CX},${CY+DH}`}
                            fill="rgba(120,90,35,0.6)"
                        />
                        {/* Right bright face */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX+DW},${CY} ${CX},${CY+DH}`}
                            fill="rgba(215,178,100,0.75)"
                        />
                        {/* Upper-left face */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX-DW},${CY} ${CX-DW*0.35},${CY-DH*0.3}`}
                            fill="rgba(175,140,72,0.55)"
                        />
                        {/* Upper-right brightest */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX+DW},${CY} ${CX+DW*0.35},${CY-DH*0.3}`}
                            fill="rgba(245,215,148,0.65)"
                        />
                        {/* Lower-left */}
                        <polygon
                            points={`${CX},${CY+DH} ${CX-DW},${CY} ${CX-DW*0.3},${CY+DH*0.35}`}
                            fill="rgba(100,78,30,0.5)"
                        />
                        {/* Lower-right */}
                        <polygon
                            points={`${CX},${CY+DH} ${CX+DW},${CY} ${CX+DW*0.3},${CY+DH*0.35}`}
                            fill="rgba(165,132,65,0.55)"
                        />
                        {/* Outline */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX+DW},${CY} ${CX},${CY+DH} ${CX-DW},${CY}`}
                            fill="none"
                            stroke="rgba(218,185,115,0.85)"
                            strokeWidth="0.9"
                        />
                        {/* Inner facet lines */}
                        <line x1={CX} y1={CY-DH} x2={CX} y2={CY+DH}
                            stroke="rgba(200,169,110,0.22)" strokeWidth="0.5"/>
                        <line x1={CX-DW} y1={CY} x2={CX+DW} y2={CY}
                            stroke="rgba(200,169,110,0.18)" strokeWidth="0.4"/>
                        {/* Primary specular highlight */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX+DW*0.55},${CY-DH*0.3} ${CX+DW*0.18},${CY-DH*0.52}`}
                            fill="rgba(255,252,235,0.72)"
                        />
                        {/* Secondary highlight */}
                        <polygon
                            points={`${CX+2},${CY-DH} ${CX+DW*0.2},${CY-DH*0.62} ${CX+DW*0.06},${CY-DH*0.72}`}
                            fill="rgba(255,255,248,0.5)"
                        />
                        {/* Centre jewel */}
                        <circle cx={CX} cy={CY} r="2.2" fill="rgba(255,250,225,0.95)" />

                        {/* Continuous pulse ring */}
                        <polygon
                            points={`${CX},${CY-DH} ${CX+DW},${CY} ${CX},${CY+DH} ${CX-DW},${CY}`}
                            fill="none"
                            stroke="rgba(200,169,110,0.4)"
                            strokeWidth="0.7"
                            style={{ animation: "diamondPulse 5s ease-in-out infinite 1.5s" }}
                        />
                    </g>

                    {/* ── Rotating outer dashed ring — appears after labels complete ── */}
                    <circle cx={CX} cy={CY} r={R1 + 8}
                        fill="none"
                        stroke="rgba(200,169,110,0.18)"
                        strokeWidth="0.6"
                        strokeDasharray="2 9"
                        style={{
                            transformOrigin: `${CX}px ${CY}px`,
                            animation: "orbitSpin 30s linear infinite 5.5s",
                        }}
                    />
                </g>

                {/* ── Mandate labels — sequential reveal after compass appears ── */}
                {/* REGULATION — above, at 0° */}
                <g style={{ opacity: 0, animation: "labelReveal 0.9s ease forwards 3.1s" }}>
                    <text x={CX} y={CY - ARM - 18}
                        textAnchor="middle"
                        fill="rgba(200,169,110,0.55)"
                        fontSize="8" fontFamily="'Courier New', monospace" letterSpacing="0.12em">
                        0°
                    </text>
                    <text x={CX} y={CY - ARM - 6}
                        textAnchor="middle"
                        fill="rgba(225,215,190,0.88)"
                        fontSize="10.5" fontFamily="'Courier New', monospace" letterSpacing="0.22em">
                        REGULATION
                    </text>
                    <line x1={CX} y1={CY - ARM - 2} x2={CX} y2={CY - ARM + 6}
                        stroke="rgba(200,169,110,0.4)" strokeWidth="0.7"/>
                </g>

                {/* LIQUIDITY — right, at 120° (East side) */}
                <g style={{ opacity: 0, animation: "labelReveal 0.9s ease forwards 3.75s" }}>
                    {/* Extended arm dot */}
                    <circle cx={CX + ARM + 18} cy={CY}
                        r="5" fill="none" stroke="rgba(200,169,110,0.5)" strokeWidth="0.8"/>
                    <circle cx={CX + ARM + 18} cy={CY}
                        r="2.5" fill="rgba(200,169,110,0.7)"/>
                    <text x={CX + ARM + 30} y={CY - 6}
                        textAnchor="start"
                        fill="rgba(200,169,110,0.55)"
                        fontSize="8" fontFamily="'Courier New', monospace" letterSpacing="0.12em">
                        120°
                    </text>
                    <text x={CX + ARM + 30} y={CY + 7}
                        textAnchor="start"
                        fill="rgba(225,215,190,0.88)"
                        fontSize="10.5" fontFamily="'Courier New', monospace" letterSpacing="0.22em">
                        LIQUIDITY
                    </text>
                    <line x1={CX + ARM} y1={CY} x2={CX + ARM + 12} y2={CY}
                        stroke="rgba(200,169,110,0.4)" strokeWidth="0.7"/>
                </g>

                {/* DIGITIZATION — below, at 240° (South side) */}
                <g style={{ opacity: 0, animation: "labelReveal 0.9s ease forwards 4.4s" }}>
                    <text x={CX} y={CY + ARM + 14}
                        textAnchor="middle"
                        fill="rgba(200,169,110,0.55)"
                        fontSize="8" fontFamily="'Courier New', monospace" letterSpacing="0.12em">
                        240°
                    </text>
                    <text x={CX} y={CY + ARM + 26}
                        textAnchor="middle"
                        fill="rgba(225,215,190,0.88)"
                        fontSize="10.5" fontFamily="'Courier New', monospace" letterSpacing="0.22em">
                        DIGITIZATION
                    </text>
                    <line x1={CX} y1={CY + ARM - 2} x2={CX} y2={CY + ARM + 8}
                        stroke="rgba(200,169,110,0.4)" strokeWidth="0.7"/>
                </g>

            </svg>

            {/* Left gradient */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 3,
                    background: "linear-gradient(90deg, rgba(13,27,42,1) 25%, rgba(13,27,42,0.75) 48%, rgba(13,27,42,0.1) 68%, transparent 100%)",
                }} />

            {/* Top plate */}
            <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute top-[110px] left-[var(--sawyer-edge-pad)] right-[var(--sawyer-edge-pad)] flex items-start justify-between"
                style={{ zIndex: 10 }}
            >
                <div className="inst-label">[ ENV :: 01 ] — MAIN HALL · ATRIUM</div>
                <div className="inst-label hidden md:block">LAT 25.5° N · LON 76.6° W</div>
            </motion.div>

            {/* Hero copy */}
            <div className="relative z-10 h-full flex items-center px-[var(--sawyer-edge-pad)]">
                <div className="max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="inst-label text-sand mb-8"
                    >[ SOVEREIGN INSTITUTIONAL INFRASTRUCTURE ]</motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.85 }}
                        className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-ivory tracking-tight"
                    >
                        Sovereign Risk Advisory and Institutional Capital.{" "}
                        <span className="italic text-sand">Defending and Scaling Enterprises</span>{" "}
                        Across The Bahamas, Cayman, Bermuda, Barbados, and Belize.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.1 }}
                        className="mt-10 max-w-xl text-silver font-body text-base md:text-lg leading-relaxed"
                    >
                        The Architecture of Integrity. Built to International Standard. Enforced Locally.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.35 }}
                        className="mt-14 flex items-center gap-6"
                    >
                        <button data-testid="enter-institution-btn" onClick={onEnter} className="inst-btn">
                            ENTER THE INSTITUTION <span className="text-sand">→</span>
                        </button>
                        <div className="hidden md:flex items-center gap-3">
                            <span className="block w-8 h-px bg-sand opacity-60" />
                            <span className="inst-label">SCROLL TO TRAVERSE</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="absolute bottom-8 left-[var(--sawyer-edge-pad)] right-[var(--sawyer-edge-pad)] flex items-end justify-between"
                style={{ zIndex: 10 }}>
                <div className="inst-label">[ EST. SAWYER &amp; CO. · HARBOUR ISLAND · MMXXIV ]</div>
                <div className="inst-label hidden md:block">SEVEN ENVIRONMENTS · ONE INSTITUTION</div>
            </div>

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
                @keyframes compassRoseFadeIn {
                    0%   { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes diamondIn {
                    0%   { transform: scale(0.3); }
                    65%  { transform: scale(1.1); }
                    100% { transform: scale(1);   }
                }
                @keyframes diamondPulse {
                    0%, 100% { opacity: 0.4; }
                    50%      { opacity: 0.9; }
                }
                @keyframes orbitSpin {
                    to { transform: rotate(360deg); }
                }
                @keyframes labelReveal {
                    0%   { opacity: 0; transform: translateY(5px); }
                    100% { opacity: 1; transform: translateY(0);   }
                }
            `}</style>
        </section>
    );
}
