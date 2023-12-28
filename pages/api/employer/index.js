import dbConnect from "@/lib/db"
import Employer from "@/schema/Company/Employer"
import { isValidObjectId } from "mongoose"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        await dbConnect()
        let data
        const { _id, id, createdAt, updatedAt, ...body } = req.body
        if (id === 'new') {
            data = await new Employer(body).save()
        } else if (isValidObjectId(id)) {
            data = await Employer.findByIdAndUpdate(id, body, { new: true })
        }
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}