import Layout from '@/PagesComponents/Layout'
import Menu from '@/UW/Menu'
import Link from 'next/link'
import React from 'react'

let links = [
    {
        label: 'Job',
        href: '/status'
    },
    {
        label: 'Job Application',
        href: '/status/application'
    },
    // {
    //     label: 'User',
    //     href: '/status/user'
    // },
]
export default function StatusLayout({ active, children }) {
    return (
        <Layout active='Settings'>
            <div className='df fdc md:fdr m-2 md:m gap'>
                <div>
                    {links.map(d => {
                        let { label, href } = d
                        return <Link href={href} key={label}><Menu active={label == active}>{label}</Menu></Link >
                    })}
                </div>
                <div className='f-1'>
                    {children}
                </div>
            </div>
        </Layout>
    )
}

