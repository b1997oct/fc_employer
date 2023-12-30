import dbConnect from "@/lib/db"
import Company from "@/schema/Company"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        const { method } = req
        await dbConnect()
        let data
        const { uid } = req.headers

        if (method === 'POST') {
            data = await Company.findById(uid)
        } else if (method === 'PUT') {
            const { _id, createdAt, id, updatedAt, ...body } = req.body
            data = await Company.findByIdAndUpdate(uid, body, { new: true })
            if (!data && id === 'new') {
                body._id = uid
                data = await new Company(body).save()
            }
        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}