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
            className="section-padding py-12 relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background"
        >
            <div className="container-default">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Block */}
                    <motion.div
                        ref={textRef}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-section-title mb-4 text-foreground">
                            O nás
                        </h2>
                        <p className="text-large text-muted-foreground">
                            Kavárna a Cukrárna U Marušky je místem, kde se setkává vášeň pro kávu v příjemném prostředí. Vznikla z lásky k dokonalé chuti a přání vytvořit prostor, kde se každý host cítí výjimečně.
                            <br />  U Marušky vzniklo z přání vytvořit kavárnu, kde si každý najde to své. Od 1.dubna 2025 přinášíme atmosféru, která voní po poctivé kávě, sladkostech a dobré náladě.

                            Každý den připravujeme kávu s láskou a k tomu chystáme čerstvé chlebíčky,  panini. Cukroví máme od tří dodavatelů vždy čerstvé plné lahodné chuti.

                        </p>
                        <p className="text-large text-muted-foreground">
                            Vychutnejte si chuť pravého Italského espressa Café Vergnano 1882.

                        </p>


                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 250 }}
                        >
                            <Link href="/o-nas">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
                                >
                                    O nás
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image Block */}
                    <motion.div
                        ref={imgWrapRef}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-[600px] mx-auto overflow-hidden sm:rounded-xl"
                    >
                        <img
                            src={coffeeMaking}
                            alt="Příprava kávy u Marušky"
                            className="w-full h-80 sm:h-96 md:h-[480px] object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-2xl pointer-events-none" />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            viewport={{ once: true }}
                            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-background/80 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm text-muted-foreground border border-border"
                        >
                            Věříme, že káva je víc než nápoj – je to rituál, klid a spojení s lidmi.                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default AboutSection
