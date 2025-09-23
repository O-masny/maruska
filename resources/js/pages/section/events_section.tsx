// resources/js/pages/section/events_section.tsx
import { Card, CardContent } from '@/components/ui/card'
import { reveal } from '@/lib/scrollFx'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Calendar, Clock, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const EventsSection = () => {
    const wrapRef = useRef<HTMLDivElement>(null)

    const events = [
        { title: 'Chuťové degustace', date: '25. března 2024', time: '18:00 - 20:00', description: 'Ochutnejte kávy z různých částí světa pod vedením našeho zkušeného baristy.', capacity: '12 míst', type: 'Degustace' },
        { title: 'Latte Art Workshop', date: '2. dubna 2024', time: '16:00 - 18:00', description: 'Naučte se vytvářet krásné vzory na kávě. Pro začátečníky i pokročilé.', capacity: '8 míst', type: 'Workshop' },
        { title: 'Jazzový večer', date: '15. dubna 2024', time: '19:00 - 22:00', description: 'Relaxujte při živé jazzové hudbě a vychutnejte si večerní atmosféru kavárny.', capacity: '25 míst', type: 'Hudba' },
        { title: 'Řemeslné dezerty', date: '22. dubna 2024', time: '14:00 - 16:00', description: 'Kurz přípravy autorských dezertů s naším šéfcukrářem.', capacity: '10 míst', type: 'Kurz' },
    ]

    useEffect(() => {
        if (wrapRef.current) {
            reveal(wrapRef.current, { y: 30, stagger: 0.16 })

            // pulzující timeline dots při vstupu do view
            wrapRef.current.querySelectorAll('.timeline-dot').forEach((dot) => {
                gsap.fromTo(
                    dot,
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: dot, start: 'top 85%', once: true },
                    }
                )
            })
        }
    }, [])

    return (
        <section className="section-padding bg-background">
            <div className="container-default">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-4 text-foreground">Akce a události</h2>
                    <p className="text-subtitle max-w-2xl mx-auto">Připojte se k našim speciálním akcím a zažijte kávu všemi smysly</p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden lg:block" />
                    <div ref={wrapRef} className="space-y-8">
                        {events.map((event, i) => (
                            <div key={i} className="relative">
                                {/* Dot */}
                                <div
                                    className="timeline-dot absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden lg:block"
                                    style={{ top: '1.5rem' }}
                                />
                                <Card className="lg:ml-16 border-0 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                            <div>
                                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                                                    {event.type}
                                                </span>
                                                <h3 className="text-xl font-display font-medium text-foreground">{event.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{event.date}</div>
                                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />{event.time}</div>
                                            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{event.capacity}</div>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventsSection
