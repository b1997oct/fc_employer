import Button from '@/UW/Button'
import ServerFunction from '@/server'
import React, { useState } from 'react'

export default function Describe({ note, describe, app, onRes }) {

    let [data, setData] = useState(),
        [error, setError] = useState(),
        value = data == undefined ? note : data,
        onResponse = res => {
            setData()
            onRes(res)
        },
        application = ServerFunction('application', { setError, onResponse })

    function submit() {
        application(app, { note: data })
    }

    return (
        <div>
            <div className="bold">Application notes</div>
            <div className="text-xs">User, Recruiter, Team</div>
            <div className='ce'>{error}</div>
            <div className="df aie gap-2 max-w-md">
                <textarea onChange={e => setData(e.target.value)} placeholder='App notes' value={value} />
                <Button onClick={submit}>Update</Button>
            </div>
        </div>
    )
}
