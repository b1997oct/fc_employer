import dbConnect from "@/lib/db"
import WorkExperience from "@/schema/User/WorkExperience"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {

        await dbConnect()
        let data, { id, isExperianced } = req.body
        if (isExperianced) {
            data = await WorkExperience.countDocuments({ user: id })
        } else {
            data = await WorkExperience.find({ user: id })
        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}