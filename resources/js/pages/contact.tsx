'use client'

import { ContactForm } from '@/components/Contact/ContactForm'
import { ContactInfoBlock } from '@/components/Contact/ContactInfoBlock'
import { ContactMap } from '@/components/Contact/ContactMap'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Kontakt = () => {
    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    return (
        <PageTransition>
            <div className="min-h-screen page-transition bg-background text-foreground">
                <Navigation />

                {/* HERO */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="pt-32 pb-16 text-center bg-gradient-to-b from-background via-secondary/20 to-background"
                >
                    <h1 className="font-serif text-6xl font-bold mb-4">
                        Napište <span className="text-primary">nám</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Jsme tu pro vaše dotazy, rezervace i zpětnou vazbu.
                    </p>
                </motion.section>

                {/* FORM + INFO */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <ContactInfoBlock />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border rounded-2xl p-8 shadow-elegant"
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </section>

                {/* MAP */}
                <section className="py-24 bg-gradient-to-b from-secondary/10 via-background to-background">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="font-serif text-4xl font-bold text-center mb-12"
                        >
                            Najdete nás snadno
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <ContactMap />
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default Kontakt
