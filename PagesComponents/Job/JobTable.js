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



const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Job', minWidth: 100 },
    { label: 'Details', minWidth: 100 },
    { label: 'Posted By', minWidth: 100 },
    { label: 'Status', maxWidth: 100, textAlign: 'center' },
    { label: 'Applicants', maxWidth: 50 },
    { maxWidth: 100 },
]

export default function JobTable({ url }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [paination, setPagination] = usePagination()

    const path = useRouter().pathname.split('/')[2]

    useTableFetch(url, paination, { setData, setLoading, setTotal }, [paination])

    function onChange(val) {
        const f = data.map(d => {
            if (d._id === val._id) {
                d = { ...d, ...val }
            }
            return d
        })
        setData(f)
    }

    return (
        <div>
            <Table
                col={h.length}
                loading={loading}
                nodata={!loading && !data.length}
            >
                <THead fields={h} />
                <tbody>
                    {data.map((dat, i) => {
                        return (
                            <TableRow
                                key={i}
                                {...dat}
                                index={i}
                                id={dat._id}
                                path={path}
                                onChange={onChange}
                            />)
                    })}
                </tbody>

            </Table>
            <Pagination
                pagination={{ ...paination, total }}
                setPagination={setPagination}
            />

        </div>
    )
}


function TableRow({ id, index, job_role, updatedAt, location, experience, salary, admin_posted, status, publish, path, applicants, onChange }) {

    const closed = path === 'closed'

    return (
        <TRow>
            <td>
                <p className="p tac">{index + 1}</p>
            </td>
            <td>
                <Job
                    job_role={job_role}
                    id={id}
                    updatedAt={updatedAt}
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
                <p className="tac">{applicants || 0}</p>
            </td>
            <td>
                <div className="tac">
                    <Link href={`/job/${id}${closed ? '?repost=yes' : ''}`}>
                        {closed ? <button className="nowrap">Repost ?</button> : <EditButton />}
                    </Link>
                </div>
            </td>
        </TRow>
    )
}