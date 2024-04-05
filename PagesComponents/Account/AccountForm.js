import FormElement from '@/Components/FormElement'
import Validator from '@/Components/Utils/Validator';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { POST } from '@upgradableweb/client'
import Editor from '@/Components/Editor';
import useDataFetch from '@/Components/Hooks/useDataFetch';
import Input from '@/Components/Input';

const fields = [
    {
        label: "Company Name*",
        name: "company_name",
        pl: "Enter company name",
        error: { min: 1, max: 200 }
    },
    {
        // type: "select",
        label: "Industry*",
        name: "industry",
        pl: "Eg: Manufacturing, Software",
        error: { min: 3, max: 100 },

    },
    {
        // type: "select",
        label: "Company functional area*",
        name: "department",
        pl: "Eg: CNC, Sheet Metal, Electrical Panels",
        error: { min: 3, max: 100 },
    },
    {
        label: "Company address*",
        name: "address",
        pl: "Eg: Bangalore , peenya 560001",
        error: { min: 3, max: 200 }
    },
    {
        label: "Company location map link",
        name: "map_link",
        pl: "Paste the map link",
        error: { max: 1000 }
    },
    {
        label: "Company website link",
        name: "website",
        pl: "https://firstcareer.co",
        error: { min: 3, max: 200 }
    },
    {
        label: "Contact email",
        name: "email",
        pl: "company@email.com",
        error: { min: 3, max: 50 }
    },
    {
        label: "Contact mobile number",
        name: "mobile",
        pl: "9876543210",
        error: { min: 10, max: 13 }
    },
    {
        name: "about_us",
        error: { min: 30, max: 3000 }
    },
]

const flds = fields.length - 1

let errors = {}

function onError({ name, value }) {
    const f = fields.find(d => d.name === name)
    if (!f) return
    const err = Validator({ value, ...f.error })
    const present = errors[name]
    if (err && err !== present) {
        errors = { ...errors, [name]: err }
    } else if (!err && present) {
        delete errors[name]
    }
}

export default function AccountForm() {


    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [utils, setUtils] = useState({
        industry_list: [],
        department_list: []
    });
    const [data, setData] = useState({})
    const r = useRouter()

    useDataFetch('/api/utils', '', { setData: setUtils })

    const submit = () => {
        for (const f of fields) {
            const { name } = f
            onError({ name, value: data[name] })
        }
        const notValid = Object.keys(errors)[0]
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
        let { name, value } = e.target
        onError(e.target)
        setData({ ...data, [name]: value })
    }

    const ValueGetter = (name) => {
        const value = data[name] || ''
        return value
    }

    return (
        <div className='df fdc gap-2'>
            {fields.slice(0, flds).map((dat, i) => {
                const { label, name, pl, type } = dat
                const err = errors[name]
                // const options = name === 'industry' ? utils.industry_list
                //     : name === 'department' ? utils.department_list : undefined

                return (
                    <FormElement
                        key={i}
                        label={label}
                        name={name}
                        placeholder={pl}
                        onChange={onChange}
                        value={ValueGetter(name)}
                        // options={options}
                        type={type}
                        active={active}
                        error={err}
                        errorText={err}
                    // readOnly={Boolean(options)}
                    />)
            })}
            <h3 className='bold my'>About your company</h3>
            <Editor
                value={ValueGetter('about_us')}
                onChange={onChange}
                placeholder='About company'
                name='about_us'
                error={errors.about_us}
                errorText={errors.about_us}
                active={active}
            />
            <button
                disabled={loading}
                className='primary-btn w-full my'
                onClick={submit}>
                SUBMIT
            </button>
        </div>

    )
}
