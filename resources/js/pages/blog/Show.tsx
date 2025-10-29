'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { Link, usePage } from '@inertiajs/react'
import {
    AnimatePresence,
    motion
} from 'framer-motion'
import {
    ArrowLeft,
    Calendar,
    ChevronLeft,
    ChevronRight,
    User,
    X
} from 'lucide-react'
import {
    useCallback,
    useEffect,
    useState
} from 'react'

interface BlogPost {
    title: string
    slug: string
    excerpt: string
    content: string
    cover_image: string
    published_at: string
    images?: string[]
    author: { name: string }
}

const BlogShow = () => {
    const { post } = usePage().props as unknown as { post: { data: BlogPost } }
    const data = post.data

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const handleClose = useCallback(() => setLightboxIndex(null), [])
    const handleNext = useCallback(() => {
        if (data.images && lightboxIndex !== null)
            setLightboxIndex((lightboxIndex + 1) % data.images.length)
    }, [lightboxIndex, data.images])

    const handlePrev = useCallback(() => {
        if (data.images && lightboxIndex !== null)
            setLightboxIndex((lightboxIndex - 1 + data.images.length) % data.images.length)
    }, [lightboxIndex, data.images])

    // ESC & šipky
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
            if (e.key === 'ArrowRight') handleNext()
            if (e.key === 'ArrowLeft') handlePrev()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [handleClose, handleNext, handlePrev])

    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <Navigation />

                {/* HERO */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative pt-32 pb-36 overflow-hidden"
                >
                    {/* Background */}
                    <motion.img
                        src={data.cover_image}
                        alt={data.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                        initial={{ scale: 1.15, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    {/* Espresso gradient overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.55)_0%,hsl(var(--background)/0.95)_100%)]" />

                    {/* Text content */}
                    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="font-serif text-5xl md:text-6xl font-bold mb-4 leading-tight"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
                        >
                            {data.excerpt}
                        </motion.p>

                        {/* Meta info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/40 backdrop-blur-md border border-border/40 text-sm text-white/90 shadow-sm"
                        >
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" /> {data.author?.name}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                {new Date(data.published_at).toLocaleDateString('cs-CZ')}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* CONTENT */}
                <section className="py-24 bg-background">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground max-w-none"
                            style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: data.content }} />
                        </motion.article>

                        {/* Fotogalerie */}
                        {data.images?.length ? (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                viewport={{ once: true }}
                                className="mt-24"
                            >
                                <h3 className="font-serif text-3xl font-bold mb-10 text-center text-foreground">
                                    Fotogalerie
                                </h3>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {data.images.map((src, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            className="overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-elegant transition-all duration-500"
                                        >
                                            <img
                                                src={src}
                                                alt={`${data.title} – obrázek ${i + 1}`}
                                                onClick={() => setLightboxIndex(i)}
                                                className="w-full h-64 object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        ) : null}

                        {/* CTA Back */}
                        <div className="mt-20 flex justify-center">
                            <Link href="/blog">
                                <Button variant="outline" className="hover:bg-primary/10">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Zpět na blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 🪞 Lightbox Viewer */}
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <motion.div
                            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                        >
                            {/* Obrázek */}
                            <motion.img
                                key={lightboxIndex}
                                src={data.images![lightboxIndex]}
                                alt="detail obrázku"
                                className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-luxury object-contain"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Zavírací tlačítko */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Šipky */}
                            {data.images!.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handlePrev()
                                        }}
                                        className="absolute left-6 text-white/80 hover:text-white transition"
                                    >
                                        <ChevronLeft className="h-10 w-10" />
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleNext()
                                        }}
                                        className="absolute right-6 text-white/80 hover:text-white transition"
                                    >
                                        <ChevronRight className="h-10 w-10" />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default BlogShow
