'use client'
import { useLayoutEffect } from 'react'
import { client } from '@upgradableweb/client'

export default function CookieHandler() {

    useLayoutEffect(() => {
        client.authorization = document.cookie
        client.baseUrl = 'https://localhost:3001'
    }, [])

    return null

}