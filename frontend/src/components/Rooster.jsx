import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Harbour Island rooster — subtle environmental detail.
 * A hand-drawn line-art silhouette that walks across the lower
 * foreground based on scroll progress. Restrained, atmospheric,
 * never playful. Not branded.
 */
export default function Rooster() {
    const { scrollYProgress } = useScroll();
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const handler = () => setReduced(mq.matches);
        mq.addEventListener?.("change", handler);
        return () => mq.removeEventListener?.("change", handler);
    }, []);

    // Move from offscreen-left → offscreen-right across full scroll
    const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "110vw"]);
    // Slight Y bob — kept extremely subtle
    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -4, 0, -3, 0],
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.95, 1],
        [0, 0.35, 0.35, 0],
    );

    if (reduced) return null;

    return (
        <motion.div
            data-testid="harbour-rooster"
            aria-hidden="true"
            className="pointer-events-none fixed bottom-[2vh] left-0 z-[5]"
            style={{ x, y, opacity }}
        >
            <RoosterSVG />
        </motion.div>
    );
}

function RoosterSVG() {
    return (
        <svg
            width="56"
            height="56"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#C9B99A" }}
        >
            {/* Body */}
            <path
                d="M28 86c4-22 22-30 38-28 12 1 22 8 24 18 1 6-2 12-6 14"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.18"
            />
            {/* Tail feathers — long elegant arch */}
            <path
                d="M28 86c-4-8-10-14-16-18 4 12 6 22 4 30"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.12"
            />
            <path
                d="M20 78c-2-6-2-14 0-20 3 6 5 12 4 18"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
            />
            {/* Neck + head */}
            <path
                d="M70 70c2-6 6-10 12-12 6-1 10 1 12 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="currentColor"
                fillOpacity="0.18"
            />
            {/* Beak */}
            <path
                d="M94 62l8-2-7 4"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.25"
            />
            {/* Comb */}
            <path
                d="M84 56c2-4 5-4 6-2m-2 2c2-3 5-3 6 0"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
            />
            {/* Eye */}
            <circle cx="90" cy="62" r="0.9" fill="currentColor" />
            {/* Legs — mid stride */}
            <path
                d="M46 92v14m-2 0h8m6-14v14m-2 0h8"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
            />
        </svg>
    );
}
