'use client'

import { reveal } from '@/lib/scrollFx'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Supplier {
    id: number
    name: string
    specialty: string
    image: string
}

interface SuppliersSliderProps {
    suppliers: Supplier[]
}

const SuppliersSlider = ({ suppliers }: SuppliersSliderProps) => {
    const wrapRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (wrapRef.current) reveal(wrapRef.current, { y: 20, stagger: 0.1 })
    }, [])

    if (!suppliers?.length) return null

    // Infinite scroll — duplikujeme array
    const duplicated = [...suppliers, ...suppliers]

    return (
        <section id="suppliers"
            className="section-padding py-12 bg-background overflow-hidden"
            ref={wrapRef}
        >
            <div className="container-default text-center mb-12">
                <h2 className="text-section-title mb-4 text-foreground">
                    Naši <span className="text-primary">dodavatelé</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Spolupracujeme s lokálními partnery, kteří sdílí naši vášeň pro kvalitu
                </p>
            </div>

            <div
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{ x: isPaused ? 0 : ['0%', '-50%'] }}
                    transition={{
                        duration: 25,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {duplicated.map((s, i) => (
                        <div
                            key={`${s.id}-${i}`}
                            className="group relative flex-shrink-0 w-40 md:w-48"
                        >
                            <img
                                src={s.image}
                                alt={s.name}
                                className="w-full h-24 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent text-white text-xs p-2 rounded-lg">
                                <span className="font-medium">{s.name}</span>
                                <span className="text-white/80">{s.specialty}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default SuppliersSlider
