'use client'

import CoffeeButton from '@/components/CoffeeButton'
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
            <section id="blog"
                className="
      relative py-32 text-center overflow-hidden
      bg-[linear-gradient(180deg,
        hsl(30_25%_92%) 0%,
        hsl(28_20%_88%) 40%,
        hsl(26_15%_82%) 100%)
      ]
    "
            >
                {/* Obsah */}
                <div id="blog" className="relative container-default max-w-lg mx-auto px-6">
                    <h2 className="text-section-title mb-4 text-[hsl(25_20%_25%)] font-serif">
                        Blog
                    </h2>

                    <p className="text-base sm:text-lg text-[hsl(25_15%_30%)] mb-8 leading-relaxed">
                        Zatím žádné články – sledujte nás, brzy přidáme čerstvou dávku inspirace ☕
                    </p>

                    <Link href="/blog">
                        <CoffeeButton
                            size="lg"
                            variant="solid"
                            className="
            bg-gradient-to-r from-[hsl(10_60%_45%)] to-[hsl(10_55%_35%)]
            text-white shadow-md hover:shadow-lg hover:scale-[1.03]
            transition-all duration-300
          "
                        >
                            Navštívit blog
                        </CoffeeButton>
                    </Link>
                </div>
            </section>
        )
    const post = posts[0]

    return (
        <section className="relative py-40 overflow-hidden">
            {/* --- Background image layer --- */}
            <motion.img
                src={post.cover_image}
                alt={post.title}
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* --- Warm gradient overlay (coffee light) --- */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(25_30%_10%/0.7)_0%,hsl(25_25%_15%/0.9)_40%,hsl(30_25%_90%/0.95)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,hsl(0_0%_100%/0.15),transparent_70%)]" />

            {/* --- Content --- */}
            <div className="relative container-default text-center max-w-3xl mx-auto text-background">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-section-title mb-6 font-serif text-background drop-shadow-md"
                >
                    Z našeho blogu
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="bg-background/85 backdrop-blur-sm rounded-2xl px-8 py-10 shadow-lg border border-border/40"
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

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link href={`/blog/${post.slug}`}>
                            <CoffeeButton size="lg" variant="solid">
                                Číst článek
                            </CoffeeButton>
                        </Link>

                        <Link href="/blog">
                            <CoffeeButton size="lg" variant="outline">
                                Další články
                            </CoffeeButton>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default BlogSection
