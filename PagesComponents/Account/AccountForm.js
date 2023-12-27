import FormElement from '@/Components/FormElement'
import Validator from '@/Components/Utils/Validator';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { POST } from '@upgradableweb/client'

const fields = [
    {
        label: "Your Name",
        name: "name",
        pl: "Enter your name",
        error: { min: 3, max: 50 }
    },
    {
        label: "Company Name",
        name: "company_name",
        pl: "Enter company name",
        error: { min: 3, max: 50, }
    },
    {
        type: "autocomplete",
        label: "Company Industry Type",
        name: "industry",
        pl: "Industry Type",
        error: { min: 1 }
    },
    {
        label: "Contact Mobile",
        name: "mobile",
        pl: "Enter Contact Mobile",
        error: { min: 10, max: 10, type: 'mobile' }
    },
    {
        label: "Contact Email",
        name: "email",
        pl: "Enter Contact Email",
        error: { min: 3, max: 50, type: 'email' }
    },
    {
        label: "Company Location",
        name: "address",
        pl: "Enter Company Location",
        error: { min: 3, max: 50 }
    },
    {
        label: "Quering for",
        name: "reason",
        pl: "Select any one",
        options: ['Job Posting', 'None'],
        type: 'select',
        error: { min: 1 }
    },
]


export default function AccountForm() {

    const [data, setData] = useState({
        reason: "Job Posting",
    })
    let [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const r = useRouter()

    const submit = () => {
        const notValid = Object.keys(errors).pop()
        if (notValid) {
            !active && setActive(true)
            document.getElementsByName(notValid)[0]?.focus()
            return
        }
        setLoading(true)
        POST('/api/enroll', data)
            .then(res => {
                r.push('/ok')
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }
    function onChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const ValueGetter = ({ name, min, max, type }) => {
        const value = data[name] || ''
        const err = Validator({ value, min, max, type })
        const present = errors[name]
        if (err && err !== present) {
            setErrors({ ...errors, [name]: err })
        } else if (!err && present) {
            delete errors[name]
            setErrors({ ...errors })
        }
        return value
    }

    return (
        <div className='df fdc gap-2'>
            {fields.map((dat, i) => {
                const { label, name, pl, options, type, error } = dat
                const err = errors[name]
                return (
                    <FormElement
                        key={i}
                        label={label}
                        name={name}
                        placeholder={pl}
                        onChange={onChange}
                        value={ValueGetter({ name, ...error })}
                        options={options}
                        type={type}
                        active={active}
                        error={err}
                        errorText={err}
                    />)
            })}
            <button
                className='btn w-full my'
                onClick={submit}>
                SUBMIT
            </button>
        </div>

    )
}
