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
        if (textRef.current) reveal(textRef.current, { y: 28, stagger: 0.1 })
        if (imgWrapRef.current) parallax(imgWrapRef.current, { yPercent: 18, scrub: 0.5 })
    }, [])

    return (
        <section
            id="about"
            className="
        relative overflow-hidden py-32
        bg-[linear-gradient(180deg,
          hsl(30_25%_90%) 0%,
          hsl(28_20%_85%) 50%,
          hsl(25_15%_80%) 100%
        )]
      "
        >
            {/* světelný gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_10%,hsl(0_0%_100%/0.18),transparent_60%)]" />

            <div className="container-default">
                <div className="grid lg:grid-cols-2 gap-y-16 lg:gap-x-20 xl:gap-x-28 items-center">

                    {/* TEXT */}
                    <motion.div
                        ref={textRef}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
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
                            Vychutnejte si chuť pravého italského espressa Café Vergnano 1882.
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
                    </motion.div>

                    {/* IMAGE */}
                    <motion.div
                        ref={imgWrapRef}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-[600px] mx-auto overflow-hidden sm:rounded-2xl"
                    >
                        <img
                            src={coffeeMaking}
                            alt="Příprava kávy u Marušky"
                            className="w-full h-80 sm:h-96 md:h-[480px] object-cover rounded-2xl shadow-2xl"
                        />

                        {/* Espresso overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(20_15%_10%/0.25)_0%,hsl(20_15%_5%/0.9)_100%)] rounded-2xl pointer-events-none" />

                        {/* Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            viewport={{ once: true }}
                            className="
                absolute bottom-5 left-5 sm:bottom-6 sm:left-6
                bg-background/70 backdrop-blur-sm shadow-inner
                px-4 sm:px-5 py-2 sm:py-3 rounded-full
                text-xs sm:text-sm text-muted-foreground border border-border
              "
                        >
                            Vychutnejte si kávu a dezerty v příjemné atmosféře naší kavárny
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
