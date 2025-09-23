import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { clipReveal, driftX, reveal } from "@/lib/scrollFx"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useRef } from "react"

const ContactSection = () => {
    const wrapRef = useRef<HTMLDivElement>(null)

    const handleReservation = () => {
        alert("Rezervační systém bude brzy k dispozici!")
    }

    useEffect(() => {
        if (!wrapRef.current) return
        reveal(wrapRef.current, { y: 28, stagger: 0.15 })
        clipReveal(wrapRef.current.querySelectorAll(".contact-card"), "up")
        driftX(wrapRef.current.querySelectorAll(".contact-card"), 12)
    }, [])

    return (
        <section id="contact" className="section-padding bg-gradient-to-b from-secondary/30 to-background relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-6 text-foreground">Kontakt</h2>
                    <p className="text-subtitle max-w-2xl mx-auto">
                        Navštivte nás nebo se ozvěte. Těšíme se na vás!
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
                                        Náměstí Míru 123 <br />
                                        120 00 Praha 2 <br />
                                        Česká republika
                                    </>
                                ),
                                highlight: true,
                            },
                            {
                                icon: <Phone className="w-6 h-6 text-primary" />,
                                title: "Telefon",
                                content: "+420 777 123 456",
                            },
                            {
                                icon: <Mail className="w-6 h-6 text-primary" />,
                                title: "Email",
                                content: "info@cafeluna.cz",
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-primary" />,
                                title: "Otevírací doba",
                                content: (
                                    <div className="space-y-1">
                                        <p>Pondělí - Pátek: 7:00 - 20:00</p>
                                        <p>Sobota - Neděle: 8:00 - 21:00</p>
                                    </div>
                                ),
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
                                        <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            onClick={handleReservation}
                            size="lg"
                            className="w-full relative bg-gradient-primary hover:shadow-luxury font-medium py-4 rounded-full transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">Rezervovat stůl</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                        </Button>
                    </div>

                    {/* Map */}
                    <div className="contact-card">
                        <Card className="border-0 shadow-lg overflow-hidden bg-card">
                            <CardContent className="p-0">
                                <div className="aspect-square lg:aspect-auto lg:h-[600px] bg-muted relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                                            <p className="text-muted-foreground font-medium">Interaktivní mapa</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Náměstí Míru 123, Praha 2
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
