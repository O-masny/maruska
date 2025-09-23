// resources/js/components/SuppliersSlide.tsx
import { driftX, perspectiveParallax, reveal } from '@/lib/scrollFx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Supplier {
    id: number
    name: string
    description: string
    image: string
    specialty: string
}

const SuppliersSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const wrapRef = useRef<HTMLDivElement>(null)

    const suppliers: Supplier[] = [
        { id: 1, name: 'Pražírna Doubleshot', description: 'Specialista na single origin kávy z celého světa', image: '/api/placeholder/300/200', specialty: 'Prémiová káva' },
        { id: 2, name: 'Cukrárna Krásná', description: 'Ruční výroba dezertů podle tradičních receptů', image: '/api/placeholder/300/200', specialty: 'Sladkosti' },
        { id: 3, name: 'Mlékárna Český ráj', description: 'Čerstvé mléčné výrobky z vlastní farmy', image: '/api/placeholder/300/200', specialty: 'Mléčné výrobky' },
        { id: 4, name: 'Pekárna U Anděla', description: 'Čerstvé pečivo a croissanty každý den', image: '/api/placeholder/300/200', specialty: 'Pečivo' },
        { id: 5, name: 'Čajovna Himalaya', description: 'Exkluzivní čaje z nejvyšších poloh', image: '/api/placeholder/300/200', specialty: 'Čaje' },
    ]

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % suppliers.length), 4000)
        return () => clearInterval(timer)
    }, [suppliers.length])

    useEffect(() => {
        if (!wrapRef.current) return
        reveal(wrapRef.current, { y: 26, stagger: 0.1 })
        driftX(wrapRef.current.querySelectorAll('.supplier-card'), 14)
        perspectiveParallax(wrapRef.current.querySelectorAll('.supplier-card img'), 1.06, 18)
    }, [])

    const next = () => setCurrentSlide((p) => (p + 1) % suppliers.length)
    const prev = () => setCurrentSlide((p) => (p - 1 + suppliers.length) % suppliers.length)
    const goTo = (i: number) => setCurrentSlide(i)

    return (
        <section className="section-padding bg-gradient-elegant">
            <div className="container-default">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-4 text-foreground">
                        Naši <span className="text-primary">Dodavatelé</span>
                    </h2>
                    <p className="text-subtitle max-w-3xl mx-auto">
                        Spolupracujeme pouze s nejlepšími dodavateli, kteří sdílejí naše hodnoty kvality a tradice
                    </p>
                </div>

                <div className="relative" ref={wrapRef}>
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {suppliers.map((s) => (
                                <div key={s.id} className="w-full flex-shrink-0">
                                    <div className="supplier-card bg-card rounded-2xl shadow-luxury p-8 mx-4">
                                        <div className="flex flex-col lg:flex-row items-center gap-8">
                                            <div className="lg:w-1/2">
                                                <img src={s.image} alt={s.name} className="w-full h-64 object-cover rounded-xl shadow-elegant" />
                                            </div>
                                            <div className="lg:w-1/2 text-center lg:text-left">
                                                <span className="inline-block px-3 py-1 bg-gradient-primary text-white text-sm font-medium rounded-full mb-4">
                                                    {s.specialty}
                                                </span>
                                                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">{s.name}</h3>
                                                <p className="text-lg text-muted-foreground leading-relaxed">{s.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-luxury rounded-full p-3 transition-transform hover:scale-110" aria-label="Předchozí">
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>
                    <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-luxury rounded-full p-3 transition-transform hover:scale-110" aria-label="Další">
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </button>

                    <div className="flex justify-center mt-8 space-x-2">
                        {suppliers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'}`}
                                aria-label={`Jít na slid ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SuppliersSlider
