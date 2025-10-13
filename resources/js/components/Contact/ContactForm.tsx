import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export const ContactForm = () => {
    const [accepted, setAccepted] = useState(false)

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        name: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!accepted) {
            alert("Prosím potvrďte souhlas se zpracováním osobních údajů.")
            return
        }

        const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim()
        setData("name", fullName)

        post("/kontakt", {
            onSuccess: () => {
                reset()
                setAccepted(false)
            },
            preserveScroll: true,
        })
    }

    // automaticky schová success message po pár vteřinách
    useEffect(() => {
        if (recentlySuccessful) {
            const timer = setTimeout(() => reset("message"), 4000)
            return () => clearTimeout(timer)
        }
    }, [recentlySuccessful])

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Jméno</Label>
                    <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => setData("firstName", e.target.value)}
                        placeholder="Vaše jméno"
                        required
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Příjmení</Label>
                    <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) => setData("lastName", e.target.value)}
                        placeholder="Vaše příjmení"
                        required
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="vas@email.cz"
                    required
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Zpráva</Label>
                <Textarea
                    id="message"
                    rows={6}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder="Vaše zpráva..."
                    required
                />
                {errors.message && (
                    <p className="text-sm text-red-500">{errors.message}</p>
                )}
            </div>

            <div className="flex items-start space-x-3">
                <input
                    id="gdpr"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 accent-primary"
                    required
                />
                <Label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed">
                    Souhlasím se zpracováním osobních údajů za účelem vyřízení mé žádosti.
                    Více informací najdete v&nbsp;
                    <a href="/privacy" className="underline hover:text-primary">
                        zásadách ochrany osobních údajů
                    </a>.
                </Label>
            </div>

            <AnimatePresence mode="wait">
                {recentlySuccessful ? (
                    <motion.p
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center text-sm text-green-500"
                    >
                        Zpráva byla úspěšně odeslána. 🎉
                    </motion.p>
                ) : (
                    <motion.button
                        key="submit"
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: accepted ? 1.02 : 1 }}
                        disabled={!accepted || processing}
                        className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-full
              hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)]
              transition-all duration-300 disabled:opacity-50"
                    >
                        {processing ? "Odesílám..." : "Odeslat zprávu"}
                    </motion.button>
                )}
            </AnimatePresence>
        </form>
    )
}
