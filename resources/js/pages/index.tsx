// resources/js/pages/Index.tsx
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import SectionNavigation from '@/components/SectionNavigation'
import SuppliersSlider from '@/components/SuppliersSlide'
import { destroyLenis, initLenis, pageProgress } from '@/lib/scrollFx'
import { useEffect } from 'react'
import AboutSection from './section/about_section'
import BlogSection from './section/blog_section'
import ContactSection from './section/contact_section'
import EventsSection from './section/events_section'
import HeroSection from './section/hero_section'

const Index = () => {
    useEffect(() => {
        initLenis()
        pageProgress('#pageProgress') // volitelné: nahoře můžeš mít progress bar
        return () => destroyLenis()
    }, [])

    return (
        <div className="min-h-screen page-transition">
            {/* progress bar (volitelný) */}
            <div id="pageProgress" className="fixed top-0 left-0 h-[2px] w-full bg-primary/20 z-[60]">
                <span className="block h-full w-full bg-primary scale-x-0" />
            </div>

            <Navigation />
            <SectionNavigation />

            <main className="flex flex-col space-y-12">
                <HeroSection />
                <AboutSection />
                <BlogSection />
                <SuppliersSlider />
                <EventsSection />
                <ContactSection />
                <Footer />
            </main>
        </div>
    )
}

export default Index
