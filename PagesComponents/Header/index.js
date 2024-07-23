'use client'
import Link from 'next/link'
import { User } from '@/UW/Icons'
import { configs } from '@/app/config'

export const navigates = ({ job, company, recruiter, application, settings, team = 3, user }) => {
    let all = [
        {
            title: 'Jobs',
            path: '/job/search',
            isAuth: job
        },
        {
            title: 'Applications',
            path: '/application/search',
            isAuth: application

        },
        {
            title: 'Company',
            path: '/company/search',
            isAuth: company
        },
        {
            title: 'Recruiter',
            path: '/recruiter/search',
            isAuth: recruiter
        },
        {
            title: 'Users',
            path: '/user/search',
            isAuth: user
        },
        {
            title: 'Team',
            path: '/team/search',
            isAuth: team
        },
        {
            title: 'Settings',
            path: '/settings',
            isAuth: settings
        }
    ]

    return all.filter(d => d.isAuth)
}

export default function Header({ active = 'Jobs' }) {

    let config = configs()

    return (
        <div className='pb-8'>
            <div className='df gap-2 border-b-2 px-2 fixed top-0 w-full z-[100] bg'>
                <h2 className='cp font-bold f-1'>
                    <Link href='/'>Firstcareer</Link>
                </h2>
                {navigates(config).map(d => <Link key={d.path} href={d.path} className={`hover hidden md:df px-2 aic text-xl ${active === d.title ? 'cp underline' : ''}`} >{d.title}</Link>)}
                <Link href='/navigation'>
                    <button className={`hover px-2 text-xl ${active === 'User' ? 'cp' : ''}`}><User /></button>
                </Link>
            </div>
        </div>
    )
}
