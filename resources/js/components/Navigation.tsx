import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigationItems = [
        { name: "Domů", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Akce", href: "/akce" },
        { name: "O nás", href: "/o-nas" },
        { name: "Kontakt", href: "/kontakt" },
    ];

    const isActive = (href: string) => url === href;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-card/95 backdrop-blur-md shadow-elegant border-b border-border"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <Coffee className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="font-serif text-2xl font-bold text-foreground">
                            U <span className="text-primary">Marušky</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 group ${isActive(item.href)
                                    ? "text-primary"
                                    : "text-foreground hover:text-primary"
                                    }`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {/* underline animation */}
                                <span
                                    className={`absolute bottom-1 left-4 right-4 h-[2px] bg-primary transition-transform duration-500 origin-left ${isActive(item.href)
                                        ? "scale-x-100"
                                        : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-border">
                            <Button className="bg-gradient-primary hover:shadow-luxury font-medium rounded-full px-8 relative overflow-hidden">
                                <span className="relative z-10">Rezervace</span>
                                {/* shimmer effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-foreground" />
                        ) : (
                            <Menu className="h-6 w-6 text-foreground" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border shadow-luxury"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`block py-2 font-medium transition-colors duration-300 ${isActive(item.href)
                                            ? "text-primary"
                                            : "text-foreground hover:text-primary"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button className="w-full bg-gradient-primary hover:shadow-luxury font-medium mt-4">
                                    Rezervace
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navigation;
