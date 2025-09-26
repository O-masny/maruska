'use client'

import { usePage, Link } from '@inertiajs/react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'

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
    const { post } = usePage().props as unknown as { post: BlogPost }

    return (
        <PageTransition>
            <Navigation />

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative pt-32 pb-20"
            >
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                    <h1 className="font-serif text-5xl font-bold mb-4">{post.title}</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">{post.excerpt}</p>
                    <div className="flex justify-center gap-6 mt-6 text-sm text-white/70">
                        <span className="flex items-center gap-2">
                            <User className="h-4 w-4" /> {post.author?.name}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />{' '}
                            {new Date(post.published_at).toLocaleDateString('cs-CZ')}
                        </span>
                    </div>
                </div>
            </motion.section>

            <section className="py-20 bg-background">
                <div className="max-w-3xl mx-auto px-6 prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground">
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                <div className="max-w-3xl mx-auto px-6 mt-12 flex justify-between">
                    <Link href="/blog">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zpět na blog
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}

export default BlogShow
