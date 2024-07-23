'use client'
import Layout from '@/PagesComponents/Layout'
import useResponse from '@/UW/Hooks/useResponse'
import ServerFunction from '@/server'
import React, { useEffect, useState } from 'react'
import EventManage from './EventManage'
import onUpdate from '@/UW/JS/Array/onUpdate'

export default function Page() {

    let { data, onResponse, setData, total, resetPagination, Pagination, pagination } = useResponse(),
        { sort } = pagination,
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        [open, setOpen] = useState(),
        id = open?._id || 'new',
        eventSearch = ServerFunction('eventSearch', { setLoading, onResponse, setError })

    useEffect(() => {
        eventSearch(pagination)
    }, [pagination])

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    return (
        <Layout active='Settings'>
            <EventManage id={id} onClose={onClose} open={open} />
            <div className='m-2 md:m'>
                <div className='grid grid-cols-3 gap-2 bold'>
                    <div className='bg-stone-100 p rounded-md'>Event Name</div>
                    <div className='bg-stone-100 p rounded-md'>Event ID</div>
                    <div className='bg-stone-100 p rounded-md'>Actions</div>
                </div>
                {loading && 'Loading...'}
                {data.map(d => {
                    let { name, uid } = d
                    return <div onClick={() => setOpen({})} className='bg mt-2 grid grid-cols-3 p gap border rounded-lg hover:shadow'>
                        <div >{name}</div>
                        <div>{uid}</div>
                        <div className='tac'>0</div>
                    </div>
                })}

            </div>
        </Layout>
    )
}
