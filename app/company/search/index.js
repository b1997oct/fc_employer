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
import CompanyModal from "./CompanyModal"
import onUpdate from "@/UW/JS/Array/onUpdate"
import ServerFunction from "@/server"
import useQuery from "@/UW/Hooks/useQuery"
import RoundedTab from "@/UW/Tab/RoundedTab"
import SearchBar from "@/UW/SearchBar"
import Link from "next/link"
import Adaptor from "@/UW/Adaptor"


export default function Companies() {

    const { data, onResponse, setData, total, pagination, Pagination, resetPagination } = useResponse(),
        [loading, setLoading] = useState(true),
        [open, setOpen] = useState(),
        [error, setError] = useState(),
        query = useQuery(),
        { tab = 'approved' } = query,
        id = open?._id || 'new',
        Rows = Adaptor(data),
        companySearch = ServerFunction('companySearch', { setLoading, onResponse, setError })

    useEffect(() => {
        companySearch(tab, pagination)
    }, [pagination, tab])

    function Wrapper(d) {
        const { functionalArea, _id, title, industry, category, businessNature, address } = d
        return (
            <tr>
                <td>@{_id.slice(0, 6)}</td>
                <td>{title}</td>
                <td>{industry}</td>
                <td>{functionalArea}</td>
                <td>{businessNature}</td>
                <td>{category}</td>
                <td className="max-w-xs">{address}</td>
                <td>
                    <EditButton value={d} onClick={setOpen} />
                </td>
            </tr>)

    }

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }


    return (
        <div className="m-2 md:m">
            <CompanyModal id={id} onClose={onClose} open={open} />
            <div className='gap md:fdr aie md:aic flex-col-reverse df'>
                <div className="w-full">
                    <SearchBar
                        onChange={e => resetPagination({ title: e.target.value })}
                        placeholder='Search'
                        className="bg-white" />
                </div>
                <Button onClick={Tggr(setOpen, {})} className="rounded-full whitespace-nowrap">+ Create</Button>
            </div>
            <Tabs tab={tab} />
            <TableResults className="df fdc md:fdr jcsb bg p" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={8} isData={data.length} loading={loading}>
                <THead>
                    <Th>ID</Th>
                    <Th>Company</Th>
                    <Th>Industry</Th>
                    <Th>Functional Area</Th>
                    <Th>Nature</Th>
                    <Th>Category</Th>
                    <Th>Address</Th>
                    <Th>Action</Th>
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length && <div className='df jcc mt-24 mb-32'><p>No Company Found</p></div>}
            <Pagination loading={loading} />
        </div>
    )


}

let tabs = ['approved', 'new']

function Tabs({ tab }) {

    let [data, setData] = useState({ approved: 0, new: 0 }),
        companyTabCount = ServerFunction('companyTabCount', { onResponse: setData })

    useEffect(() => {
        companyTabCount()
    }, [tab])

    return <div className="df jce gap m">
        {tabs.map(d => <Link key={d} replace href={'?tab=' + d}><RoundedTab active={tab == d} className="capitalize">{d} ({data[d]})</RoundedTab></Link>)}
    </div>
}