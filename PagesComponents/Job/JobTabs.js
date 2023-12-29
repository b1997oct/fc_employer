import Tabs from '@/Components/Tabs'
import { useRouter } from 'next/router'
import React from 'react'

export default function JobTabs() {

    const pathname = useRouter().pathname.split('/')

    const tabs = [
        {
            active: pathname[2] === 's',
            link: '/job/s',
            title: 'Newly Posted'
        },
        {
            active: pathname[2] === 'closed',
            link: '/job/closed',
            title: 'Closed'
        },
    ]
    return <Tabs props={tabs} />

}
