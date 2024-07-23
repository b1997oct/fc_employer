import Layout from '@/PagesComponents/Layout'
import Menu from '@/UW/Menu'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

let links = [
    {
        label: 'Emails',
        href: '/business/email'
    },
    {
        label: 'Templates',
        href: '/business/email/templates'
    },
    // {
    //     label: 'Subcribers',
    //     href: '/business/email/subcribers'
    // },
    // {
    //     label: 'Sent',
    //     href: '/business/email/sent'
    // }
]

export default function EmailLayout({ active, children }) {
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


import ServerFunction from '@/server'


export function useEmails() {

    let [data, setData] = useState(),
        onResponse = res => setData(res.data),
        getData = ServerFunction('mailSearch', { onResponse })

    useEffect(() => {
        !data && getData({})
    }, [])
    return data || []
}
