'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { useEffect } from 'react'

interface BlogPost {
    title: string
    slug: string
    excerpt: string
    content: string
    cover_image: string
    published_at: string
    author: { name: string }
}

const BlogShow = () => {
    const { post } = usePage().props as unknown as { post: { data: BlogPost } }
    const data = post.data
    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])
    return (
        <PageTransition>
            <Navigation />

            {/* HERO */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative pt-32 pb-40 overflow-hidden"
            >
                {/* Background image */}
                <motion.img
                    src={data.cover_image}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    initial={{ scale: 1.15, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background/90" />

                {/* Content */}
                <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        {data.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
                    >
                        {data.excerpt}
                    </motion.p>

                    {/* Meta bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-sm text-white/80"
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

            {/* ARTICLE BODY */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
                className="py-20 bg-background"
            >
                <div className="max-w-3xl mx-auto px-6 prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>

                <div className="max-w-3xl mx-auto px-6 mt-16 flex justify-between">
                    <Link href="/blog">
                        <Button variant="outline" className="hover:bg-primary/10 transition-all">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zpět na blog
                        </Button>
                    </Link>
                </div>
            </motion.section>

            <Footer />
        </PageTransition>
    )
}

export default BlogShow
