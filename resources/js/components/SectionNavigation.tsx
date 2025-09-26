"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SectionNavigation = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [sections, setSections] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const sectionElements = Array.from(
            document.querySelectorAll("section")
        ) as HTMLElement[];
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
        if (sections[index]) {
            sections[index].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    if (sections.length <= 1) return null;

    return (
        <>
            {/* Desktop side nav */}
            <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col space-y-3">
                <Button
                    size="icon"
                    variant="outline"
                    disabled={currentSection === 0}
                    onClick={() => scrollToSection(currentSection - 1)}
                    className="w-12 h-12 rounded-full backdrop-blur-md"
                >
                    <ChevronUp className="h-5 w-5" />
                </Button>

                <div className="flex flex-col items-center space-y-2">
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            className="w-2 h-6 rounded-full bg-border"
                            animate={{
                                backgroundColor:
                                    index === currentSection ? "hsl(var(--primary))" : "hsl(var(--border))",
                                scale: index === currentSection ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </div>

                <Button
                    size="icon"
                    variant="outline"
                    disabled={currentSection === sections.length - 1}
                    onClick={() => scrollToSection(currentSection + 1)}
                    className="w-12 h-12 rounded-full backdrop-blur-md"
                >
                    <ChevronDown className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile/Tablet bottom nav */}
            <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
                <div className="flex items-center justify-between rounded-2xl bg-card/90 backdrop-blur-md border shadow-lg px-4 py-3">
                    <Button
                        size="icon"
                        variant="ghost"
                        disabled={currentSection === 0}
                        onClick={() => scrollToSection(currentSection - 1)}
                    >
                        <ChevronUp className="h-5 w-5" />
                    </Button>

                    <div className="flex space-x-2">
                        {sections.map((_, index) => (
                            <motion.div
                                key={index}
                                onClick={() => scrollToSection(index)}
                                className="w-2 h-2 rounded-full cursor-pointer"
                                animate={{
                                    backgroundColor:
                                        index === currentSection
                                            ? "hsl(var(--primary))"
                                            : "hsl(var(--muted-foreground))",
                                    scale: index === currentSection ? 1.4 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>

                    <Button
                        size="icon"
                        variant="ghost"
                        disabled={currentSection === sections.length - 1}
                        onClick={() => scrollToSection(currentSection + 1)}
                    >
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SectionNavigation;
