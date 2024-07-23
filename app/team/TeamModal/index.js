import Button from '@/UW/Button'
import FormField from '@/UW/FormField'
import useErrors from '@/UW/Hooks/useErrors'
import useSubmit from '@/UW/Hooks/useSubmit'
import Checkbox from '@/UW/Input/Checkbox'
import Modal from '@/UW/Modal'
import ModalBody from '@/UW/Modal/ModalBody'
import ModalFooter from '@/UW/Modal/ModalFooter'
import ModalTitle from '@/UW/Modal/ModalTitle'
import CompanySearch from '@/app/company/CompanySearch'
import ServerFunction from '@/server'
import { useState } from 'react'


const fields = [
    {
        label: "Name",
        name: "name",
        pl: "Enter recruiter name",
        error: { min: 1, max: 50 }
    },
    {
        label: "Email",
        name: "email",
        pl: "Any business email",
        error: { min: 1, max: 100, type: 'email' }
    },
    {
        label: "Mobile",
        name: "mobile",
        error: { min: 1, max: 15, type: 'mobile' },
        pl: 'Enter contact no:'
    },
    {
        label: "Password",
        name: "password",
        pl: "****",
        error: { min: 4, max: 10 }
    },
    {
        label: "Status",
        name: "active",
        ftype: 'switch'
    },
    {
        label: '1. Job',
        name: 'job',
    },
    {
        label: '3. Job Applications',
        name: 'application'
    },
    {
        label: '2. Company',
        name: 'company'
    },
    {
        label: '4. Recruiters',
        name: 'recruiter'
    },
    {
        label: '5. Users',
        name: 'user'
    },
    {
        label: '6. Team',
        name: 'team'
    },
    {
        label: '6. Settings',
        name: 'settings'
    }
]

export default function TeamModal({ open, onClose, id }) {

    let { data, setData, inputParse, values } = useErrors(fields, open),
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        onResponse = res => {
            res = res && Object.assign({}, data, res)
            onClose(res)
            setData({})

        },
        recruiter = ServerFunction('TEAM', { setLoading, setError, onResponse }),
        close = !loading && onResponse

    function submit() {
        recruiter(id, data)
    }
    return (
        <Modal open={open} onClose={close}>
            <ModalTitle onClose={close}><h3>{id == 'new' ? 'Create' : 'Edit'} Member</h3></ModalTitle>
            <ModalBody>
                <div className='bg t-p'>
                    {fields.slice(0, 5).map(d => <FormField key={d.name} {...inputParse(d)} />)}
                </div>
                <div className='my bg t-p'>
                    <h4 className='mt border-b'>Permissions</h4>
                    {fields.slice(5).map(d => <Checker key={d.name} {...d} value={values[d.name]} setData={setData} />)}
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='ce'>{error}</div>
                <Button onClick={submit}>SUBMIT</Button>
            </ModalFooter>
        </Modal>
    )
}

let checks = [
    {
        label: 'Restricted',
        value: 0
    },
    {
        label: 'Read',
        value: 1
    },
    {
        label: 'Write',
        value: 2
    },
    {
        label: 'Delete',
        value: 3
    }
]

function Checker({ label, value, name, setData }) {
    function handle(e) {
        let val = e.target.value
        setData(prev => ({ ...prev, [name]: parseInt(val) }))
    }

    return <div>
        <p className='cp text-stone-500'>{label}</p>
        <div className='df md:gap gap-2 '>
            {checks.slice(0, 1).map(d => <Checkbox key={d.value} {...d} checked={!value} onChange={handle} />)}
            {checks.slice(1).map(d => <Checkbox key={d.value} checked={d.value <= value} {...d} onChange={handle} />)}
        </div>
    </div>
}
