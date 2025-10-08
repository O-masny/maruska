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
            <section className="section-padding py-6  bg-background text-center">
                <h2 className="text-section-title mb-4">Akce</h2>
                <p className="text-muted-foreground">
                    Momentálně nejsou naplánované žádné události.
                </p>
            </section>
        )

    return (
        <section className="section-padding py-12  bg-background relative overflow-hidden">
            {/* Subtle gradient overlay for cinematic depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

            <div className="container-default relative">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-4 text-foreground">
                        Akce a události
                    </h2>
                    <p className="text-subtitle max-w-2xl mx-auto">
                        Přijďte si užít výjimečné večery s kávou, hudbou a zážitky.
                    </p>
                </div>

                <div
                    ref={wrapRef}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <Card className="overflow-hidden bg-card/90 border border-border/60 rounded-3xl shadow-card hover:shadow-2xl transition-all duration-500">
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
                                        <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full shadow-sm uppercase">
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
                                        <Button
                                            variant="default"
                                            className="w-full mt-2 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                                        >
                                            Více informací
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA block */}
                <div className="text-center mt-20">
                    <Link href="/akce">
                        <Button
                            size="lg"
                            className="rounded-full px-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-all duration-300"
                        >
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
