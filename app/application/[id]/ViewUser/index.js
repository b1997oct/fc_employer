import { Call, Email, Whatsapp } from '@/UW/Icons'
import ServerFunction from '@/server'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LVArray from '../LVArray';
import Tabs from '@/PagesComponents/Tabs';
import Button from '@/UW/Button';
import Tggr from '@/UW/JS/Trigger';
import Backdrop from '@/UW/Backdrop';


const fields = [
    { label: 'Designation', name: 'designation' },
    { label: 'Industry', name: 'industry' },
    { label: 'Functional Area', name: 'functional_area' },
    { label: 'Total Experience', name: 'total_experience' },
    { label: 'Current CTC', name: 'cctc' },
    { label: 'Expected CTC', name: 'ectc' },
    { label: 'Working Status', name: 'working_status' },
    { label: 'Notice Period', name: 'notice_period', sufix: ' Days' },
    { label: 'Qualification', name: 'degree' },
    { label: 'Combination/Trade', name: 'combination' },
    { label: 'Collage Details', name: 'collage' },
    { label: 'Status', name: 'ed_status' },
    { label: 'Completion year', name: 'completion_year' },
    { label: 'Gender', name: 'gender' },
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Marital Status', name: 'marital_status' },
    { label: 'State', name: 'state', def: '-' },
    { label: 'City', name: 'city', def: '-' },
    { label: 'Area', name: 'area', def: '-' },
    { label: 'Pin', name: 'pin', def: '-' }
], tabs = ['Overview', 'Skills', 'Resume']

const check = (v, add) => v ? v + add : ''

export default function ViewUser({ userId }) {

    let [data, setData] = useState({}),
        [loading, setLoading] = useState(),
        [tab, setTab] = useState('Overview'),
        [error, setError] = useState(),
        user = ServerFunction('user', { setError, setLoading, onResponse: setData })

    useEffect(() => {
        userId && user(userId)
    }, [userId])

    fields.map(d => {
        let { name, sufix, def } = d,
            value = data[name] || def
        if (name == 'grade') {
            value = check(value * 10, '%')
        } else if (sufix) {
            value = check(value, sufix)
        } else if (name.endsWith('ctc')) {
            value = value ? CTC(value, data[name + '_unit']) : ''
        }
        d.value = value
    })

    let { _id, name, email, mobile, image, skills, resume } = data,
        Views = (f, t) => LVArray(fields.slice(f, t))

    return <div>
        <h4>Applicant Details</h4>
        <div className="border border-pc shadow rounded-xl bg p">
            <div className="mb">User ID : #{_id}</div>
            <div className="df gap">
                <Avatar src={image} title={name} />
                <div>
                    <h3>{name}</h3>
                    <div className='df gap-1 fww whitespace-nowrap text-stone-500'>
                        <Link href={`https://api.whatsapp.com/send?phone=91${mobile}`} className='hover:underline' target='_blank'>+91 {mobile} | </Link>
                        <Link href={`mailto:${email}`} target='_blank' className='hover:underline'>{email}</Link>
                    </div>
                    <div className='df fww my-2 gap'>
                        <Link href={`tel:${mobile}`} target='_blank' className='phone'><Call size='20' /> Call</Link>
                        <Link href={`mailto:${email}`} target='_blank' className="email" ><Email size="22" /> Email</Link>
                        <Link href={`https://api.whatsapp.com/send?phone=91${mobile}`} target='_blank' className="whatsapp" ><Whatsapp size="22" /> Send Message</Link>
                    </div>
                </div>
            </div>
            <Tabs value={tab} tabs={tabs} onChange={setTab} />
            {tab == 'Skills' ?
                <Skills data={skills} />
                : tab == 'Resume' ?
                    <Resume data={resume} />
                    : <div className="mt grid gap">
                        <GridItem title='Profile'>
                            {Views(0, 8)}
                        </GridItem>
                        <GridItem title='Education'>
                            {Views(8, 13)}
                        </GridItem>
                        <GridItem title='Other Details'>
                            {Views(13, 16)}
                        </GridItem>
                        <GridItem border={false} title='Present Address'>
                            {Views(16)}
                        </GridItem>
                    </div>}
        </div>
    </div>
}

function GridItem({ title, children, border = true }) {
    return (
        <div className={border ? 'border-neutral-400 border-dashed border-b pb' : ''}>
            <div className="bold underline text-stone-600">{title}</div>
            <div className='gap-2 grid grid-cols-2 md:grid-cols-3'>
                {children}
            </div>
        </div>
    )
}


export function Avatar({ src, title }) {
    if (src) {

        return <img className="aspect-square w-24 object-contain" src={src} alt='candidate' />
    }
    return <div className="aspect-square w-24 border uppercase text-5xl df aic jcc bg-stone-50 object-contain" alt='candidate' >{title?.slice(0, 1)}</div>
}


function CTC(ctc = 0, unit) {
    return <span>Rs {ctc.toLocaleString()} / <span className='capitalize'>{unit || 'month'}</span></span>
}

function Skills({ data }) {

    if (data) {
        return <div className='df gap-2 fww'>
            {Boolean(data.length) ?
                data.map(d => <div key={d.skill} className='skill'>{d.skill}</div>)
                : <div>No data found </div>}
        </div>
    }
}

function Resume({ data }) {

    let [open, setOpen] = useState()

    return <div>
        {open && <div className='fixed df aic jcc h-full'>
            <Backdrop className='fixed bg-white/70' onClick={Tggr(setOpen)} />
            <iframe src={data} className='fixed h-[90vh] top-8 w-full max-w-[800px]' />
        </div>}
        {data ?
            <iframe src={data} className='h-[80vh] w-full' />
            : <div>No Attachment Found</div>}
        {data && <Button onClick={Tggr(setOpen, true)} className='mt' variant='outlined'>Open Resume</Button>}
    </div>
}