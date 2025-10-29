'use client'

import CoffeeButton from '@/components/CoffeeButton'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { Link, usePage } from '@inertiajs/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Event {
    id: number
    title: string
    description: string
    date: string
    time: string
    location: string
    capacity: number
    registered: number
    price: number
    cover_image: string
    category: string
}

const EventShow = () => {
    const { event } = usePage().props as unknown as { event: Event }
    const heroRef = useRef<HTMLDivElement>(null)

    // Parallax efekt pozadí
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75])

    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />

                {/* HERO SECTION */}
                <section
                    ref={heroRef}
                    className="relative flex flex-col justify-center items-center min-h-[70vh] overflow-hidden"
                >
                    <motion.img
                        src={event.cover_image}
                        alt={event.title}
                        style={{ y, opacity }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Espresso overlay + teplý gradient */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.65)_0%,hsl(var(--background)/0.9)_100%)]" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative z-10 text-center text-white px-6 max-w-3xl"
                    >
                        <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            {event.category}
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            {event.title}
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                            {event.description}
                        </p>
                    </motion.div>
                </section>

                {/* DETAIL SECTION */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="py-24"
                >
                    <div className="max-w-4xl mx-auto px-6 space-y-12">
                        {/* Info grid */}
                        <motion.div
                            className="grid sm:grid-cols-2 gap-8 text-muted-foreground"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { staggerChildren: 0.1, ease: 'easeOut' },
                                },
                            }}
                        >
                            {[
                                { icon: Calendar, label: new Date(event.date).toLocaleDateString('cs-CZ') },
                                { icon: Clock, label: event.time },
                                { icon: MapPin, label: event.location },
                                {
                                    icon: Users,
                                    label: `${event.registered ?? 0}/${event.capacity} účastníků`,
                                },
                            ].map(({ icon: Icon, label }, i) => (
                                <motion.div
                                    key={i}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    className="flex items-center gap-3 bg-card/70 rounded-xl p-4 shadow-card border border-border backdrop-blur-sm"
                                >
                                    <Icon className="h-5 w-5 text-primary" />
                                    <span>{label}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Popis */}
                        <motion.div
                            className="text-lg leading-relaxed text-foreground bg-card/50 p-8 rounded-2xl border border-border shadow-elegant backdrop-blur-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {event.description}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/akce">
                                <CoffeeButton variant="outline" size="md" className="min-w-[200px]">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Zpět na přehled
                                </CoffeeButton>
                            </Link>

                            <Link href="/kontakt">
                                <CoffeeButton variant="solid" size="md" className="min-w-[240px]">
                                    {event.price > 0
                                        ? `Rezervovat (${event.price} Kč)`
                                        : 'Rezervovat zdarma'}
                                </CoffeeButton>
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default EventShow
