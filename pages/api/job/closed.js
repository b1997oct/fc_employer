import dbConnect from "@/lib/db"
import Job from "@/schema/Job"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    const { uid } = req.headers
    let data = await Job.find({ user: uid, publish: false })
    return res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}