import dbConnect from "@/lib/db"
import Employer from "@/schema/Company/Employer"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        await dbConnect()
        let data
        const { uid } = req.body
        const { generate } = req.query

        if (generate === 'new') {
            data = await Employer.countDocuments()
            data += 1
        } else if (uid) {
            data = await Employer.countDocuments({ uid })
        } else {
            throw Error('uid is required')
        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}