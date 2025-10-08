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
            className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background"
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
                            Kavárna a Cukrárna U Marušky je místem, kde se setkává vášeň pro
                            kávu s moderním designem. Vznikla z lásky k dokonalé chuti a přání
                            vytvořit prostor, kde se každý host cítí výjimečně.
                        </p>
                        <p className="text-large text-muted-foreground">
                            Používáme pouze nejkvalitnější zrna z ověřených plantáží a každou kávu
                            připravujeme s péčí zkušených baristů. Dezerty vznikají každý den
                            čerstvé z prémiových surovin.
                        </p>
                        <p className="text-large text-muted-foreground">
                            Věříme, že káva je víc než nápoj – je to rituál, klid a spojení s lidmi.
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
                        className="relative"
                    >
                        <img
                            src={coffeeMaking}
                            alt="Příprava kávy u Marušky"
                            className="w-full h-96 lg:h-[520px] object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-2xl pointer-events-none" />
                        {/* optional overlay detail */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            viewport={{ once: true }}
                            className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md px-5 py-3 rounded-full text-sm text-muted-foreground border border-border"
                        >
                            ☕ Pečlivě pražená zrna & domácí dezerty
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
