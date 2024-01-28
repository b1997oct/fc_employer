import dbConnect from "@/lib/db"
import Job from "@/schema/Job"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        await dbConnect()
        let data, uid = req.headers.uid
        const { job_role, select } = req.body
        data = await Job.find({ company: uid, job_role: { $regex: new RegExp(job_role, 'i') } }).limit(24).select(select)
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}