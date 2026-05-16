import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ROOSTER_VIDEO_MP4 =
    "https://customer-assets.emergentagent.com/job_sawyer-institution-1/artifacts/hojrvzh5_grok-video-403b7340-2f7e-48d3-97ee-6b1937cac438%20%283%29.mp4";
const ROOSTER_VIDEO_WEBM = "/rooster.webm";

/**
 * Harbour Island rooster — subtle environmental detail.
 * Cinematic Grok-generated silhouette video, softly embedded into
 * the Atlantic atmosphere. Surfaces only during two transition windows:
 *   • Main Hall → Advisory  (≈ scrollYProgress 0.06 – 0.20)
 *   • Capital Suite arrival (≈ scrollYProgress 0.42 – 0.58)
 * Soft radial mask + screen blend mode dissolves any video framing.
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
                filter: "invert(1) sepia(0.55) hue-rotate(345deg) saturate(0.7) brightness(0.92) contrast(1.1)",
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
                <source src={ROOSTER_VIDEO_MP4} type="video/mp4" />
                <source src={ROOSTER_VIDEO_WEBM} type="video/webm" />
            </video>
        </motion.div>
    );
}
