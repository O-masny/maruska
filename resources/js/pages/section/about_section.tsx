// resources/js/pages/section/about_section.tsx
import coffeeMaking from '@/assets/hero-cafe.png'
import { Button } from '@/components/ui/button'
import { parallax, reveal } from '@/lib/scrollFx'
import { useEffect, useRef } from 'react'

const AboutSection = () => {
    const textRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (textRef.current) reveal(textRef.current, { y: 30, stagger: 0.12 })
        if (imgWrapRef.current) parallax(imgWrapRef.current, { yPercent: 15, scrub: 0.6 })
    }, [])

    return (
        <section id="about" className="section-padding bg-background relative overflow-hidden">
            <div className="container-default">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div ref={textRef} className="space-y-6">
                        <h2 className="text-section-title mb-4 text-foreground">O nás</h2>
                        <p className="text-large text-muted-foreground">
                            Café Luna je místem, kde se setkává vášeň pro kávu s moderním designem. Naše kavárna
                            vznikla z lásky k dokonalé chuti a přání vytvořit prostor, kde se každý host cítí výjimečně.
                        </p>
                        <p className="text-large text-muted-foreground">
                            Používáme pouze nejkvalitnější zrna z ověřených plantáží a každou kávu připravujeme s péčí
                            zkušených baristů. Naše dezerty vytváříme denně čerstvé z prémiových surovin.
                        </p>
                        <p className="text-large text-muted-foreground">
                            Věříme, že káva je více než jen nápoj – je to rituál, okamžik klidu a spojení s ostatními.
                        </p>

                        <Button className="mt-6 btn-primary">Objevte naše menu</Button>
                    </div>

                    {/* Image */}
                    <div ref={imgWrapRef} className="relative">
                        <img
                            src={coffeeMaking}
                            alt="Příprava kávy v Café Luna"
                            className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
