import TopModal from '@/PagesComponents/TopModal'
import Adaptor from '@/UW/Adaptor'
import Button from '@/UW/Button'
import Radio from '@/UW/Input/Radio'
import onAssign from '@/UW/JS/onAssign'
import onChange from '@/UW/JS/onChange'
import useStatuses from '@/app/status/Hook'
import ObjVal from '@/lib/Obj'
import ServerFunction from '@/server'
import React, { useState } from 'react'



export default function JobApprove({ id, open, onClose, statuses }) {

    let [data, setData] = useState({}),
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        Options = Adaptor(statuses),
        onResponse = res => {
            setData({})
            onClose(res)
        }, handler = name => {
            let value = data[name] == undefined ? open?.[name] || '' : data[name]
            return { name, onChange: onChange(setData), value }
        }, reset = () => setData({ notes: '' }),
        close = !loading && onResponse,
        job = ServerFunction('job', { setLoading, setError, onResponse })

    function submit() {
        job(id, data)
    }

    function Wrapper({ _id, name, color }) {
        return <option value={_id} style={{ color }}>{name}</option>
    }

    let { active = open?.active } = ObjVal(data)

    return (
        <TopModal onClose={close} open={open}>
            <div className='ml mt truncate'>{open?.job_role}</div>
            <div className='m p bg grid gap grid-cols-2'>
                <div>Publish</div>
                <div className='df gap'>
                    <Publish active={active} setData={setData} />
                </div>
                <div>Job Post Status</div>
                <select className='rounded-none' {...handler('status')}>
                    {Options(Wrapper)}
                </select>
                <div>
                    Message To Employer
                    <div className='text-xs'>Employer, Team</div>
                </div>
                <div className='df fdc aie'>
                    <textarea {...handler('notes')} placeholder='Message' />
                    <div onClick={reset} className='pointer'>Clear</div>
                </div>

                <div className='mt col-span-full df jce'>
                    {error}
                    <Button onClick={submit}>Submit</Button>
                </div>
            </div>
        </TopModal>
    )
}


function Publish({ active, setData }) {

    const handle = e => {
        e = e.target.name == 'live'
        setData(onAssign({ active: e }))
    }

    return <div className='df gap'>
        <Radio name='live' onChange={handle} checked={active}>Live</Radio>
        <Radio name='hold' onChange={handle} checked={!active}>Inactive</Radio>
    </div>

}