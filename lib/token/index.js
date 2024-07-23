import { SignJWT, jwtVerify } from "jose"

const pt = new TextEncoder().encode(process.env.CCKEY)
const alg = 'HS256'
const iss = 'auth:uw'

export async function createToken({ payload, expireInDays = 90, }) {

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expireInDays} d`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    return token

}

export async function refreshToken({ payload, expireInMin = 10 }) {

    const token = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime(`${expireInMin} m`)
        .setIssuer(iss)
        .setProtectedHeader({ alg })
        .sign(pt)

    return token

}

export async function verifyToken(token) {
    token = token?.split(' ')[1] || token
    const { payload } = await jwtVerify(token, pt, { issuer: iss });
    return payload
}

