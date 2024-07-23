import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal } from "@/lib/db"
import User from "@/schema/User"
import permissions from "./permissions"
import sendEmail from "../cc/email"

async function user(id, select) {
    await permissions('user', 2)
    let data
    data = await User.findById(id).select(select)
    return data
}

async function userSearch({ name, value, ...pagination }) {
    await permissions('user', 1)
    pagination = serverPagination(pagination)
    let match = {}
    if (value) {
        match[name] = new RegExp(value, 'i')
    }

    let data = await User.aggregate([
        { $match: match },
        {
            $lookup: {
                from: 'appliedjobs',
                localField: '_id',
                foreignField: 'user',
                as: 'appliedjobs'
            }
        },
        {
            $addFields: {
                appliedjobs: { $size: '$appliedjobs' }
            }
        },
        ...DataAndTotal(pagination)
    ])
    return data[0]
}



export default { user, userSearch, sendEmail }