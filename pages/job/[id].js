import Input from '@/Components/Input'
import Editor from '@/Components/Editor'
import Layout from '@/Layout'
import { useTheme } from '@/Layout/Theme'
import { useState } from 'react'
import { StaticSelect } from '@/Components/Select'
import Radio from '@/Components/Radio'
import FormElement from '@/Components/FormElement'
import Validator from '@/Components/Utils/Validator'

const fields = [
    {
        label: "Job Role",
        name: "job_role",
        pl: "Eg: Accountant, Cad Designer"
    },
    {
        label: "Minimum Experience",
        name: "experience",
        pl: 'Fresher, 1 to 3 years'
    },
    {
        label: "Minimum Education Level",
        name: "education",
        pl: 'Any UG, Diploma'
    },
    {
        label: "Stream",
        name: "stream",
        pl: 'Mechanical, CAD'
    },
    {
        label: "Enter Total openings",
        name: "total_openings",
        pl: 'Number',
        type: 'select',
        options: [...Array.from({ length: 9 }).map((_, i) => `0${i + 1}`), '10', '10+']
    },
    {
        label: "Enter Salary",
        name: "salary",
        pl: "Eg: 25,000/Month or 2 to 3 LPA or 18k to 20k"
    },
    {
        label: "Select Job Type",
        name: "job_type",
        type: "select",
        options: ["Full Time", "Part Time", "Trainie", "Intern", "Contract", "NAPS", "Apprenticeship"]
    },
    {
        label: "Work Mode",
        name: "work_mode",
        type: 'select',
        options: ['Work from office', 'Remote', 'Hybrid']
    },

]


export default function Page() {

    const [data, setData] = useState({
        total_openings: '01',
        job_type: 'Full Time',
        work_mode: 'Work from office',
        requirement: 'person',
    })
    let [errors, setErrors] = useState({})
    let [active, setActive] = useState(false)

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function submit() {
        console.log('j: ', data);

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
        <Layout>
            <div className='df jcc my'>
                <div style={{ padding: '4% 4% 3rem 4%', maxWidth: 600 }} className='bg df  w-full fdc gap rounded-sm shadow-sm'>
                    <h2 className='bold'>Job Details</h2>
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
                    {
                        data.work_mode !== 'Remote' &&
                        <Input
                            label='Work Location'
                            name='location'
                            placeholder='Banglore, Peenya'
                            onChange={onChange}
                            value={ValueGetter({ name: 'location' })}
                        />
                    }
                    <div className='mb'>
                        <h4 className='bold'>Job Description</h4>
                        <Editor
                            value={data.jd}
                            onChange={(val) => {
                                setData({ ...data, ['jd']: val })
                            }}
                            placeholder='Job Description'
                        />
                        <p className='caption'>{`Note : "Please don't leave any extra gaps or spaces"`}</p>
                    </div>
                    <div className='df gap mb'>
                        <Radio
                            label='Person requirement'
                            name='requirement'
                            onChange={onChange}
                            value='person'
                            checked={ValueGetter({ name: 'requirement' })}
                        />
                        <Radio
                            label='Last Date'
                            name='requirement'
                            onChange={onChange}
                            value='last_date'
                            checked={ValueGetter({ name: 'requirement' })}
                        />
                    </div>
                    {data.requirement === 'last_date' &&
                        <Input
                            label='Last Date To Apply'
                            type='date'
                            name='last_date'
                            onChange={onChange}
                            value={ValueGetter('last_date')}
                        />}
                    <button
                        onClick={submit}
                        disabled={!Object.keys(data).length}
                        className='btn p-btn w-full p mt'>
                        Submit
                    </button>
                </div>
            </div>


        </Layout>
    )
}
