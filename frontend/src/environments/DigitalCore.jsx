import { motion } from "framer-motion";

const NODES = [
    {
        id: "regtech",
        idx: "I",
        title: "Regulatory Technology",
        sub: "active compliance",
        body: "AI-native compliance tooling built in-house — not purchased off the shelf. RegWatch delivers AI-curated regulatory monitoring across SCB, FATF, FinCEN, DARE, and DORA, converted into plain-English impact summaries for Caribbean compliance officers. Compliance-as-a-Subscription provides a director-led compliance function at subscription cost for institutions too small to carry a full-time officer.",
        label: "REGTECH :: ACTIVE",
    },
    {
        id: "treasury",
        idx: "II",
        title: "Treasury Analytics",
        sub: "institutional-grade treasury",
        body: "TreasureCorp, is institutional-grade treasury analytics for digital asset operations — multi-chain, real-time, governance-ready. The same discipline applied to €500B in Deutsche Bank assets is applied here to digital treasury infrastructure. Tracking, simulation, and stakeholder reporting for organisations operating in the new financial environment.",
        label: "TREASURECORP :: NOMINAL",
    },
    {
        id: "dare",
        idx: "III",
        title: "Digital Asset Compliance",
        sub: "dare & micar compliance",
        body: "The DARE Act and MiCAR are reshaping what it means to operate in digital assets across the Caribbean and Europe. We design compliance programmes that satisfy SCB's evolving enforcement posture while anticipating EU obligations — covering both dimensions in one engagement. Digital asset exposure governed to the global standard.",
        label: "DARE :: SEALED",
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

            <div className="relative z-10 px-4 md:px-[var(--sawyer-edge-pad)] py-20 md:py-[var(--sawyer-section-pad)]">
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
                    className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight max-w-4xl"
                >
                    The Caribbean is modernising.{" "}
                    <span className="italic text-sand">
                        The infrastructure must follow.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-2xl"
                >
                    Three quiet subsystems form the digital architecture of
                    Sawyer &amp; Co. None of them announce themselves. They
                    merely hold the institution together.
                </motion.p>

                <div className="hairline my-14 md:my-20 max-w-3xl" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-16">
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
                            className="relative pl-5 md:pl-6 border-l border-silver/30"
                        >
                            <p className="inst-label text-sand mb-5 md:mb-6">
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
