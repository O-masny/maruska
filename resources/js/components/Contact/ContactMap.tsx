"use client"

import { MapPin } from "lucide-react"
import { useState } from "react"

export const ContactMap = () => {
    const [interactive, setInteractive] = useState(false)

    return (
        <div
            className="
                relative aspect-[4/3]
                md:aspect-auto md:h-[400px] lg:h-[440px] xl:h-[480px]
                rounded-3xl overflow-hidden
                shadow-[0_10px_30px_hsl(25_20%_20%/0.2)]
                border border-border
                mx-auto w-full
            "
            onClick={() => setInteractive(true)}
        >
            {/* Google Map iframe — adresa: Vodní, 760 01 Zlín */}
            <iframe
                title="Mapa - Kavárna U Marušky"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.734639122292!2d17.664145076702!3d49.22325527138271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47138da1a6d8d60b%3A0xa67e70f2b19d49b7!2sVodn%C3%AD%2C%20760%2001%20Zl%C3%ADn%201!5e0!3m2!1scs!2scz!4v1727346234567!5m2!1scs!2scz"
                width="100%"
                height="100%"
                style={{
                    border: 0,
                    pointerEvents: interactive ? "auto" : "none",
                    filter: interactive ? "none" : "grayscale(25%) brightness(95%)",
                    transition: "filter 0.3s ease",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Adresní overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 shadow-md border border-border text-sm sm:text-base">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Vodní 23, Zlín 1</span>
            </div>

            {/* Kliknutím aktivuj mapu */}
            {!interactive && (
                <div className="
                    absolute inset-0 flex items-center justify-center
                    bg-black/10 backdrop-blur-[1px]
                    text-foreground text-sm cursor-pointer
                    transition-all duration-300 hover:bg-black/20
                ">
                    Kliknutím aktivujete mapu
                </div>
            )}
        </div>
    )
}
