// src/lib/scrollFx.ts
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** ---------- Typy & utils ---------- */
type RevealOpts = {
    y?: number
    duration?: number
    stagger?: number
    start?: string
    once?: boolean
}

type ParallaxOpts = {
    yPercent?: number
    start?: string
    end?: string
    scrub?: boolean | number
}

type Targets =
    | string
    | Element
    | NodeListOf<Element>
    | Element[]
    | Iterable<Element>

const toArray = (targets: Targets): HTMLElement[] => {
    if (typeof targets === 'string') {
        return Array.from(document.querySelectorAll<HTMLElement>(targets))
    }
    if (targets instanceof Element) return [targets as HTMLElement]
    // NodeList, Array, Iterable
    return Array.from(targets as Iterable<Element>) as HTMLElement[]
}

/** ---------- Lenis lifecycle ---------- */
let _lenis: Lenis | null = null
let _rafId: number | null = null

export function initLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
    // detekce touch / small devices
    const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const enableLenis = !isTouch && !isSmallScreen

    if (!enableLenis) {
        console.info('[Lenis] Disabled – using native scroll')
        ScrollTrigger.scrollerProxy(document.documentElement, {}) // čistý reset
        ScrollTrigger.refresh()
        return null
    }

    if (_lenis) return _lenis

    _lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        ...options,
    })

    const raf = (time: number) => {
        _lenis?.raf(time)
        _rafId = requestAnimationFrame(raf)
    }
    _rafId = requestAnimationFrame(raf)

    _lenis.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
            if (arguments.length) _lenis?.scrollTo(value as number, { immediate: true })
            return window.scrollY || window.pageYOffset
        },
    })

    ScrollTrigger.refresh()
    console.info('[Lenis] Enabled (desktop smooth scroll)')
    return _lenis
}



export function destroyLenis() {
    if (_rafId) cancelAnimationFrame(_rafId)
    _rafId = null
    _lenis?.destroy()
    _lenis = null
    ScrollTrigger.getAll().forEach((st) => st.kill())
}

/** ---------- Core efekty ---------- */
export function reveal(container: Element | string, opts: RevealOpts = {}) {
    const el = typeof container === "string" ? document.querySelector(container)! : container
    if (!el) return
    const { y = 40, duration = 0.8, stagger = 0.12, start = "top 85%" } = opts
    const targets = Array.from(el.children) as HTMLElement[]
    gsap.set(targets, { opacity: 0, y })

    gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play reverse play reverse", // místo once
        },
    })
}


export function parallax(target: Element | string, opts: ParallaxOpts = {}) {
    const el = typeof target === 'string' ? document.querySelector(target)! : target
    if (!el) return
    const { yPercent = 20, start = 'top bottom', end = 'bottom top', scrub = true } = opts
    gsap.fromTo(
        el,
        { yPercent: 0 },
        { yPercent, ease: 'none', scrollTrigger: { trigger: el, start, end, scrub } }
    )
}

export function pinSection(section: Element | string, opts?: Partial<ScrollTrigger.Vars>) {
    const el = typeof section === 'string' ? document.querySelector(section)! : section
    if (!el) return
    ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        ...opts,
    })
}

/** Jemný horizontální drift pro více prvků (např. cards) */
export function driftX(targets: Targets, amount = 30) {
    const nodes = toArray(targets)
    nodes.forEach((node, i) => {
        gsap.to(node, {
            x: (i % 2 === 0 ? 1 : -1) * amount,
            scrollTrigger: { trigger: node, start: 'top bottom', scrub: 0.5 },
            ease: 'none',
        })
    })
}

/** Skew dle rychlosti scrollu (živý „časopisový“ feeling) */
export function skewOnScroll(targets: Targets, maxSkew = 8) {
    const nodes = toArray(targets)
    let proxy = { skew: 0 }
    const clamp = gsap.utils.clamp(-maxSkew, maxSkew)

    nodes.forEach((el) => {
        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const skew = clamp(self.getVelocity() / -200)
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew
                    gsap.to(el, {
                        skewY: proxy.skew,
                        transformOrigin: 'center center',
                        ease: 'power3',
                        duration: 0.3,
                        overwrite: true,
                    })
                }
            },
        })
        st && ScrollTrigger.refresh()
        gsap.to(el, { skewY: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    })
}

/** Clip-path „záclona“ pro image reveal (nahoru/dolů) */
export function clipReveal(targets: Targets, direction: 'up' | 'down' = 'up') {
    const nodes = toArray(targets)
    nodes.forEach((el) => {
        gsap.set(el, {
            clipPath: direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        })
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: false,
            onEnter: () =>
                gsap.to(el, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1,
                    ease: 'power3.out',
                }),
        })
    })
}

/** Perspektivní parallax (Z-illusion) – jemný scale + y */
export function perspectiveParallax(targets: Targets, scaleFrom = 1.05, yTo = 20) {
    const nodes = toArray(targets)
    nodes.forEach((el) => {
        gsap.fromTo(
            el,
            { scale: scaleFrom, y: 0 },
            {
                scale: 1,
                y: yTo,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
        )
    })
}

/** Počítadlo čísla (např. statistiky) synchronizované se vstupem do view */
export function countUp(target: Element | string, to = 100, duration = 1) {
    const el = typeof target === 'string' ? document.querySelector(target)! : target
    if (!el) return
    const obj = { val: 0 }
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: false,
        onEnter: () => {
            gsap.to(obj, {
                val: to,
                duration,
                ease: 'power3.out',
                onUpdate: () => {
                    el.textContent = Math.floor(obj.val).toString()
                },
            })
        },
    })
}

/** Přepínání CSS proměnných (např. barevné téma) podle sekcí */
export function themeShift(sectionTargets: Targets, cssVar = '--bg-accent', values = ['#0b0b0b', '#151515']) {
    const nodes = toArray(sectionTargets)
    nodes.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 60%',
            onEnter: () => document.documentElement.style.setProperty(cssVar, values[i % values.length]),
        })
    })
}

/** Marquee, jehož rychlost se odvíjí od scrollu */
export function marqueeOnScroll(target: Element | string, baseSpeed = 30) {
    const el = typeof target === 'string' ? document.querySelector(target)! : target
    if (!el) return
    let last = ScrollTrigger.maxScroll(window)
    ScrollTrigger.create({
        start: 0,
        end: last,
        onUpdate: (self) => {
            const v = self.getVelocity()
            gsap.to(el, { x: `+=${(v / 1000) * baseSpeed}`, ease: 'none' })
        },
    })
}

/** Page progress bar */
export function pageProgress(barSelector: string) {
    const el = document.querySelector(barSelector) as HTMLElement | null
    if (!el) return
    const fill = el.querySelector('span') as HTMLElement | null
    if (!fill) return
    gsap.set(fill, { transformOrigin: '0 50%', scaleX: 0 })
    ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.to(fill, { scaleX: self.progress, overwrite: true }),
    })
}
