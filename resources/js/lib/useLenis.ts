import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6, // delší => hladší
            easing: (t: number) =>
                1 - Math.pow(1 - t, 3), // cubic-out, měkčí a přirozený
            smoothWheel: true,
            touchMultiplier: 1.5, // lepší reakce na touch
        });

        // GSAP <-> Lenis sync
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));

        // Lazy-refresh ScrollTrigger (ne každým frame)
        ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });

        // Parallax efekt
        const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
        parallaxEls.forEach((el) => {
            gsap.to(el, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    scrub: true,
                },
            });
        });

        // Fade-in animace
        gsap.utils.toArray(".fade-in-up").forEach((el: any) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);
};
