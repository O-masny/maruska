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
    const data = posts?.data ?? posts // fallback pro obě varianty
    useEffect(() => {
        initLenis()
        return () => destroyLenis()
    }, [])
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#14100E] text-stone-200">
                <Navigation />

                {/* HERO */}
                <section className="pt-36 pb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="font-serif text-6xl md:text-7xl font-bold mb-4"
                    >
                        Kávový <span className="text-amber-500">žurnál</span>
                    </motion.h1>
                    <p className="text-muted-foreground text-lg">
                        Naše příběhy, recepty a novinky ze zákulisí kavárny.
                    </p>
                </section>

                {/* GRID */}
                <section className="pb-24 max-w-7xl mx-auto px-6 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((post: any, i: number) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-[#1C1816]/90 border border-[#2C2623] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
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
                                    <h2 className="font-serif text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-stone-400 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center text-sm text-stone-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-amber-500" />
                                        <span>{post.published_at}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-amber-500" />
                                        <span>{post.author?.name ?? 'U Marušky ☕'}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    className="w-full group/btn text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-all duration-300"
                                >
                                    Číst více
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.article>
                    ))}
                </section>

                <Footer />
            </div>
        </PageTransition>
    )
}
