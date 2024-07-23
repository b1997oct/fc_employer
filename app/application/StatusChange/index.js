import TopModal from '@/PagesComponents/TopModal'
import Backdrop from '@/UW/Backdrop'
import Button from '@/UW/Button'
import Checkbox from '@/UW/Input/Checkbox'
import Radio from '@/UW/Input/Radio'
import onChange from '@/UW/JS/onChange'
import useStatuses from '@/app/status/Hook'
import ObjVal from '@/lib/Obj'
import ServerFunction from '@/server'
import { useState } from 'react'


export default function StatusChange({ id, open = {}, onClose }) {

    let [loading, setLoading] = useState(),
        [data, setData] = useState({}),
        [error, setError] = useState(),
        appStatuses = useStatuses('application'),
        { notes = '', forward, status = open.status, note = open.note || '' } = data,
        close = () => {
            setData({})
            onClose(false)
        },
        isOpen = Object.keys(open).length,
        handler = name => ({ name, onChange: onChange(setData) }),
        application = ServerFunction('application', { setLoading, setError, onResponse: onClose })

    function submit() {
        application(id, data)
    }


    return (
        <TopModal onClose={close} open={isOpen}>
            <div className='text-2xl px mt df'>
                {open.name}
            </div>
            <div className='m p bg whitespace-nowrap '>
                <div className='grid gap md:grid-cols-2'>
                    <div>Forward to Recruiter</div>
                    <div className='df gap'>
                        <Checkbox>No</Checkbox>
                    </div>
                    <div className='text-sm my-auto'>Select Application Status</div>
                    <select value={status} {...handler('status')}>
                        {appStatuses.map(d => {
                            let { _id, name, color } = d
                            return <option key={_id} value={_id} style={{ color }}>{name}</option>
                        })}
                    </select>
                    <div>
                        Application Note
                        <div className="text-sm">User, Recruiter, Team</div>
                    </div>
                    <textarea {...handler('note')} value={note} placeholder='Message' />
                    <div>
                        Notes
                        <div className="text-sm">Team</div>
                    </div>
                    <textarea placeholder='Message' {...handler('notes')} value={notes} />
                </div>
                <div className='df jce mt-8 gap'>
                    <button onClick={close} className='outlined'>Cancel</button>
                    <Button dissabled={loading} onClick={submit}>Save</Button>
                </div>
            </div>
        </TopModal>
    )
}
