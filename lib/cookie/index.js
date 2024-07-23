import { createToken, refreshToken } from '../token'

export async function createCookie({ name, payload, expireInDays = 120 }) {
    const value = await createToken({ payload, expireInDays })
    return {
        name,
        value,
        path: '/',
        maxAge: 60 * 60 * 24 * expireInDays,
        httpOnly: true
    }
}

export async function refreshCookie({ name, payload, expireInMin = 10 }) {
    const value = await refreshToken({ payload, expireInMin })
    return {
        name,
        value,
        path: '/',
        maxAge: 60 * expireInMin,
        httpOnly: true
    }
}
