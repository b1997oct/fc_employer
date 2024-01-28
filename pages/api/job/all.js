import serverPagination from "@/Components/Pagination/serverPagination"
import dbConnect, { dataTotal, toOject } from "@/lib/db"
import Job from "@/schema/Job"
import mongoose from "mongoose"

const details = [
  {
    $lookup: {
      from: 'appliedjobs',
      localField: '_id',
      foreignField: 'job',
      as: 'applicants'
    },
  },
  {
    $addFields: {
      applicants: { $size: '$applicants' }
    }
  },
  {
    $project: {
      _id: 1,
      job_role: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      salary: 1,
      experience: 1,
      location: 1,
      publish: 1,
      total_openings: 1,
      work_mode: 1,
      job_type: 1,
      company: 1,
      applicants: 1
    }
  }]

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    let data
    const pagination = serverPagination(req.body)
    let uid = new mongoose.Types.ObjectId(req.headers.uid)
    const { limit, skip, sort, sort_field, ...body } = req.body
    data = await Job.aggregate([
      { $match: { company: uid, ...body } },
      ...dataTotal([...pagination, ...details])
    ])
    return res.status(200).json(toOject(data))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}