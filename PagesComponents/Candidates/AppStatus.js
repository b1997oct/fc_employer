import Status from "./Status";
import { useEffect, useState } from "react";
import AllStatuses from "./AllStatuses";
import BottomDrawer from "@/Components/Drawer/BottomDrawer";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { PUT } from "@upgradableweb/client";

let links = [
    'Applied',
    'Viewed',
    'Short Listed',
    'Interviw',
    'Selected',
    'Rejected',
    'Inactive',
    'Hold',
    'Withdraw'
]

links = links.map(d => {
    return { label: d, value: d.replace(' ', '').toLowerCase() }
})

export default function AppStatus(py) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const { status, onChange, id } = py

    const statusText = Status(status)

    const cn = status <= 2 ? 'outlined-chip-p' : status < 6 ? 'filled-chip-s' : 'filled-chip-e'

    function submit() {
        const onResponse = (res) => {
            onChange(res);
            cancel()
        }
        const onError = ({ message }) => {
            alert(message)
        }
        PUT('/api/candidate/status', { ...data, id }, { onResponse, setLoading, onError })
    }

    function handleChange(e) {
        let { name, value, checked } = e.target
        if (name === 'hold') {
            value = checked
        }
        setData({ ...data, [name]: value })
    }

    function cancel() {
        setData({})
        setOpen(false)
    }

    const ValueGetter = (name) => typeof data[name] !== 'undefined' ? data[name] : py[name]

    return (
        <div>
            <div className="tac">
                <button onClick={() => setOpen(true)} className={`chip hover ${cn}`}>
                    {statusText}
                </button>
            </div>

            <BottomDrawer
                open={open}
                onClose={!loading && setOpen}>
                <b>Current Status : <span className="capitalize cp">{statusText}</span></b>
                <br />
                <br />
                <AllStatuses
                    status={ValueGetter('status')}
                    setChange={setData}
                />
                <br />
                {/* <Checkbox
                    onChange={handleChange}
                    label='Any Problem with the candidate? (Hold Application)'
                    name='hold'
                    checked={ValueGetter('hold')}
                /> */}
                <Input
                    label='Status Updating Reason'
                    placeholder='Notes'
                    className="my"
                    name='reason'
                    onChange={handleChange}
                    value={ValueGetter('reason')}
                />
                <div className="df jce gap aic mb">
                    <button onClick={cancel} className="text-btn">Cancel</button>
                    <button className="btn" disabled={loading} onClick={submit}>Submit</button>
                </div>
            </BottomDrawer>
        </div>
    )

}
