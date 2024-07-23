'use client'
import { redirect, usePathname } from 'next/navigation'
import { createContext, useContext } from 'react'

const Config = createContext()
export const configs = () => useContext(Config)
export default function ConfigProvider({ children, value }) {

    let path = usePathname()

    if (path != '/login' && !value) {
        redirect('/login')
    } else if (value) {      
        value.write = task => value[task] > 1
    }
    return <Config.Provider value={value}>{children}</Config.Provider>
}


