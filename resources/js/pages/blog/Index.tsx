'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { destroyLenis, initLenis } from '@/lib/scrollFx'
import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { useEffect } from 'react'

export default function BlogIndex() {
    const { posts } = usePage().props as any
    const data = posts?.data ?? posts

    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />

                {/* HERO */}
                <section className="pt-36 pb-20 text-center bg-gradient-to-b from-background via-secondary/10 to-background">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="font-serif text-6xl md:text-7xl font-bold mb-4"
                    >
                        Kávový <span className="text-primary">žurnál</span>
                    </motion.h1>
                    <p className="text-subtitle max-w-2xl mx-auto">
                        Naše příběhy, recepty a novinky ze zákulisí kavárny.
                    </p>
                </section>

                {/* GRID */}
                <section className="pb-24 container-default grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((post: any, i: number) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <motion.img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>

                            <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{post.published_at}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-primary" />
                                        <span>{post.author?.name ?? 'U Marušky ☕'}</span>
                                    </div>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <Button
                                        variant="ghost"
                                        className="w-full group/btn text-primary hover:text-primary-foreground hover:bg-primary/10 transition-all duration-300"
                                    >
                                        Číst více
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </section>

                <Footer />
            </div>
        </PageTransition>
    )
}
