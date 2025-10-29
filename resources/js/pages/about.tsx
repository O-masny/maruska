'use client'

import { motion } from 'framer-motion'
import { Award, Coffee, Dog, Heart } from 'lucide-react'
import { useEffect } from 'react'

import coffeeMaking from '@/assets/about.jpg'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { easeOut } from 'framer-motion'
import AboutSection from './section/about_section'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
}

const ONas = () => {
    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    const values = [
        { icon: Coffee, title: 'Kvalita', desc: 'Výběrové produkty od lokálních dodavatelů.' },
        { icon: Heart, title: 'Láska k řemeslu', desc: 'Každý šálek kávy a dezert jsou vytvořeny s péčí.' },
        { icon: Dog, title: 'Pet Friendly', desc: 'Uvítáme u nás i vašeho mazlíčka.' },
        { icon: Award, title: 'Zážitek', desc: 'Pořádáme vernisáže, ochutnávky i soukromé akce.' },
    ]

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />

                {/* HERO */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                    <motion.img
                        src={coffeeMaking}
                        alt="Káva U Marušky"
                        initial={{ scale: 1.08, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(20_25%_15%/0.55)_0%,hsl(20_20%_10%/0.8)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_100%/0.15),transparent_70%)]" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-10 text-center px-6"
                    >
                        <h1 className="font-serif text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                            O&nbsp;<span className="text-primary">nás</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Naše cesta začala láskou ke kávě a touhou vytvářet výjimečné chvíle pohody.
                        </p>
                    </motion.div>
                </section>

                {/* VALUES */}
                <section className="relative py-36 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--background)_/_90%)] to-[hsl(28_20%_85%)] pointer-events-none" />
                    <div className="container-default relative z-10 text-center">
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-section-title mb-16"
                        >
                            Naše <span className="text-primary">hodnoty</span>
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-3">
                            {values.map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                                    className="
                    bg-card border border-border rounded-2xl p-8
                    shadow-elegant hover:shadow-luxury
                    transition-all duration-300
                  "
                                >
                                    <div className="w-14 h-14 mx-auto my-4 rounded-full bg-gradient-to-r from-[hsl(10_60%_45%)] to-[hsl(10_55%_35%)] flex items-center justify-center shadow-glow">
                                        <v.icon className="text-white w-6 h-6" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-3">{v.title}</h3>
                                    <p className="text-muted-foreground text-base leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Přechod mezi sekcemi */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[hsl(28_20%_85%)] to-transparent pointer-events-none" />
                </section>

                {/* ABOUT */}
                <AboutSection />

                <Footer />
            </div>
        </PageTransition>
    )
}

export default ONas
