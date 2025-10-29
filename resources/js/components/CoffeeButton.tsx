'use client'

import clsx from 'clsx'
import { HTMLMotionProps, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface CoffeeButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'solid' | 'outline' | 'espresso'
    size?: 'sm' | 'md' | 'lg'
}

const CoffeeButton = ({
    variant = 'solid',
    size = 'md',
    className,
    children,
    ...props
}: CoffeeButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 200, damping: 15 })
    const springY = useSpring(y, { stiffness: 200, damping: 15 })

    const rotateX = useTransform(springY, [-20, 20], [8, -8])
    const rotateY = useTransform(springX, [-20, 20], [-8, 8])

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const offsetX = e.clientX - (rect.left + rect.width / 2)
        const offsetY = e.clientY - (rect.top + rect.height / 2)
        x.set(offsetX)
        y.set(offsetY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const base =
        'rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden will-change-transform'

    const sizes = {
        sm: 'px-5 py-2 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
    }

    const variants = {
        solid: `
      bg-gradient-to-r from-[hsl(10_60%_45%)] to-[hsl(10_55%_35%)]
      text-white shadow-md hover:shadow-lg
    `,
        outline: `
      border border-[hsl(10_60%_45%)/40] text-[hsl(10_60%_45%)]
      hover:bg-[hsl(10_60%_45%)/10] hover:border-[hsl(10_60%_45%)]
    `,
        espresso: `
      bg-[hsl(25_25%_20%)] text-[hsl(35_60%_90%)]
      hover:bg-[hsl(25_25%_25%)] shadow-[0_0_20px_hsl(10_60%_45%/0.3)]
    `,
    }

    return (
        <motion.button
            ref={ref}
            className={clsx(base, sizes[size], variants[variant], className)}
            style={{
                rotateX,
                rotateY,
                x: springX,
                y: springY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            {...props}
        >
            <motion.span
                style={{
                    x: useTransform(springX, (v) => v * 0.3),
                    y: useTransform(springY, (v) => v * 0.3),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="block"
            >
                {children}
            </motion.span>
        </motion.button>
    )
}

export default CoffeeButton
