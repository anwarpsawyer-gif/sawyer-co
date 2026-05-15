import { motion } from "framer-motion";
import InquiryForm from "../components/InquiryForm";

const HORIZON =
    "https://images.unsplash.com/photo-1579289115094-b88d8493a71f?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

export default function ExitHorizon() {
    return (
        <section
            id="exit-horizon"
            data-testid="env-exit-horizon"
            className="relative w-full min-h-[110vh] overflow-hidden bg-navy"
        >
            <div className="absolute inset-0">
                <img
                    src={HORIZON}
                    alt=""
                    className="w-full h-full object-cover ken-burns"
                    style={{ filter: "brightness(0.45) contrast(1.05) saturate(0.9)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.55) 35%, rgba(13,27,42,0.95) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 px-[var(--sawyer-edge-pad)] py-[var(--sawyer-section-pad)] flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-20">
                    <div className="inst-label">
                        [ ENV :: 07 ] — EXIT HORIZON
                    </div>
                    <div className="inst-label hidden md:block">
                        PRIVATE INQUIRY · SECURED CHANNEL
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4 }}
                    className="inst-label text-sand"
                >
                    [ CLOSING ]
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.3 }}
                    className="mt-6 font-display italic text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-ivory tracking-tight text-center max-w-4xl"
                >
                    What you have traversed is{" "}
                    <span className="not-italic text-sand">
                        the surface of the institution.
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="mt-8 text-silver font-body text-base md:text-lg leading-relaxed text-center max-w-xl"
                >
                    The chambers beyond are entered by invitation.
                </motion.p>

                <div className="hairline my-20 w-full max-w-md" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2 }}
                    className="w-full max-w-3xl"
                >
                    <InquiryForm />
                </motion.div>
            </div>
        </section>
    );
}
