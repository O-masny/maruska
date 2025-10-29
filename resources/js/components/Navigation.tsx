"use client"

import { Link, usePage } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { url } = usePage()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navigationItems = [
        { name: "Domů", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Akce", href: "/akce" },
        { name: "O nás", href: "/o-nas" },
        { name: "Kontakt", href: "/kontakt" },
    ]

    const isActive = (href: string) => url === href

    return (
        <>
            {/* --- HEADER --- */}
            <motion.header
                className={`sticky top-0 w-full z-[100] transition-all duration-500 border-b ${isScrolled
                    ? "backdrop-blur-md bg-background/80 border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                    : "bg-transparent border-transparent"
                    }`}
                style={{
                    WebkitBackdropFilter: "blur(10px)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <motion.img
                            src="/favicon.svg"
                            alt="logo"
                            className="h-14 w-14"
                            whileHover={{ rotate: 12 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <span className="font-serif text-2xl font-bold tracking-tight">
                            U <span className="text-primary">Marušky</span>
                        </span>
                    </Link>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative font-medium transition-colors duration-300 ${isActive(item.href)
                                    ? "text-primary"
                                    : "text-foreground/80 hover:text-primary"
                                    }`}
                            >
                                {item.name}
                                {isActive(item.href) && (
                                    <motion.span
                                        layoutId="activeLink"
                                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary transition"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label="Otevřít menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-foreground" />
                        ) : (
                            <Menu className="h-6 w-6 text-foreground" />
                        )}
                    </button>
                </div>
            </motion.header>

            {/* --- FULLSCREEN MENU PORTAL --- */}
            {createPortal(
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="
                fixed inset-0 z-[9999] flex flex-col justify-between text-white
                bg-[#0E0A08]/95 backdrop-blur-xl
                before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,hsl(10_30%_20%/0.4),transparent_70%)]
                before:pointer-events-none
              "
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 relative z-10">
                                <span className="font-serif text-xl font-bold">
                                    Menu <span className="text-primary">☕</span>
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-md hover:bg-white/10 transition"
                                    aria-label="Zavřít menu"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <motion.nav
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center flex-1 space-y-8 text-lg relative z-10"
                            >
                                {navigationItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`font-semibold tracking-wide transition-colors ${isActive(item.href)
                                                ? "text-primary"
                                                : "text-white/80 hover:text-primary"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.nav>

                            {/* Footer */}
                            <div className="text-center pb-8 text-xs text-white/40 relative z-10">
                                © U Marušky {new Date().getFullYear()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default Navigation
