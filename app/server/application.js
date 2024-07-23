import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal, ObjId, isFound, toOject } from "@/lib/db"
import AppliedJob from "@/schema/AppliedJob"
import permissions from "./permissions"
import ObjVal from "@/lib/Obj"
import TeamNote from "@/schema/AppliedJob/TeamNote"


async function application(id, payload) {
    let { user } = await permissions('application', 2)
    let data
    if (payload == undefined) {
        data = await AppliedJob.findById(id)
        return data
    }

    let { status, describe, notes } = payload
    if (status || notes) {
        notes = await new TeamNote({ application: id, user, status, text: notes }).save()
    }
    if (status || describe) {
        data = await AppliedJob.findByIdAndUpdate(id, { describe, status }, { new: true }).select('status describe')
    }
    return { app: data, notes }
}

let details = [
    {
        $lookup: {
            from: 'jobs',
            localField: 'job',
            foreignField: '_id',
            as: 'job'
        }
    },
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    { $unwind: '$user' },
    { $unwind: '$job' },
    {
        $project: {
            createdAt: 1,
            describe: 1,
            status: 1,
            user: {
                _id: 1,
                name: 1,
            },
            job: {
                _id: 1,
                job_role: 1
            }
        }
    }
]

async function applicationChat(app, other) {
    await permissions('application', 1)
    let { skip = 0 } = ObjVal(other)
    app = ObjId(app)
    let data = await TeamNote.aggregate([
        { $match: { application: app } },
        { $limit: 24 },
        { $skip: skip }
    ])
    return data
}


let projectUser = [
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
            createdAt: 1,
            describe: 1,
            status: 1,
            user: {
                _id: 1,
                name: 1,
                email: 1,
                mobile: 1,
                image: 1,
            },
        }
    }
]
async function applications(job, pagination, user) {
    await permissions('application', 1)
    pagination = serverPagination(pagination).concat(projectUser)
    let match = { job: ObjId(job) }
    if (user) {
        match.user = { $ne: ObjId(user) }
    }

    let data = await AppliedJob.aggregate([
        { $match: match },
        ...DataAndTotal(pagination)
    ])
    return toOject(data)
}

async function applicationSearch({ user, job, ...pagination }) {
    await permissions('application', 1)
    pagination = serverPagination(pagination).concat(details)
    let match = {}
    if (user) {
        match.user = ObjId(user)
    }
    if (job) {
        match.job = ObjId(job)
    }
    let data = await AppliedJob.aggregate([
        { $match: match },
        ...DataAndTotal(pagination)
    ])
    return toOject(data)
}


async function applicationTabCount() {
    await permissions('application', 1)
    let data = await AppliedJob.aggregate([
        {
            $group: {
                _id: null,
                applied: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 1] }, then: 1, else: 0 }
                    },
                },
                Viewed: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 2] }, then: 1, else: 0 }
                    }
                },
                shortlisted: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 3] }, then: 1, else: 0 }
                    },
                },
                interview: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 4] }, then: 1, else: 0 }
                    }
                },
                selected: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 5] }, then: 1, else: 0 }
                    },
                },
                rejected: {
                    $sum: {
                        $cond: { if: { $eq: ['$status', 6] }, then: 1, else: 0 }
                    }
                },
            },
        }
    ])

    return data[0]
}

export default { application, applicationChat, applicationSearch, applications, applicationTabCount }