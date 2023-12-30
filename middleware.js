import { NextResponse } from "next/server"
import { createToken, refreshToken, verifyToken } from "./lib/token";

const authed = {
    '/api/job/all': true,
    '/api/job/closed': true,
    '/api/job/count': true,
    '/api/org': true,
    '/api/job': true,
    // path
    '/': true,
    '/profile': true,
    '/job/s': true,
    '/job/closed': true,
}


/**
 * @param {import("next/server").NextRequest} request 
 */

export async function middleware(request) {

    const { pathname } = request.nextUrl

    const api = pathname.startsWith('/api')


    try {

        const rh = new Headers(request.headers)

        let refresh, exted
        if (authed[pathname]) {
            const ref = request.cookies.get('_ref')?.value
            try {
                const { uid } = await verifyToken(ref);
                if (!uid) {
                    throw Error('uid not valid')
                }
                rh.set('uid', uid)
            } catch (err) {
                const tok = request.cookies.get('_tok')?.value
                const payload = await verifyToken(tok);
                exted = await createToken({ payload: payload })
                refresh = await refreshToken({ payload: { uid: payload.uid } })
                if (!payload.uid) {
                    throw Error('uid not valid')
                }
                rh.set('uid', payload.uid)
            }
        }

        const response = NextResponse.next({
            request: {
                headers: rh,
            },
        })

        if (exted) {
            response.cookies.set({
                name: '_tok',
                value: exted.token,
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: true
            })
        }

        if (refresh) {
            response.cookies.set({
                name: '_ref',
                value: refresh.token,
                path: '/',
                maxAge: 60 * 10,
                httpOnly: true
            })
        }

        return response

    } catch (error) {
        console.log('error: ', error.message);
        if (api) {
            return NextResponse.json({ message: 'it seems like your token expired please login' }, { status: 400 })
        } else {
            return NextResponse.redirect(new URL(`/login`, request.url))
        }
    }

}

export const config = {
    matcher: ['/', '/profile', '/job/:path*', '/api/:path*'],
} 