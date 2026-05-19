import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Harbour Island rooster — subtle environmental detail.
 * Grok-generated silhouette video, softly embedded into
 * the Atlantic atmosphere. Surfaces only during two transition windows:
 *   • Main Hall → Advisory  (≈ scrollYProgress 0.06 – 0.20)
 *   • Capital Suite arrival (≈ scrollYProgress 0.42 – 0.58)
 * Soft radial mask + optimized filter chain dissolves video into
 * silvery-sand institutional tones matching the site palette.
 */
export default function Rooster() {
    const { scrollYProgress } = useScroll();
    const [reduced, setReduced] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReduced(mq.matches);
        apply();
        mq.addEventListener?.("change", apply);
        return () => mq.removeEventListener?.("change", apply);
    }, []);

    // Pause/play the video in sync with reduced-motion preference
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (reduced) {
            v.pause();
        } else {
            v.play().catch(() => {});
        }
    }, [reduced]);

    // Drift slowly across the lower foreground; subtle horizontal
    // travel keyed to scroll so the rooster feels rooted to place.
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
                // Soft radial mask dissolves the video's framing into atmosphere
                WebkitMaskImage:
                    "radial-gradient(circle at 50% 55%, rgba(0,0,0,1) 38%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0) 78%)",
                maskImage:
                    "radial-gradient(circle at 50% 55%, rgba(0,0,0,1) 38%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0) 78%)",
                mixBlendMode: "screen",
                // Enhanced filter: darker institutional tone, stronger brass/sand tint
                filter: "invert(1) sepia(0.6) hue-rotate(340deg) saturate(0.75) brightness(0.88) contrast(1.15)",
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
                <source src="/grok-video-a5bcbd74-a464-4632-bcd1-d9a0cf2017fe (1) (2).mp4" type="video/mp4" />
            </video>
        </motion.div>
    );
}
