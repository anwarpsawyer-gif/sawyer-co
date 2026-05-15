import { motion } from "framer-motion";

const NODES = [
    {
        id: "treasury",
        idx: "I",
        title: "Treasury Systems",
        sub: "sovereign liquidity",
        body: "Liquidity reserves engineered to absorb cycle dislocations without compromising mandate integrity. Architecture remains invisible to the institution it sustains.",
        label: "TREASURY :: ACTIVE",
    },
    {
        id: "liquidity",
        idx: "II",
        title: "Liquidity Architecture",
        sub: "adaptive allocation",
        body: "Allocation logic shaped by Atlantic cross-border flow rather than benchmark imitation. The institution adapts to capital — never the inverse.",
        label: "ARCHITECTURE :: NOMINAL",
    },
    {
        id: "infrastructure",
        idx: "III",
        title: "Digital Infrastructure",
        sub: "invisible by design",
        body: "The digital substrate of the institution. Quiet, encrypted, sovereign. It does not announce itself — it merely holds the architecture together.",
        label: "INFRA :: SEALED",
    },
];

export default function DigitalCore() {
    return (
        <section
            id="digital-core"
            data-testid="env-digital-core"
            className="relative w-full bg-charcoal overflow-hidden"
        >
            {/* Subtle metallic texture via radial gradients */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(800px 600px at 20% 10%, rgba(122,139,148,0.12), transparent 60%), radial-gradient(900px 700px at 80% 90%, rgba(201,185,154,0.08), transparent 65%)",
                }}
            />

            <div className="relative z-10 px-[var(--sawyer-edge-pad)] py-[var(--sawyer-section-pad)]">
                <div className="flex items-center justify-between mb-16">
                    <div className="inst-label">
                        [ ENV :: 05 ] — DIGITAL CORE
                    </div>
                    <div className="inst-label hidden md:block ambient-drift">
                        INFRA :: STREAM · 0x4F · ACTIVE
                    </div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2 }}
                    className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight max-w-4xl"
                >
                    Infrastructure is invisible.{" "}
                    <span className="italic text-sand">
                        That is its purpose.
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-2xl"
                >
                    Three quiet subsystems sustain the architecture of Sawyer
                    &amp; Co. — none of them speak.
                </motion.p>

                <div className="hairline my-20 max-w-3xl" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {NODES.map((n, i) => (
                        <motion.div
                            key={n.id}
                            data-testid={`digital-node-${n.id}`}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 1.1,
                                delay: i * 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative pl-6 border-l border-silver/30"
                        >
                            <p className="inst-label text-sand mb-6 ambient-drift">
                                [ {n.label} ]
                            </p>
                            <p className="font-display text-sand text-2xl">
                                {n.idx}
                            </p>
                            <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory tracking-tight">
                                {n.title}
                                <span className="block text-silver text-base font-body italic mt-1">
                                    {n.sub}
                                </span>
                            </h3>
                            <p className="mt-6 text-silver font-body text-sm leading-relaxed">
                                {n.body}
                            </p>
                            <div className="mt-10 font-mono text-[10px] text-silver tracking-widest">
                                NODE_{n.id.toUpperCase()} //{" "}
                                <span className="text-sand">ONLINE</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
