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
import Checkbox from "@/Components/Checkbox";
import ExportToXl from "@/Components/ExportToXL";
import Status from "./Status";

const h = [
    { label: 'Candidate', minWidth: 200, paddingLeft: 30 },
    { label: 'Job', minWidth: 250, },
    { label: 'Updated On', maxWidth: 100 },
    { label: 'Status', minWidth: 100, textAlign: 'center' }
]

export default function AppTable({ pagination, setPagination }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [check, setCheck] = useState([])
    const [pending, setPending] = useState()

    const r = useRouter()

    useTableFetch(r.isReady && '/api/candidate/all', { ...pagination, ...r.query }, { setData, setLoading, setTotal }, [pagination, r.query])

    function handleExport() {
        setPending(true)
        let f = data.filter(d => check.includes(d._id))
        f = f.map(d => {
            const { _id, user, job, status } = d
            const row = { application_id: _id, ...user, ...job }
            row.status = Status(status)
            delete row.createdAt
            delete row._id
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
                length={check.length}
                onClick={handleExport}
                disable={pending}
            />
            <Table
                col={h.length + 1}
                loading={loading}
                nodata={!loading && !data.length}
                className='table-hight scroll'
            >
                <THead>
                    <th className='df jcc p'>
                        <Checkbox
                            checked={data.length && data.length === check.length}
                            onChange={handleCheckAll}
                        />
                    </th>
                    {
                        h.map(d => {
                            const { label, ...styles } = d
                            return <td key={label} style={styles}>{label}</td>
                        })
                    }
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
                                onChange={onChange}
                                setCheck={setCheck}
                                check={check}
                            />)
                    })}
                </tbody>
            </Table>

            <Pagination
                setPagination={setPagination}
                pagination={{ ...pagination, total }}
            />
        </div >
    )
}


function TableRow({ page, user, job, status, updatedAt, onChange, id, hold, reason, setCheck, check }) {
    const { name, image, mobile, email } = user
    const { job_role, salary, } = job

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