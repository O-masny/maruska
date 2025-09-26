'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const PageOverlay = () => {
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const start = () => setIsTransitioning(true)
        const end = () => setTimeout(() => setIsTransitioning(false), 400) // match duration

        window.addEventListener('inertia:start', start)
        window.addEventListener('inertia:finish', end)

        return () => {
            window.removeEventListener('inertia:start', start)
            window.removeEventListener('inertia:finish', end)
        }
    }, [])

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key="overlay"
                    className="fixed inset-0 z-[9999] bg-primary/90 origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
                    exit={{ scaleY: 0, originY: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
                />
            )}
        </AnimatePresence>
    )
}

export default PageOverlay
