import dbConnect from "@/lib/db"
import Utils from "@/schema/Utils"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        await dbConnect()
        let data
        data = await Utils.findOne()
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}