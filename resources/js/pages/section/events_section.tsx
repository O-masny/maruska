'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { reveal } from '@/lib/scrollFx'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface EventsSectionProps {
    events: {
        id: number
        title: string
        type: string
        date: string
        time: string
        description: string
        cover_image: string
    }[]
}

const EventsSection = ({ events }: EventsSectionProps) => {
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (wrapRef.current) reveal(wrapRef.current, { y: 30, stagger: 0.16 })
    }, [])

    if (!events?.length)
        return (
            <section id="events" className="section-padding py-48 bg-background text-center relative overflow-hidden">
                <div className="container-default">
                    <h2 className="text-section-title mb-4 text-foreground">Akce</h2>
                    <p className="text-muted-foreground">
                        Momentálně nejsou naplánované žádné události.
                    </p>
                </div>
            </section>
        )

    return (
        <section
            id="events"
            className="
        section-padding py-40 relative overflow-hidden
        bg-gradient-to-b from-background via-secondary/10 to-background
      "
        >
            <div className="container-default relative">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-section-title mb-4 text-foreground"
                    >
                        Akce a události
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-subtitle max-w-2xl mx-auto"
                    >
                        Přijďte si užít výjimečné večery s kávou, hudbou a zážitky.
                    </motion.p>
                </div>

                {/* Events grid */}
                <div
                    ref={wrapRef}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                >
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="group"
                        >
                            <Card
                                className="
                  overflow-hidden rounded-3xl bg-card border border-border shadow-elegant
                  transition-all duration-500 hover:shadow-luxury
                "
                            >
                                <div className="relative overflow-hidden">
                                    <motion.img
                                        src={event.cover_image}
                                        alt={event.title}
                                        initial={{ scale: 1.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full shadow-sm uppercase">
                                            {event.type}
                                        </span>
                                    </div>
                                </div>

                                <CardContent className="p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-serif font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-primary" /> {event.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" /> {event.time}
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {event.description}
                                        </p>
                                    </div>

                                    <Link href={`/akce/${event.id}`}>
                                        <Button className="w-full mt-2 btn-primary">
                                            Více informací
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/akce">
                        <Button size="lg" className="btn-primary">
                            Zobrazit všechny akce
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default EventsSection
