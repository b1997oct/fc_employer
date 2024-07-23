import React, { useEffect, useState } from 'react'
import LVArray from '../LVArray';
import ServerFunction from '@/server';
import ObjVal from '@/lib/Obj';
import Tggr from '@/UW/JS/Trigger';
import Tab from '@/UW/Tab';
import Tabs from '@/PagesComponents/Tabs';
import moment from 'moment';
import JobStatus from './JobStatus';

const fields = [
    { label: 'Experience', name: 'experience' },
    { label: 'Salary', name: 'salary' },
    { label: 'Job Type', name: 'job_type' },
    { label: 'Location', name: 'location' },
    { label: 'Education', name: 'education' },
    { label: 'Stream', name: 'stream' },
    { label: 'Work mode', name: 'work_mode' },
    { label: 'Last Date To Apply', name: 'lost_date' }
],
    tabs = ['Overview', 'Skills', 'Job Description']


export default function ViewJob({ jobId }) {

    let [data, setData] = useState({}),
        [loading, setLoading] = useState(),
        [tab, setTab] = useState('Overview'),
        [error, setError] = useState(),
        job = ServerFunction('job', { setError, setLoading, onResponse: setData })

    useEffect(() => {
        jobId && job(jobId)
    }, [jobId])

    fields.map(d => {
        d.value = data[d.name]
    })

    let { _id, job_role, total_openings, status, jd, skills, companyName, createdAt, active } = data

    return (
        <div>
            <h4>Job  Details</h4>
            <div className="border border-pc shadow rounded-xl bg p">
                <div className='df mb'>
                    <div className='f-1'>Job ID : #{_id}</div>
                    <JobStatus active={active} status={status} />
                </div>
                <h3>{job_role}</h3>
                <div className="text-stone-500">{companyName}</div>
                <div>{moment(createdAt).fromNow()}</div>

                <p>Total openings : {total_openings || 1}</p>
                <Tabs value={tab} tabs={tabs} onChange={setTab} />
                {tab == 'Skills' ?
                    <div className='df fww gap-2'>
                        {skills?.map(d => <div key={d} className='skill'>{d}</div>)}
                    </div> :
                    tab == 'Job Description' ?
                        <div dangerouslySetInnerHTML={{ __html: jd }} /> :
                        <div className='grid grid-cols-2'>
                            <div>
                                {LVArray(fields.slice(0, 4))}
                            </div>
                            <div>
                                {LVArray(fields.slice(4))}
                            </div>
                        </div>}
            </div>
        </div>
    )
}

