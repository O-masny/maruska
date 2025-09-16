import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Supplier {
    id: number;
    name: string;
    description: string;
    image: string;
    specialty: string;
}

const SuppliersSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const suppliers: Supplier[] = [
        {
            id: 1,
            name: 'Pražírna Doubleshot',
            description: 'Specialista na single origin kávy z celého světa',
            image: '/api/placeholder/300/200',
            specialty: 'Prémiová káva'
        },
        {
            id: 2,
            name: 'Cukrárna Krásná',
            description: 'Ruční výroba dezertů podle tradičních receptů',
            image: '/api/placeholder/300/200',
            specialty: 'Sladkosti'
        },
        {
            id: 3,
            name: 'Mlékárna Český ráj',
            description: 'Čerstvé mléčné výrobky z vlastní farmy',
            image: '/api/placeholder/300/200',
            specialty: 'Mléčné výrobky'
        },
        {
            id: 4,
            name: 'Pekárna U Anděla',
            description: 'Čerstvé pečivo a croissanty každý den',
            image: '/api/placeholder/300/200',
            specialty: 'Pečivo'
        },
        {
            id: 5,
            name: 'Čajovna Himalaya',
            description: 'Exkluzivní čaje z nejvyšších poloh',
            image: '/api/placeholder/300/200',
            specialty: 'Čaje'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % suppliers.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [suppliers.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % suppliers.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + suppliers.length) % suppliers.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="py-20 bg-gradient-elegant">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Naši <span className="text-primary">Dodavatelé</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Spolupracujeme pouze s nejlepšími dodavateli, kteří sdílejí naše hodnoty kvality a tradice
                    </p>
                </div>

                <div className="relative">
                    {/* Slider Container */}
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {suppliers.map((supplier) => (
                                <div key={supplier.id} className="w-full flex-shrink-0">
                                    <div className="bg-card rounded-2xl shadow-luxury p-8 mx-4 hover-lift">
                                        <div className="flex flex-col lg:flex-row items-center gap-8">
                                            <div className="lg:w-1/2">
                                                <img
                                                    src={supplier.image}
                                                    alt={supplier.name}
                                                    className="w-full h-64 object-cover rounded-xl shadow-card"
                                                />
                                            </div>
                                            <div className="lg:w-1/2 text-center lg:text-left">
                                                <span className="inline-block px-3 py-1 bg-gradient-primary text-white text-sm font-medium rounded-full mb-4">
                                                    {supplier.specialty}
                                                </span>
                                                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                                                    {supplier.name}
                                                </h3>
                                                <p className="text-lg text-muted-foreground leading-relaxed">
                                                    {supplier.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-luxury rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-luxury rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {suppliers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'bg-primary w-8'
                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuppliersSlider;