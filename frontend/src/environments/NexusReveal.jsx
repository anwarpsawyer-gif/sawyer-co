import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NODES = [
    {
        id: "advisory-chamber",
        label: "Advisory Intelligence",
        position: "top-1/2 -translate-y-1/2 left-[12%]",
    },
    {
        id: "capital-suite",
        label: "Capital Operations",
        position: "top-[18%] right-[14%]",
    },
    {
        id: "digital-core",
        label: "Digital Infrastructure",
        position: "bottom-[18%] right-[22%]",
    },
];

/**
 * Lightweight Canvas2D particle drift — restrained, sovereign atmosphere.
 * No WebGL, no spring physics, no aggressive motion.
 */
function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let raf;
        let particles = [];
        let w, h;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.width = canvas.offsetWidth * dpr;
            h = canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(1, 1);
        };

        const init = () => {
            const count = 220;
            particles = new Array(count).fill(0).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.4 + Math.random() * 1.2,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.12,
                a: 0.15 + Math.random() * 0.4,
                phase: Math.random() * Math.PI * 2,
            }));
        };

        let t = 0;
        const tick = () => {
            t += 0.005;
            ctx.clearRect(0, 0, w, h);

            // Subtle vignette of connection lines between close particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                const breath = (Math.sin(t + p.phase) + 1) * 0.5;
                const alpha = p.a * (0.5 + breath * 0.5);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 185, 154, ${alpha.toFixed(3)})`;
                ctx.fill();
            }

            // Faint constellation lines
            ctx.strokeStyle = "rgba(122, 139, 148, 0.06)";
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = dx * dx + dy * dy;
                    if (d < 13000) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            raf = requestAnimationFrame(tick);
        };

        resize();
        init();
        tick();
        const onResize = () => {
            resize();
            init();
        };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default function NexusReveal({ onNodeClick }) {
    return (
        <section
            id="nexus-reveal"
            data-testid="env-nexus-reveal"
            className="relative w-full h-[110vh] bg-charcoal overflow-hidden"
        >
            <ParticleCanvas />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 0%, rgba(28,28,28,0.78) 100%)",
                }}
            />

            {/* Center copy */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[var(--sawyer-edge-pad)]">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4 }}
                    className="inst-label text-sand"
                >
                    [ ENV :: 03 ] — NEXUS REVEAL
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.3 }}
                    className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ivory tracking-tight max-w-4xl"
                >
                    Intelligence is not a feature.{" "}
                    <span className="italic text-sand">
                        It is the institution.
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.6 }}
                    className="mt-8 text-silver font-body text-sm md:text-base max-w-lg leading-relaxed"
                >
                    Three subsystems share the same ambient awareness.
                    Traverse to enter any.
                </motion.p>
            </div>

            {/* Nodes */}
            {NODES.map((n, i) => (
                <motion.button
                    key={n.id}
                    data-testid={`nexus-node-${n.id}`}
                    onClick={() => onNodeClick && onNodeClick(n.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.9 + i * 0.25 }}
                    className={`absolute z-20 ${n.position} group text-left`}
                >
                    <div className="flex items-center gap-4">
                        <span className="relative inline-flex">
                            <span className="absolute inline-flex h-3 w-3 rounded-full bg-sand opacity-40 ambient-drift" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-sand mt-[2px] ml-[2px]" />
                        </span>
                        <span className="inst-label text-ivory group-hover:text-sand transition-colors duration-500">
                            {n.label}
                        </span>
                    </div>
                    <span className="block mt-2 ml-7 inst-label text-silver opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        ENTER →
                    </span>
                </motion.button>
            ))}
        </section>
    );
}
