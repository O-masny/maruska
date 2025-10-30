'use client'

import coffeeMaking from '@/assets/about.jpg'
import { Button } from '@/components/ui/button'
import { parallax, reveal } from '@/lib/scrollFx'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const AboutSection = () => {
    const textRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const textEl = textRef.current
        const imgWrap = imgWrapRef.current

        // iOS fallback: zajistit viditelnost textu před animací
        if (textEl) {
            textEl.style.opacity = '1'
            textEl.style.transform = 'none'
        }

        // Reveal animace (GSAP)
        try {
            if (textEl) reveal(textEl, { y: 28, stagger: 0.1 })
        } catch (e) {
            console.warn('Reveal animation skipped:', e)
        }

        // Parallax – pouze desktop
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (!isTouch && imgWrap) {
            const img = imgWrap.querySelector('img')
            if (img) parallax(img, { yPercent: 18, scrub: 0.5 })
        }
    }, [])

    return (
        <section
            id="about"
            className="
                relative py-28 sm:py-32
                bg-[linear-gradient(180deg,
                  hsl(30_25%_90%)_0%,
                  hsl(28_20%_85%)_50%,
                  hsl(25_15%_80%)_100%)
                ]
            "
        >
            {/* světelný gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_10%,hsl(0_0%_100%/0.18),transparent_60%)]" />

            <div className="container-default">
                <div
                    className="
                        grid
                        lg:grid-cols-2
                        gap-y-16 lg:gap-x-20 xl:gap-x-28
                        items-center
                        text-center lg:text-left
                    "
                >
                    {/* --- TEXT --- */}
                    <div
                        ref={textRef}
                        className="
                            space-y-8
                            max-w-2xl
                            mx-auto lg:mx-0
                            transform-gpu
                            opacity-100
                            will-change-[opacity,transform]
                        "
                    >
                        <h2 className="text-section-title mb-4 font-serif text-foreground">
                            O nás
                        </h2>

                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Kavárna a Cukrárna U Marušky je místem, kde se setkává vášeň pro kávu
                            v příjemném prostředí. Vznikla z lásky k dokonalé chuti a přání vytvořit prostor,
                            kde se každý host cítí výjimečně.
                        </p>

                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Od 1. dubna 2025 přinášíme atmosféru, která voní po poctivé kávě,
                            sladkostech a dobré náladě. Každý den připravujeme kávu s láskou a k tomu
                            chystáme čerstvé chlebíčky a panini. Cukroví máme od tří dodavatelů – vždy čerstvé a plné chuti.
                        </p>

                        <p className="text-base sm:text-lg italic text-muted-foreground/90">
                            Vychutnejte si chuť pravé
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 250 }}
                        >
                            <Link href="/o-nas">
                                <Button
                                    size="lg"
                                    className="
                                        rounded-full px-10 py-5
                                        bg-gradient-to-r from-[hsl(10_60%_45%)] to-[hsl(10_55%_35%)]
                                        text-white shadow-md hover:shadow-lg hover:scale-[1.02]
                                        transition-all duration-300
                                    "
                                >
                                    Více o nás
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* --- IMAGE --- */}
                    <div
                        ref={imgWrapRef}
                        className="
                            relative w-full max-w-[600px] mx-auto
                            overflow-hidden sm:rounded-2xl
                        "
                    >
                        <img
                            src={coffeeMaking}
                            alt="Příprava kávy u Marušky"
                            className="
                                w-full h-64 sm:h-80 md:h-[480px]
                                object-cover object-center
                                rounded-2xl shadow-2xl
                                transform-gpu will-change-transform
                            "
                        />

                        {/* Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="
                                absolute bottom-5 left-1/2 -translate-x-1/2
                                sm:bottom-6 sm:left-6 sm:translate-x-0
                                bg-background/70 backdrop-blur-sm shadow-inner
                                px-4 sm:px-5 py-2 sm:py-3 rounded-full
                                text-xs sm:text-sm text-muted-foreground border border-border
                                text-center
                            "
                        >
                            Vychutnejte si kávu a dezerty v příjemné atmosféře naší kavárny
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
