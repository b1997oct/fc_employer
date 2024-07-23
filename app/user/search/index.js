'use client'

import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import TableResults from '@/UW/Table/TableResults'
import Th from '@/UW/Table/Th'
import React, { useEffect, useState } from 'react'
import useResponse from "@/UW/Hooks/useResponse"
import onUpdate from "@/UW/JS/Array/onUpdate"
import NoDataFound from "@/UW/NoDataFound"
import ServerFunction from "@/server"
import Adaptor from "@/UW/Adaptor"
import { configs } from "@/app/config"
import SearchWithOptions from "@/PagesComponents/SearchWithOptions"
import moment from 'moment'
import useCheckBox from '@/UW/Table/useCheckBox'
import Link from 'next/link'

let ths = [
    {
        child: 'User',
        name: 'name'
    },
    // {
    //     child: 'Email',
    //     name: 'email'
    // },
    // {
    //     child: 'Contact',
    //     name: 'contact'
    // },
    {
        child: 'Joined On',
        name: 'createdAt'
    },
    {
        child: 'Designation',
        name: 'designation'
    },
    {
        child: 'Applied Jobs',
        name: 'appliedjobs'
    },
    {
        child: 'Referral',
        name: 'referral'
    },
]

export default function Users() {

    const { data, onResponse, setData, total,
        pagination, Pagination, resetPagination } = useResponse(),
        [loading, setLoading] = useState(true),
        // write = configs().write('user'),
        { selected, TableCheck, TableCheckAll } = useCheckBox(data),
        [error, setError] = useState(),
        { name = 'name', value, sort } = pagination,
        Rows = Adaptor(data),
        Ths = Adaptor(ths),
        userSearch = ServerFunction('userSearch', { setLoading, onResponse, setError })

    useEffect(() => {
        userSearch(pagination)
    }, [pagination])

    function Wrapper(d) {
        let { name, email, _id, mobile, createdAt, designation, appliedjobs, referral } = d
        return (
            <tr key={_id}>
                <TableCheck value={_id} />
                <td>{name}</td>
                {/* <td>{email}</td>
                <td>{mobile}</td> */}
                <td>
                    {moment(createdAt).fromNow()}
                </td>
                <td>{designation || '-'}</td>
                <td>{appliedjobs ? <Link className='a' href={`/application/search?user=${_id}`}>{appliedjobs}</Link> : 0}</td>
                <td>{referral}</td>

                {/* {write && <td>
                    <EditButton value={d} onClick={setOpen} />
                </td>} */}
            </tr>)
    }

    const onSort = val => {
        val = val ? { sort: val, name, value } : undefined
        resetPagination(val)
    }
    function ThWrapper({ name, child }) {
        return <Th name={name} onChange={onSort} value={sort}>{child}</Th>
    }

    return (
        <div className="m-2 md:m">
            {/* <RecruiterModal id={id} onClose={onClose} open={open} /> */}
            <div className='gap md:fdr aie md:aic flex-col-reverse df mb'>
                <SearchWithOptions name={name} value={value} resetPagination={resetPagination} />
                {/* {write && <Button onClick={Tggr(setOpen, {})} className="rounded-full whitespace-nowrap">+ Create</Button>} */}
            </div>
            <TableResults className="bg p md:df jcsb" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={6} isData={data.length} loading={loading}>
                <THead>
                    <TableCheckAll />
                    {Ths(ThWrapper)}
                    {/* {write && <Th>Action</Th>} */}
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length && <NoDataFound>No Data Found</NoDataFound>}
            <Pagination loading={loading} />
        </div>
    )
}

