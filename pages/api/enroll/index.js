import dbConnect from "@/lib/db"
import Enroll from "@/schema/Company/Enroll"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {

    try {
        const { method } = req
        await dbConnect()
        let data
        if (method === 'POST') {
            const { email, mobile } = req.body
            data = await Enroll.findOne({ $or: [{ email }, { mobile }] })
            if (!data) {
                data = await Enroll(req.body).save()
            }
        } else if (method === 'DELETE') {
            data = await Enroll.findByIdAndDelete(req.body.id)
        }
        
        return res.status(201).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}