import heroImage from '@/assets/hero-cafe.png';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Cake, Coffee, Play, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        { icon: Coffee, text: 'Prémiová káva' },
        { icon: Cake, text: 'Čerstvé sladkosti' },
        { icon: Award, text: 'Oceněné výrobky' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 z-0"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
                <img
                    src={heroImage}
                    alt="Luxusní interiér kavárny U Marušky"
                    className="w-full h-[120vh] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-hero" />
            </div>

            {/* Content - Enhanced Layout */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

                    {/* Left Content */}
                    <div className="fade-in-up in-view">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
                                ✨ Luxusní zážitek od roku 2018
                            </span>
                        </div>

                        <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                            U<br />
                            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                                Marušky
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-lg leading-relaxed">
                            Zažijte nezapomenutelné chvíle v našem luxusním prostředí s nejkvalitnější kávou
                            a ručně vyráběnými sladkostmi
                        </p>

                        {/* CTA Buttons - Modern layout */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button
                                size="lg"
                                className="bg-gradient-primary hover:shadow-luxury text-lg px-10 py-6 h-auto font-semibold rounded-full group"
                            >
                                Prohlédnout menu
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-10 py-6 h-auto font-semibold rounded-full group"
                            >
                                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                Virtuální prohlídka
                            </Button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-4 text-white/80">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                                ))}
                            </div>
                            <div className="h-4 w-px bg-white/30" />
                            <span className="text-lg font-medium">4.9 • 500+ recenzí</span>
                        </div>
                    </div>

                    {/* Right Content - Features Grid */}
                    <div className="fade-in-up in-view lg:justify-self-end">
                        <div className="grid grid-cols-1 gap-6 max-w-md">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover-scale"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-luxury transition-all duration-300">
                                            <feature.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl font-bold text-white mb-1">{feature.text}</h3>
                                            <p className="text-white/70 text-sm">Každý den čerstvé a kvalitní</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Special offer card */}
                            <div className="bg-gradient-primary rounded-2xl p-6 shadow-luxury">
                                <h3 className="font-serif text-xl font-bold text-white mb-2">Speciální nabídka</h3>
                                <p className="text-white/90 text-sm mb-4">Při první návštěvě získáte 20% slevu na celý účet</p>
                                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm font-medium">
                                    Využít nabídku
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;