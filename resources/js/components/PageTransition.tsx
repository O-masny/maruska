import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { url } = usePage(); // Inertia poskytuje aktuální URL

    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [url]); // změna URL = nová navigace

    return (
        <div className="relative">
            {/* Transition overlay */}
            <div
                className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-300 ${isTransitioning
                    ? "bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-100"
                    : "opacity-0"
                    }`}
            />

            {/* Content */}
            <div
                className={`transition-all duration-500 ${isTransitioning
                    ? "opacity-0 transform translate-y-4 scale-[0.98]"
                    : "opacity-100 transform translate-y-0 scale-100"
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default PageTransition;
