import serverPagination from "@/Components/Pagination/serverPagination"
import Status from "@/PagesComponents/Candidates/Status"
import dbConnect, { dataTotal, toOject } from "@/lib/db"
import AppliedJob from "@/schema/Job/AppliedJob"
import mongoose from "mongoose"

const details = [
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    { $unwind: '$user' },
    {
        $project: {
            _id: 1,
            status: 1,
            updatedAt: 1,
            createdAt: 1,
            user: {
                _id: 1,
                name: 1,
                email: 1,
                mobile: 1
            },
            job: {
                _id: 1,
                job_role: 1,
                salary: 1,
                updatedAt: 1,
                createdAt: 1,
            }
        }
    }]

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    const { method } = req
    try {

        await dbConnect()
        let data, uid = new mongoose.Types.ObjectId(req.headers.uid)

        let { status = '', start_date, end_date, job } = req.body
        let appStatus = []
        for (const dat of status.split('-')) {
            const sts = Status(dat)
            if (sts !== -1 && sts > 2) {
                appStatus.push(sts)
            }
        }
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        let match = {}

        if (status) {
            match.status = { $in: appStatus }
        }
        if (job) {
            match.job = new mongoose.Types.ObjectId(job)
        }

        if (start_date) {
            match.createdAt = { $gte: startDate }
        }

        if (end_date) {
            match.createdAt = { ...match.createdAt, $lte: endDate }
        }
        const pagination = serverPagination(req.body)

        data = await AppliedJob.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'job',
                    foreignField: '_id',
                    as: 'job',

                }
            },
            { $unwind: '$job' },
            {
                $match: {
                    "job.company": uid
                }
            },
            ...dataTotal([...pagination, ...details])
        ])


        return res.status(200).json(toOject(data))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}