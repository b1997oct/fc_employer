import dbConnect from "@/lib/db"
import Enroll from "@/schema/Company/Enroll"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    let data
    const { page = 1, limit = 24, sort = -1, sort_field = 'createdAt' } = req.body;
    const skip = (page - 1) * limit;

    data = await Enroll.find()
      .sort({ [sort_field]: sort })
      .limit(limit)
      .skip(skip)
   const total_count = await Enroll.countDocuments()

    return res.status(200).json({ data, total_count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}