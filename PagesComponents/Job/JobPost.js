import Editor from '@/Components/Editor'
import FormElement from '@/Components/FormElement'
import Input from '@/Components/Input'
import Radio from '@/Components/Radio'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import { PUT } from '@upgradableweb/client'
import useErrors from '@/Components/Hooks/useErrors'
import AutoCompleteMultiple from '@/Components/AutoComplete/Multiple'

const fields = [

    {
        label: "Job Role",
        name: "job_role",
        pl: "Eg: Accountant, Project Engineer",
        error: { min: 1, max: 200 }
    },
    {
        label: "Experience Level",
        name: "experience",
        pl: 'Fresher, 1 to 3 years',
        error: { min: 1, max: 100 }
    },
    {
        label: "Qualification",
        name: "education",
        pl: 'Any UG, Diploma',
        error: { min: 3, max: 50 }
    },
    {
        label: "Stream/Combination",
        name: "stream",
        pl: 'Eg: Mechanical, Electrical, Finance',
        error: { min: 3, max: 50 }
    },
    {
        label: "Total openings",
        name: "total_openings",
        pl: 'Number Of Openings',
        // type: 'select',
        // options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '10+'],
        // readOnly: true,
        error: { min: 1 }
    },
    {
        label: "Enter Salary",
        name: "salary",
        pl: "Eg: 25,000/Month or 2 to 3 LPA or 18k to 20k",
        error: { min: 3, max: 50 }
    },
    {
        label: "Required Skills",
        name: "skills",
        pl: "Enter required skills",
        type: 'skill',
        url: '/api/prediction',
        error: { min: 2, max: 20, type: 'array' }
    },
    {
        label: "Select Job Type",
        name: "job_type",
        type: "select",
        options: ["Full Time", "Part Time", "Trainie", "Intern", "Contract", "NAPS", "Apprenticeship"],
        readOnly: true,
        error: { min: 1 },
        pl: 'Full Time, Part Time'
    },
    {
        label: "Work Mode",
        name: "work_mode",
        type: 'select',
        options: ['Work from office', 'Remote', 'Hybrid'],
        readOnly: true,
        error: { min: 1 },
        pl: 'Eg: Remote, Work from office, Hybrid'
    },
    {
        name: 'jd',
        error: { min: 10, max: 3000 }
    },
    {
        name: 'location',
        validator: (props) => {
            return props.work_mode === 'Work from office'
        },
        error: { min: 1, max: 50 }
    },
    {
        name: 'requirement',
    },
    {
        name: 'last_date',
        validator: (props) => {
            return props.requirement === 'last_date'
        },
        error: { min: 1, max: 50 }
    }
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

const focusName = (name) => document.getElementsByName(name)[0]?.focus()


export default function JobPost({ py }) {


    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data, setData, errors, isError, values } = useErrors(fields, py)
    const r = useRouter()
    const { id, repost } = r.query

    function onCompany(res) {
        const { address, company_name } = res
        setData({
            location: address,
            company_name,
            total_openings: '01',
            job_type: 'Full Time',
            work_mode: 'Work from office',
            requirement: 'person',
            skills: []
        })
    }

    useDataFetch(id === 'new' && '/api/org', '', { setData: onCompany, setLoading })



    function submit() {
        !active && setActive(true)
        console.log(isError);
        if (isError) {
            focusName(isError)
            return
        } else if (values.skills?.length < 2) {
            focusName('skills')
            return
        }
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


    const location = values.location
    const requirement = values.requirement


    return (
        <div className='df jcc my'>
            <div style={{ padding: '4% 4% 3rem 4%', maxWidth: 600 }} className='bg df  w-full fdc gap rounded-sm shadow'>
                <h2 className={`bold ${repost ? 'ce' : 'ci'}`}>Job Details {repost && '(Reposting)'}</h2>
                {fields.slice(0, - 4).map((dat, i) => {
                    const { name, pl, url } = dat
                    dat.errorText = errors[name]
                    dat.onChange = onChange
                    dat.value = values[name]
                    dat.active = active
                    dat.placeholder = pl
                    if (url) {
                        return <AutoCompleteMultiple key={i} {...dat} />
                    }
                    return <FormElement key={i} {...dat} />
                })}
                {data.work_mode !== 'Remote' &&
                    <Input
                        label='Work Location'
                        name='location'
                        placeholder='Banglore, Peenya'
                        onChange={onChange}
                        value={location}
                        errorText={errors.location}
                    />}
                <div className='mb'>
                    <h4 className='bold mb'>Job Description</h4>
                    <Editor
                        value={values.jd}
                        name='jd'
                        onChange={onChange}
                        active={active}
                        errorText={errors.jd}
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
                            checked={values.requirement}
                        />))}
                </div>
                {requirement === 'last_date' &&
                    <Input
                        label='Last Date To Apply'
                        type='date'
                        name='last_date'
                        onChange={onChange}
                        value={values.last_date}
                        errorText={errors.last_date}
                        active={active}
                    />}
                <button
                    onClick={submit}
                    disabled={loading || !Object.keys(data).length}
                    className='w-full primary-btn'>
                    {repost ? 'Repost Job' : 'Post Job'}
                </button>
            </div>
        </div>
    )
}
