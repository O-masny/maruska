'use client'

import petFriendly from '@/assets/pet_friendly.png'
import { parallax, reveal } from '@/lib/scrollFx'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const PetSection = () => {
    const textRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (textRef.current) reveal(textRef.current, { y: 28, stagger: 0.1 })
        if (imgWrapRef.current) parallax(imgWrapRef.current, { yPercent: 18, scrub: 0.5 })
    }, [])

    return (
        <section
            id="pet-friendly"
            className="
        relative overflow-hidden py-40
        bg-[linear-gradient(180deg,
          hsl(28_25%_90%) 0%,
          hsl(26_20%_88%) 35%,
          hsl(24_18%_82%) 100%
        )]
      "
        >
            {/* Ambientní světelný přechod pro hloubku */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,hsl(0_0%_100%/0.25),transparent_60%)]" />

            <div className="container-default relative z-10">
                <motion.div
                    ref={textRef}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8"
                >
                    {/* LOGO / SYMBOL */}
                    <motion.img
                        ref={imgWrapRef}
                        src={petFriendly}
                        alt="Pet friendly kavárna"
                        className="w-28 sm:w-36 md:w-44 h-auto drop-shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />

                    {/* Nadpis */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-serif font-bold text-foreground"
                    >
                        Jsme <span className="text-primary">Pet Friendly</span>
                    </motion.h3>

                    {/* Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed"
                    >
                        Věříme, že chvíle u kávy chutnají nejlépe ve společnosti těch, které máme rádi –
                        ať už jsou dvounozí nebo čtyřnozí.
                        U nás jsou vaši mazlíčci vítáni s otevřenou náručí i miskou vody.
                    </motion.p>

                    {/* Dekorativní linie */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="w-32 h-[2px] bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 mt-6"
                    />
                </motion.div>
            </div>

            {/* Jemný gradient směrem k footeru */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </section>
    )
}

export default PetSection
