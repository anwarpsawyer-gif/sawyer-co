import { motion } from "framer-motion";

const CHAMBER =
    "https://images.unsplash.com/photo-1716467278688-5b7fc38e3ca7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

const PILLARS = [
    {
        idx: "01",
        title: "Regulatory & Compliance",
        sub: "Examination Readiness",
        body: "Built by a former Securities Commission of The Bahamas regulatory analyst, our AML/CFT programmes are designed to survive the examination — not just satisfy a checklist. From risk assessment frameworks to KYC/CDD procedures and MLRO governance, we deliver end-to-end. Anwar Sawyer is the only DORA-certified practitioner based in Nassau.",
        tag: "MANDATE :: EXAMINATION READINESS",
    },
    {
        idx: "02",
        title: "Capital & Structured Lending",
        sub: "Lombard · Private Equity · Due Diligence",
        body: "Caribbean family offices and HNWIs hold significant securities and real assets — and routinely lack access to structured credit against them. Through ZephyrWealth.ai, we provide Lombard lending against local portfolios and acquisition due diligence on Caribbean assets to institutional standard. Capital deployed without liquidating what was built to last.",
        tag: "MANDATE :: CAPITAL DEPLOYMENT",
    },
    {
        idx: "03",
        title: "Digital Infrastructure",
        sub: "Treasury · RegTech · Digital Asset Compliance",
        body: "Sarah Sawyer built treasury analytics for organisations managing over $1.2M in digital assets at TreasureCorp, and led AI automation programmes at Deutsche Bank across a €500B+ platform. We bring that operational discipline to digital asset compliance, treasury governance, and institutional digital transformation across the Caribbean.",
        tag: "MANDATE :: INSTITUTIONAL TRANSFORMATION",
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
                        Advisory begins with{" "}
                        <span className="italic text-sand">knowing the framework</span>{" "}
                        from the inside.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                    >
                        Every engagement begins with a precise diagnosis. We assess
                        what your regulator will find before they find it. Three
                        disciplines sustain everything that follows.
                    </motion.p>

                    <div className="hairline my-16" />

                    <div className="flex flex-col gap-12">
                        {PILLARS.map((p, i) => (
                            <motion.div
                                key={p.idx}
                                custom={i
