'use client'

import Button from "@/UW/Button"
import usePagination from '@/UW/Pagination/usePagination'
import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import TableResults from '@/UW/Table/TableResults'
import Th from '@/UW/Table/Th'
import React, { useEffect, useState } from 'react'
import EditButton from '@/UW/Button/EditButton'
import useResponse from "@/UW/Hooks/useResponse"
import Tggr from "@/UW/JS/Trigger"
import TeamModal from "../TeamModal"
import SearchBar from "@/UW/SearchBar"
import onUpdate from "@/UW/JS/Array/onUpdate"
import NoDataFound from "@/UW/NoDataFound"
import ServerFunction from "@/server"
import Adaptor from "@/UW/Adaptor"
import { configs } from "@/app/config"

export default function Team() {

    const { data, onResponse, setData, total,
        pagination, Pagination, resetPagination } = useResponse({ sort: { name: 1 } }),
        [loading, setLoading] = useState(true),
        [open, setOpen] = useState(),
        write = true || configs().write('team'),
        [error, setError] = useState(),
        id = open?._id || 'new',
        teamSearch = ServerFunction('teamSearch', { setLoading, onResponse, setError }),
        Rows = Adaptor(data)

    useEffect(() => {
        teamSearch(pagination)
    }, [pagination])

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    function Wrapper(d) {
        let { name, email, mobile } = d
        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                {write && <td>
                    <EditButton value={d} onClick={setOpen} />
                </td>}
            </tr>)
    }

    return (
        <div className="m-2 md:m">
            <TeamModal id={id} onClose={onClose} open={open} />
            <div className='gap md:fdr aie md:aic flex-col-reverse df mb'>
                <div className="w-full">
                    <SearchBar placeholder='Search Recruiter' />
                </div>
                {write && <Button onClick={Tggr(setOpen, {})} className="rounded-full whitespace-nowrap">+ Create</Button>}
            </div>
            <TableResults className="bg p md:df jcsb" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={4} loading={loading}>
                <THead>
                    <Th>Recruiter</Th>
                    <Th>Email</Th>
                    <Th>Contact</Th>
                    {write && <Th>Action</Th>}
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length && <NoDataFound>No Data Found</NoDataFound>}
            <Pagination />
        </div>
    )
}
