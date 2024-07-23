import Team from "@/schema/Team"
import { error, getUser } from ".."


export default async function permissions(db, perm) {
    let user
    try {
        user = getUser()
    } catch (err) {
        error(undefined, '/login')
    }
    let { role } = user
    user = user.user
    let verify = { _id: user, [db.toLowerCase()]: { $gte: perm } }
    let f = await Team.findOne(verify).select('_id')
    if (!f) {
        error('you dont have permission for task ' + fn)
    }
    return { user, role }
}

