'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { destroyLenis, initLenis,  } from '@/lib/scrollFx'
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
    const blur = useTransform(scrollYProgress, [0, 1], ['0px', '6px'])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7])

    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])
    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <Navigation />

                {/* HERO SECTION */}
                <section
                    ref={heroRef}
                    className="relative flex flex-col justify-center items-center min-h-[70vh] overflow-hidden"
                >
                    <motion.img
                        src={event.cover_image}
                        alt={event.title}
                        style={{
                            y,
                            opacity,
                            filter: blur && `blur(${blur.get()})`, // ❌ špatně — nedynamické
                        }} className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background/90" />

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
                                    className="flex items-center gap-3 bg-card/60 rounded-xl p-4 shadow-sm border border-border/60 backdrop-blur-sm"
                                >
                                    <Icon className="h-5 w-5 text-primary" />
                                    <span>{label}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Popis */}
                        <motion.div
                            className="text-lg leading-relaxed text-foreground bg-card/50 p-8 rounded-2xl border border-border/50 shadow-md backdrop-blur-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {event.description}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex justify-between items-center pt-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/akce">
                                <Button variant="outline" className="group">
                                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                    Zpět na přehled
                                </Button>
                            </Link>

                            <Button
                                className="bg-gradient-primary text-white hover:shadow-luxury hover:scale-105 transition-transform duration-300"
                            >
                                {event.price > 0
                                    ? `Rezervovat (${event.price} Kč)`
                                    : 'Rezervovat zdarma'}
                            </Button>
                        </motion.div>
                    </div>
                </motion.section>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default EventShow
