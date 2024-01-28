import serverPagination from "@/Components/Pagination/serverPagination"
import dbConnect, { dataTotal, toOject } from "@/lib/db"
import Job from "@/schema/Job"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    const pagination = serverPagination(req.body)

    const { uid } = req.headers
    let data = await Job.aggregate([
      { $match: { company: uid, publish: true } },
      ...dataTotal([pagination])
    ])

    return res.status(200).json(toOject(data))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}