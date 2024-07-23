import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal, toOject } from "@/lib/db"
import toSelect from "@/lib/toSelect"
import Recruiter from "@/schema/Recruiter"
import permissions from "./permissions"
import Companies from "../company/search"
import Company from "@/schema/Company"

async function recruiter(id, body) {

    await permissions('recruiter', 2)

    let data
    if (id == 'new') {
        data = await new Recruiter(body).save()
    } else {
        data = await Recruiter.findOneAndUpdate({ _id: id }, body, { new: true }).select(toSelect(body))
    }
    return data
}

async function recruiterSearch({ name, value, ...pagination }) {

    await permissions('recruiter', 1)
    pagination = serverPagination(pagination)

    let match = {}
    if (value) {
        match[name] = new RegExp(value, 'i')
    }

    let data = await Recruiter.aggregate([
        { $match: match },
        {
            $lookup: {
                from: 'companies',
                localField: 'company',
                foreignField: "_id",
                as: 'companyTitle'
            }
        },
        {
            $addFields: {
                companyTitle: '$companyTitle.company_name'
            }   
        },
        ...DataAndTotal(pagination)
    ])
    return data[0]
}



export default { recruiterSearch, recruiter }
