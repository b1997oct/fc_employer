import useWidth from '@/Components/Hooks/useWidth'
import Tabs from '@/Components/Tabs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function JobHeader() {

    const pathname = useRouter().pathname.split('/')[2]
    const getActive = (value) => pathname === value ? 'primary-bg' : 'ci'

    const width= useWidth('fdcr','aic')

    const tabs = [
        {
            className: getActive('live'),
            link: '/job/live',
            title: 'Live'
        },
        {
            className: getActive('processing'),
            link: '/job/processing',
            title: 'Processing'
        },
        {
            className: getActive('closed'),
            link: '/job/closed',
            title: 'Closed'
        },
    ]
    return (
        <div className={`df my bg py-2 ${width}`}>
            <Tabs props={tabs} />
            <div className='f-1 df jce'>
                <Link href='/job/new' className='m-2'>
                    <button className='primary-btn'>Post new job</button>
                </Link>
            </div>
        </div>)

}
