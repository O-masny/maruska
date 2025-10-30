'use client'

import CoffeeButton from '@/components/CoffeeButton'
import { ContactMap } from '@/components/Contact/ContactMap'
import { OpeningHours } from '@/components/OpeningHours'
import { Card, CardContent } from '@/components/ui/card'
import { parallax, reveal } from '@/lib/scrollFx'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef } from 'react'

const ContactSection = () => {
    const wrapRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (wrapRef.current) reveal(wrapRef.current, { y: 24, stagger: 0.15 })
        if (mapRef.current) parallax(mapRef.current, { yPercent: 10, scrub: 0.5 })
    }, [])

    return (
        <section
            id="contact"
            className="
                relative overflow-hidden py-40
                bg-[linear-gradient(180deg,
                    hsl(28_30%_88%)_0%,
                    hsl(25_25%_84%)_50%,
                    hsl(22_20%_80%)_100%
                )]
            "
        >
            {/* teplé světelné overlaye */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(10_60%_35%/0.12)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,hsl(35_40%_60%/0.15)_0%,transparent_70%)]" />

            <div className="relative max-w-7xl mx-auto px-4">
                {/* Nadpis */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-section-title font-serif mb-4 text-foreground">
                        Kontaktujte nás
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Zastavte se na kávu nebo nám napište — rádi odpovíme na každý váš dotaz.
                    </p>
                </motion.div>

                {/* Grid responsive fix */}
                <div
                    ref={wrapRef}
                    className="
                        grid grid-cols-1 lg:grid-cols-2
                        gap-12 lg:gap-20
                        items-start
                    "
                >
                    {/* --- MAPA --- */}
                    <motion.div
                        ref={mapRef}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="
                            order-first lg:order-first
                            w-full max-w-[640px] mx-auto
                            rounded-3xl overflow-hidden
                            shadow-[0_10px_30px_hsl(25_20%_20%/0.2)]
                        "
                    >
                        <ContactMap />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(25_20%_10%/0.6)_100%)] pointer-events-none rounded-3xl" />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            viewport={{ once: true }}
                            className="
                                absolute bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-6
                                bg-background/80 backdrop-blur-md
                                px-4 sm:px-5 py-2 sm:py-3 rounded-full
                                text-xs sm:text-sm text-muted-foreground border border-border
                            "
                        >
                            Najdete nás v centru Zlína — těšíme se na vaši návštěvu.
                        </motion.div>
                    </motion.div>

                    {/* --- INFO BLOK --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="
                            space-y-6 text-lg sm:text-xl
                            text-center lg:text-left
                            max-w-[640px] mx-auto
                        "
                    >
                        {[
                            {
                                icon: <MapPin className="w-6 h-6 text-primary" />,
                                title: 'Adresa',
                                content: (
                                    <>
                                        Vodní 4200<br />
                                        760 01 Zlín 1<br />
                                        Česká republika
                                    </>
                                ),
                            },
                            {
                                icon: <Phone className="w-6 h-6 text-primary" />,
                                title: 'Telefon',
                                content: '+420 723 663 254 · +420 777 661 706',
                            },
                            {
                                icon: <Mail className="w-6 h-6 text-primary" />,
                                title: 'Email',
                                content: 'monika.maruska@seznam.cz',
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-primary" />,
                                title: 'Otevírací doba',
                                content: <OpeningHours variant="footer" />,
                            },
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className={`
                                    contact-card border-0 shadow-md bg-card relative overflow-hidden
                                    group hover:-translate-y-1 hover:shadow-xl
                                    transition-all duration-300
                                    before:absolute before:inset-0 before:bg-gradient-to-r
                                    before:from-primary/15 before:to-transparent
                                    before:opacity-0 group-hover:before:opacity-100
                                    before:transition-opacity before:duration-300
                                `}
                            >
                                <CardContent className="p-6 flex items-start gap-4 relative z-10">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-display font-medium text-lg mb-2 text-foreground">
                                            {item.title}
                                        </h3>
                                        <div className="text-muted-foreground leading-relaxed">
                                            {item.content}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* CTA + human touch */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-12 flex flex-col items-center lg:items-start gap-4"
                        >
                            <Link href="/kontakt">
                                <CoffeeButton
                                    variant="solid"
                                    size="lg"
                                    className="min-w-[240px] text-lg hover:scale-[1.03] transition-transform duration-300"
                                >
                                    Napište nám
                                </CoffeeButton>
                            </Link>
                            <p className="text-muted-foreground text-center lg:text-left italic text-base">
                                Jsme tu, abychom vám udělali den o trochu lepší — jedním šálkem po druhém.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
