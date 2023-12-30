import EditButton from "@/Components/EditButton"
import useTableFetch from "@/Components/Hooks/useTableFetch"
import Table from "@/Components/Table"
import SlNo from "@/Components/Table/SlNo"
import THead from "@/Components/Table/THead"
import TRow from "@/Components/Table/TRow"
import TableFooter from "@/Components/TableFooter"
import moment from "moment"
import Router from "next/router"
import { useState } from "react"



const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Job', minWidth: 100 },
    { label: 'Posted on', minWidth: 100 },
    { label: 'Posted By', minWidth: 200 },
    { label: 'Status', minWidth: 140, },
    { label: 'Applicants', minWidth: 100 },
]
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
                                status='Active'
                            />)
                    })}
                </tbody>

            </Table>
            <TableFooter />

        </div>
    )
}


function TableRow({ index, job_role, updatedAt, posted_by, status, applicants, id, onEdit }) {
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
                {status}
            </td>
            <td>
                {applicants || 0}
            </td>
            <td>
                <EditButton
                    onClick={() => {
                        Router.push('/job/' + id)
                    }}
                />
            </td>
        </TRow>
    )
}