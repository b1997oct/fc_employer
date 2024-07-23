import { cookies } from "next/headers"

export function getUser() {
    let { value } = cookies().get('_tok')
    let { user, role } = JSON.parse(value)
    return { user, role }
}

export function error(message = 'redirect', redirect) {
    message = new Error(message)
    if (redirect) {
        message.href = redirect
    }
    message.status = 403
    throw message
}

export function errorWithCode(message = 'redirect', status) {
    message = new Error(message)
    message.status = status
    throw message
}