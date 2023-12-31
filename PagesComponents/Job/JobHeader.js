import Tabs from '@/Components/Tabs'
import { useTheme } from '@/Layout/Theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function JobHeader() {

    const pathname = useRouter().pathname.split('/')[2]
    const getActive = (value) => pathname === value ? 'success-bg' : 'ci'
    const { width } = useTheme()

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
        <div className={`df my bg py-2 ${width ? 'aic' : 'fdcr'}`}>
            <Tabs props={tabs} />
            <div className='f-1 df jce'>
                <Link href='/job/new' className='m-2'>
                    <button className='btn p-btn'>Post new job</button>
                </Link>
            </div>
        </div>)

}
