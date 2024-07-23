import Recruiter from "@/schema/Recruiter"
import Team from "@/schema/Team"
import { cookies } from "next/headers"

async function login({ email, password }) {
    let data = await Team.findOne({ email })
    if (!data) {
        return Response.json({ message: 'user not found' }, { status: 404 })
    }
    let cookie = cookies()
    cookie.set('_tok', JSON.stringify({ user: data._id.toString(), role: 'team' }), { maxAge: 60 * 60 * 20 })
    return { login: 'success' }
}

export default { login }