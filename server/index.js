


const request = async (body, action) => {
    let headers = new Headers()
    headers.append('Server-Fn', action)
    if (!(body instanceof FormData)) {
        body = JSON.stringify(body)
        headers.append('Content-Type', 'application/json')
    }
    let res = await fetch('/server', { body, method: 'POST', headers })
    return res
}

async function serverConnect(action, body, setLoading, onError, onSuccess) {
    try {
        onError?.()
        setLoading?.(true)
        let res = await request(body, action)
        let data = await res.json()
        if (!res.ok) {
            if (data.href) {
                location.href = data.href
            }
            throw data
        }
        setLoading?.(false)
        if (onSuccess) {
            onSuccess(data)
        } else {
            return data
        }

    } catch (error) {
        if (error.name !== 'AbortError') {
            if (!onSuccess) {
                throw data
            }
            onError?.(error)
            setLoading?.(false)
        }
    }
}


export default function ServerFunction(funName, { setLoading, setError, onResponse }) {
    const onError = err => {
        setError?.(err?.message)
    }
    const handler = async (...payload) => await serverConnect(funName, payload, setLoading, onError, onResponse)
    return handler
}


async function serverHint(action, body) {
    let res = await request(body, action)
    let data = await res.json()
    if (!res.ok) {
        throw data
    }
    return data
}

export function serverHintFn(action) {
    const handler = async (...body) => await serverHint(action, body)
    return handler
}