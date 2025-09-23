import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const FloatingReservationButton = () => {
    const handleReservation = () => {
        // Scroll to contact section or open reservation modal
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Button
            onClick={handleReservation}
            className="fixed bottom-6 right-6 z-50 shadow-2xl bg-primary hover:bg-accent text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium"
            size="lg"
        >
            <Calendar className="w-5 h-5 mr-2" />
            Rezervace
        </Button>
    );
};

export default FloatingReservationButton;