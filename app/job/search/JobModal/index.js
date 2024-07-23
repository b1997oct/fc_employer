import Autocomplete from '@/UW/Autocomplete'
import AutoCompleteArray from '@/UW/Autocomplete/AutocompleteArray'
import useErrors from '@/UW/Hooks/useErrors'
import Input from '@/UW/Input'
import Select from '@/UW/Input/Select'
import Tggr from '@/UW/JS/Trigger'
import Modal from '@/UW/Modal'
import ModalBody from '@/UW/Modal/ModalBody'
import ModalFooter from '@/UW/Modal/ModalFooter'
import ModalTitle from '@/UW/Modal/ModalTitle'
import { useEffect, useState } from 'react'
import CompanySearch from '../../../company/CompanySearch'
import { PUT } from '@upgradableweb/client'
import { RadioGroup } from '@/UW/Input/Radio'
import TextArea from '@/UW/Input/TextArea'
import Experience from './Experience'
import Button from '@/UW/Button'
import ServerFunction from '@/server'

let span = <span className='absolute left-2 top-2'>₹</span>


const fields = [
    {
        label: "Job Role",
        name: "job_role",
        pl: "Eg: Accountant, Project Engineer",
        error: { min: 1, max: 150 },
        // hintFn: 'jobHint'
    },
    {
        label: "Company",
        name: "company_name",
        pl: "Search company",
        error: { min: 1, max: 200 }
    },
    {
        label: "Job Type",
        name: "jobType",
        options: ["Full Time", "Part Time", "Trainie", "Intern", "Contract"],
        error: { min: 1 },
        pl: 'Full Time, Part Time'
    },
    {
        label: "Work Mode",
        name: "workMode",
        radio: true,
        options: ['in-office', 'Remote', 'Hybrid'],
        error: { min: 1 },
    },
    {
        name: 'workLocation',
        label: 'Work Location',
        pl: 'city, area - pincode',
        validate: ({ workMode }) => {
            return workMode && workMode != 'Remote'
        },
        error: { min: 1, max: 50 }
    },
    {
        name: 'minSalary',
        label: 'Minimum',
        type: 'tel',
        span,
        inputClass: 'pl-6',
        autoComplete: 'off',
        error: { min: 1, max: 1000000 }
    },
    {
        name: 'maxSalary',
        label: 'Maximum',
        type: 'tel',
        autoComplete: 'off',
        span,
        inputClass: 'pl-6',
        error: { max: 1000000 }
    },
    {
        name: 'salaryUnit',
        label: 'Unit',
        error: { min: 1, max: 50 }
    },
    {
        label: "Education",
        name: "education",
        options: [`Bachelor's degree`, 'Diploma', '12th Pass', 'ITI', '10th Pass', `Master's degree`, 'Doctoral degree', 'Not required'],
        error: { min: 3, max: 50 }
    },
    {
        label: "Stream/Combination",
        name: "stream",
        pl: 'Eg: Mechanical, Electrical, Finance',
    },
    {
        label: "Skills",
        name: "skills",
        pl: "Select required skills",
        hintFn: 'skillSearch',
        error: { min: 2, max: 20, type: 'array' },
    },
    {
        label: "Total Openings",
        name: "totalOpenings",
        pl: 'Number Of Openings',
        type: 'tel',
        error: { min: 1 }
    },
    {
        name: 'deadline',
        radio: true,
        options: ['Last date', 'Person requirement'],
        label: 'Application deadline',
        error: { min: 1 }
    },
    {
        name: 'lastDate',
        label: 'Application last date',
        validate: ({ deadline }) => {
            return deadline && deadline == 'Last date'
        },
        type: 'date',
        error: { min: 1 }
    },
    {
        label: "Employment Benefits",
        name: "perks",
        pl: "PF,Health insurance, Remote Work",
        hintFn: 'perks',
        error: { min: 1, max: 20, type: 'array' }
    },
    {
        label: 'Job Description',
        name: 'jd',
        pl: 'Roles and Responsibility',
        nowrap: false,
        error: { min: 10, max: 3000 }
    },
    {
        name: "minExp",
        error: { min: 1 }
    },
],
    salaryUnits = [
        {
            name: 'Monthly',
            value: 'month'
        },
        {
            name: 'Yearly',
            value: 'year'
        },
        {
            name: 'Daily',
            value: 'day'
        },
        {
            name: 'Hourly',
            value: 'hour'
        },
    ].map(d => <option value={d.value}>{d.name}</option>),
    Options = ({ handle, data, value }) => {
        return data.length ?
            data.map(d => {
                let { keyword, _id } = d
                return <div className='option capitalize' key={_id} onClick={Tggr(handle, d)}>{keyword}</div>
            })
            : <div onClick={Tggr(handle, { add: true })} className='my-1 option'>Add {`"${value}"`}</div>
    }


