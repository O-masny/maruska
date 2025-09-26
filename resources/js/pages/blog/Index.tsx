'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Search, User } from 'lucide-react'
import { useState } from 'react'

interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    author: { name: string }
    published_at: string
    readTime: number
    category: string
    cover_image: string
    featured: boolean
}

const BlogIndex = () => {
    const { posts } = usePage().props as unknown as { posts: BlogPost[] }
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Vše')

    const categories = ['Vše', 'Káva', 'Cukrářství', 'Sezónní']

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory =
            selectedCategory === 'Vše' || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />

                <section className="pt-36 pb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto px-6"
                    >
                        <h1 className="font-serif text-6xl md:text-7xl font-bold mb-4 tracking-tight">
                            Kávový <span className="text-primary">žurnál</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Příběhy, recepty a zákulisí kavárenského života.
                        </p>
                    </motion.div>
                </section>

                {/* Filtry */}
                <section className="py-10 bg-background/80 border-t border-border/40">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6 justify-between items-center">
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Hledat články..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((cat) => (
                                <Button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    variant={selectedCategory === cat ? 'default' : 'ghost'}
                                    className={`rounded-full px-5 py-2 transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-primary text-white shadow-md'
                                        : 'hover:bg-primary/10'
                                        }`}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Grid */}
                <section className="pb-24">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                        {
                            filteredPosts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className="col-span-full flex flex-col items-center justify-center text-center py-32"
                                >
                                    <div className="p-6 rounded-full bg-primary/10 mb-6">
                                        <Search className="h-10 w-10 text-primary" />
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                                        Žádné články nenalezeny
                                    </h2>
                                    <p className="text-muted-foreground max-w-md mb-8">
                                        Zkuste jiný výraz, nebo si dejte kávu a vraťte se později – možná
                                        připravujeme něco čerstvého ☕
                                    </p>
                                    <Button onClick={() => { setSearchTerm(''); setSelectedCategory('Vše'); }}>
                                        Zobrazit všechny články
                                    </Button>
                                </motion.div>
                            ) : filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group bg-card/80 border border-border/60 rounded-3xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500"
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <motion.img
                                            layoutId={`cover-${post.id}`}
                                            src={post.cover_image}
                                            alt={post.title}
                                            className="w-full h-64 object-cover"
                                        />
                                    </Link>

                                    <div className="p-6 flex flex-col justify-between h-full">
                                        <span className="text-sm uppercase text-primary font-medium">
                                            {post.category}
                                        </span>
                                        <h2 className="font-serif text-2xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>{post.author?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{post.readTime} min</span>
                                            </div>
                                        </div>

                                        <Link href={`/blog/${post.slug}`} className="mt-4">
                                            <Button variant="ghost" className="w-full group/btn">
                                                Číst více
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                    </div>
                </section>

                <Footer />
            </div>
        </PageTransition>
    )
}

export default BlogIndex
