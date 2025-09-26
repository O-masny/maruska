'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

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
    category: string
    featured: boolean
    cover_image: string
}

const EventsIndex = () => {
    const { events } = usePage().props as unknown as { events: Event[] }

    return (
        <PageTransition>
            <div className="min-h-screen">
                <Navigation />

                <section className="pt-32 pb-16 text-center bg-gradient-elegant">
                    <h1 className="font-serif text-6xl font-bold mb-4 text-foreground">
                        Naše <span className="text-primary">Akce</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Kurzy, degustace a večery, které spojují lidi a chutě.
                    </p>
                </section>

                <section className="pb-24">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="col-span-full flex flex-col items-center justify-center text-center py-32"
                            >
                                <div className="p-6 rounded-full bg-primary/10 mb-6">
                                    <Calendar className="h-10 w-10 text-primary" />
                                </div>

                                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                                    Zatím žádné plánované akce
                                </h2>
                                <p className="text-muted-foreground max-w-md mb-8">
                                    Připravujeme nové kurzy, degustace a kulturní večery.
                                    Sledujte nás, brzy přidáme nové termíny. ☕
                                </p>

                                <Link href="/">
                                    <Button variant="outline" className="hover:bg-primary/10">
                                        Zpět na úvodní stránku
                                    </Button>
                                </Link>
                            </motion.div>
                        ) : (
                            events.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-card group hover:shadow-lg transition-all duration-500"
                                >
                                    <Link href={`/akce/${event.id}`}>
                                        <motion.img
                                            src={event.cover_image}
                                            alt={event.title}
                                            initial={{ scale: 1.05 }}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-full h-64 object-cover"
                                        />
                                    </Link>

                                    <div className="p-6 flex flex-col justify-between h-full">
                                        <div>
                                            <Badge className="mb-3 bg-gradient-primary text-white">{event.category}</Badge>
                                            <h2 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h2>
                                            <p className="text-muted-foreground line-clamp-3 mb-4">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span>{new Date(event.date).toLocaleDateString('cs-CZ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>

                                        <Link href={`/akce/${event.id}`}>
                                            <Button className="w-full mt-5 bg-gradient-primary hover:shadow-luxury">
                                                Více informací
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </section>


                <Footer />
            </div>
        </PageTransition>
    )
}

export default EventsIndex
