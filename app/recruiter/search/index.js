'use client'
import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import TableResults from '@/UW/Table/TableResults'
import Th from '@/UW/Table/Th'
import React, { useEffect, useState } from 'react'
import useResponse from "@/UW/Hooks/useResponse"
import RecruiterModal from "../RecruiterModal"
import onUpdate from "@/UW/JS/Array/onUpdate"
import NoDataFound from "@/UW/NoDataFound"
import ServerFunction from "@/server"
import Adaptor from "@/UW/Adaptor"
import { configs } from "@/app/config"
import SearchWithOptions from "@/PagesComponents/SearchWithOptions"


let ths = [
    {
        child: 'Recruiter',
        name: 'name'
    },
    {
        child: 'Email',
        name: 'email'
    },
    {
        child: 'Contact',
        name: 'contact'
    },
    {
        child: 'Company',
        name: 'company'
    },
]

export default function Recruiter() {

    const { data, onResponse, setData, total,
        pagination, Pagination, resetPagination } = useResponse(),
        [loading, setLoading] = useState(true),
        [open, setOpen] = useState(),
        write = configs().write('recruiter'),
        [error, setError] = useState(),
        id = open?._id || 'new',
        { name = 'name', value, sort } = pagination,
        Rows = Adaptor(data),
        Ths = Adaptor(ths),
        recruiterSearch = ServerFunction('recruiterSearch', { setLoading, onResponse, setError })

    useEffect(() => {
        recruiterSearch(pagination)
    }, [pagination])

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    function Wrapper(d) {
        let { name, email, _id, mobile, companyTitle } = d
        return (
            <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                <td>{companyTitle}</td>
                {/* {write && <td>
                    <EditButton value={d} onClick={setOpen} />
                </td>} */}
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
        <div className="m-2 md:m">
            <RecruiterModal id={id} onClose={onClose} open={open} />
            <div className='gap md:fdr aie md:aic flex-col-reverse df mb'>
                <SearchWithOptions name={name} value={value} resetPagination={resetPagination} />
                {/* {write && <Button onClick={Tggr(setOpen, {})} className="rounded-full whitespace-nowrap">+ Create</Button>} */}
            </div>
            <TableResults className="bg p md:df jcsb" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={4} loading={loading}>
                <THead>
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

