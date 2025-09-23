// resources/js/pages/section/hero_section.tsx
import cafeInterior from '@/assets/hero-cafe.png'
import { Button } from '@/components/ui/button'
import { parallax, reveal } from '@/lib/scrollFx'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
    const bgRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (bgRef.current) parallax(bgRef.current, { yPercent: 25, scrub: 0.6 })
        if (contentRef.current) reveal(contentRef.current, { y: 30, stagger: 0.1 })
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax background */}
            <div
                ref={bgRef}
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${cafeInterior})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                <h1 className="text-hero mb-6">Café Luna</h1>
                <p className="text-subtitle mb-12 max-w-2xl mx-auto">
                    Vychutnejte si dokonalou kávu a dezerty v moderní atmosféře naší kavárny
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button
                        onClick={() => scrollTo('contact')}
                        className="btn-primary relative overflow-hidden"
                    >
                        <span className="relative z-10">Rezervovat místo</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                    </Button>
                    <Button
                        onClick={() => scrollTo('about')}
                        variant="outline"
                        className="btn-outline"
                    >
                        Zjistit více
                    </Button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-white animate-bounce" />
                    <span className="absolute inset-0 rounded-full border border-white/30 animate-[pulse_2s_ease_infinite]" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection
