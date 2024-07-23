'use client'
import { redirect, usePathname } from 'next/navigation'
import { createContext, useContext } from 'react'

const Config = createContext()

let values = {}
export const configs = () => values
export default function ConfigProvider({ children, value }) {

    let path = usePathname()

    if (path != '/login' && !value) {
        redirect('/login')
    } else if (value) {
        values = value
        value.write = task => value[task] > 1
    }

    return <>{children}</>
}


