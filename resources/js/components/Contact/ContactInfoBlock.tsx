import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

const contactInfo = [
    {
        icon: MapPin,
        title: "Adresa",
        details: ["Vodní 4200", "760 01 Zlín 1", "Česká republika"],
    },
    {
        icon: Phone,
        title: "Telefon",
        details: ["+420 723 663 254 nebo +420  777 661 706"],
    },
    {
        icon: Mail,
        title: "E-mail",
        details: ["monika.maruska@seznam.cz"],
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
