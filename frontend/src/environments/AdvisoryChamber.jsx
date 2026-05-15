import { motion } from "framer-motion";

const CHAMBER =
    "https://images.unsplash.com/photo-1716467278688-5b7fc38e3ca7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

const PILLARS = [
    {
        idx: "01",
        title: "Institutional Strategy",
        sub: "Capital Preservation",
        body: "Architectural advisory built on decades of sovereign mandates. We engineer durability into capital structures designed to outlast cycles, regimes, and generational succession.",
        tag: "MANDATE :: PERMANENCE",
    },
    {
        idx: "02",
        title: "Global Advisory",
        sub: "Cross-Border Flow",
        body: "Cross-jurisdictional advisory designed for families, foundations, and sovereign entities operating between Atlantic geographies. Discretion is structural, not stylistic.",
        tag: "MANDATE :: FLOW",
    },
    {
        idx: "03",
        title: "Private Equity",
        sub: "Sovereign Direct",
        body: "Sovereign-direct deployments into infrastructure, institutional finance, and adaptive operating businesses. Capital placed with architectural intention — never speculative.",
        tag: "MANDATE :: DEPLOYMENT",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function AdvisoryChamber() {
    return (
        <section
            id="advisory-chamber"
            data-testid="env-advisory-chamber"
            className="relative w-full bg-navy overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
                {/* LEFT — Editorial block */}
                <div className="relative px-[var(--sawyer-edge-pad)] py-[var(--sawyer-section-pad)] flex flex-col">
                    <div className="flex items-center justify-between mb-16">
                        <div className="inst-label">
                            [ ENV :: 02 ] — ADVISORY CHAMBER
                        </div>
                        <div className="inst-label hidden md:block">
                            THREE PILLARS
                        </div>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight max-w-xl"
                    >
                        Advisory is the{" "}
                        <span className="italic text-sand">first room</span>{" "}
                        of the institution.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                    >
                        Every relationship begins in the chamber. Capital is
                        listened to before it is structured. Three pillars
                        sustain everything that follows.
                    </motion.p>

                    <div className="hairline my-16" />

                    <div className="flex flex-col gap-12">
                        {PILLARS.map((p, i) => (
                            <motion.div
                                key={p.idx}
                                custom={i}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-80px" }}
                                variants={reveal}
                                data-testid={`advisory-pillar-${p.idx}`}
                                className="grid grid-cols-[auto_1fr] gap-8 items-start"
                            >
                                <div className="font-display text-3xl text-sand leading-none pt-2">
                                    {p.idx}
                                </div>
                                <div>
                                    <p className="inst-label">{p.tag}</p>
                                    <h3 className="mt-3 font-display text-2xl md:text-3xl text-ivory tracking-tight">
                                        {p.title}
                                        <span className="block text-silver text-base md:text-lg font-body italic mt-1">
                                            {p.sub}
                                        </span>
                                    </h3>
                                    <p className="mt-4 text-silver font-body text-sm md:text-base leading-relaxed max-w-md">
                                        {p.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Image chamber */}
                <div className="relative min-h-[60vh] lg:min-h-full">
                    <img
                        src={CHAMBER}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "brightness(0.78) contrast(1.05)" }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(13,27,42,0.35) 0%, rgba(13,27,42,0.15) 50%, rgba(13,27,42,0.65) 100%)",
                        }}
                    />
                    {/* JetBrains intelligence overlays */}
                    <div className="absolute top-10 left-10 inst-label text-ivory">
                        [ CHAMBER :: ACTIVE ]
                    </div>
                    <div className="absolute top-10 right-10 inst-label text-ivory">
                        STATUS :: STEWARDSHIP
                    </div>
                    <div className="absolute bottom-10 left-10 inst-label text-ivory">
                        ROOM 02 / VII
                    </div>
                    <div className="absolute bottom-10 right-10 inst-label text-ivory hidden md:block">
                        [ LATITUDE 25.5° · LIMESTONE :: BAHAMIAN ]
                    </div>
                </div>
            </div>
        </section>
    );
}
