import { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: number;
    category: string;
    image: string;
    featured: boolean;
}

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Vše');

    const blogPosts: BlogPost[] = [
        {
            id: 1,
            title: 'Umění přípravy dokonalé kávy',
            excerpt: 'Objevte tajemství perfektního espresa a naučte se připravit kávu jako skutečný barista.',
            content: 'Plný obsah článku o přípravě kávy...',
            author: 'Martin Novák',
            date: '2024-01-15',
            readTime: 5,
            category: 'Káva',
            image: '/api/placeholder/600/400',
            featured: true
        },
        {
            id: 2,
            title: 'Historie cukrářského řemesla',
            excerpt: 'Putování časem od starověkých sladkostí až po moderní dezerty.',
            content: 'Plný obsah článku o historii cukrářství...',
            author: 'Jana Svobodová',
            date: '2024-01-12',
            readTime: 7,
            category: 'Cukrářství',
            image: '/api/placeholder/600/400',
            featured: false
        },
        {
            id: 3,
            title: 'Sezonní ingredience v zimní nabídce',
            excerpt: 'Jak využíváme zimní plody a koření v našich speciálních nápojích.',
            content: 'Plný obsah článku o sezonních ingrediencích...',
            author: 'Petr Krejčí',
            date: '2024-01-10',
            readTime: 4,
            category: 'Sezónní',
            image: '/api/placeholder/600/400',
            featured: false
        },
        {
            id: 4,
            title: 'Zdravé alternativy k tradičním dezertům',
            excerpt: 'Představujeme naši novou řadu zdravých sladkostí bez kompromisů v chuti.',
            content: 'Plný obsah článku o zdravých dezrtech...',
            author: 'Lucie Dvořáková',
            date: '2024-01-08',
            readTime: 6,
            category: 'Zdraví',
            image: '/api/placeholder/600/400',
            featured: true
        }
    ];

    const categories = ['Vše', 'Káva', 'Cukrářství', 'Sezónní', 'Zdraví'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Vše' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
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

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-elegant">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center fade-in-up">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Náš <span className="text-primary">Blog</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Objevte svět kávy, cukrářství a gastronomie prostřednictvím našich odborných článků a tipů
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Hledat články..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category)}
                                    className={selectedCategory === category ? "bg-gradient-primary" : ""}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="pb-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <article
                                key={post.id}
                                className={`fade-in-up hover-lift ${post.featured && index < 2 ? 'lg:col-span-2' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
                                    <div className="relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className={`w-full object-cover ${post.featured && index < 2 ? 'h-80' : 'h-48'
                                                }`}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h2 className={`font-serif font-bold text-foreground mb-3 ${post.featured && index < 2 ? 'text-2xl' : 'text-xl'
                                            }`}>
                                            {post.title}
                                        </h2>

                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <User className="h-4 w-4" />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(post.date).toLocaleDateString('cs-CZ')}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{post.readTime} min</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 group"
                                        >
                                            Číst více
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;