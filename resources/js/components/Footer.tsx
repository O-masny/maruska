import { Link } from "@inertiajs/react"
import {
    Clock,
    Coffee,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react"

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
        {
            title: "Služby",
            links: [
                { name: "Rezervace", href: "/rezervace" },
                { name: "Catering", href: "/catering" },
                { name: "Firemní akce", href: "/firemni-akce" },
                { name: "Kurzy", href: "/kurzy" },
            ],
        },
    ]

    const socialMedia = [
        { icon: Facebook, href: "#", name: "Facebook" },
        { icon: Instagram, href: "#", name: "Instagram" },
        { icon: Twitter, href: "#", name: "Twitter" },
    ]

    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <Coffee className="h-8 w-8 text-primary" />
                            <span className="font-serif text-2xl font-bold text-foreground">
                                U <span className="text-primary">Marušky</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Luxusní kavárna a cukrárna v srdci města. Nabízíme prémiovou
                            kávu, čerstvé sladkosti a nezapomenutelný zážitek v elegantním
                            prostředí.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 bg-accent hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                >
                                    <social.icon className="h-5 w-5 text-foreground group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
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

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                            Kontakt
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    Vodní, 760 01 Zlín 1
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                <a
                                    href="tel:+420777661706"
                                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    +420 777 661 706
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                                <a
                                    href="mailto:monika.maruska@seznam.cz"
                                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    monika.maruska@seznam.cz
                                </a>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div className="text-muted-foreground">
                                    <div>Po - Pá: 7:00 - 20:00</div>
                                    <div>So - Ne: 8:00 - 18:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        © 2024 U Marušky. Všechna práva vyhrazena.
                    </p>
                    <div className="flex space-x-6">
                        <Link
                            href="/ochrana-udaju"
                            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                        >
                            Ochrana údajů
                        </Link>
                        <Link
                            href="/obchodni-podminky"
                            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
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
                            className="text-primary hover:underline hover:text-primary/80 transition-colors duration-300"
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
