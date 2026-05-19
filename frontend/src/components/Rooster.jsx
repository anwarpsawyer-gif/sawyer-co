import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Harbour Island rooster — subtle environmental detail.
 * Surfaces during two transition windows:
 *   • Main Hall → Advisory  (≈ scrollYProgress 0.06 – 0.20)
 *   • Capital Suite arrival (≈ scrollYProgress 0.42 – 0.58)
 *
 * Renders video at original colour with no background bleed.
 *
 * Background removal strategy:
 *   - If your video has a BLACK background  → use mixBlendMode: "screen"
 *   - If your video has a WHITE background  → use mixBlendMode: "multiply"
 *   Both modes knock out the background colour without distorting
 *   the rooster's original colours or requiring any filter chain.
 */
export default function Rooster() {
    const { scrollYProgress } = useScroll();
    const [reduced, setReduced] = useState(false);
    const videoRef = useRef(null);

    // Respect prefers-reduced-motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReduced(mq.matches);
        apply();
        mq.addEventListener?.("change", apply);
        return () => mq.removeEventListener?.("change", apply);
    }, []);

    // Pause / play in sync with reduced-motion preference
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        reduced ? v.pause() : v.play().catch(() => {});
    }, [reduced]);

    // Drift slowly across the lower foreground; horizontal travel
    // keyed to scroll so the rooster feels rooted to place.
    const x = useTransform(
        scrollYProgress,
        [0, 0.13, 0.5, 1],
        ["6vw", "18vw", "72vw", "84vw"],
    );

    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -6, 0, -4, 0],
    );

    // Opacity gated to two specific transition windows only.
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.06, 0.13, 0.2, 0.42, 0.5, 0.58, 1],
        [0, 0.45, 0.5, 0, 0, 0.45, 0, 0],
    );

    if (reduced) return null;

    return (
        <motion.div
            data-testid="harbour-rooster"
            aria-hidden="true"
            className="pointer-events-none fixed bottom-[3vh] left-0 z-[5]"
            style={{
                x,
                y,
                opacity,
                width: "180px",
                height: "180px",
                // "multiply" drops white/light backgrounds while preserving
                // the rooster's original dark colours.
                // Swap to "screen" if the video background is black.
                mixBlendMode: "multiply",
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                className="w-full h-full object-contain"
                style={{ background: "transparent" }}
            >
                <source
                    src="/grok-video-a5bcbd74-a464-4632-bcd1-d9a0cf2017fe (1) (2).mp4"
                    type="video/mp4"
                />
            </video>
        </motion.div>
    );
}
