import dbConnect from "@/lib/db"
import Job from "@/schema/Job"
import { isValidObjectId } from "mongoose"

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
        const { _id, id, ...body } = req.body

        if (method === 'POST') {
            data = await Job.findById(id)
        } else if (method === "PUT") {
            if (id === 'new') {
                body.company = uid
                data = await new Job(body).save()
            } else if (isValidObjectId(id)) {
                data = await Job.findByIdAndUpdate(id, body, { new: true })
            }

        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}