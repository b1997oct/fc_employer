import React, { useEffect, useState } from 'react'
import { Avatar } from '../ViewUser'
import Link from 'next/link'
import ServerFunction from '@/server'
import useResponse from '@/UW/Hooks/useResponse'
import moment from 'moment'
import { AppStatus } from '@/app/status/Hook'

let init = { limit: 3, sort: { createdAt: 1 } }

export default function Applications({ job, user }) {

    let { data, setData, resetPagination, total, onResponse, pagination } = useResponse(init),
        [error, setError] = useState(),
        [loading, setLoading] = useState(),
        applications = ServerFunction('applications', { setLoading, onResponse, setError })

    useEffect(() => {
        job && applications(job, pagination, user)
    }, [job, user])

    return (
        <>
            <h4 className='mt-6'>{user && 'Other '} Applications</h4>
            <div className='grid gap overflow-auto'>
                {data.map(d => {
                    let { describe, _id, createdAt, status } = d,
                        { mobile, email, name, image } = d.user
                    return <Link href={`/application/${_id}`} className="border border-pc shadow rounded-xl bg p">
                        <div className='df ais gap'>
                            <Avatar src={image} title={name} />
                            <div className='w-full'>
                                <div className='df ais'>
                                    <h3 className='f-1'>{name}</h3>
                                    {AppStatus(status)}
                                </div>
                                <div className='text-sm'>{moment(createdAt).fromNow()}</div>
                                <div className=' text-stone-500'>
                                    <div>{mobile} | {email}</div>
                                </div>
                                {describe}
                                {/* <div className='df gap-2'>
                                    {['React', 'Express js', 'Next js', 'Web Developer'].map(d => <div className='border border-black cursor-default hover:bg-stone-200 px-2'>{d}</div>)}
                                </div> */}
                            </div>
                        </div>
                    </Link>
                })}
            </div>
            <div className='ce mt'>{error}</div>
            <div className='df aic jcsb'>
                Total : {total}
                <div className='df gap jce'>
                    {Array.from({ length: 3 }).map((d, i) => <button className={`bg bold aspect-square w-10 aic border border-pc ${!i ? 'bg-pc text-white' : ''}`}>{i + 1}</button>)}
                </div>
            </div>
        </>
    )
}
