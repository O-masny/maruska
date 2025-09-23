// resources/js/pages/section/blog_section.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { clipReveal, driftX, reveal, skewOnScroll } from '@/lib/scrollFx'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const BlogSection = () => {
    const wrapRef = useRef<HTMLDivElement>(null)

    const blogPosts = [
        { title: 'Umění latte art', excerpt: 'Objevte krásu ve vaší šálce...', image: '/api/placeholder/400/300', date: '15. března 2024' },
        { title: 'Káva ze světa', excerpt: 'Cestujte s námi po plantážích...', image: '/api/placeholder/400/300', date: '8. března 2024' },
        { title: 'Sezónní nabídka', excerpt: 'Jarní speciály a dezerty...', image: '/api/placeholder/400/300', date: '1. března 2024' },
    ]

    useEffect(() => {
        if (!wrapRef.current) return
        // reveal children (nadpisy, texty, cards)
        reveal(wrapRef.current, { y: 28, stagger: 0.14 })
        // obrazkům uvnitř karet dáme clip-reveal
        clipReveal(wrapRef.current.querySelectorAll('.blog-card img'), 'up')
        // karty dostanou jemný skew podle rychlosti scrollu
        skewOnScroll(wrapRef.current.querySelectorAll('.blog-card'), 6)
        // a micro drift do stran, ať to žije
        driftX(wrapRef.current.querySelectorAll('.blog-card'), 16)
    }, [])

    return (
        <section className="section-padding bg-secondary/30">
            <div className="container-default">
                <div className="text-center mb-16">
                    <h2 className="text-section-title mb-4 text-foreground">Blog</h2>
                    <p className="text-subtitle max-w-2xl mx-auto">Sledujte nejnovější články z našeho světa kávy</p>
                </div>

                <div ref={wrapRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <Card key={i} className="blog-card overflow-hidden border-0 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <CardContent className="p-6">
                                <p className="text-sm text-primary font-medium mb-2">{post.date}</p>
                                <h3 className="text-xl font-display font-medium mb-3 text-foreground">{post.title}</h3>
                                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                                <Button variant="ghost" className="p-0 h-auto font-medium text-primary">
                                    Číst více
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogSection
