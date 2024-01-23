import { expireCookie } from "@/lib/token"

export default async function route(req, res) {
    try {

        const cookie = expireCookie({ name: '_tok', httponly: true })
        const cookie2 = expireCookie({ name: '_ref', httponly: true })

        res.setHeader('Set-Cookie', [cookie, cookie2])

        return res.status(200).json({ status: true })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}