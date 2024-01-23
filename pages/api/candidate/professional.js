import dbConnect from "@/lib/db"
import Professional from "@/schema/User/Professional"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {

        await dbConnect()
        let data, id = req.body.id
        data = await Professional.findById(id)
        return res.status(200).json({ data: data, })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}