import Input from '@/Components/Input'
import Editor from '@/Components/Editor'
import Layout from '@/Layout'
import { useEffect, useState } from 'react'
import Select from '@/Components/Select'
import Radio from '@/Components/Radio'
import FormElement from '@/Components/FormElement'
import Validator from '@/Components/Utils/Validator'
import useTableFetch from '@/Components/Hooks/useTableFetch'
import CompanyModal from '@/PagesComponents/Job/CompanyModal'
import { POST, PUT } from '@upgradableweb/client'
import { useRouter } from 'next/router'
import { MultiChips } from '@/Components/Chip'

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
        label: "Total openings",
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
        label: "Required Skills",
        name: "skills",
        pl: "Eg: Enter required skills"
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

const radio = [
    {
        label: 'Person requirement',
        value: 'person'
    },
    {
        label: 'Last Date',
        value: 'last_date'
    }
]

export default function Page() {

    const [data, setData] = useState({
        total_openings: '01',
        job_type: 'Full Time',
        work_mode: 'Work from office',
        requirement: 'person',
        skills: []
    })
    let [errors, setErrors] = useState({})
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const r = useRouter()
    const { id, repost } = r.query

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        if (!id || id === 'new') return
        POST('/api/job', { id })
            .then(res => {
                const d = res.data
                d.requirement = d.lost_date ? 'last_date' : 'person'
                d.last_date = d.lost_date
                const ed = d.education.split(',')
                d.education = ed[0]
                d.stream = ed[1]
                setData(d)
            })
            .catch(err => {
                alert(err.message)
            })
    }, [id])

    function submit() {
        let newData = { ...data, id, lost_date: data.last_date, status: repost ? 1 : undefined }
        newData.education = newData.education + ',' + newData.stream
        setLoading(true)
        PUT('/api/job', newData)
            .then(res => {
                r.back()
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))

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
            <CompanyModal
                setData={setData}
            />
            <div className='df jcc my'>
                <div style={{ padding: '4% 4% 3rem 4%', maxWidth: 600 }} className='bg df  w-full fdc gap rounded-sm shadow'>
                    <h2 className={`bold ${repost ? 'ce' : 'ci'}`}>Job Details {repost && '(Reposting)'}</h2>
                    {fields.map((dat, i) => {
                        const { label, name, pl, options, type, error } = dat
                        const err = errors[name]

                        if (name === 'skills') {
                            return (
                                <Select
                                    key={i}
                                    name={name}
                                    label={label}
                                    onChange={(val) => {
                                        const skills = [...data.skills, val]
                                        setData({ ...data, skills })
                                    }}
                                    placeholder={pl}
                                    options={['React', 'Nextjs']}
                                    multiple={<MultiChips
                                        data={data.skills}
                                        onDelete={(val) => {
                                            setData({ ...data, skills: val })
                                        }} />}
                                />
                            )
                        }
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
                        <h4 className='bold mb'>Job Description</h4>
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
                        {radio.map((dat, i) => (
                            <Radio
                                key={i}
                                label={dat.label}
                                name='requirement'
                                onChange={onChange}
                                value={dat.value}
                                checked={ValueGetter({ name: 'requirement' })}
                            />))}
                    </div>
                    {data.requirement === 'last_date' &&
                        <Input
                            label='Last Date To Apply'
                            type='date'
                            name='last_date'
                            onChange={onChange}
                            value={ValueGetter({ name: 'last_date' })}
                        />}
                    <button
                        onClick={submit}
                        disabled={loading || !Object.keys(data).length}
                        className='btn p-btn w-full p mt'>
                        Submit
                    </button>
                </div>
            </div>


        </Layout>
    )
}
