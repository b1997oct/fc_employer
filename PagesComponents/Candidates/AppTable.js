import useTableFetch from "@/Components/Hooks/useTableFetch";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import THead from "@/Components/Table/THead";
import TRow from "@/Components/Table/TRow";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppStatus from "./AppStatus";
import Profile from "./Profile";
import TableResults from "@/Components/Table/TableResults";
import Job from "../Job";

const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Candidate', minWidth: 200, paddingLeft: 30 },
    { label: 'Job', minWidth: 250, },
    { label: 'Updated On', maxWidth: 100 },
    { label: 'Status', minWidth: 100, textAlign: 'center' }
]

export default function AppTable({ pagination, setPagination }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [start, setStart] = useState(false)
    const [total, setTotal] = useState(0)

    const r = useRouter()

    useEffect(() => {
        setTimeout(() => setStart(true), 1000)
    }, [])

    useTableFetch(start && '/api/candidate/all', { ...pagination, ...r.query }, { setData, setLoading, setTotal }, [pagination, r.query])

    function onChange(res) {
        const f = data.map(d => {
            if (d._id === res.data._id) {
                const { status, reason, hold, updatedAt } = res.data
                d = { ...d, status, reason, hold, updatedAt }
            }
            return d
        })
        setData(f)
    }

    const { limit } = pagination

    return (
        <div className="mt border">
            <TableResults
                loading={loading}
                total={total}
            />
            <Table
                col={h.length}
                loading={loading}
                nodata={!loading && !data.length}
                className='table-hight scroll'
            >
                <THead fields={h} />
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
                                onChange={onChange}
                            />)
                    })}
                </tbody>
            </Table>

            <Pagination
                setPagination={setPagination}
                pagination={{ ...pagination, total }}
            />
        </div>
    )
}


function TableRow({ page, user, job, status, updatedAt, index, onChange, id, hold, reason }) {
    const { name, image, mobile, email } = user
    const { job_role, salary,  } = job

    return (
        <>
            {page ?
                <tr className="seperator">
                    <td colSpan={h.length} className="tac p-2">
                        Page : {page + 1}
                    </td>
                </tr> : null}
            <TRow>
                <td>
                    <div className="tac">{index + 1}</div>
                </td>
                <td style={{ maxWidth: 300 }}>
                    <Profile
                        email={email}
                        image={image}
                        mobile={mobile}
                        name={name}
                        id={user._id}
                    />
                </td>
                <td>
                    <Job
                        job_role={job_role}
                        salary={salary}
                        id={job._id}
                        updatedAt={job.updatedAt}
                    />
                </td>
                <td>
                    {moment(updatedAt).fromNow()}
                </td>
                <td >
                    <AppStatus
                        status={status}
                        id={id}
                        onChange={onChange}
                        hold={hold}
                        reason={reason}
                    />
                </td>

            </TRow>
        </>)
}