import EditButton from "@/Components/EditButton"
import useTableFetch from "@/Components/Hooks/useTableFetch"
import Modal from "@/Components/Modal"
import Table from "@/Components/Table"
import SlNo from "@/Components/Table/SlNo"
import THead from "@/Components/Table/THead"
import TRow from "@/Components/Table/TRow"
import TableFooter from "@/Components/TableFooter"
import moment from "moment"
import { useState } from "react"
import ApprovedModal from "./ApprovedModal"



const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Name', minWidth: 140 },
    { label: 'Uid', minWidth: 100 },
    { label: 'Mobile', minWidth: 200 },
    { label: 'Email', minWidth: 140, },
    { label: 'Approved', minWidth: 140, },
    { label: 'Posted Jobs', minWidth: 200 },
    {},
]
export default function ApprovedTable() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [paination, setPagination] = useState({
        page: 1,
        limit: 24,
        sort_field: 'createdAt',
        sort: 1
    })
    const [open, setOpen] = useState(false)

    useTableFetch({ url: '/api/employer/all', setData, setLoading }, [paination])

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
                                onEdit={() => setOpen(dat)}
                            />)
                    })}
                </tbody>

            </Table>
            <TableFooter />
            <ApprovedModal
                open={open}
                onClose={() => setOpen(null)}
            />
        </div>
    )
}


function TableRow({ index, name, uid, mobile, email, jobs, createdAt, id, onEdit }) {
    return (
        <TRow>
            <td>
                <SlNo>{index + 1}</SlNo>
            </td>
            <td>
                {name}
            </td>
            <td>
                {uid}
            </td>
            <td>
                {mobile}
            </td>
            <td>
                {email}
            </td>
            <td>
                {moment(createdAt).fromNow()}
            </td>
            <td>
                {jobs}
            </td>
            <td>
                <EditButton
                    value={id}
                    onClick={onEdit}
                />
            </td>
        </TRow>
    )
}