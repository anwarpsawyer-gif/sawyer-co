import { motion } from "framer-motion";

const ATRIUM =
    "https://images.unsplash.com/photo-1622396481322-3b83d186701b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

const OX = 1020;
const OY = 400;

const ARCS = [
    { r: 300, delay: "0.0s", dur: "13s", op: 0.07 },
    { r: 420, delay: "0.5s", dur: "15s", op: 0.06 },
    { r: 540, delay: "1.0s", dur: "12s", op: 0.055 },
    { r: 660, delay: "1.5s", dur: "16s", op: 0.048 },
    { r: 780, delay: "2.0s", dur: "14s", op: 0.038 },
    { r: 900, delay: "2.5s", dur: "17s", op: 0.028 },
    { r: 1020, delay: "3.0s", dur: "15s", op: 0.018 },
];

const MERIDIANS = [
    { angle: -50, op: 0.035, delay: "0.0s" },
    { angle: -32, op: 0.028, delay: "0.3s" },
    { angle: -14, op: 0.032, delay: "0.6s" },
    { angle: 4, op: 0.024, delay: "0.9s" },
    { angle: 22, op: 0.028, delay: "1.2s" },
];

const DOT_R = 540;
const DOT_ANGLE = Math.PI * 0.96;
const DOT_X = OX + DOT_R * Math.cos(DOT_ANGLE);
const DOT_Y = OY + DOT_R * Math.sin(DOT_ANGLE);

const INT_X = 820;
const INT_Y = 420;
const TOP_X = INT_X;
const TOP_Y = 80;

const DOT_LABEL_X = DOT_X - 120;
const DOT_LABEL_Y = DOT_Y + 62;

const ORBIT_R = 112;
const INNER_R = 68;
const DIAMOND = 38;
const DIAMOND_WIDTH = Math.round(DIAMOND * 0.58);

const DEGREE_LABELS = [
    { label: "360", angle: 0 },
    { label: "30", angle: 30 },
    { label: "60", angle: 60 },
    { label: "90", angle: 90 },
    { label: "120", angle: 120 },
    { label: "150", angle: 150 },
    { label: "180", angle: 180 },
    { label: "210", angle: 210 },
    { label: "240", angle: 240 },
    { label: "270", angle: 270 },
    { label: "300", angle: 300 },
    { label: "330", angle: 330 },
];

const toRad = (deg) => (deg - 90) * (Math.PI / 180);

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

