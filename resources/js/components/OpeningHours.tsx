'use client'

import { usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

type OpeningHoursArrayItem = {
    day: string
    open: string | null
    close: string | null
    closed?: boolean
}

type OpeningHoursData =
    | Record<string, string>
    | Record<string, { open: string | null; close: string | null; closed?: boolean }>
    | OpeningHoursArrayItem[]

interface OpeningHoursProps {
    variant?: 'footer' | 'contact' | 'animated'
    className?: string
}

export const OpeningHours = ({ variant = 'footer', className = '' }: OpeningHoursProps) => {
    const { props } = usePage<{ settings?: { opening_hours?: OpeningHoursData } }>()
    const hours = props?.settings?.opening_hours

    const localizedHours = useMemo(() => {
        if (!hours) return null

        if (Array.isArray(hours)) {
            return hours.map((item) => {
                const closed = item.closed || (!item.open && !item.close)
                const open = item.open ? item.open.slice(0, 5) : null
                const close = item.close ? item.close.slice(0, 5) : null
                const value = closed ? 'Zavřeno' : open && close ? `${open} – ${close}` : 'Zavřeno'
                return { label: item.day, value, closed }
            })
        }

        return Object.entries(hours).map(([day, value]) => {
            if (typeof value === 'object' && value !== null) {
                const closed = value.closed || (!value.open && !value.close)
                const open = value.open?.slice(0, 5)
                const close = value.close?.slice(0, 5)
                const val = closed ? 'Zavřeno' : open && close ? `${open} – ${close}` : 'Zavřeno'
                return { label: day, value: val, closed }
            }
            return { label: day, value: String(value), closed: false }
        })
    }, [hours])

    if (!localizedHours) return null

    const base = `w-full text-sm leading-relaxed ${className}`

    // 🧱 FOOTER VARIANTA
    if (variant === 'footer') {
        return (
            <ul className={`${base} space-y-1`}>
                {localizedHours.map(({ label, value, closed }, i) => (
                    <li
                        key={i}
                        className={`flex  justify-between ${closed ? 'text-muted-foreground/70 italic' : 'text-muted-foreground'
                            }`}
                    >
                        <span >{label}</span>
                        <span className={closed ? 'font-normal px-3 ' : 'font-medium px-3'}>{value}</span>
                    </li>
                ))}
            </ul>
        )
    }

    // 📞 CONTACT VARIANTA
    if (variant === 'contact') {
        return (
            <div className={`${base} bg-muted/5 rounded-xl p-4 border border-border/20`}>
                {localizedHours.map(({ label, value, closed }, i) => (
                    <div
                        key={i}
                        className={`flex justify-between py-1.5 ${closed ? 'text-muted-foreground/70 italic' : 'text-foreground/90'
                            }`}
                    >
                        <span>{label}</span>
                        <span
                            className={`${closed ? 'font-normal' : 'text-primary font-semibold tracking-tight'
                                }`}
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        )
    }

    // 🌈 ANIMOVANÁ VARIANTA
    if (variant === 'animated') {
        return (
            <motion.ul
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`${base} rounded-3xl border border-border/20 backdrop-blur-md bg-background/70 shadow-inner p-5 space-y-2`}
            >
                {localizedHours.map(({ label, value, closed }, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        className={`flex justify-between py-1 font-medium ${closed ? 'text-muted-foreground/70 italic' : 'text-foreground/90'
                            }`}
                    >
                        <span>{label}</span>
                        <motion.span
                            className={closed ? '' : 'text-primary'}
                            animate={closed ? {} : { opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            {value}
                        </motion.span>
                    </motion.li>
                ))}
            </motion.ul>
        )
    }

    return null
}
