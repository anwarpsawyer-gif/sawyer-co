import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const VILLA =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200";

const METRICS = [
    { label: "ASSETS UNDER MANAGEMENT", value: "$XX.X B+" },
    { label: "ACTIVE FUNDS", value: "XX" },
    { label: "INVESTOR TIER", value: "INSTITUTIONAL" },
    { label: "ADVISORY MANDATES", value: "XXX+" },
];

export default function CapitalSuite() {
    return (
        <section
            id="capital-suite"
            data-testid="env-capital-suite"
            className="relative w-full bg-navy overflow-hidden"
        >
            {/* Ocean villa atmosphere */}
            <div className="absolute inset-0">
                <img
                    src={VILLA}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.4) contrast(1.05) saturate(0.85)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.7) 50%, rgba(13,27,42,0.95) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 px-[var(--sawyer-edge-pad)] py-[var(--sawyer-section-pad)]">
                <div className="flex items-center justify-between mb-16">
                    <div className="inst-label">
                        [ ENV :: 04 ] — CAPITAL SUITE
                    </div>
                    <div className="inst-label hidden md:block">
                        SUBSYSTEM :: ZEPHYRTRUSTAI
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight"
                        >
                            Capital deployed with{" "}
                            <span className="italic text-sand">
                                architectural intention.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                        >
                            Capital Operations is the embedded subsystem of the
                            institution. Mandates are structured, monitored,
                            and stewarded inside{" "}
                            <span className="text-ivory">ZephyrTrustAI</span> —
                            our sovereign capital operations platform.
                        </motion.p>

                        <motion.a
                            data-testid="capital-gateway-btn"
                            href="https://zephyrtrustai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="inst-btn mt-12"
                        >
                            ACCESS CAPITAL OPERATIONS
                            <ArrowUpRight
                                size={14}
                                strokeWidth={1.5}
                                className="text-sand"
                            />
                        </motion.a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.4 }}
                        className="lg:pl-12 lg:border-l border-sand/30"
                    >
                        <p className="inst-label mb-10">
                            [ INSTITUTIONAL METRICS · STATIC ]
                        </p>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                            {METRICS.map((m, i) => (
                                <motion.div
                                    key={m.label}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.2 + i * 0.15,
                                    }}
                                    data-testid={`capital-metric-${i}`}
                                >
                                    <p className="font-display text-3xl md:text-4xl text-ivory leading-none tracking-tight">
                                        {m.value}
                                    </p>
                                    <p className="mt-3 inst-label text-silver">
                                        {m.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                        <p className="inst-label text-silver mt-12 italic font-mono normal-case tracking-normal">
                            // figures illustrative · live AUM surfaces via the
                            ZephyrTrustAI subsystem
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
