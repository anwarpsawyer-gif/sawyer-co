import { useEffect, useRef, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Toaster } from "sonner";
import InstitutionalNav from "./components/Nav";
import Rooster from "./components/Rooster";
import MainHall from "./environments/MainHall";
import AdvisoryChamber from "./environments/AdvisoryChamber";
import NexusReveal from "./environments/NexusReveal";
import CapitalSuite from "./environments/CapitalSuite";
import DigitalCore from "./environments/DigitalCore";
import FounderChamber from "./environments/FounderChamber";
import ExitHorizon from "./environments/ExitHorizon";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [environment, setEnvironment] = useState("main-hall");
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.2,
        });
        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    // Track active environment for nav highlighting
    useEffect(() => {
        const ids = [
            "main-hall",
            "advisory-chamber",
            "nexus-reveal",
            "capital-suite",
            "digital-core",
            "founder-chamber",
            "exit-horizon",
        ];
        const observers = ids.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const ob = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setEnvironment(id);
                },
                { threshold: 0.45 },
            );
            ob.observe(el);
            return ob;
        });
        return () => observers.forEach((o) => o && o.disconnect());
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: 0, duration: 1.8 });
        } else if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="App" data-testid="sawyer-app-root">
            <Toaster
                position="bottom-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: "#0D1B2A",
                        color: "#F5F0E8",
                        border: "1px solid #C9B99A",
                        borderRadius: 0,
                        fontFamily: "Inter, sans-serif",
                    },
                }}
            />
            <InstitutionalNav
                activeEnvironment={environment}
                onNavigate={scrollTo}
            />
            <Rooster />
            <main>
                <MainHall onEnter={() => scrollTo("exit-horizon")} />
                <AdvisoryChamber />
                <NexusReveal onNodeClick={scrollTo} />
                <CapitalSuite />
                <DigitalCore />
                <FounderChamber />
                <ExitHorizon />
            </main>
            <footer
                className="bg-navy border-t border-silver/20"
                data-testid="sawyer-footer"
            >
                <div className="max-w-7xl mx-auto px-[var(--sawyer-edge-pad)] py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="font-display text-2xl tracking-wide text-ivory">
                        SAWYER &amp; CO.
                    </div>
                    <div className="inst-label">
                        [ ATLANTIC :: HARBOUR ISLAND :: EST. MMXXIV ]
                    </div>
                    <div className="inst-label text-silver">
                        © {new Date().getFullYear()} SAWYER &amp; CO. — ALL
                        STEWARDSHIP RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
