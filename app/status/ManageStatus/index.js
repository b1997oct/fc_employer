import Closer from '@/PagesComponents/Closer'
import TopModal from '@/PagesComponents/TopModal'
import Button from '@/UW/Button'
import useErrors from '@/UW/Hooks/useErrors'
import Input from '@/UW/Input'
import Checkbox from '@/UW/Input/Checkbox'
import onChange from '@/UW/JS/onChange'
import ServerFunction from '@/server'
import React, { useState } from 'react'

let fields = [
    {
        label: "Name",
        name: "name",
        pl: "eg: Interview, Hold",
        error: { min: 1, max: 50 },
    },
    {
        label: "Sort Order",
        name: "sort",
        pl: "any number",
        type: 'tel'
    },
    {
        name: 'color'
    },
    {
        label: 'Team',
        name: 'team'
    },
    {
        label: 'Recruiter',
        name: 'recruiter'
    },
    {
        label: 'User',
        name: 'user'
    }
]
export default function ManageStatus({ type, id, open, onClose }) {

    let [loading, setLoading] = useState(),
        [error, setError] = useState(),
        touched = loading != undefined,
        { data, inputParse, setData, isFocus, values } = useErrors(fields, open),
        valueGetter = name => {
            let val = values[name]
            val = name == 'color' ? { value: val } : { checked: Boolean(val) }
            return { name, ...val, onChange: onChange(setData) }
        },
        onResponse = res => {
            onClose(res)
            setData({})
        }, close = !loading && onResponse,
        status = ServerFunction('status', { setError, setLoading, onResponse })

    function submit() {
        if (isFocus()) {
            setLoading(false)
            return
        }
        data.type = type
        status(id, data)
    }

    return (
        <TopModal open={open} onClose={close}>
            <div className='m p bg'>
                {fields.slice(0, 2).map(d => <Input autoComplete='off' touched={touched} key={d.name} {...inputParse(d)} />)}
                <div className='aic mt df gap'>
                    <input className='h-12 w-12' type='color' {...valueGetter('color')} /> Color
                </div>
                <div className='grid grid-cols-3 my'>
                    {fields.slice(3).map(d => <Checkbox key={d.name} {...valueGetter(d.name)} >{d.label}</Checkbox>)}
                </div>

                <div className='df jcsb gap'>
                    <div className='ce'>{error}</div>
                    <Button onClick={submit}>Submit</Button>
                </div>
            </div>
        </TopModal>
    )
}
