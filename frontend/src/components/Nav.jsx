import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { id: "main-hall", label: "MAIN HALL" },
    { id: "advisory-chamber", label: "ADVISORY" },
    { id: "capital-suite", label: "CAPITAL SUITE" },
    { id: "digital-core", label: "DIGITAL CORE" },
    { id: "founder-chamber", label: "THE PEDIGREE" },
];

const PORTAL_URL = "https://zephyrtrustai.com/portal/login";

export default function InstitutionalNav({ activeEnvironment, onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (id) => {
        setDrawerOpen(false);
        onNavigate(id);
    };

    return (
        <>
            <header
                data-testid="institutional-nav"
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
                style={{
                    background: scrolled
                        ? "rgba(13, 27, 42, 0.85)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(201, 185, 154, 0.12)"
                        : "1px solid transparent",
                }}
            >
                <div className="
                    max-w-[1600px]
                    mx-auto
                    px-4 md:px-[var(--sawyer-edge-pad)]
                    h-[72px]
                    flex items-center justify-between
                    ">
                    <button
                        data-testid="brand-mark"
                        onClick={() => handleNav("main-hall")}
                        className="
                        font-display
                        text-lg sm:text-xl md:text-2xl
                        tracking-wide
                        text-ivory
                        hover:text-sand
                        transition-colors duration-500
                        whitespace-nowrap
                        "
                    >
                        SAWYER <span className="text-sand">&amp;</span> CO.
                    </button>

                    <nav className="hidden lg:flex items-center gap-10">
                        {NAV_ITEMS.map((item) => {
                            const active = activeEnvironment === item.id;
                            return (
                                <button
                                    key={item.id}
                                    data-testid={`nav-${item.id}`}
                                    onClick={() => handleNav(item.id)}
                                    className="font-body text-[11px] tracking-[0.28em] transition-colors duration-500"
                                    style={{
                                        color: active ? "#C9B99A" : "#F5F0E8",
                                    }}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                                                   <a
                                data-testid="access-portal-btn"
                                href={PORTAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    hidden sm:inline-flex
                                    inst-btn inst-btn--solid
                                    items-center justify-center
                                    whitespace-nowrap
                                    px-4 py-3
                                    md:px-6
                                    text-[9px] md:text-[10px]
                                "
                            >
                                <span className="hidden md:inline">ACCESS PORTAL</span>
                                <span className="md:hidden">ACCESS</span>
                            </a>
                        <button
                            data-testid="mobile-nav-toggle"
                            onClick={() => setDrawerOpen(true)}
                            className="lg:hidden text-ivory"
                            aria-label="Open navigation"
                        >
                            <Menu strokeWidth={1.25} size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile drawer */}
            <div
                data-testid="mobile-drawer"
                className="fixed inset-0 z-[60] transition-all duration-700"
                style={{
                    pointerEvents: drawerOpen ? "auto" : "none",
                    opacity: drawerOpen ? 1 : 0,
                }}
            >
                <div
                    className="absolute inset-0 bg-navy"
                    style={{ opacity: 0.98 }}
                    onClick={() => setDrawerOpen(false)}
                />
                <div
                    className="absolute inset-y-0 right-0 w-[88%] max-w-md bg-charcoal p-10 flex flex-col"
                    style={{
                        transform: drawerOpen
                            ? "translateX(0)"
                            : "translateX(100%)",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="flex justify-between items-start mb-16">
                        <span className="inst-label">[ INSTITUTION ]</span>
                        <button
                            data-testid="mobile-drawer-close"
                            onClick={() => setDrawerOpen(false)}
                            className="text-ivory"
                            aria-label="Close navigation"
                        >
                            <X strokeWidth={1.25} size={22} />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-8">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                data-testid={`mobile-nav-${item.id}`}
                                onClick={() => handleNav(item.id)}
                                className="
                            text-left
                            font-display
                            text-2xl sm:text-3xl
                            text-ivory
                            hover:text-sand
                            transition-colors duration-500
                            "
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <a
                        data-testid="mobile-access-portal"
                        href={PORTAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inst-btn inst-btn--solid justify-center"
                    >
                        ACCESS PORTAL
                    </a>
                </div>
            </div>
        </>
    );
}
