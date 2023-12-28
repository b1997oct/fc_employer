import dbConnect from "@/lib/db"
import Employer from "@/schema/Company/Employer";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {
        await dbConnect()
        let data, total_count
        const { page = 1, limit = 24, sort = -1, sort_field = 'createdAt' } = req.body;
        const skip = (page - 1) * limit;

        data = await Employer.aggregate([
            {
                $sort: {
                    [sort_field]: sort,
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'jobs'
                }
            }, 
            {
                $addFields : {
                    jobs : { $size : '$jobs'}
                }
            }
        ])

        total_count = await Employer.countDocuments()

        return res.status(200).json({ data, total_count })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}