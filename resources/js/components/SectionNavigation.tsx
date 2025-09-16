import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SectionNavigation = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [sections, setSections] = useState<HTMLElement[]>([]);

    useEffect(() => {
        // Find all sections on the page
        const sectionElements = Array.from(document.querySelectorAll('section')) as HTMLElement[];
        setSections(sectionElements);

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionElements.indexOf(entry.target as HTMLElement);
                    setCurrentSection(index);
                }
            });
        }, observerOptions);

        sectionElements.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (direction: 'up' | 'down') => {
        const targetIndex = direction === 'up'
            ? Math.max(0, currentSection - 1)
            : Math.min(sections.length - 1, currentSection + 1);

        if (sections[targetIndex]) {
            sections[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Don't show if there are no sections or only one section
    if (sections.length <= 1) return null;

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
            <div className="flex flex-col space-y-2">
                {/* Up arrow */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => scrollToSection('up')}
                    disabled={currentSection === 0}
                    className={`
            w-12 h-12 rounded-full border-2 backdrop-blur-md transition-all duration-300
            ${currentSection === 0
                            ? 'opacity-50 cursor-not-allowed bg-card/50'
                            : 'hover:bg-primary hover:text-white hover:border-primary bg-card/80 border-border hover:shadow-luxury'
                        }
          `}
                >
                    <ChevronUp className="h-5 w-5" />
                </Button>

                {/* Section indicators */}
                <div className="flex flex-col space-y-1 py-2">
                    {sections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                sections[index]?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                            className={`
                w-2 h-8 rounded-full transition-all duration-300
                ${index === currentSection
                                    ? 'bg-primary shadow-glow'
                                    : 'bg-border hover:bg-muted-foreground'
                                }
              `}
                        />
                    ))}
                </div>

                {/* Down arrow */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => scrollToSection('down')}
                    disabled={currentSection === sections.length - 1}
                    className={`
            w-12 h-12 rounded-full border-2 backdrop-blur-md transition-all duration-300
            ${currentSection === sections.length - 1
                            ? 'opacity-50 cursor-not-allowed bg-card/50'
                            : 'hover:bg-primary hover:text-white hover:border-primary bg-card/80 border-border hover:shadow-luxury'
                        }
          `}
                >
                    <ChevronDown className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default SectionNavigation;