export default function MainHall({ onEnter }) {
    return (
        <section
            id="main-hall"
            data-testid="env-main-hall"
            className="relative w-full h-[100vh] overflow-hidden bg-navy"
        >
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

            <svg
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMaxYMid slice"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2 }}
            >
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

                {[0, 1.2, 2.4].map((delay, i) => (
                    <circle
                        key={`sonar-${i}`}
                        cx={DOT_X}
                        cy={DOT_Y}
                        r="10"
                        fill="none"
                        stroke="rgba(200,169,110,0.4)"
                        strokeWidth="0.7"
                        style={{
                            transformOrigin: `${DOT_X.toFixed(1)}px ${DOT_Y.toFixed(1)}px`,
                            animation: `sawyerSonar 3.6s ${delay}s ease-out infinite`,
                        }}
                    />
                ))}

                <circle
                    cx={DOT_X}
                    cy={DOT_Y}
                    r="2.5"
                    fill="#c8a96e"
                    style={{ animation: "sawyerDotCore 3s ease-in-out infinite" }}
                />

                <text
                    x={DOT_LABEL_X}
                    y={DOT_LABEL_Y}
                    fill="rgba(225,215,190,0.78)"
                    fontSize="10"
                    fontFamily="'Courier New', monospace"
                    letterSpacing="0.18em"
                >
                    HARBOUR ISLAND
                </text>
                <text
                    x={DOT_LABEL_X}
                    y={DOT_LABEL_Y + 24}
                    fill="rgba(200,169,110,0.72)"
                    fontSize="10"
                    fontFamily="'Courier New', monospace"
                    letterSpacing="0.14em"
                >
                    25.5°N
                </text>
                <line
                    x1={DOT_LABEL_X}
                    y1={DOT_LABEL_Y + 42}
                    x2={DOT_LABEL_X + 34}
                    y2={DOT_LABEL_Y + 42}
                    stroke="rgba(200,169,110,0.62)"
                    strokeWidth="0.8"
                />

                <line
                    x1={DOT_X}
                    y1={DOT_Y}
                    x2={INT_X}
                    y2={INT_Y}
                    stroke="rgba(200,169,110,0.46)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 420,
                        strokeDashoffset: 420,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                <line
                    x1={TOP_X}
                    y1={TOP_Y}
                    x2={INT_X}
                    y2={INT_Y}
                    stroke="rgba(200,169,110,0.46)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 360,
                        strokeDashoffset: 360,
                        animation: "compassDraw 2.2s ease-in-out forwards",
                    }}
                />

                <circle
                    cx={INT_X}
                    cy={INT_Y}
                    r={ORBIT_R}
                    fill="none"
                    stroke="rgba(200,169,110,0.34)"
                    strokeWidth="0.8"
                    strokeDasharray="1 5"
                    style={{
                        opacity: 0,
                        transformOrigin: `${INT_X}px ${INT_Y}px`,
                        animation:
                            "orbitFadeIn 0.9s ease forwards 2.8s, orbitSpin 34s linear infinite 4s",
                    }}
                />

                <circle
                    cx={INT_X}
                    cy={INT_Y}
                    r={INNER_R}
                    fill="none"
                    stroke="rgba(200,169,110,0.24)"
                    strokeWidth="0.8"
                />

                {[
                    { t: "N", x: INT_X, y: INT_Y - ORBIT_R + 26 },
                    { t: "E", x: INT_X + ORBIT_R - 26, y: INT_Y + 7 },
                    { t: "S", x: INT_X, y: INT_Y + ORBIT_R - 16 },
                    { t: "W", x: INT_X - ORBIT_R + 26, y: INT_Y + 7 },
                ].map((c) => (
                    <text
                        key={c.t}
                        x={c.x}
                        y={c.y}
                        textAnchor="middle"
                        fill="rgba(200,169,110,0.86)"
                        fontSize="23"
                        fontFamily="serif"
                    >
                        {c.t}
                    </text>
                ))}

                {DEGREE_LABELS.map((d) => {
                    const r = ORBIT_R + 18;
                    const x = INT_X + r * Math.cos(toRad(d.angle));
                    const y = INT_Y + r * Math.sin(toRad(d.angle));
                    return (
                        <text
                            key={d.label}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            fill="rgba(200,169,110,0.62)"
                            fontSize="8"
                            fontFamily="'Courier New', monospace"
                        >
                            {d.label}
                        </text>
                    );
                })}

                <g
                    style={{
                        opacity: 0,
                        transformOrigin: `${INT_X}px ${INT_Y}px`,
                        animation:
                            "diamondIn 1.4s cubic-bezier(0.34,1.56,0.64,1) forwards 2.2s",
                    }}
                >
                    <polygon
                        points={`${INT_X},${INT_Y - DIAMOND} ${INT_X - DIAMOND_WIDTH},${INT_Y} ${INT_X},${INT_Y + DIAMOND}`}
                        fill="rgba(130,100,45,0.45)"
                    />
                    <polygon
                        points={`${INT_X},${INT_Y - DIAMOND} ${INT_X + DIAMOND_WIDTH},${INT_Y} ${INT_X},${INT_Y + DIAMOND}`}
                        fill="rgba(210,175,105,0.55)"
                    />
                    <polygon
                        points={`${INT_X},${INT_Y - DIAMOND} ${INT_X + DIAMOND_WIDTH},${INT_Y} ${INT_X},${INT_Y + DIAMOND} ${INT_X - DIAMOND_WIDTH},${INT_Y}`}
                        fill="none"
                        stroke="rgba(210,178,110,0.75)"
                        strokeWidth="0.8"
                    />
                    <circle cx={INT_X} cy={INT_Y} r="2.3" fill="rgba(255,250,225,0.95)" />
                </g>

                {[
                    {
                        word: "REGULATION",
                        deg: "0°",
                        x: INT_X,
                        y: TOP_Y + 18,
                        anchor: "middle",
                        delay: "3.1s",
                    },
                    {
                        word: "LIQUIDITY",
                        deg: "120°",
                        x: INT_X + 154,
                        y: INT_Y + 12,
                        anchor: "start",
                        delay: "3.75s",
                    },
                    {
                        word: "DIGITIZATION",
                        deg: "240°",
                        x: INT_X,
                        y: INT_Y + 154,
                        anchor: "middle",
                        delay: "4.4s",
                    },
                ].map((lb) => (
                    <g
                        key={lb.word}
                        style={{
                            opacity: 0,
                            animation: `labelReveal 0.9s ease forwards ${lb.delay}`,
                        }}
                    >
                        <text
                            x={lb.x}
                            y={lb.y}
                            textAnchor={lb.anchor}
                            fill="rgba(200,169,110,0.72)"
                            fontSize="9"
                            fontFamily="'Courier New', monospace"
                        >
                            {lb.deg}
                        </text>
                        <text
                            x={lb.x}
                            y={lb.y + 20}
                            textAnchor={lb.anchor}
                            fill="rgba(225,215,190,0.72)"
                            fontSize="10"
                            fontFamily="'Courier New', monospace"
                            letterSpacing="0.18em"
                        >
                            {lb.word}
                        </text>
                        <line
                            x1={lb.x - 16}
                            y1={lb.y + 32}
                            x2={lb.x + 16}
                            y2={lb.y + 32}
                            stroke="rgba(200,169,110,0.58)"
                            strokeWidth="0.8"
                        />
                    </g>
                ))}
            </svg>

            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 3,
                    background:
                        "linear-gradient(90deg, rgba(13,27,42,1) 25%, rgba(13,27,42,0.75) 48%, rgba(13,27,42,0.1) 72%, transparent 100%)",
                }}
            />

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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.15, delay: 1.02 }}
                        className="mt-8 max-w-2xl text-sand/90 font-body text-sm md:text-base leading-relaxed tracking-wide"
                    >
                        Built for institutions navigating regulation, liquidity, and digitization without compromising stability.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.1 }}
                        className="mt-8 max-w-xl text-silver font-body text-base md:text-lg leading-relaxed"
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
                            ENTER THE INSTITUTION <span className="text-sand">→</span>
                        </button>
                        <div className="hidden md:flex items-center gap-3">
                            <span className="block w-8 h-px bg-sand opacity-60" />
                            <span className="inst-label">SCROLL TO TRAVERSE</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div
                className="absolute bottom-8 left-[var(--sawyer-edge-pad)] right-[var(--sawyer-edge-pad)] flex items-end justify-between"
                style={{ zIndex: 10 }}
            >
                <div className="inst-label">
                    [ EST. SAWYER &amp; CO. · HARBOUR ISLAND · MMXXIV ]
                </div>
                <div className="inst-label hidden md:block">
                    SEVEN ENVIRONMENTS · ONE INSTITUTION
                </div>
            </div>

            <style>{`
                @keyframes sawyerBreathe {
                    0% { opacity: 0.55; }
                    100% { opacity: 1; }
                }

                @keyframes sawyerSonar {
                    0% { transform: scale(1); opacity: 0.7; }
                    100% { transform: scale(3.2); opacity: 0; }
                }

                @keyframes sawyerDotCore {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }

                @keyframes compassDraw {
                    to { stroke-dashoffset: 0; }
                }

                @keyframes diamondIn {
                    0% { opacity: 0; transform: scale(0.4); }
                    65% { opacity: 1; transform: scale(1.12); }
                    100% { opacity: 1; transform: scale(1); }
                }

                @keyframes orbitFadeIn {
                    to { opacity: 1; }
                }

                @keyframes orbitSpin {
                    to { transform: rotate(360deg); }
                }

                @keyframes labelReveal {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