export default function JobModal({ open, onClose, id }) {

    let [loading, setLoading] = useState(),
        [error, setError] = useState(),
        close = !loading && onClose,
        touched = typeof loading == 'boolean',
        { inputParse, data, isFocus, setData, values } = useErrors(fields, open),
        Popper = ({ onAction, ...p }) => {
            const { value } = p,
                handle = ({ keyword, add }) => {
                    if (add) {
                        PUT({ keyword: value, type: 'roles' }, { onResponse: console.log })
                        keyword = value
                    }   
                    onAction(keyword)
                }
            return <Options {...p} handle={handle} />
        },
        handle = f => f.map(d => {
            let { name, options, validate, hintFn, radio } = d,
                props = { touched, ...inputParse(d) }

            if (radio) {
                return <RadioGroup {...props} />
            } else if (options) {
                return (
                    <Select key={name} {...props} >
                        <option value='' selected disabled>Select One</option>
                        {options.map(d => <option key={d} value={d}>{d}</option>)}
                    </Select>
                )
            } else if (name == 'skills' || name == 'perks') {
                return <AutoCompleteArray key={name} {...props} onChange={setData} />
            } else if (validate && !validate(values)) {
                return
            } else if (hintFn) {
                return <Autocomplete Popper={Popper} key={name} {...props} />
            } else if (name == 'jd') {
                return <TextArea key={name} {...props} />
            }

            return <Input key={name} {...props} />
        })

    useEffect(() => {
        if (id == 'new') {
            setData({ salaryUnit: 'month' })
        } else {
            setData({})
        }
    }, [id])

    function submit() {
        if (isFocus()) {
            setLoading(false)
            return
        }
        let job = ServerFunction('job', { setError, setLoading, onResponse: onClose })
        job(id, data)
    }


    return (
        <Modal open={open} onClose={close}>
            <ModalTitle onClose={close}><h3>{id == 'new' ? 'Create' : 'Edit'} Job</h3></ModalTitle>
            <ModalBody>
                <Card>
                    {handle(fields.slice(0, 1))}
                    <CompanySearch setData={setData} {...inputParse(fields[1])} />
                </Card>
                <Card>
                    <h3>Job details</h3>
                    {handle(fields.slice(2, 5))}
                    <h3 className='mt'>Salary</h3>
                    <div className='df gap-2 aic'>
                        {handle(fields.slice(5, 7))}
                        <Select label='Unit' {...inputParse(fields[7])}>
                            {salaryUnits}
                        </Select>
                    </div>
                </Card>
                <Card>
                    <h3>Job requirements</h3>
                    <Experience inputparse={inputParse} />
                    {handle(fields.slice(8, 11))}
                </Card>
                <Card>
                    <h3>Application details</h3>
                    {handle(fields.slice(11, 14))}
                </Card>
                <Card>
                    <h3>Perks & JD</h3>
                    {handle(fields.slice(14, 16))}
                    <br />
                </Card>
            </ModalBody>
            <ModalFooter>
                {error && <div className='ce'>Error: {error}</div>}
                <Button onClick={submit} className='w-full'>POST JOB</Button>
            </ModalFooter>
        </Modal >
    )
}


function Card(p) {
    return <div className='bg t-p mb' {...p} />
}