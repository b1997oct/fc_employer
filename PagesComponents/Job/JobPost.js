import Editor from '@/Components/Editor'
import FormElement from '@/Components/FormElement'
import Input from '@/Components/Input'
import Radio from '@/Components/Radio'
import React, { useEffect, useState } from 'react'
import Skills from './Skills'
import { useRouter } from 'next/router'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import { PUT } from '@upgradableweb/client'

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
        options: [...Array.from({ length: 9 }).map((_, i) => `0${i + 1}`), '10', '10+'],
        readOnly: true
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
        options: ["Full Time", "Part Time", "Trainie", "Intern", "Contract", "NAPS", "Apprenticeship"],
        readOnly: true
    },
    {
        label: "Work Mode",
        name: "work_mode",
        type: 'select',
        options: ['Work from office', 'Remote', 'Hybrid'],
        readOnly: true
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

let errors = {}

export default function JobPost({ py }) {

    const [data, setData] = useState({})
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const r = useRouter()
    const { id, repost } = r.query

    function onCompany(res) {
        const { address, company_name } = res
        setData({ ...data, location: address, company_name })
    }

    useDataFetch(id === 'new' && '/api/org', '', { setData: onCompany, setLoading })

    useEffect(() => {
        if (id && id === 'new') {
            setData({
                total_openings: '01',
                job_type: 'Full Time',
                work_mode: 'Work from office',
                requirement: 'person',
                skills: []
            })
        }
    }, [id])


    function submit() {
        let newData = { ...data, id, lost_date: data.last_date, status: 1 }
        if (data.education || data.stream) {
            newData.education = newData.education + '-' + newData.stream
        }
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

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const getValue = (name) => {
        return typeof data[name] !== 'undefined' ? data[name] : py[name] || ''
    }


    return (
        <div className='df jcc my'>
            <div style={{ padding: '4% 4% 3rem 4%', maxWidth: 600 }} className='bg df  w-full fdc gap rounded-sm shadow'>
                <h2 className={`bold ${repost ? 'ce' : 'ci'}`}>Job Details {repost && '(Reposting)'}</h2>
                {fields.map((dat, i) => {
                    const { label, name, pl, options, type, readOnly } = dat
                    const err = errors[name]
                    if (name === 'skills') {
                        return (
                            <Skills
                                key={i}
                                {...dat}
                                setData={setData}
                                skills={getValue('skills')}
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
                            value={getValue(name) || []}
                            options={options}
                            type={type}
                            active={active}
                            error={err}
                            errorText={err}
                            readOnly={readOnly}
                        />)
                })}
                {
                    data.work_mode !== 'Remote' &&
                    <Input
                        label='Work Location'
                        name='location'
                        placeholder='Banglore, Peenya'
                        onChange={onChange}
                        value={getValue('location')}
                    />
                }
                <div className='mb'>
                    <h4 className='bold mb'>Job Description</h4>
                    <Editor
                        value={getValue('jd')}
                        name='jd'
                        onChange={onChange}
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
                            checked={getValue('requirement')}
                        />))}
                </div>
                {data.requirement === 'last_date' &&
                    <Input
                        label='Last Date To Apply'
                        type='date'
                        name='last_date'
                        onChange={onChange}
                        value={getValue('last_date')}
                    />}
                <button
                    onClick={submit}
                    disabled={loading || !Object.keys(data).length}
                    className='btn p-btn w-full p mt'>
                    {repost ? 'Repost Job' : 'Post Job'}
                </button>
            </div>
        </div>
    )
}
