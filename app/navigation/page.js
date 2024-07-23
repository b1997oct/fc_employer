'use client'
import { navigates } from '@/PagesComponents/Header'
import Layout from '@/PagesComponents/Layout'
import Link from 'next/link'
import React from 'react'
import { configs } from '../config'



export default function Page() {
    let config = configs()
    const links = navigates(config).concat([{
        path: '/acc/logout',
        title: 'Logout',
    }])
    return (
        <Layout active='User'>
            <div className='md:mx-[20%] df fdc gap py-10 bg '>
                {links.map(d => {
                    const { path, title } = d
                    return (
                        <Link
                            className='p bold pl text-xl hover:bg-stone-100 df aic gap block border-l-4 border-transparent hover:border-pc jcs'
                            key={path}
                            href={path}>
                            {title}
                        </Link>)
                })}
            </div>
        </Layout>
    )
}
