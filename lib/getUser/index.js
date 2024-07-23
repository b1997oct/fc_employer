import { cookies } from "next/headers"

export default function getUser() {
    try {

        let { value } = cookies().get('_tok'),
            { user, role } = JSON.parse(value)
        return { user, role }
    } catch (error) {
        throw Error('user not valid')
    }
}