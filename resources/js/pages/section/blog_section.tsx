'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

interface BlogSectionProps {
    posts: {
        id: number
        title: string
        slug: string
        excerpt: string
        cover_image: string
        published_at: string
        author: string
    }[]
}

const BlogSection = ({ posts }: BlogSectionProps) => {
    if (!posts?.length)
        return (
            <section className="section-padding bg-secondary/30 text-center my-6">
                <h2 className="text-section-title mb-4 text-foreground">Blog</h2>
                <p className="text-muted-foreground mb-6">
                    Zatím žádné články – sledujte nás, brzy přidáme čerstvou dávku inspirace ☕
                </p>
                <Link href="/blog">
                    <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                        Navštívit blog
                    </Button>
                </Link>
            </section>
        )

    const post = posts[0]

    return (
        <section className="relative py-12 section-padding overflow-hidden bg-secondary/30">
            {/* Background image with parallax-style animation */}
            <motion.img
                src={post.cover_image}
                alt={post.title}
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background/95 backdrop-blur-[2px]" />

            <div className="relative container-default text-center max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-section-title mb-6 text-foreground"
                >
                    Z našeho blogu
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="mx-auto mb-10 px-4"
                >
                    <h3 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-foreground leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                        {post.excerpt}
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                        {post.published_at} &nbsp;•&nbsp; {post.author}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link href={`/blog/${post.slug}`}>
                        <Button
                            size="lg"
                            className="rounded-full px-8 font-medium bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-all duration-300"
                        >
                            Číst článek
                        </Button>
                    </Link>
                    <Link href="/blog">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
                        >
                            Další články
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default BlogSection
