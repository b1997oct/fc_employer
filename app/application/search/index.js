'use client'

import Button from "@/UW/Button"
import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import TableResults from '@/UW/Table/TableResults'
import Th from '@/UW/Table/Th'
import useCheckBox from '@/UW/Table/useCheckBox'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useResponse from "@/UW/Hooks/useResponse"
import SearchBar from "@/UW/SearchBar"
import onUpdate from "@/UW/JS/Array/onUpdate"
import ServerFunction from "@/server"
import { configs } from "@/app/config"
import Adaptor from "@/UW/Adaptor"
import { Edit } from "@/UW/Icons"
import Tooltip from "@/UW/Tooltip"
import StatusChange from "../StatusChange"
import Link from "next/link"
import useQuery from "@/UW/Hooks/useQuery"
import AppCards from "../AppCards"
import { AppStatus } from "@/app/status/Hook"



let ths = [
    {
        child: 'User'
    },
    {
        child: 'Job'
    },
    {
        child: 'Describe'
    },
    {
        child: 'Applied On',
        name: 'createdAt'
    },

    {
        child: 'Status',
        name: 'status'
    },
]

export default function Application() {

    const { data, onResponse, setData, total, resetPagination, Pagination, pagination } = useResponse({ status: 1 }),
        [loading, setLoading] = useState(true),
        [open, setOpen] = useState(),
        [error, setError] = useState(),
        config = configs(),
        { user, job } = useQuery(),
        write = config.write('application'),
        { sort } = pagination,
        id = open?._id || 'new',
        reset = () => location.href = '/application/search',
        { selected, TableCheck, TableCheckAll } = useCheckBox(data),
        Rows = Adaptor(data),
        Ths = Adaptor(ths),
        applicationSearch = ServerFunction('applicationSearch', { setLoading, onResponse, setError })

    useEffect(() => {
        applicationSearch({ ...pagination, job, user })
    }, [pagination, job, user])

    function Wrapper(d) {
        const { updatedAt, _id, job, user, status, describe } = d,
            { job_role, _id: jid } = job,
            { name, _id: uid } = user

        return (
            <tr>
                <TableCheck value={_id} />
                <td><Link className="a" href={_id}>#{_id.slice(-6)}</Link></td>
                <td>
                    <Link className="a" info={uid} fn='user' href={`?user=${uid}`}>
                        {name}
                    </Link>
                </td>
                <td className="max-w-xs">
                    <Link className="a" info={jid} fn='job' href={`?job=${jid}`}>
                        {job_role}
                    </Link>
                </td>
                <td className="max-w-xs">{describe}</td>
                <td className="whitespace-nowrap">
                    {moment(updatedAt).format('DD/MM hh:mm a')}
                </td>
                <td>{AppStatus(status)}</td>
                {write &&
                    <td>
                        <Tooltip content='Change Status'>
                            <button onClick={() => setOpen(d)} className="icon-btn"><Edit /></button>
                        </Tooltip>
                    </td>}
            </tr>)

    }

    const onSort = val => {
        val = val && { sort: val }
        resetPagination(val)
    }
    function ThWrapper({ name, child }) {
        return <Th name={name} onChange={name && onSort} value={sort}>{child}</Th>
    }

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    return (
        <>
            <AppCards />
            <StatusChange id={id} open={open} onClose={onClose} />
            <div className="m-2 md:m">
                <div className="my df jcsb">
                    <SearchBar
                        onChange={e => resetPagination({ search: e.target.value })}
                        placeholder="Search by Application ID" />
                    {(user || job) && <button onClick={reset}>Reset Filter</button>}
                </div>
                <TableResults className="p md:df jcsb bg" loading={loading} total={total} >
                    <div className="ce">{error}</div>
                </TableResults>
                <Table col={8} loading={loading}>
                    <THead>
                        <TableCheckAll>{selected.length}</TableCheckAll>
                        <Th>ID</Th>
                        {Ths(ThWrapper)}
                        {write && <Th>Action</Th>}
                    </THead>
                    {Rows(Wrapper)}
                </Table>
                {!loading && !data.length && <div className='df jcc mt-24 mb-32'><p>No Jobs Found</p></div>}
                <Pagination />
            </div>
        </>
    )
}
