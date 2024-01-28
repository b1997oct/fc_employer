import ClickAwayListener from '@/Components/ClickAwayListener'
import { PUT } from '@upgradableweb/client'
import { useState } from 'react'

const statusText = ['', 'Reviewing', 'Rejected']
const items = ['Closed']

export default function JobStatus({ status, id, onChange }) {

    const [open, setOpen] = useState(false)

    if (typeof status === 'boolean') {
        status = status ? 'Live' : 'Closed'
    } else {
        status = statusText[status]
    }
    const toggle = () => setOpen(!open)

    function onStatus() {
        const py = { id }
        py.$unset = { status: 1 }
        py.publish = false
        PUT('/api/job/status', py)
            .then(res => {
                alert('status change success fully')
                if (!res.data.status) {
                    res.data.status = undefined
                }
                onChange(res.data)
                setOpen(false)
            })
            .catch(err => {
                alert(err.message)
            })
    }

    const sts = items.map((d, i) => {
        const sel = status === d
        return (
            <div key={i} className='p'>
                <button
                    disabled={sel}
                    onClick={() => onStatus(i)}
                    className='text-btn df aic gap-2'>
                    <input
                        readOnly
                        disabled={sel}
                        checked={sel}
                        type='radio'
                    />
                    {d}
                </button>
            </div>)
    })

    return (
        <div className="df aic jcc gap relative">
            {open &&
                <ClickAwayListener
                    onClickAway={() => setOpen(false)}
                    style={{ zIndex: 10, top: 32 }}
                    className='absolute bg shadow rounded-sm'>
                    {sts}
                </ClickAwayListener>}
            <button
                onClick={toggle}
                style={{ width: 100,  }}
                className={`${status === 'Live' ? 'cs' : 'ce'} bg bold border py-1 relative`}>
                {status}
            </button>
        </div>
    )
}
