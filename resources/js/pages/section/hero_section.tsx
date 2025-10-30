"use client"

import cafeInterior from '@/assets/bg.jpg'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // --- Desktop only parallax ---
    const { scrollYProgress } = useScroll({
        target: !isMobile ? ref : undefined,
        offset: ['start start', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section 
            id="hero"
            ref={ref}
            className="
        relative min-h-screen flex items-center justify-center
        md:overflow-hidden
      "
        >
            {/* Background */}
            {isMobile ? (
                <div
                    className="
            absolute inset-0 bg-cover bg-center
            pointer-events-none
            "
                    style={{ backgroundImage: `url(${cafeInterior})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
            ) : (
                <motion.div
                    style={{ y, backgroundImage: `url(${cafeInterior})` }}
                    className="
            absolute inset-0 bg-cover bg-center 
            will-change-transform pointer-events-none
          "
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </motion.div>
            )}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
            >
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight mb-6">
                    U <span className="text-primary">Marušky</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                    Vychutnejte si kávu, dezerty nebo v příjemné atmosféře naší kavárny
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

            {/* Logo blur */}
            {!isMobile && (
                <motion.img
                    src="/favicon.svg"
                    alt="blurred logo"
                    style={{ y }}
                    animate={{ opacity: [0.25, 0.4, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]
            w-[70vw] max-w-[600px]
            opacity-30 blur-xl
            drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]
            pointer-events-none select-none
          "
                />
            )}

            {/* Scroll indicator */}
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
