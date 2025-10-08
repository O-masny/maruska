"use client"

import { Button } from "@/components/ui/button"
import { Link, usePage } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { url } = usePage()

    // sleduj scroll pro blur/stín
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
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
        <motion.header
            className={`sticky top-0 w-full z-[99999] transition-all duration-500 border-b ${isScrolled
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
                        className="h-7 w-7"
                        whileHover={{ rotate: 12 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="font-serif text-2xl font-bold tracking-tight">
                        U <span className="text-primary">Marušky</span>
                    </span>
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`relative font-medium transition-all duration-300 ${isActive(item.href)
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
                    <Button className="ml-4 px-6 rounded-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-luxury transition-all duration-300">
                        Rezervace
                    </Button>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6 text-foreground" />
                    ) : (
                        <Menu className="h-6 w-6 text-foreground" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 80 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 right-0 w-3/4 max-w-sm h-screen bg-background/95 backdrop-blur-lg border-l border-border/40 shadow-2xl md:hidden z-[999999]"
                    >
                        <div className="flex flex-col items-start p-8 space-y-6">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-lg font-medium transition-colors ${isActive(item.href)
                                        ? "text-primary"
                                        : "text-foreground hover:text-primary"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button className="w-full mt-6 rounded-full bg-gradient-primary hover:shadow-luxury">
                                Rezervace
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navigation
