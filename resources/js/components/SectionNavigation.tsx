"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SectionNavigation = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [sections, setSections] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const sectionElements = Array.from(document.querySelectorAll("section")) as HTMLElement[];
        setSections(sectionElements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionElements.indexOf(entry.target as HTMLElement);
                        setCurrentSection(index);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
        );

        sectionElements.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (index: number) => {
        const section = sections[index];
        if (!section) return;

        // ✅ použij scrollIntoView — funguje spolehlivě i na iPhonu
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };


    if (sections.length <= 1) return null;

    return (
        <>
            {/* Desktop side nav */}
            <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col space-y-4">
                <motion.button
                    disabled={currentSection === 0}
                    onClick={() => scrollToSection(currentSection - 1)}
                    className="p-3 rounded-full bg-background/70 border border-border/60 shadow-md backdrop-blur-md transition hover:bg-primary/10 disabled:opacity-40"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp className="h-5 w-5" />
                </motion.button>

                <div className="flex flex-col items-center space-y-2">
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            className="relative w-2 h-6 rounded-full cursor-pointer transition"
                            animate={{
                                backgroundColor:
                                    index === currentSection
                                        ? "hsl(var(--primary))"
                                        : "hsl(var(--muted-foreground)/0.5)",
                                scale: index === currentSection ? 1.3 : 1,
                            }}
                            whileHover={{ scale: 1.4, backgroundColor: "hsl(var(--primary)/0.6)" }}
                            transition={{ duration: 0.25 }}
                        >
                            {index === currentSection && (
                                <motion.span
                                    layoutId="activeSection"
                                    className="absolute inset-0 rounded-full border-2 border-primary/60"
                                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    disabled={currentSection === sections.length - 1}
                    onClick={() => scrollToSection(currentSection + 1)}
                    className="p-3 rounded-full bg-background/70 border border-border/60 shadow-md backdrop-blur-md transition hover:bg-primary/10 disabled:opacity-40"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronDown className="h-5 w-5" />
                </motion.button>
            </div>

            {/* Mobile/Tablet bottom nav */}
            <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
                <div className="flex items-center justify-between rounded-2xl bg-card/90 backdrop-blur-md border shadow-lg px-4 py-3">
                    <Button
                        size="icon"
                        variant="ghost"
                        disabled={currentSection === 0}
                        onClick={() => scrollToSection(currentSection - 1)}
                        className="disabled:opacity-40"
                    >
                        <ChevronUp className="h-5 w-5" />
                    </Button>

                    <div className="flex space-x-3">
                        {sections.map((_, index) => (
                            <motion.div
                                key={index}
                                onClick={() => scrollToSection(index)}
                                className="cursor-pointer rounded-full"
                                animate={{
                                    width: index === currentSection ? 12 : 8,
                                    height: index === currentSection ? 12 : 8,
                                    backgroundColor:
                                        index === currentSection
                                            ? "hsl(var(--primary))"
                                            : "hsl(var(--muted-foreground)/0.5)",
                                }}
                                whileHover={{ scale: 1.3 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>

                    <Button
                        size="icon"
                        variant="ghost"
                        disabled={currentSection === sections.length - 1}
                        onClick={() => scrollToSection(currentSection + 1)}
                        className="disabled:opacity-40"
                    >
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SectionNavigation;
