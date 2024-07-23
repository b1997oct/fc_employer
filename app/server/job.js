import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal, ObjId } from "@/lib/db"
import toSelect from "@/lib/toSelect"
import Job from "@/schema/Job"
import permissions from "./permissions"
import { errorWithCode } from "."
import sendEmail from "../cc/email"
import Recruiter from "@/schema/Recruiter"

async function job(id, body) {

    let data
    if (body == undefined) {
        data = await Job.aggregate([
            { $match: { _id: ObjId(id) } },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'company',
                    foreignField: '_id',
                    as: 'companyName'
                }
            },
            { $unwind: '$companyName' },
            {
                $addFields: {
                    companyName: '$companyName.company_name'
                }
            }
        ])
        data = data[0]
        if (!data) {
            errorWithCode('job not found', 404)
        }
        return data
    }
    let { user, role } = await permissions('job', 2)
    if (id == 'new') {
        data = await new Job(body).save()
    } else {
        let { active } = body
        let select = toSelect(body, 'recruiter')
        data = await Job.findByIdAndUpdate(id, body, { new: true }).select(select)
        if (active != undefined && active) {
            let { email } = await Recruiter.findById(data.recruiter)
            await sendEmail(email, 'E_JOB_LIVE')
        }
    }
    return data
}

async function jobSearch({ title, ...pagination }, live) {
    await permissions('job', 1)
    pagination = serverPagination(pagination)

    let match = {
        active: live ? true : { $ne: true }
    }

    if (title) {
        match.job_role = new RegExp(title, 'i')
    }
    let data = await Job.aggregate([
        { $match: match },
        {
            $lookup: {
                from: 'recruiters',
                localField: 'company',
                foreignField: "company",
                as: 'recruiter'
            }
        },
        {
            $lookup: {
                from: 'appliedjobs',
                localField: '_id',
                foreignField: "job",
                as: 'applicants'
            }
        },
        {
            $addFields: {
                recruiter: '$recruiter.name',
                applicants: { $size: '$applicants' }
            }
        },
        // {
        //     $lookup: {
        //         from: 'companies',
        //         localField: 'company',
        //         foreignField: "_id",
        //         as: 'companyTitle'
        //     }
        // },
        // {
        //     $addFields: {
        //         companyTitle: '$companyTitle.title'
        //     }
        // },
        // { $unwind: '$companyTitle' },
        ...DataAndTotal(pagination)
    ])
    return data[0]
}


async function jobHint(title) {
    title = new RegExp(title, 'i')
    let data = await Job.find({ title }).limit(24).select('title')
    return data
}

async function jobCardData() {

    let data = await Job.aggregate([
        {
            $group: {
                _id: null,
                live: {
                    $sum: {
                        $cond: { if: { $eq: ['$active', true] }, then: 1, else: 0 }
                    },
                },
                inactive: {
                    $sum: {
                        $cond: { if: { $ne: ['$active', true] }, then: 1, else: 0 }
                    },
                }
            }
        }
    ])
    return data[0]
}

export default { job, jobSearch, jobHint, jobCardData }

