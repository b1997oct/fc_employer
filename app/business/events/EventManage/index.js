import TopModal from '@/PagesComponents/TopModal'
import Button from '@/UW/Button'
import useErrors from '@/UW/Hooks/useErrors'
import Input from '@/UW/Input'
import ServerFunction from '@/server'
import React, { useState } from 'react'


let fields = [
    {
        name: 'name',
        label: 'Event Name',
        error: { min: 1, max: 80 }
    },
    {
        name: 'uid',
        label: 'Event ID',
        error: { min: 4, max: 50 }
    }
]

export default function EventManage({ id, open, onClose }) {

    let [error, setError] = useState(),
        [loading, setLoading] = useState(),
        touched = typeof loading == 'boolean',
        { data, inputParse, isFocus, setData } = useErrors(fields, open),
        Close = res => {
            setData({})
            onClose(res)
        }, close = !loading && Close,
        event = ServerFunction('event', { setError, setLoading, onResponse: onClose })

    function submit() {
        if (isFocus()) {
            setLoading(false)
            return
        }
        event(id, data)
    }
    return (
        <TopModal onClose={close} open={open}>
            <div className='m p bg'>
                {fields.map(d => <Input key={d.name} {...inputParse(d)} />)}
                <div className='ce mt'>{error}</div>
                <Button dissabled={loading} onClick={submit}>Submit</Button>
            </div>
        </TopModal>
    )
}
