import Button from '@/UW/Button'
import FormField from '@/UW/FormField'
import useErrors from '@/UW/Hooks/useErrors'
import Modal from '@/UW/Modal'
import ModalBody from '@/UW/Modal/ModalBody'
import ModalFooter from '@/UW/Modal/ModalFooter'
import ModalTitle from '@/UW/Modal/ModalTitle'
import ServerFunction from '@/server'
import {  useState } from 'react'

let fields = [
    {
        name: 'title',
        label: 'Company Name',
        pl: 'Enter company name',
        error: { min: 3, max: 150 }
    },
    {
        name: 'industry',
        label: 'Industry',
        pl: 'serpated by (,)',
        error: { min: 1, max: 200 }
    },
    {
        name: 'functionalArea',
        label: 'Functional Area',
        pl: 'serpated by (,)',
        error: { min: 1, max: 200 }
    },
    {
        name: 'category',
        label: 'Business Category',
        pl: 'B2B, B2C, D2C, Start Up...',
        error: { min: 1, max: 200 }
    },
    {
        name: 'businessNature',
        label: 'Business Nature',
        pl: 'Manufacturer, Retail, Distributor, Trader...',
        error: { min: 1, max: 200 }
    },
    {
        name: 'address',
        label: 'Company Address',
        pl: 'Enter company address',
        error: { min: 1, max: 200 }
    },
    {
        name: 'mapLink',
        label: 'Company Location Link (Map)',
        error: { max: 500 }
    },
    {
        name: 'website',
        label: 'Company Website',
        pl: 'eg:https://example.com',
        error: { max: 200 }
    },
    {
        name: 'about',
        label: 'About Company',
        pl: 'Company Description',
        error: { min: 1, max: 500 },
        ftype: 'textarea',
        nowrap: false
    },
    {
        label: 'Approved',
        ftype: 'switch',
        type: 'checkbox',
        name: 'active'
    }
]

export default function CompanyModal({ open, onClose, id }) {

    let [loading, setLoading] = useState(),
        [error, setError] = useState(),
        touched = typeof loading == 'boolean',
        { setData, data, isFocus, inputParse } = useErrors(fields, open),
        Close = () => {
            setData({})
            onClose()
        }, close = !loading && Close,
        company = ServerFunction('company', { setError, setLoading, onResponse: Close })

    function submit() {
        if (isFocus()) {
            setLoading(false)
            return
        }
        company(id, data)
    }

    return (
        <Modal open={open} onClose={close}>
            <ModalTitle onClose={close}><h3>{id == 'new' ? 'Create' : 'Edit'} Company</h3></ModalTitle>
            <ModalBody>
                <div className='t-p bg mb-12'>
                    {fields.map(d => <FormField key={d.name} touched={touched} {...inputParse(d)} />)}
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='ce'>{error}</div>
                <Button className='w-full' disabled={loading} onClick={submit}>SUBMIT</Button>
            </ModalFooter>
        </Modal>
    )
}
