import { motion } from "framer-motion";

const ANWAR_PORTRAIT =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const SARAH_PORTRAIT =
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

const FOUNDERS = [
    {
        id: "anwar",
        name: "Anwar Sawyer",
        role: "Founding Principal · Architecture of Capital",
        portrait: ANWAR_PORTRAIT,
        bio: "Anwar Sawyer founded the institution on the conviction that capital should be stewarded with the same discipline as architecture. Four decades across sovereign mandates, cross-border advisory, and private equity have shaped a practice defined less by performance cycles and more by structural permanence.",
        stats: [
            { k: "TENURE", v: "XX YRS" },
            { k: "MANDATES", v: "XXX+" },
            { k: "JURISDICTIONS", v: "XX" },
        ],
    },
    {
        id: "sarah",
        name: "Sarah Sawyer",
        role: "Founding Principal · Institutional Strategy",
        portrait: SARAH_PORTRAIT,
        bio: "Sarah Sawyer leads institutional strategy and the intelligence layer that quietly underwrites every chamber of the firm. Her work bridges sovereign advisory, family-office stewardship, and the operational discipline that sustains long-horizon capital across generations.",
        stats: [
            { k: "TENURE", v: "XX YRS" },
            { k: "STRATEGY DESKS", v: "XX" },
            { k: "FAMILIES", v: "XX+" },
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
                    &ldquo;Institutionalism is not merely a method.{" "}
                    <span className="not-italic text-navy/60">
                        It is a philosophy of permanence.
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
