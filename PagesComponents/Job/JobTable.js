import EditButton from "@/Components/EditButton"
import useTableFetch from "@/Components/Hooks/useTableFetch"
import Table from "@/Components/Table"
import SlNo from "@/Components/Table/SlNo"
import THead from "@/Components/Table/THead"
import TRow from "@/Components/Table/TRow"
import TableFooter from "@/Components/TableFooter"
import moment from "moment"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useState } from "react"



const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Job', minWidth: 100 },
    { label: 'Posted on', minWidth: 100 },
    { label: 'Posted By', minWidth: 100 },
    { label: 'Status', minWidth: 140 },
    { label: 'Applicants', minWidth: 100 },
]
const statusText = ['', 'Reviewing', 'Rejected']

export default function JobTable({ url }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [paination, setPagination] = useState({
        page: 1,
        limit: 24,
        sort_field: 'createdAt',
        sort: 1
    })

    useTableFetch({ url, setData, setLoading }, [paination])

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
                            />)
                    })}
                </tbody>

            </Table>
            <TableFooter />

        </div>
    )
}


function TableRow({ index, job_role, updatedAt, posted_by, status, publish, applicants, id }) {

    const r = useRouter()
    const closed = r.pathname.split('/')[2] === 'closed'

    if (status) {
        status = statusText[status]
    } else if (publish) {
        status = 'Live'
    } else {
        status = 'Closed'
    }

    return (
        <TRow>
            <td>
                <SlNo>{index + 1}</SlNo>
            </td>
            <td>
                {job_role}
            </td>
            <td>
                {moment(updatedAt).fromNow()}
            </td>
            <td>
                {posted_by}
            </td>
            <td>
                <div className="df aic gap">
                    <p className={`${publish === false ? 'ce' : 'cs'}`}>{status}</p>
                    {closed && <Link href={`/job/${id}?repost=yes`}><button>Repost ?</button></Link>}
                </div>

            </td>
            <td>
                {applicants || 0}
            </td>
            <td>
                <EditButton
                    onClick={() => {
                        r.push('/job/' + id)
                    }}
                />
            </td>
        </TRow>
    )
}