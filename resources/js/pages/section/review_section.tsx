'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Review {
    author_name: string
    profile_photo_url: string
    rating: number
    relative_time_description: string
    text: string
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        fetch('/api/google-reviews')
            .then(res => res.json())
            .then(data => setReviews(data.slice(0, 6))) // zobrazíme max 6
    }, [])

    if (!reviews.length) return null

    return (
        <section className="section-padding bg-gradient-to-b from-background via-secondary/10 to-background">
            <div className="container-default text-center mb-12">
                <h2 className="text-section-title mb-4">Hodnocení od našich hostů</h2>
                <p className="text-subtitle max-w-2xl mx-auto">
                    Děkujeme za každé slovo, které nám pomáhá růst ☕
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-2xl shadow-elegant p-6 text-left hover:-translate-y-2 hover:shadow-luxury transition-all duration-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={r.profile_photo_url}
                                alt={r.author_name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h3 className="font-medium text-foreground">{r.author_name}</h3>
                                <p className="text-sm text-muted-foreground">{r.relative_time_description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                    key={j}
                                    className={`h-4 w-4 ${j < r.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                                />
                            ))}
                        </div>

                        <p className="text-muted-foreground leading-relaxed line-clamp-4">{r.text}</p>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <a
                    href="https://www.google.com/maps/place/U+Marušky"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button className="bg-gradient-primary hover:shadow-luxury px-8">
                        Zanechat recenzi
                    </Button>
                </a>
            </div>
        </section>
    )
}
