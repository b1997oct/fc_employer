import useTableFetch from "@/Components/Hooks/useTableFetch";
import Modal from "@/Components/Modal";
import Link from "next/link";
import { useState } from "react";

export default function CompanyModal({ setData }) {
    const [open, setOpen] = useState('200')

    function handleData(res) {
        if (res.data) {
            const { address, company_name } = res.data
            let obj = { location: address, company_name }
            setData(prev => ({ ...prev, ...obj }))
            setOpen('')
        } else {
            setOpen('404')
        }
    }

    useTableFetch({ url: '/api/org', onResponse: handleData })



    return (
        <Modal open={open}>
            <div className="py">
                {open === '404' ?
                    <div className="df fdc jcc gap">
                        <h3 className="ce bold">Add Your Organization Details</h3>
                        <p className="caption">Company name and other details required for creating a job post so please add your company details before Job Posting</p>
                        <Link href='/org/profile'>
                            <button className="mt filled-btn w-full">Add +</button>
                        </Link>
                    </div>
                    : <h3 className="bold">Loading Your Company Details...</h3>}

            </div>
        </Modal>
    )
}
