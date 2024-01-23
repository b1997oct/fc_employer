import dbConnect from "@/lib/db"
import Keyword from "@/schema/Keyword"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {

    const { method } = req

    try {
        await dbConnect()
        let data
        const admin = req.headers.uid
        const { keyword, type } = req.body
        if (method === 'POST') {
            const body = {
                keyword: { $regex: new RegExp(keyword, 'i') },
                type: { $regex: new RegExp(type, 'i') }
            }
            data = await Keyword.find(body).limit(24)
        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}