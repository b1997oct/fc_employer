
'use client'
import Layout from '@/PagesComponents/Layout'
import Button from '@/UW/Button'
import Tggr from '@/UW/JS/Trigger'
import SearchBar from '@/UW/SearchBar'
import React, { useEffect, useState } from 'react'
import ManageMail from './ManageMail'
import Adaptor from '@/UW/Adaptor'
import ServerFunction from '@/server'
import usePagination from '@/UW/Pagination/usePagination'
import useResponse from '@/UW/Hooks/useResponse'
import EditButton from '@/UW/Button/EditButton'
import moment from 'moment'
import TableResults from '@/UW/Table/TableResults'
import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import Th from '@/UW/Table/Th'
import Switch from '@/UW/Switch'
import onUpdate from '@/UW/JS/Array/onUpdate'
import { DeleteOutlined } from '@/UW/Icons'
import Menu from '@/UW/Menu'
import EmailLayout from '.'


let ths = [
    {
        child: 'Email',
        name: 'email'
    },
    {
        child: 'Events',
        name: 'events'
    },
    {
        child: 'Updated At',
        name: 'updatedAt'
    },
    {
        child: 'Status',
        name: 'active'
    },
    {
        child: 'Action'
    }
]

export default function Page() {

    let { data, onResponse, setData, total, resetPagination, Pagination, pagination } = useResponse(),
        { sort } = pagination,
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        [open, setOpen] = useState(),
        id = open?._id || 'new',
        Rows = Adaptor(data),
        Ths = Adaptor(ths),
        mailSearch = ServerFunction('mailSearch', { setLoading, onResponse, setError }),
        mailDel = ServerFunction('mail', {
            setError,
            setLoading,
            onResponse: () => location.reload()
        })

    useEffect(() => {
        mailSearch(pagination)
    }, [pagination])

    function onDelete(mid) {
        if (confirm('confirm delete')) {
            mailDel(null, null, mid)
        }
    }

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    function Wrapper(d) {
        const { email, updatedAt, active, _id, events } = d,
            onClick = () => setOpen(d)

        return (
            <tr>
                {/* <TableCheck value={_id} /> */}
                <td>{email}</td>
                <td>{events}</td>
                <td>{moment(updatedAt).fromNow()}</td>
                <td><Switch onClick={onClick} checked={active} /></td>
                <td>
                    <div className='df gap'>
                        <EditButton onClick={onClick} />
                        <button className='icon-btn' onClick={Tggr(onDelete, _id)}><DeleteOutlined size='22' /></button>
                    </div>
                </td>
            </tr>)

    }

    const onSort = val => {
        val = val && { sort: val }
        resetPagination(val)
    }
    function ThWrapper({ name, child }) {
        return <Th name={name} onChange={onSort} value={sort}>{child}</Th>
    }
    return (
        <EmailLayout active='Emails'>
            <ManageMail open={open} onClose={onClose} id={id} />
            <div className='df mb jcsb gap flex-col-reverse md:fdr'>
                <SearchBar onChange={e => resetPagination({ search: e.target.value })} placeholder='Search' />
                <div className='df jce'>
                    <Button onClick={Tggr(setOpen, {})}>+ Add</Button>
                </div>
            </div>

            <TableResults className="p md:df jcsb bg" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={6} loading={loading}>
                <THead>
                    {/* <TableCheckAll>{selected.length}</TableCheckAll> */}
                    {Ths(ThWrapper)}
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length && <div className='df jcc mt-24 mb-32'><p>No Data Found</p></div>}
            <Pagination />
        </EmailLayout>
    )
}
