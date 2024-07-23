import ConfirmModal from '@/PagesComponents/ConfirmModal';
import TopModal from '@/PagesComponents/TopModal';
import Button from '@/UW/Button';
import FormField from '@/UW/FormField';
import useErrors from '@/UW/Hooks/useErrors'
import Input from '@/UW/Input';
import ServerFunction from '@/server';
import React, { useState } from 'react'



let fields = [
    {
        name: 'email',
        label: 'Email address',
        pl: 'eg:mail@example.com',
        error: { min: 3, max: 50, type: 'email' }
    },
    {
        name: 'password',
        label: 'Email password',
        pl: '******',
        error: { min: 4, max: 50 }
    },
    {
        name: 'host',
        label: 'Email host',
        pl: 'eg:smtp.gmail.com',
        error: { min: 3, max: 150 }
    },
    {
        name: 'active',
        label: 'Status',
        ftype: 'switch',
        type: 'checkbox'
    },
]


export default function ManageMail({ id, open, onClose }) {

    let [error, setError] = useState(),
        [loading, setLoading] = useState(),
        touched = typeof loading == 'boolean',
        { data, inputParse, isFocus, setData } = useErrors(fields, open),
        Close = res => {
            setData({})
            onClose(res)
        }, close = !loading && Close,
        mail = ServerFunction('mail', { setError, setLoading, onResponse: onClose })

    function submit() {
        if (isFocus()) {
            setLoading(false)
            return
        }
        mail(id, data)
    }
    return (
        <TopModal open={open} onClose={close}>
            <div className='m bg p'>
                <h3>Add Business Email</h3>
                {fields.map(d => <FormField touched={touched} key={d.name} {...inputParse(d)} />)}
                <br />
                <div className='ce'>{error}</div>
                <Button dissabled={loading} onClick={submit}>Submit</Button>
            </div>
        </TopModal>
    )
}
