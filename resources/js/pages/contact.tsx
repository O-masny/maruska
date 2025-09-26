import { ContactForm } from '@/components/Contact/ContactForm'
import { ContactInfoBlock } from '@/components/Contact/ContactInfoBlock'
import { ContactMap } from '@/components/Contact/ContactMap'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

const Kontakt = () => (
    <div className="min-h-screen page-transition">
        <Navigation />

        <section className="pt-32 pb-16 text-center bg-gradient-elegant">
            <h1 className="font-serif text-6xl font-bold mb-4 text-foreground">
                Napište <span className="text-primary">nám</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jsme tu pro vaše dotazy, rezervace i zpětnou vazbu.
            </p>
        </section>

        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
                <div><ContactInfoBlock /></div>
                <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                    <ContactForm />
                </div>
            </div>
        </section>

        <section className="py-20 bg-gradient-subtle">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-serif text-4xl font-bold text-center mb-12">
                    Najdete nás snadno
                </h2>
                <ContactMap />
            </div>
        </section>

        <Footer />
    </div>
)

export default Kontakt
