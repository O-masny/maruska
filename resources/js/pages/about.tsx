import { useEffect } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Award, Clock, Coffee, Heart, Star, Users } from 'lucide-react';

const ONas = () => {
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

    const values = [
        {
            icon: Coffee,
            title: 'Kvalita',
            description: 'Pouze nejlepší káva z etických zdrojů, pražená s láskou a precizností'
        },
        {
            icon: Heart,
            title: 'Láska k řemeslu',
            description: 'Každý šálek kávy a každá sladkost jsou vytvořeny s vášní a pozorností k detailu'
        },
        {
            icon: Users,
            title: 'Komunita',
            description: 'Vytváříme prostor, kde se lidé setkávají, odpočívají a užívají si chvíle pohody'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Neustále se zdokonalujeme a hledáme nové způsoby, jak překonat očekávání'
        }
    ];

    const team = [
        {
            name: 'Marie Novakova',
            role: 'Hlavní Barista & Zakladatelka',
            image: '/placeholder.svg',
            description: 'S 15 lety zkušeností v kávové branži přináší U Marušky jedinečnou vizi luxusní kavárny.'
        },
        {
            name: 'Jan Svoboda',
            role: 'Šéfcukrář',
            image: '/placeholder.svg',
            description: 'Mistr francouzské cukrářské školy, který vytváří naše jedinečné dezerty a sladkosti.'
        },
        {
            name: 'Anna Kratka',
            role: 'Sommelier kávy',
            image: '/placeholder.svg',
            description: 'Certifikovaná expertka na kávu, která vybírá pouze ty nejlepší zrna z celého světa.'
        }
    ];

    return (
        <div className="min-h-screen page-transition">
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-10" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="fade-in-up">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                                O nás
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Naše příběh začal láskou ke káve a vášní pro vytváření nezapomenutelných zážitků
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-gradient-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="fade-in-left">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                                Náš <span className="text-primary">příběh</span>
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    U Marušky vzniklo z vize vytvořit prostor, kde se setkává luxus s autenticitou.
                                    Naše cesta začala v roce 2018, kdy jsme si uvědomili, že Praha potřebuje místo,
                                    které kombinuje nejlepší tradice evropské kavárny s moderním pojetím služeb.
                                </p>
                                <p>
                                    Každý den pracujeme s vášní a precizností, abychom vám přinesli nezapomenutelný
                                    zážitek. Od výběru nejlepších kávových zrn až po přípravu ručně vyráběných
                                    sladkostí - vše děláme s láskou k řemeslu.
                                </p>
                                <p>
                                    Naše mise je jednoduchá: vytvářet momenty radosti prostřednictvím výjimečné
                                    kávy a nezapomenutelné atmosféry.
                                </p>
                            </div>
                        </div>

                        <div className="fade-in-right">
                            <div className="relative">
                                <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-elegant">
                                    <img
                                        src="/placeholder.svg"
                                        alt="Interiér U Marušky"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-6 shadow-luxury max-w-xs">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span className="font-semibold">Otevřeno denně</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        7:00 - 22:00<br />
                                        Víkendy: 8:00 - 23:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 fade-in-up">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Naše <span className="text-primary">hodnoty</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Principy, které nás vedou každý den při vytváření výjimečných zážitků
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="fade-in-up text-center group hover-scale"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow group-hover:shadow-luxury transition-all duration-300">
                                        <value.icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 fade-in-up">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Náš <span className="text-primary">tým</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Poznávejte lidi, kteří každý den vytvářejí kouzlo U Marušky
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="fade-in-up group"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-luxury transition-all duration-300 hover-scale">
                                    <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-6">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-primary font-medium mb-4">{member.role}</p>
                                    <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 fade-in-up">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Naše <span className="text-primary">ocenění</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="fade-in-up text-center group">
                            <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                                <Award className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Nejlepší kavárna roku 2023</h3>
                            <p className="text-muted-foreground">Prague Coffee Awards</p>
                        </div>

                        <div className="fade-in-up text-center group" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                                <Star className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">5 hvězd na TripAdvisor</h3>
                            <p className="text-muted-foreground">500+ spokojených zákazníků</p>
                        </div>

                        <div className="fade-in-up text-center group" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                                <Coffee className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Certifikát kvality</h3>
                            <p className="text-muted-foreground">Specialty Coffee Association</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="fade-in-up">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Připojte se k naší <span className="text-primary">komunitě</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Zažijte atmosféru U Marušky a staňte se součástí našeho příběhu
                        </p>
                        <Button size="lg" className="bg-gradient-primary hover:shadow-luxury text-lg px-8 py-4 h-auto font-semibold">
                            Navštivte nás
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ONas;