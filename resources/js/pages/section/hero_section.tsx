'use client' // Modern React directive: komponenta renderuje pouze na klientu

import cafeInterior from '@/assets/hero-cafe.png'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with cinematic mask and parallax */}
            <motion.div
                style={{ y, backgroundImage: `url(${cafeInterior})` }}
                className="absolute inset-0 bg-cover bg-center will-change-transform"
            >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                {/* Mask layer — subtle radial fade at edges */}
                <div
                    className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 
                     before:bg-black/30 before:backdrop-blur-sm 
                     before:[mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_40%,transparent_100%)] 
                     before:[-webkit-mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_40%,transparent_100%)]"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
            >
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight mb-6">
                    U Marušky
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                    Vychutnejte si dokonalou kávu a dezerty v moderní atmosféře naší kavárny
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button
                        onClick={() => scrollTo('contact')}
                        className="relative overflow-hidden bg-white text-black font-medium hover:scale-105 transition-transform"
                    >
                        <span className="relative z-10">Rezervovat místo</span>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </Button>

                    <Button
                        onClick={() => scrollTo('about')}
                        variant="outline"
                        className="text-white border-white/60 hover:bg-white/10 transition"
                    >
                        Zjistit více
                    </Button>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-6 h-6 text-white opacity-70" />
            </motion.div>
        </section>
    )
}

export default HeroSection
