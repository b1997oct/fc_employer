import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal, toOject } from "@/lib/db"
import Company from "@/schema/Company"
import permissions from "./permissions"

async function company(id, body) {
    await permissions('company', 2)
    let data
    if (id == 'new') {
        data = await new Job(body).save()
    } else {
        data = await Company.findOneAndUpdate({ _id: id }, body, { new: true })
    }
    return data
}


async function companySearch(tab, { title, ...pagination }) {
    await permissions('company', 1)
    let match = {}
    if (tab == 'approved') {
        match.active = true
    } else {
        match.active = { $ne: true }
    }
    if (title) {
        match.title = new RegExp(title, 'i')
    }

    pagination = serverPagination(pagination)
    let data = await Company.aggregate([
        { $match: match },
        ...DataAndTotal(pagination)
    ])
    return toOject(data)
}

async function companyTabCount() {
    let data = await Company.aggregate([
        {
            $group: {
                _id: null,
                approved: {
                    $sum: {
                        $cond: { if: { $eq: ['$active', true] }, then: 1, else: 0 }
                    },
                },
                new: {
                    $sum: {
                        $cond: { if: { $ne: ['$active', true] }, then: 1, else: 0 }
                    }
                },
            },
        }
    ])

    return data[0]
}

async function companyHint(title) {

    title = new RegExp(title, 'i')
    let data = await Company.find({ company_name: title }).limit(24).select('company_name')
    return data
}

export default { company, companySearch, companyHint, companyTabCount }

