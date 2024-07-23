import ConfirmModal from '@/PagesComponents/ConfirmModal';
import TopModal from '@/PagesComponents/TopModal';
import Button from '@/UW/Button';
import FormField from '@/UW/FormField';
import useErrors from '@/UW/Hooks/useErrors'
import Input from '@/UW/Input';
import ServerFunction from '@/server';
import React, { useState } from 'react'
import useEvents from '../../events/Hook';
import onAssign from '@/UW/JS/onAssign';
import { useEmails } from '..';
import onChange from '@/UW/JS/onChange';



let fields = [
    {
        name: 'event',
        error: { min: 1 }
    },
    {
        name: 'from',
        error: { min: 1 }
    },
    {
        name: 'fromTitle',
        label: 'From title',
        pl: 'we@company.com - Software services'
    },
    {
        name: 'subject',
        label: 'Email subject*',
        pl: 'Subject',
        error: { min: 3, max: 200 }
    },
    {
        name: 'html',
        label: 'Email content*',
        error: { min: 1, max: 10000 }
    }
]


export default function ManageTemplate({ id, open, onClose }) {

    let [error, setError] = useState(),
        [loading, setLoading] = useState(),
        touched = typeof loading == 'boolean',
        { data, inputParse, isFocus, setData, values, errors } = useErrors(fields, open),
        { event = '', from = '' } = values,
        events = useEvents(),
        emails = useEmails(),
        Close = res => {
            setData({})
            onClose(res)
        }, close = !loading && Close,
        template = ServerFunction('template', { setError, setLoading, onResponse: Close })

    function submit(del) {
        if (isFocus()) {
            setLoading(false)
            return
        }
        template(id, data)
    }
    return (
        <TopModal open={open} onClose={close}>
            <div className='m bg p'>
                <h3>Add Business Email</h3>
                <div className='mt'>Event*</div>
                <select disabled={id != 'new'} value={event} name='event' onChange={onChange(setData)}>
                    <option disabled selected value=''>Select one*</option>
                    {events.map(d => {
                        let { name, uid, _id } = d
                        return <option key={_id} value={_id}>{name} ({uid})</option>
                    })}
                </select>
                <div className='ce'>{touched && errors.event}</div>
                <div className='mt'>From*</div>
                <select value={from} name='from' onChange={onChange(setData)}>
                    <option disabled selected value=''>Select one*</option>
                    {emails.map(d => {
                        let { _id } = d
                        return <option key={_id} value={_id}>{d.email}</option>
                    })}
                </select>
                <div className='ce'>{touched && errors.from}</div>
                {fields.slice(2).map(d => <FormField touched={touched} key={d.name} {...inputParse(d)} />)}
                <br />
                <div className='ce'>{error}</div>
                <Button dissabled={loading} onClick={submit}>Submit</Button>
            </div>
        </TopModal>
    )
}


