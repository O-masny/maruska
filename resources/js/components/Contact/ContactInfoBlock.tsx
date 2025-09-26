import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
    {
        icon: MapPin,
        title: "Adresa",
        details: ["Náměstí Míru 123", "120 00 Praha 2", "Česká republika"],
    },
    {
        icon: Phone,
        title: "Telefon",
        details: ["+420 777 123 456"],
    },
    {
        icon: Mail,
        title: "E-mail",
        details: ["info@cafeluna.cz"],
    },
    {
        icon: Clock,
        title: "Otevírací doba",
        details: ["Po–Pá: 7:00–20:00", "So–Ne: 8:00–21:00"],
    },
]

export const ContactInfoBlock = () => (
    <div className="space-y-6">
        {contactInfo.map(({ icon: Icon, title, details }, i) => (
            <Card key={i} className="border-0 bg-card shadow-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">{title}</h3>
                        {details.map((d, j) => (
                            <p key={j} className="text-muted-foreground">{d}</p>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
