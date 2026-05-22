import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const VILLA =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200";

const METRICS = [
    { label: "PIPELINE STAGES", value: "4 STAGES" },
    { label: "LOMBARD TURNAROUND", value: "48 HRS" },
    { label: "INVESTOR TIER", value: "INSTITUTIONAL" },
    { label: "PLATFORM LAUNCH", value: "2026" },
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

            <div className="
                relative z-10
                px-4 md:px-[var(--sawyer-edge-pad)]
                py-20 md:py-[var(--sawyer-section-pad)]
                ">
                <div className="flex items-center justify-between mb-16">
                    <div className="inst-label">
                        [ ENV :: 04 ] — CAPITAL SUITE
                    </div>
                    <div className="inst-label hidden md:block">
                        SUBSYSTEM :: ZEPHYRWEALTH.AI
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left — copy */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="inst-label text-sand mb-6"
                        >
                            MANDATE :: LIQUIDITY
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2 }}
                            className="
                            font-display
                            text-3xl md:text-5xl lg:text-6xl
                            leading-[1.05]
                            text-ivory
                            tracking-tight
                            "
                        >
                            Institutional capital.{" "}
                            <span className="italic text-sand">
                                Deployed with precision.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                        >
                            Sawyer Capital operates as a Caribbean private equity
                            firm, deploying institutional capital into regional assets
                            across financial services, real estate, and infrastructure.
                            Deal flow is managed from origination through IC review to
                            close, with mandate compliance enforced at every stage.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.32 }}
                            className="mt-6 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                        >
                            For qualifying portfolio positions, structured Lombard
                            lending against Caribbean securities holdings is available
                            as an ancillary facility, enabling clients to access
                            liquidity without dismantling the positions they spent
                            years building.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.44 }}
                            className="mt-6 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                        >
                            Acquisition due diligence on Caribbean targets covers
                            regulatory exposure, corporate structure, and valuation
                            to the standard required before institutional close.
                        </motion.p>

                        <div className="
                            mt-12
                            flex flex-col md:flex-row
                            gap-4
                            items-stretch md:items-start
                            ">

                        <motion.a
                            data-testid="investor-portal-btn"
                            href="https://zephyrtrustai.com/portal/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.58 }}
                            className="
                            inst-btn
                            w-full md:w-auto
                            justify-center
                            text-center
                            "
                        >
                            INVESTOR PORTAL
                            <ArrowUpRight
                                size={14}
                                strokeWidth={1.5}
                                className="text-sand"
                            />
                        </motion.a>
                    
                        <motion.a
                            data-testid="manager-login-btn"
                            href="https://zephyrtrustai.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.68 }}
                            className="inst-btn"
                        >
                            RISK, COMPLIANCE & MANAGER LOGIN
                            <ArrowUpRight
                                size={14}
                                strokeWidth={1.5}
                                className="text-sand"
                            />
                        </motion.a>
                    
                    </div>
                    </div>

                    {/* Right — metrics */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.4 }}
                        className="lg:pl-12 lg:border-l border-sand/30"
                    >
                        <p className="inst-label mb-10">
                            [ ZEPHYRWEALTH.AI · PLATFORM METRICS ]
                        </p>
                        <div className="
                            grid
                            grid-cols-1 sm:grid-cols-2
                            gap-x-10
                            gap-y-12
                            ">
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

                        {/* ZephyrWealth platform description */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="mt-12 border-t border-sand/20 pt-10"
                        >
                            <p className="inst-label text-sand mb-4">
                                PLATFORM :: ZEPHYRWEALTH.AI
                            </p>
                            <p className="text-silver font-body text-sm md:text-base leading-relaxed">
                                An AI-powered fund operating system built in-house.
                                Manages deal pipeline, investor onboarding, KYC review,
                                capital calls, and LP portal access. Mandate compliance
                                tracked at every stage. Lombard lending facilitated
                                for qualifying positions.
                            </p>
                        </motion.div>

                        <p className="inst-label text-silver mt-10 italic font-mono normal-case tracking-normal">
                            // director-led mandates only · limited to two new
                            engagements per quarter
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
