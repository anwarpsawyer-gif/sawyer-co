import { motion } from "framer-motion";

const ANWAR_PORTRAIT =
    "https://placehold.co/560x700/0D1B2A/C9B99A?text=A.S.";
const SARAH_PORTRAIT =
    "https://placehold.co/560x700/0D1B2A/C9B99A?text=S.S.";

const FOUNDERS = [
    {
        id: "anwar",
        name: "Anwar Sawyer",
        role: "Founding Principal · Regulatory Architecture",
        portrait: ANWAR_PORTRAIT,
        bio: "A former Financial Regulatory Analyst at the Securities Commission of The Bahamas and Deloitte alumnus, Anwar Sawyer brings over a decade of financial crime, regulatory strategy, and M&A due diligence experience across European and Caribbean markets. Trained at the Frankfurt School of Finance & Management, he has designed AML/CFT frameworks for European Tier 1 banks under MiFID II, built KRI-based risk models at exxeta AG, and led regulatory transformation engagements at Deloitte GmbH Frankfurt. He is the only DORA-certified practitioner based in Nassau.",
        stats: [
            { k: "EXPERIENCE", v: "18+ YRS" },
            { k: "JURISDICTIONS", v: "BS · EU · CARIBBEAN" },
            { k: "FORMATION", v: "DELOITTE · SECURITIES COMMISSION OF THE BAHAMAS" },
        ],
    },
    {
        id: "sarah",
        name: "Sarah Sawyer",
        role: "Founding Principal · Institutional Strategy & Technology",
        portrait: SARAH_PORTRAIT,
        bio: "Sarah Sawyer spent a decade at Deutsche Bank, ultimately as Assistant Vice President managing a €500B+ institutional platform across 198 funds and 42 asset managers. She led AI-supported automation for investment fund reporting, delivered a €20M contract across 8 global hubs, and built an AI-driven Identity and Access Governance platform commended by Deutsche Bank's Head of AI. As CEO of TreasureCorp, she architected multi-chain treasury infrastructure managing over $1.2M in digital assets. CESGA® certified. Trilingual: English, Arabic, German.",
        stats: [
            { k: "EXPERIENCE", v: "15+ YRS" },
            { k: "PLATFORM MANAGED", v: "€500B+" },
            { k: "FORMATION", v: "DEUTSCHE BANK · TREASURECORP" },
        ],
    },
];

export default function FounderChamber() {
    return (
        <section
            id="founder-chamber"
            data-testid="env-founder-chamber"
            className="relative w-full bg-ivory text-navy overflow-hidden"
        >
            <div className="px-[var(--sawyer-edge-pad)] py-[var(--sawyer-section-pad)]">
                <div className="flex items-center justify-between mb-16">
                    <div className="inst-label text-navy/60">
                        [ ENV :: 06 ] — THE PEDIGREE
                    </div>
                    <div className="inst-label text-navy/60 hidden md:block">
                        FOUNDERS · TWO PRINCIPALS
                    </div>
                </div>

                <motion.blockquote
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4 }}
                    className="font-display italic text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-navy max-w-5xl"
                >
                    &ldquo;The institutions that will lead the next decade are being built now,{" "}
                    <span className="not-italic text-navy/60">
                        by people who understand both sides of the table.
                    </span>
                    &rdquo;
                </motion.blockquote>

                <div className="hairline my-20 opacity-50" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {FOUNDERS.map((f, i) => (
                        <motion.div
                            key={f.id}
                            data-testid={`founder-${f.id}`}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 1.2,
                                delay: i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-8"
                        >
                            <div className="relative">
                                <div
                                    className="aspect-[4/5] w-full overflow-hidden bg-navy/10"
                                    style={{
                                        filter: "grayscale(1) contrast(1.05)",
                                    }}
                                >
                                    <img
                                        src={f.portrait}
                                        alt={f.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    className="absolute -bottom-3 left-0 right-0 h-px"
                                    style={{ background: "#C9B99A" }}
                                />
                            </div>
                            <div>
                                <p className="inst-label text-navy/60">
                                    [ PRINCIPAL :: 0{i + 1} ]
                                </p>
                                <h3 className="mt-4 font-display text-3xl md:text-4xl text-navy tracking-tight">
                                    {f.name}
                                </h3>
                                <p className="mt-2 inst-label text-navy/60">
                                    {f.role}
                                </p>
                                <p className="mt-6 text-navy/80 font-body text-sm md:text-base leading-relaxed max-w-md">
                                    {f.bio}
                                </p>
                                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                                    {f.stats.map((s) => (
                                        <div key={s.k}>
                                            <p className="font-display text-2xl md:text-3xl text-navy leading-none">
                                                {s.v}
                                            </p>
                                            <p className="mt-2 inst-label text-navy/60">
                                                {s.k}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
