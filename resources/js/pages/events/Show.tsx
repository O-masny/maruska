'use client'

import { usePage, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react'
import PageTransition from '@/components/PageTransition'

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

    return (
        <PageTransition>
            <div className="min-h-screen">
                <Navigation />

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative pt-32 pb-20"
                >
                    <img
                        src={event.cover_image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                        <h1 className="font-serif text-5xl font-bold mb-4">{event.title}</h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            {event.description}
                        </p>
                    </div>
                </motion.section>

                <section className="py-16 bg-background">
                    <div className="max-w-4xl mx-auto px-6 space-y-10">
                        <div className="grid sm:grid-cols-2 gap-8 text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <span>{new Date(event.date).toLocaleDateString('cs-CZ')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <span>
                                    {event.registered}/{event.capacity} účastníků
                                </span>
                            </div>
                        </div>

                        <div className="text-lg leading-relaxed text-foreground">
                            {event.description}
                        </div>

                        <div className="flex justify-between items-center">
                            <Link href="/akce">
                                <Button variant="outline">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Zpět na přehled
                                </Button>
                            </Link>

                            <Button className="bg-gradient-primary text-white hover:shadow-luxury">
                                {event.price > 0
                                    ? `Rezervovat (${event.price} Kč)`
                                    : 'Rezervovat zdarma'}
                            </Button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default EventShow
