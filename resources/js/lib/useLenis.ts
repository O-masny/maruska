import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
    useEffect(() => {
        // Init Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out
            smoothWheel: true,
        });

        // Raf loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Lenis ↔ ScrollTrigger sync
        lenis.on("scroll", ScrollTrigger.update);

        // OPTIONAL: Example parallax effect
        const images = document.querySelectorAll<HTMLElement>("[data-parallax]");
        images.forEach((img) => {
            gsap.to(img, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    scrub: true,
                },
            });
        });

        // OPTIONAL: Fade-in elements
        const fadeEls = document.querySelectorAll(".fade-in-up");
        fadeEls.forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                }
            );
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);
};
