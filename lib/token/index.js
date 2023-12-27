import { SignJWT, jwtVerify } from "jose"

const pt = new TextEncoder().encode(process.env.CCKEY)
const alg = 'HS256'
const iss = 'auth:uw'

export async function createToken({ name = '_tok', payload, expire = 30, }) {

    const futureDate = expire * 24 * 3600

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expire}d`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    let cookie = `${name + '=' + token}; max-age=${futureDate}; path=/; httponly;`

        return { token, cookie }

}

export async function refreshToken({ name = '_ref', httponly, payload, expire = 10 }) {

    const futureDate = expire * 60

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expire}m`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    let cookie = `${name + '=' + token}; max-age=${futureDate}; path=/; ${httponly ? 'httponly;' : ''}`

    return { token, cookie }

}

export function expireCookie({ name, httponly }) {
    return `${name}=y; max-age=0; path=/; ${httponly ? 'httponly;' : ''}`
}

export async function verifyToken(token) {
const { payload} = await jwtVerify(token, pt, { issuer: iss });
return payload
}