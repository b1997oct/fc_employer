import { SignJWT, jwtVerify } from "jose"

const pt = new TextEncoder().encode(process.env.CCKEY)
const alg = 'HS256'
const iss = 'auth:uw'

export async function createToken({ name = '_tok', payload, expireInDays = 30, }) {

    const futureDate = expireInDays * 24 * 3600

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expireInDays}d`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    let cookie = `${name + '=' + token}; max-age=${futureDate}; path=/; httponly;`

    return { token, cookie }

}

export async function refreshToken({ name = '_ref', payload, expireInMin = 10 }) {

    const futureDate = expireInMin * 60

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expireInMin}m`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    let cookie = `${name + '=' + token}; max-age=${futureDate}; path=/; httponly;`

    return { token, cookie }

}

export function expireCookie({ name, httponly = true }) {
    return `${name}=y; max-age=0; path=/; ${httponly ? 'httponly;' : ''}`
}

export async function verifyToken(token) {
    const { payload } = await jwtVerify(token, pt, { issuer: iss });
    return payload
}