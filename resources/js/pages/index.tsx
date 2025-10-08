"use client"

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import PageOverlay from '@/components/PageOverlay'
import PageTransition from '@/components/PageTransition'
import SectionNavigation from '@/components/SectionNavigation'
import SuppliersSlider from '@/components/SuppliersSlide'
import { destroyLenis, initLenis, pageProgress } from '@/lib/scrollFx'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import AboutSection from './section/about_section'
import BlogSection from './section/blog_section'
import ContactSection from './section/contact_section'
import EventsSection from './section/events_section'
import HeroSection from './section/hero_section'

const Index = () => {
    const { latestPosts, upcomingEvents, suppliers } = usePage().props as unknown as {
        latestPosts: any[]
        upcomingEvents: any[]
        suppliers: any[]
    }

    useEffect(() => {
        initLenis()
        pageProgress('#pageProgress')
        return () => destroyLenis()
    }, [])

    return (
        <>
            <PageOverlay />
            <SectionNavigation />

            <PageTransition>
                <div className="min-h-screen page-transition">
                    <div id="pageProgress" className="fixed top-0 left-0 h-[2px] w-full bg-primary/20 z-[60]">
                        <span className="block h-full w-full bg-primary scale-x-0" />
                    </div>

                    <Navigation />

                    <main className="flex flex-col ">
                        <HeroSection />
                        <AboutSection />
                        <EventsSection events={upcomingEvents} />
                        <BlogSection posts={latestPosts} />
                        <SuppliersSlider suppliers={suppliers} />
                        <ContactSection />
                        <Footer />
                    </main>
                </div>
            </PageTransition>
        </>
    )
}

export default Index
