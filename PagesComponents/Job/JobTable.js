import EditButton from "@/Components/EditButton"
import useTableFetch from "@/Components/Hooks/useTableFetch"
import Pagination from "@/Components/Pagination"
import usePagination from "@/Components/Pagination/usePagination"
import Table from "@/Components/Table"
import THead from "@/Components/Table/THead"
import TRow from "@/Components/Table/TRow"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import JobStatus from "./JobStatus"
import Job from "."
import TableResults from "@/Components/Table/TableResults"
import Checkbox from "@/Components/Checkbox"
import ExportToXl from "@/Components/ExportToXL"



const h = [
    { label: 'Job', minWidth: 100 },
    { label: 'Details', minWidth: 100 },
    { label: 'Posted By', minWidth: 100 },
    { label: 'Status', maxWidth: 100, textAlign: 'center' },
    { label: 'Applicants', maxWidth: 50 },
    { maxWidth: 100 },
]

export default function JobTable({ url, body }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = usePagination()
    const [check, setCheck] = useState([])
    const [pending, setPending] = useState()

    const path = useRouter().pathname.split('/')[2]

    useTableFetch(url, { ...pagination, ...body }, { setData, setLoading, setTotal }, [pagination])

    function handleExport() {
        setPending(true)
        let f = data.filter(d => check.includes(d._id))
        f = f.map(d => {
            const { _id, company_logo, company, ...row } = d
            row.jobId = _id
            return row
        })
        ExportToXl(f)
        setPending(false)
    }

    function handleCheckAll(e) {
        const { checked } = e.target
        let f = []
        if (checked) {
            f = data.map(d => d._id)
        }
        setCheck(f)
    }

    function onChange(val) {
        const f = data.map(d => {
            if (d._id === val._id) {
                d = { ...d, ...val }
            }
            return d
        })
        setData(f)
    }

    const { limit } = pagination

    return (
        <div>
            <TableResults
                loading={loading}
                total={total}
                length={check.length}
                onClick={handleExport}
                disable={pending}
            />
            <Table
                col={h.length + 1}
                loading={loading}
                nodata={!loading && !data.length}
            >
                <THead>
                    <th className='df jcc p'>
                        <Checkbox
                            checked={data.length && data.length === check.length}
                            onChange={handleCheckAll}
                        />
                    </th>
                    {h.map(d => {
                        const { label, ...styles } = d
                        return <td key={label} style={styles}>{label}</td>
                    })}
                </THead>
                <tbody>
                    {data.map((dat, i) => {
                        const page = i && i % limit === 0
                        return (
                            <TableRow
                                key={i}
                                {...dat}
                                index={i}
                                id={dat._id}
                                page={page && i / limit}
                                path={path}
                                onChange={onChange}
                                setCheck={setCheck}
                                check={check}
                            />)
                    })}
                </tbody>

            </Table>
            <Pagination
                pagination={{ ...pagination, total }}
                setPagination={setPagination}
            />

        </div>
    )
}


function TableRow({
    id,
    page,
    job_role, updatedAt, location,
    job_type,
    total_openings,
    experience,
    salary,
    admin_posted,
    status,
    publish,
    path,
    applicants,
    onChange,
    setCheck,
    check }) {

    const closed = path === 'closed'

    const checked = check.includes(id)

    function onCheck(e) {
        const { value } = e.target
        let f
        if (checked) {
            f = check.filter(d => d !== value)
        } else {
            f = [...check, value]
        }
        setCheck(f)
    }

    return (
        <>
            {page ?
                <tr className="seperator">
                    <td colSpan={50} className="tac p-2">
                        Page : {page + 1}
                    </td>
                </tr> : null}
            <TRow>
                <td>
                    <div className="df jcc">
                        <Checkbox
                            checked={checked}
                            onChange={onCheck}
                            value={id}
                        />
                    </div>
                </td>
                <td>
                    <Job
                        job_role={job_role}
                        id={id}
                        updatedAt={updatedAt}
                        caption={`Total openings ${total_openings} | ${job_type}`}
                    />
                </td>
                <td>
                    <div>
                        <div>{salary}</div>
                        <div>{experience}</div>
                        <div>{location == '1' ? 'Remote' : location}</div>
                    </div>
                </td>
                <td>
                    {admin_posted ? 'Admin' : 'Company'}
                </td>
                <td>
                    <JobStatus
                        id={id}
                        onChange={onChange}
                        status={status ? status : publish}
                    />
                </td>
                <td>
                    <div className='tac'>
                        <Link href={'/candidate/s?status=withdrawn-hold-inactive-rejected-selected-interview-shortlisted&job=' + id} className="a">{applicants || 0}</Link>
                    </div>
                </td>
                <td>
                    <div className="tac">
                        <Link href={`/job/${id}${closed ? '?repost=yes' : ''}`}>
                            {closed ? <button className="nowrap">Repost ?</button> : <EditButton />}
                        </Link>
                    </div>
                </td>
            </TRow>
        </>
    )
}