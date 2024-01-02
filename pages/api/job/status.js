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
        const { _id, id, ...body } = req.body
        if (body.publish) {
            throw Error('Something went wrong!')
        }
        
        if (method === "PUT") {
            data = await Job.findByIdAndUpdate(id, body, { new: true })
        }

        if (!data) {
            throw Error('document not found')
        }
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}