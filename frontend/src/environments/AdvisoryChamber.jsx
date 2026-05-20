import { motion } from "framer-motion";

const CHAMBER =
    "https://images.unsplash.com/photo-1716467278688-5b7fc38e3ca7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

const PILLARS = [
    {
        idx: "01",
        title: "Regulatory & Compliance",
        sub: "Examination Readiness · AML/CFT · MLRO Governance",
        body: "Sawyer Advisory delivers full AML/CFT compliance programmes designed to satisfy the requirements of the Securities Commission of The Bahamas, the Cayman Islands Monetary Authority, the Bermuda Monetary Authority, the Financial Services Commission of Barbados, the Financial Intelligence Unit of Belize, FATF, and DORA simultaneously. Covering risk assessment frameworks, KYC/CDD procedures, MLRO governance, and examination preparation across every jurisdiction we operate in. Clients receive a compliance infrastructure that survives regulatory scrutiny, not one that merely documents it. Director-led across every engagement. The only DORA-certified practice domiciled in Nassau.",
        tag: "MANDATE :: REGULATION",
    },
    {
        idx: "02",
        title: "Capital & Structured Lending",
        sub: "Private Equity · Lombard · Due Diligence",
        body: "Sawyer Capital operates as a Caribbean private equity firm, deploying institutional capital into regional assets across financial services, real estate, and infrastructure. For qualifying portfolio positions, we provide structured Lombard lending against Caribbean securities holdings as an ancillary facility, enabling clients to access liquidity without dismantling the positions they spent years building. Acquisition due diligence on Caribbean targets covers regulatory exposure, corporate structure and valuation to the standard required before institutional close.",
        tag: "MANDATE :: LIQUIDITY",
    },
    {
        idx: "03",
        title: "Digital Infrastructure & Transformation",
        sub: "Treasury · RegTech · Digital Asset Compliance",
        body: "Sawyer Digital brings operational excellence to digital asset compliance, treasury governance, and institutional digital transformation across the Caribbean and beyond. Three AI-powered platforms built in-house form the foundation: ZephyrWealth.ai manages the full private equity fund lifecycle from deal pipeline through LP portal access, and facilitates the Lombard lending process for qualifying positions. TreasureCorp delivers real-time multi-chain treasury analytics and governance reporting. RegWatch monitors SCB, FATF, FinCEN, DARE, and DORA continuously, converting regulatory change into actionable intelligence before it becomes a compliance event.",
        tag: "MANDATE :: DIGITIZATION",
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
                        <span className="italic text-sand">
                            knowing the framework
                        </span>{" "}
                        from the inside.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed max-w-lg"
                    >
                        Every engagement begins with a precise diagnosis. We
                        assess what your regulator will find before they find
                        it. Three disciplines sustain everything that follows.
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
                                        <span className="block text-sand text-sm md:text-base font-body not-italic mt-2 tracking-widest uppercase">
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
