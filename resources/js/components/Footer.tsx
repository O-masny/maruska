import { Link } from "@inertiajs/react"
import {
    Clock,
    Coffee,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
} from "lucide-react"
import { OpeningHours } from "./OpeningHours"

const Footer = () => {
    const footerSections = [
        {
            title: "Navigace",
            links: [
                { name: "Domů", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: "Akce", href: "/akce" },
                { name: "O nás", href: "/o-nas" },
                { name: "Kontakt", href: "/kontakt" },
            ],
        },
    ]

    const socialMedia = [
        { icon: Facebook, href: "#", name: "Facebook" },
        { icon: Instagram, href: "#", name: "Instagram" },
    ]

    return (
        <footer className="bg-gradient-to-b from-card via-card/90 to-background border-t border-border text-foreground">
            <div className="container-default py-16">
                {/* --- GRID LAYOUT --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Logo & About */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-6 hover:opacity-90 transition-opacity"
                        >
                            <Coffee className="h-8 w-8 text-primary" />
                            <span className="font-serif text-2xl font-bold">
                                U <span className="text-primary">Marušky</span>
                            </span>
                        </Link>

                        <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                            Útulná pet-friendly kavárna v srdci města. Prémiová káva,
                            poctivé sladkosti a atmosféra, na kterou se budete rádi vracet.
                        </p>

                        <div className="flex space-x-4">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-full bg-accent hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
                                >
                                    <social.icon className="h-5 w-5 text-foreground group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigace */}
                    {footerSections.map((section, index) => (
                        <div key={index} className="lg:col-span-1">
                            <h3 className="font-serif text-xl font-semibold mb-6 text-foreground">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Kontakt */}
                    <div className="lg:col-span-2">
                        <h3 className="font-serif text-xl font-semibold mb-6 text-foreground">
                            Kontakt
                        </h3>
                        <div className="space-y-4 text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                <span>Vodní, 760 01 Zlín 1</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <a
                                    href="tel:+420777661706"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    +420 777 661 706
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <a
                                    href="mailto:monika.maruska@seznam.cz"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    monika.maruska@seznam.cz
                                </a>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-primary mt-0.5" />
                                <OpeningHours variant="footer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2024 U Marušky. Všechna práva vyhrazena.
                    </p>

                    <div className="flex space-x-6 text-sm">
                        <Link
                            href="/ochrana-udaju"
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            Ochrana údajů
                        </Link>
                        <Link
                            href="/obchodni-podminky"
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            Obchodní podmínky
                        </Link>
                    </div>
                </div>

                {/* Signature */}
                <div className="mt-6 border-t border-border pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        Design & development by{" "}
                        <a
                            href="https://masny.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 underline-offset-2 hover:underline transition-colors"
                        >
                            masny.xyz
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
