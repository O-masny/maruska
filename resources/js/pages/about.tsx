'use client'

import { motion } from 'framer-motion'
import { Award, Coffee, Dog, Heart } from 'lucide-react'
import { useEffect } from 'react'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { Link } from '@inertiajs/react'
import { easeOut } from 'framer-motion'

// -   - ----------------
// Variants for Motion
// ------------------
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
}

const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
}

const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
}

const ONas = () => {
    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    const values = [
        { icon: Coffee, title: 'Kvalita', desc: 'Výběrové produkty od lokálních dodavatelů' },
        { icon: Heart, title: 'Láska k řemeslu', desc: 'Každý šálek kávy a dezert jsou vytvořeny s péčí' },
        { icon: Dog, title: 'Pet Friendly', desc: 'Uvítáme u nás i Vašeho mazlíčka' },
        { icon: Award, title: 'Zážitek', desc: 'Pořádáme vernisáže, ochutnávky i soukromé akce' },
    ]

    const team = [
        { name: 'Marie Nováková', role: 'Zakladatelka & Baristka', img: '/placeholder.svg', desc: 'S 15 lety zkušeností přináší U Marušky autentickou kávovou kulturu.' },
        { name: 'Jan Svoboda', role: 'Šéfcukrář', img: '/placeholder.svg', desc: 'Tvůrce ručně vyráběných dezertů s francouzským šarmem.' },
        { name: 'Anna Krátká', role: 'Kávová someliérka', img: '/placeholder.svg', desc: 'Expertka na výběr a cupping výběrových zrn z celého světa.' },
    ]

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />

                {/* Hero */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="relative min-h-[70vh] flex items-center justify-center text-center bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden"
                >
                    <motion.div className="max-w-3xl mx-auto px-6">
                        <h1 className="font-serif text-6xl md:text-7xl font-bold mb-4">
                            O <span className="text-primary">nás</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Naše cesta začala láskou ke kávě a touhou vytvářet výjimečné chvíle pohody.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Story */}
                <section className="section-padding bg-gradient-subtle">
                    <div className="container-default grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-section-title mb-6">Náš <span className="text-primary">příběh</span></h2>
                            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                                Kavárna a cukrárna v srdci města, která nabídne prémiovou Italskou kávu, čerstvé sladkosti, ročníková vína, panini, obložená prkénka a mnoho dalšího pro váš  nezapomenutelný zážitek v útulném prostředí.
                            </p>
                            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                                avárna a Cukrárna U Marušky je místem, kde se setkává vášeň pro kávu v příjemném prostředí. Vznikla z lásky k dokonalé chuti a přání vytvořit prostor, kde se každý host cítí výjimečně.

                                Vychutnejte si chuť pravého Italského espressa Café Vergnano 1882.



                                Věříme, že káva je víc než nápoj – je to rituál, klid a spojení s lidmi.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <div className="relative">

                                <img
                                    alt="Interiér kavárny"
                                    src="cafeInterior"
                                    className="w-full h-[480px] object-cover rounded-2xl shadow-luxury"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-48">
                    <div className="container-default text-center">
                        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-section-title mb-10">
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
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card border bord-border rounded-2xl   p  -8 shadow-elegant hover:shadow-luxury transition-all duration-300"
                                >
                                    <div className="w-14 h-14 mx-auto my-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                                        <v.icon className="text-white w-6 h-6" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-3">{v.title}</h3>
                                    <p className="text-muted-foreground text-base leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>





                {/* CTA */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="py-48 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 text-center"
                >
                    <div className="container-default">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Připojte se k <span className="text-primary">naší komunitě</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                            Zažijte atmosféru U Marušky a staňte se součástí našeho příběhu.
                        </p>
                        <Link href="/kontakt">
                            <Button className="btn-primary px-8 py-4 text-lg font-semibold hover:shadow-luxury">
                                Navštivte nás
                            </Button>
                        </Link>

                    </div>
                </motion.section>

                <Footer />
            </div>
        </PageTransition>
    )
}
export default ONas
























