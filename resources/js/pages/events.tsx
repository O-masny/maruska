import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    registered: number;
    price: number;
    category: string;
    featured: boolean;
    image: string;
}

const Akce = () => {
    const [selectedCategory, setSelectedCategory] = useState('Vše');
    const [selectedMonth, setSelectedMonth] = useState('Vše');

    const events: Event[] = [
        {
            id: 1,
            title: 'Kurz baristických dovedností',
            description: 'Naučte se připravit profesionální kávu s našimi experty. Zahrnuje teorii i praktické cvičení.',
            date: '2024-02-15',
            time: '14:00',
            location: 'Café Luxe - hlavní sál',
            capacity: 12,
            registered: 8,
            price: 1200,
            category: 'Kurzy',
            featured: true,
            image: '/api/placeholder/600/400'
        },
        {
            id: 2,
            title: 'Degustace prémiových čajů',
            description: 'Ochutnejte výběr nejlepších čajů z celého světa v doprovodu odborného výkladu.',
            date: '2024-02-20',
            time: '16:30',
            location: 'Café Luxe - salónek',
            capacity: 16,
            registered: 12,
            price: 800,
            category: 'Degustace',
            featured: false,
            image: '/api/placeholder/600/400'
        },
        {
            id: 3,
            title: 'Večer s live music',
            description: 'Užijte si večer plný skvělé hudby v podání místních umělců při skleničce vína.',
            date: '2024-02-25',
            time: '19:00',
            location: 'Café Luxe - celý prostor',
            capacity: 50,
            registered: 35,
            price: 0,
            category: 'Kultura',
            featured: true,
            image: '/api/placeholder/600/400'
        },
        {
            id: 4,
            title: 'Workshop výroby dezertů',
            description: 'Vytvořte si vlastní luxusní dezert pod vedením našeho šéfcukráře.',
            date: '2024-03-05',
            time: '10:00',
            location: 'Café Luxe - kuchyně',
            capacity: 8,
            registered: 3,
            price: 1500,
            category: 'Workshop',
            featured: false,
            image: '/api/placeholder/600/400'
        }
    ];

    const categories = ['Vše', 'Kurzy', 'Degustace', 'Kultura', 'Workshop'];
    const months = ['Vše', 'Únor', 'Březen', 'Duben'];

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'Vše' || event.category === selectedCategory;
        const eventMonth = new Date(event.date).getMonth() + 1;
        const matchesMonth = selectedMonth === 'Vše' ||
            (selectedMonth === 'Únor' && eventMonth === 2) ||
            (selectedMonth === 'Březen' && eventMonth === 3) ||
            (selectedMonth === 'Duben' && eventMonth === 4);

        return matchesCategory && matchesMonth;
    });

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

        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const getAvailabilityColor = (registered: number, capacity: number) => {
        const percentage = (registered / capacity) * 100;
        if (percentage >= 90) return 'text-destructive';
        if (percentage >= 70) return 'text-orange-500';
        return 'text-green-600';
    };

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-elegant">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center fade-in-up">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Naše <span className="text-primary">Akce</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Připojte se k našim exkluzivním akcím, kurzům a degustacím pro nezapomenutelné zážitky
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Filter className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium text-foreground">Filtrovat:</span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Kategorie:</span>
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category)}
                                        className={selectedCategory === category ? "bg-gradient-primary" : ""}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>

                            {/* Month Filter */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Měsíc:</span>
                                {months.map((month) => (
                                    <Button
                                        key={month}
                                        variant={selectedMonth === month ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedMonth(month)}
                                        className={selectedMonth === month ? "bg-gradient-primary" : ""}
                                    >
                                        {month}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="pb-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event, index) => (
                            <div
                                key={event.id}
                                className={`fade-in-up hover-lift ${event.featured ? 'md:col-span-2 lg:col-span-2' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border h-full">
                                    <div className="relative">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className={`w-full object-cover ${event.featured ? 'h-64' : 'h-48'
                                                }`}
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className="bg-gradient-primary text-white">
                                                {event.category}
                                            </Badge>
                                            {event.featured && (
                                                <Badge variant="secondary" className="bg-gradient-gold text-foreground">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Doporučeno
                                                </Badge>
                                            )}
                                        </div>
                                        {event.price === 0 && (
                                            <div className="absolute top-4 right-4">
                                                <Badge className="bg-green-600 text-white">
                                                    Zdarma
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col h-full">
                                        <h3 className={`font-serif font-bold text-foreground mb-3 ${event.featured ? 'text-2xl' : 'text-xl'
                                            }`}>
                                            {event.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                                            {event.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span>{new Date(event.date).toLocaleDateString('cs-CZ')}</span>
                                                <Clock className="h-4 w-4 text-primary ml-4" />
                                                <span>{event.time}</span>
                                            </div>

                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <span>{event.location}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <Users className="h-4 w-4 text-primary" />
                                                    <span className={getAvailabilityColor(event.registered, event.capacity)}>
                                                        {event.registered}/{event.capacity} účastníků
                                                    </span>
                                                </div>

                                                {event.price > 0 && (
                                                    <span className="font-semibold text-primary text-lg">
                                                        {event.price} Kč
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-primary hover:shadow-luxury"
                                            disabled={event.registered >= event.capacity}
                                        >
                                            {event.registered >= event.capacity ? 'Obsazeno' : 'Rezervovat místo'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Akce;