import React, { useState } from 'react'
import StatusChange from '../../StatusChange'
import Button from '@/UW/Button'
import Tggr from '@/UW/JS/Trigger'

export default function AppStatus({ status, describe, name, id }) {

    let [open, setOpen] = useState()
    // statuses = useStatuses('application'),

    return (
        <div>
            <StatusChange id={id} open={open} onClose={setOpen} />
            <div className="df jcsb">
                <span>Current Status: {status}</span>
                <Button variant="outlined" onClick={Tggr(setOpen, { name, describe, status })}>Update Status</Button>
            </div>
        </div>
    )
}
