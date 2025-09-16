import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import SectionNavigation from '@/components/SectionNavigation';
import SuppliersSlider from '@/components/SuppliersSlide';
import { useEffect } from 'react';

const Index = () => {
    // Scroll-based animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen page-transition">
            <Navigation />
            <SectionNavigation />
            <main>
                <Hero />
                <SuppliersSlider />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
