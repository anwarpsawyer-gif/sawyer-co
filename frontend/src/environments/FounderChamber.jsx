import { motion } from "framer-motion";

const ANWAR_PORTRAIT =
    "https://placehold.co/560x700/0D1B2A/C9B99A?text=A.S.";
const SARAH_PORTRAIT =
    "https://placehold.co/560x700/0D1B2A/C9B99A?text=S.S.";

const FOUNDERS = [
    {
        id: "anwar",
        name: "Anwar Sawyer, LL.M.",
        role: "Founding Principal · Regulatory Architecture",
        portrait: ANWAR_PORTRAIT,
        bio: "Anwar Sawyer is a sovereign level regulatory architect with over a decade of command across financial crime intelligence, institutional compliance, and cross border M&A strategy in European and Caribbean markets. A Deloitte alumnus and former regulatory authority at the Securities Commission of The Bahamas, he has built and deployed AML/CFT frameworks inside European Tier 1 banks, engineering compliance infrastructure under the German Geldwäschegesetz and the 5th Anti Money Laundering Directive (AMLD5). He has led M&A compliance and transaction due diligence engagements in Frankfurt at the highest institutional levels. The only DORA certified practitioner domiciled in Nassau, Anwar holds a Master of Law in Mergers & Acquisitions, a Master of International Business, and a Bachelor of Science in Economics and History, a trifecta that places regulatory precision, market fluency, and historical pattern recognition at the core of every mandate he leads.",
        stats: [
            { k: "EXPERIENCE", v: "18+ YRS" },
            { k: "JURISDICTIONS", v: "BS · EU · CARIBBEAN" },
            { k: "FORMATION", v: "DELOITTE · SECURITIES COMMISSION OF THE BAHAMAS · DORA CERTIFIED" },
        ],
    },
    {
        id: "sarah",
        name: "Sarah Sawyer",
        role: "Founding Principal · Institutional Strategy & Technology",
        portrait: SARAH_PORTRAIT,
        bio: "Sarah Sawyer is an institutional investment platform operator and technology strategist with over 15 years of experience directing infrastructure at the highest levels of global finance. At Deutsche Bank, she served as Vice President overseeing a €500B+ institutional platform spanning 198 funds and 42 asset managers, driving the intelligence, automation, and governance architecture that kept one of the world's most complex fund ecosystems in motion. She engineered AI supported automation for investment fund reporting, secured and delivered a €20M contract across 8 global hubs, and built an AI driven Identity and Access Governance platform recognized by Deutsche Bank's Head of Innovation. As CEO of TreasureCorp, Sarah founded and scaled multi chain treasury infrastructure managing over $1.2M in digital assets. CESGA® certified. Trilingual: English, Arabic, German.",
        stats: [
            { k: "EXPERIENCE", v: "15+ YRS" },
            { k: "PLATFORM MANAGED", v: "€500B+" },
            { k: "FORMATION", v: "DEUTSCHE BANK · TREASURECORP · CESGA® CERTIFIED" },
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
                    &ldquo;Built for institutions navigating regulation, liquidity, and digitization without compromising stability.{" "}
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
