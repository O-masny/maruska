'use client'

import { usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const { url } = usePage()

    // Reset scroll po každém načtení nové stránky
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [url])

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={url}
                initial={{ opacity: 0, filter: 'blur(14px)', y: 10 }}
                animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                    },
                }}
                exit={{
                    opacity: 0,
                    filter: 'blur(8px)',
                    y: -10,
                    transition: {
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                    },
                }}
                className="relative min-h-screen overflow-hidden will-change-transform"
            >
                {/* jemný coffee overlay (pouze během animace) */}
                <motion.div
                    className="
            absolute inset-0 
            bg-[radial-gradient(circle_at_30%_20%,hsl(30_25%_80%/0.25),transparent_70%)]
            pointer-events-none z-[1]
          "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25, transition: { duration: 0.8 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                />

                {/* obsah stránky */}
                <div className="relative z-10">{children}</div>
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition
