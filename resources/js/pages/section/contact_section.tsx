'use client'

import { ContactMap } from "@/components/Contact/ContactMap"
import { OpeningHours } from "@/components/OpeningHours"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { clipReveal, driftX, reveal } from "@/lib/scrollFx"
import { Link } from "@inertiajs/react"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useRef } from "react"


const ContactSection = () => {
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!wrapRef.current) return
        reveal(wrapRef.current, { y: 28, stagger: 0.15 })
        clipReveal(wrapRef.current.querySelectorAll(".contact-card"), "up")
        driftX(wrapRef.current.querySelectorAll(".contact-card"), 12)
    }, [])

    return (
        <section
            id="contact"
            className="section-padding py-12 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary))_0%,transparent_50%),radial-gradient(circle_at_20%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-6 text-foreground">Kontakt</h2>
                    <p className="text-subtitle max-w-2xl mx-auto">
                        Kavárna a cukrárna v srdci města, která nabídne prémiovou italskou kávu,
                        čerstvé sladkosti, ročníková vína, panini, obložená prkénka a mnoho dalšího
                        pro váš nezapomenutelný zážitek v útulném prostředí.
                    </p>
                </div>

                <div ref={wrapRef} className="grid lg:grid-cols-2 gap-12">
                    {/* Info Cards */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: <MapPin className="w-6 h-6 text-primary" />,
                                title: "Adresa",
                                content: (
                                    <>
                                        Vodní
                                        <br />
                                        760 01 Zlín 1
                                        <br />
                                        Česká republika
                                    </>
                                ),
                                highlight: true,
                            },
                            {
                                icon: <Phone className="w-6 h-6 text-primary" />,
                                title: "Telefon",
                                content: "+420 723 663 254 nebo +420  777 661 706, ",
                            },
                            {
                                icon: <Mail className="w-6 h-6 text-primary" />,
                                title: "Email",
                                content: "monika.maruska@seznam.cz",
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-primary" />,
                                title: "Otevírací doba",
                                content: <OpeningHours variant="footer" />,
                            },
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className={`contact-card border-0 shadow-lg bg-card relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ${item.highlight ? "bg-gradient-to-r from-primary/10 to-pink-100/10" : ""
                                    }`}
                            >
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-medium text-lg mb-2 text-foreground">
                                            {item.title}
                                        </h3>
                                        <div className="text-muted-foreground  leading-relaxed">
                                            {item.content}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Link href="/kontakt" className="block mt-8">
                            <Button
                                size="lg"
                                className="w-full h-14 font-medium rounded-full bg-primary text-primary-foreground 
                  hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]
                  transition-all duration-300 ease-out"
                            >
                                Napište nám
                            </Button>
                        </Link>
                    </div>

                    <ContactMap />
                </div>
            </div>
        </section>
    )
}

export default ContactSection
