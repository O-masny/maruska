import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useState } from "react"

export const ContactForm = () => {
    const [accepted, setAccepted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!accepted) {
            alert("Prosím potvrďte souhlas se zpracováním osobních údajů.")
            return
        }
        // TODO: send form data (Inertia.post or Fetch API)
        alert("Zpráva byla odeslána – děkujeme!")
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Jméno</Label>
                    <Input id="firstName" placeholder="Vaše jméno" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Příjmení</Label>
                    <Input id="lastName" placeholder="Vaše příjmení" required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="vas@email.cz" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Zpráva</Label>
                <Textarea id="message" rows={6} placeholder="Vaše zpráva..." required />
            </div>

            <div className="flex items-start space-x-3">
                <input
                    id="gdpr"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1"
                    required
                />
                <Label htmlFor="gdpr" className="text-sm text-muted-foreground">
                    Souhlasím se zpracováním osobních údajů za účelem vyřízení mé žádosti.
                    Více informací najdete v&nbsp;
                    <a href="/privacy" className="underline hover:text-primary">
                        zásadách ochrany osobních údajů
                    </a>.
                </Label>
            </div>


            <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                disabled={!accepted}
                className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-full
             hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,0,0,0.12)]
             transition-all duration-300 disabled:opacity-50"
            >
                Odeslat zprávu
            </motion.button>
        </form>
    )
}
