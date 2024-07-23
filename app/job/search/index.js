'use client'

import Button from "@/UW/Button"
import Table from '@/UW/Table'
import TableResults from '@/UW/Table/TableResults'
import Th from '@/UW/Table/Th'
import useCheckBox from '@/UW/Table/useCheckBox'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import EditButton from '@/UW/Button/EditButton'
import useResponse from "@/UW/Hooks/useResponse"
import Tggr from "@/UW/JS/Trigger"
import JobModal from "./JobModal"
import SearchBar from "@/UW/SearchBar"
import onUpdate from "@/UW/JS/Array/onUpdate"
import ServerFunction from "@/server"
import { configs } from "@/app/config"
import Adaptor from "@/UW/Adaptor"
import JobApprove from "./JobApprove"
import useQuery from "@/UW/Hooks/useQuery"
import Link from "next/link"
import THead from "@/UW/Table/THead"
import useStatuses from "@/app/status/Hook"


export default function Jobs() {

    const { isRecruiter, ...config } = configs(),
        write = config.write('job'),
        inactive = !(useQuery().tab != 'live'),
        THeadValues = [
            {
                child: 'Job ID',
            },
            {
                child: 'Live',
            },
            {
                child: 'Job Role',
                name: 'job_role'
            },
            {
                child: (isRecruiter || inactive) ? 'Salary' : 'Recruiter',
                name: inactive && 'salary'
            },
            {
                child: inactive ? 'Deadline' : 'Notes',
                name: inactive ? 'deadline' : 'notes'
            },
            {
                child: 'Posted On',
                name: 'updatedAt'
            },
            {
                child: 'Applicants',
                name: 'applicants'
            },
            {
                child: 'Status',
                name: 'active'
            }
        ],
        props = { write, inactive, THeadValues, isRecruiter }

    return <JobSearch {...props} />
}

function JobSearch({ write, inactive, THeadValues, isRecruiter }) {

    const { data, onResponse, setData, total, resetPagination, Pagination, pagination } = useResponse(),
        [loading, setLoading] = useState(true),
        [open, setOpen] = useState(),
        [error, setError] = useState(),
        [approve, setApprove] = useState(),
        statuses = useStatuses('job'),
        getStatus = sts => {
            sts = statuses.find(d => d._id == sts)
            if (!sts) {
                return { name: 'Reviewing', color: 'red' }
            }
            return sts.name
        },
        { sort } = pagination,
        id = open?._id || approve?._id || 'new',
        { selected, TableCheck, TableCheckAll } = useCheckBox(data),
        Rows = Adaptor(data),
        Ths = Adaptor(THeadValues),
        jobSearch = ServerFunction('jobSearch', { setLoading, onResponse, setError })



    useEffect(() => {
        jobSearch(pagination, inactive)
    }, [pagination, inactive])


    function Wrapper(d) {
        let { job_role, updatedAt, _id, deadline, applicants = 0, status, recruiter, notes, active, maxSalary, salary } = d,
            onClick = () => setOpen(d),
            approv = () => setApprove(d),
            { color, name } = getStatus(status)

        salary = `₹${salary} ${maxSalary ? ` to ₹${maxSalary}` : ''}`

        return (
            <tr>
                <TableCheck value={_id} />
                <td><Link href={`/application/xplore?job=${_id}`} className="a">#{_id.slice(0, 6)}</Link></td>
                <td><div onClick={approv} className={`w-3 border pointer border-black rounded-full aspect-square ${active ? 'bg-green-400' : 'bg-red-500'}`} /></td>
                <td className="max-w-64">{job_role}</td>
                <td className="max-w-36 truncate">
                    {(inactive || isRecruiter) ?
                        salary
                        : recruiter}
                </td>

                <td className={inactive ? '' : 'min-w-64'}>
                    {inactive ? (deadline || 'Person') : notes || '-'}
                </td>
                <td>
                    {moment(updatedAt).fromNow()}
                </td>
                <td className='max-w-32'>
                    {applicants ?
                        <Link href={'/application/search?job=' + _id} className="a">
                            {applicants}
                        </Link>
                        : applicants}
                </td>
                <td>
                    <button
                        onClick={approv}
                        style={{ color }}
                        className={`border hover w-32 rounded-none px-2`}>
                        {name}
                    </button>
                </td>
                {write &&
                    <td>
                        <div className='df jcc aic'>
                            <EditButton onClick={onClick} />
                        </div>
                    </td>}
            </tr>)

    }

    const onSort = val => {
        val = val && { sort: val }
        resetPagination(val)
    }
    function ThWrapper({ name, child }) {
        return <Th name={name} onChange={onSort} value={sort}>{child}</Th>
    }

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        open && setOpen()
        approve && setApprove()
    }


    return (
        <div className="md:m m-2">
            <JobApprove statuses={statuses} id={id} open={approve} onClose={onClose} />
            <JobModal id={id} onClose={onClose} open={open} />
            <div className='gap md:fdr aie mb md:aic flex-col-reverse df'>
                <div className="w-full">
                    <div className="f-1 w-full">
                        <SearchBar
                            onChange={e => resetPagination({ title: e.target.value })}
                            placeholder="Search by Job Title"
                        />
                    </div>
                </div>
                {write && <Button onClick={Tggr(setOpen, {})} className="rounded-full whitespace-nowrap mr">POST JOB</Button>}
            </div>
            <TableResults className="p md:df aic bg" loading={loading} total={total} >
                <div className="ce">{error}</div>
            </TableResults>
            <Table col={10} loading={loading}>
                <THead>
                    <TableCheckAll>{selected.length}</TableCheckAll>
                    {Ths(ThWrapper)}
                    {write && <Th>Action</Th>}
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length && <div className='df jcc mt-24 mb-32'><p>No Jobs Found</p></div>}
            <Pagination />
        </div>
    )
}
