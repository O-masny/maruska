import { MapPin } from "lucide-react"

export const ContactMap = () => (
    <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-elegant bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/40">
            <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Náměstí Míru 123</h3>
                <p className="text-muted-foreground">120 00 Praha 2, Česká republika</p>
            </div>
        </div>
    </div>
)
