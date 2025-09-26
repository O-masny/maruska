'use client'

import { usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const { url } = usePage()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={url}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                }}
                exit={{
                    opacity: 0,
                    filter: 'blur(8px)',
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                }}
                className="relative min-h-screen"
            >
                {/* Teplý barevný overlay při přechodu */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#5C4033]/20 via-[#C0A080]/10 to-transparent pointer-events-none z-[1]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, transition: { duration: 0.8 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                />
                <div className="relative z-10">{children}</div>
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition
