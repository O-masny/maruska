import { useEffect } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import { Baby, Bus, Car, Clock, CreditCard, Mail, MapPin, Phone, Train, Wifi } from 'lucide-react';

const Kontakt = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Adresa',
            details: ['Wenceslas Square 15', '110 00 Prague 1', 'Czech Republic']
        },
        {
            icon: Phone,
            title: 'Telefon',
            details: ['+420 222 333 444', '+420 777 888 999']
        },
        {
            icon: Mail,
            title: 'E-mail',
            details: ['info@cafeluxe.cz', 'reservations@cafeluxe.cz']
        },
        {
            icon: Clock,
            title: 'Otevírací doba',
            details: ['Po-Pá: 7:00 - 22:00', 'So-Ne: 8:00 - 23:00']
        }
    ];

    const amenities = [
        { icon: Wifi, text: 'Bezplatné WiFi' },
        { icon: CreditCard, text: 'Platby kartou' },
        { icon: Baby, text: 'Přívětivé k dětem' },
        { icon: Car, text: 'Parkování' },
    ];

    const transport = [
        { icon: Train, text: 'Metro A, B - Můstek (2 min)' },
        { icon: Bus, text: 'Autobus 14, 24 - Václavské náměstí' },
        { icon: Car, text: 'Parkování Palladium (5 min chůze)' },
    ];

    return (
        <div className="min-h-screen page-transition">
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary))_0%,transparent_50%),radial-gradient(circle_at_20%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-10" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="fade-in-up">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                                Kontakt
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Rádi se s vámi setkáme v našem luxusním prostředí v srdci Prahy
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info & Form Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Information */}
                        <div className="fade-in-left">
                            <h2 className="font-serif text-4xl font-bold mb-8">
                                Najděte <span className="text-primary">nás</span>
                            </h2>

                            <div className="space-y-8">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4 group">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow group-hover:shadow-luxury transition-all duration-300">
                                                <info.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                                            {info.details.map((detail, detailIndex) => (
                                                <p key={detailIndex} className="text-muted-foreground mb-1">{detail}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Amenities */}
                            <div className="mt-12">
                                <h3 className="font-serif text-2xl font-bold mb-6">Vybavení</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-muted-foreground">
                                            <amenity.icon className="h-5 w-5 text-primary" />
                                            <span className="text-sm">{amenity.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="fade-in-right">
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                                <h3 className="font-serif text-3xl font-bold mb-6">Napište nám</h3>

                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Jméno</Label>
                                            <Input id="firstName" placeholder="Vaše jméno" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Příjmení</Label>
                                            <Input id="lastName" placeholder="Vaše příjmení" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" placeholder="vas@email.cz" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefon</Label>
                                        <Input id="phone" type="tel" placeholder="+420 777 888 999" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Předmět</Label>
                                        <Input id="subject" placeholder="Předmět zprávy" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Zpráva</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Vaša zpráva..."
                                            rows={6}
                                        />
                                    </div>

                                    <Button className="w-full bg-gradient-primary hover:shadow-luxury font-semibold h-12">
                                        Odeslat zprávu
                                    </Button>

                                    {/* Privacy notice */}
                                    <p className="text-xs text-muted-foreground text-center">
                                        Odesláním zprávy potvrzujete, že vaše údaje (jméno, e-mail, text zprávy)
                                        budou použity pouze k vyřízení vaší žádosti.
                                        Více informací najdete v&nbsp;
                                        <a href="/privacy" className="underline hover:text-primary">
                                            zásadách ochrany osobních údajů
                                        </a>.
                                    </p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transport Section */}
            <section className="py-20 bg-gradient-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 fade-in-up">
                        <h2 className="font-serif text-4xl font-bold mb-6">
                            Jak se k nám <span className="text-primary">dostanete</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Nacházíme se v centru Prahy s výbornou dostupností všemi dopravními prostředky
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {transport.map((option, index) => (
                            <div
                                key={index}
                                className="fade-in-up bg-card border border-border rounded-xl p-6 text-center hover-scale group shadow-elegant hover:shadow-luxury transition-all duration-300"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-luxury transition-all duration-300">
                                    <option.icon className="h-8 w-8 text-white" />
                                </div>
                                <p className="font-medium">{option.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="fade-in-up">
                        <h2 className="font-serif text-4xl font-bold text-center mb-12">
                            Naše <span className="text-primary">poloha</span>
                        </h2>

                        <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-elegant">
                            {/* Placeholder for map - in real app you'd integrate Google Maps or similar */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                <div className="text-center">
                                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Wenceslas Square 15</h3>
                                    <p className="text-muted-foreground">110 00 Prague 1, Czech Republic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reservation CTA */}
            <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="fade-in-up">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Rezervujte si <span className="text-primary">stůl</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Zaručte si místo v našem luxusním prostředí a nechte se překvapit našimi specialitami
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-primary hover:shadow-luxury text-lg px-8 py-4 h-auto font-semibold">
                                Online rezervace
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto font-semibold">
                                Zavolejte nám
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Kontakt;