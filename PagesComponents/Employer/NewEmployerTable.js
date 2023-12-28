import EditButton from "@/Components/EditButton"
import Modal from "@/Components/Modal"
import Table from "@/Components/Table"
import THead from "@/Components/Table/THead"
import TRow from "@/Components/Table/TRow"
import TableFooter from "@/Components/TableFooter"
import Tooltip from "@/Components/Tooltip"
import { POST } from "@upgradableweb/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import ModalEnroll from "./ModalEnroll"
import useTableFetch from "@/Components/Hooks/useTableFetch"
import SlNo from "@/Components/Table/SlNo"

const h = [
    { label: 'No.', minWidth: 60, textAlign: 'center' },
    { label: 'Person Name', minWidth: 140 },
    { label: 'Company', minWidth: 200 },
    { label: 'Industry', minWidth: 140, },
    { label: 'Mobile', minWidth: 100, },
    { label: 'Email', minWidth: 100, },
    { label: 'Address', minWidth: 200 },
    { label: '' },
]
export default function NewEmployerTable() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [paination, setPagination] = useState({
        page: 1,
        limit: 24,
        sort_field: 'createdAt',
        sort: 1
    })
    const [open, setOpen] = useState('')


    useTableFetch({ url: '/api/enroll/new', setData, setLoading }, [paination])

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
                                index={i}
                                id={dat._id}
                                {...dat}
                                onEdit={setOpen}
                            />)
                    })}
                </tbody>
            </Table>
            <TableFooter />
            <Modal
                open={open}
                onClose={() => setOpen('')}
                className='zoomIn'
            >
                <ModalEnroll
                    props={data.find(d => d._id === open) || {}}
                    onSuccess={() => setOpen('')}
                    onDelete={(val) => {
                        let f = data.filter(d => d._id !== val.data._id)
                        setOpen('')
                        setData(f)
                    }}
                />
            </Modal>
        </div>
    )
}

function TableRow({ id, index, name, company_name, industry, address, mobile, email, onEdit }) {

    return (
        <TRow>
            <td>
                <SlNo>{index + 1}</SlNo>
            </td>
            <td>
                {name}
            </td>
            <td>
                {company_name}
            </td>
            <td>
                {industry}
            </td>

            <td>
                <Link href={`tel:${mobile}`} className="text-btn" >{mobile}</Link>
            </td>
            <td>
                <Tooltip content={email}>
                    <div style={{ width: 100 }} className="nowrap">
                        {email}
                    </div>
                </Tooltip>
            </td>
            <td>
                {address}
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