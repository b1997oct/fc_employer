import Button from '@/UW/Button'
import Tggr from '@/UW/JS/Trigger'
import Sckeleton from '@/UW/Sckeleton'
import ServerFunction from '@/server'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

let tabs = ['Notes', 'Updates']
export default function Notes({ app }) {

    let [tab, setTab] = useState('Notes')

    return (
        <div className='df fdc'>
            <div className='df jcsb mb-2'>
                <div>Team</div>
                <div>
                    {tabs.map(d => {
                        return <button onClick={Tggr(setTab, d)} className={`${d == tab ? 'bg-pc text-white' : 'border'} px-2 ml-2 py-0 rounded-full`}>{d}</button>
                    })}
                </div>
            </div>
            {tab == 'Notes' ?
                <TeamNotes app={app} />
                : <Updates app={app} />}
        </div>
    )
}



function Card({ status, user, text, createdAt }) {

    let name = user?.name
    return <div className={`df ${name ? '' : 'jce'}`}>
        <div className="bg-lime-50 border rounded-xl mt px pt-2">
            <b>{name || 'You'} {status && <span className="text-red-400">({status})</span>}</b>
            <div>{text}</div>
            <div className="text-xs tae">{moment(createdAt).fromNow()}</div>
        </div>
    </div>
}

function TeamNotes({ app }) {

    let [data, setData] = useState([]),
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        applicationChat = ServerFunction('applicationChat', { onResponse: setData, setLoading, setError }),
        ref = useRef()

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [data])

    useEffect(() => {
        applicationChat(app)
    }, [])

    function onSend({ notes }) {
        data.push(notes)
        setData([...data])
    }

    return <div>
        {loading && <div className='tac'>Loading...</div>}
        <div ref={ref} className="grid gap-2 f-1 mb overflow-auto pr max-h-80">
            {!loading && !Boolean(data.length) && <p className='tae text-stone-500'>No data found</p>}
            {data.map(d => <Card key={d._id} {...d} />)}
            {/* <div className="df">
                <div className="rounded-xl bg-gray-100 border px pt-2">
                    <b>Nilam</b>
                    <div>Can be select for interview</div>
                    <div className="text-xs tae">4 days ago</div>
                </div>
            </div>
            <div className="df">
                <div className="bg-lime-100 border rounded-xl px pt-2">
                    <b>Abishek <span className=" text-orange-400">(Interview)</span></b>
                    <div>i talk with candidate and Arranged vertual interview</div>
                    <div className="text-xs tae">40 min ago</div>
                </div>
            </div>
            <div className="df jce">
                <div className="bg-gray-100 border rounded-xl mt px pt-2">
                    <b>You <span className="text-red-400">(Rejected)</span></b>
                    <div>User not matched with skills</div>
                    <div className="text-xs tae">4 min ago</div>
                </div>
            </div> */}
        </div>
        {error && <div className='ce'>{error}</div>}
        <Send app={app} onSend={onSend} />
    </div>
}

function Send({ app, onSend }) {
    let [notes, setNotes] = useState(''),
        [error, setError] = useState(),
        [loading, setLoading] = useState(),
        onResponse = res => {
            setNotes('')
            onSend(res)
        },
        application = ServerFunction('application', { setLoading, setError, onResponse })

    function submit() {
        if (!notes) {
            document.getElementById('notes').focus()
            return
        }
        application(app, { notes })
    }

    return <>
        <div className='ce'>{error}</div>
        <div className="df aie gap-2">
            <textarea
                value={notes}
                id='notes'
                disabled={loading}
                onChange={e => setNotes(e.target.value)}
                placeholder="Message"
                className="w-full" />
            <Button
                disabled={loading}
                onClick={submit}>
                {loading ? '...' : 'Send'}
            </Button>
        </div>
    </>
}

function Updates({ app }) {

    return <div>
        <div className="grid grid-cols-2 gap-2 overflow-auto">
            <div className="df jce gap-2 rounded-lg">
                <div>
                    <b>(Abhishek) <span className="text-red-400">Interview</span></b>
                    <div className='text-sm'>User not matched with skills</div>
                    <div className="text-xs tae">4 min ago</div>
                </div>
                <input type='radio' checked />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 overflow-auto">
            <div></div>
            <div className='df gap-2'>
                <input type='radio' checked />
                <div className="mt pt-2">
                    <b><span className="text-red-400">Rejected</span> (You)</b>
                    <div className='text-sm'>User not matched with skills</div>
                    <div className="text-xs">4 min ago</div>
                </div>
            </div>
        </div>
    </div>
}