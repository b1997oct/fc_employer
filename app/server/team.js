import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal, toOject } from "@/lib/db"
import toSelect from "@/lib/toSelect"
import Recruiter from "@/schema/Recruiter"
import permissions, { error } from "./permissions"
import Team from "@/schema/Team"
import getUser from "@/lib/getUser"

async function team(id, body) {

    // await permissions('team', 2)

    let data
    if (id == 'new') {
        data = await new Team(body).save()
    } else {
        data = await Team.findByIdAndUpdate(id, body, { new: true }).select(toSelect(body))
    }
    return data
}

async function teamSearch({ ...pagination }) {
    // await permissions('team', 1)
    pagination = serverPagination(pagination)
    let data = await Team.aggregate(DataAndTotal(pagination))
    return toOject(data)
}



export default { team, teamSearch }
