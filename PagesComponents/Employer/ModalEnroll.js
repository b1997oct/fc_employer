import Checkbox from "@/Components/Checkbox"
import { Cached } from "@/Components/Icons"
import GenerateString from "@/Components/Utils/GenerateString"
import { DELETE, POST } from "@upgradableweb/client"
import { useEffect, useState } from "react"
import LabelValue from '@/Components/LabelValue'

export default function ModalEnroll({ props, onSuccess, onDelete }) {

    const [data, setData] = useState({
        uid: 'FCEMPYR235',
        password: 'FC1234'
    })
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function submit() {
        setLoading(true)
        POST('/api/employer', { ...props, ...data, id: 'new' })
            .then(res => {
                onSuccess()
                alert('Approved successfully')
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function handleDelete() {
        setLoading(true)
        if (!confirm('confirm delete')) return
        DELETE('/api/enroll', { id: props._id })
            .then(res => {
                onDelete(res)
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    const { company_name, industry, mobile, email } = props

    return (
        <div>
            <h2 className="bold mt">{company_name}</h2>
            <LabelValue
                label='Industry'
                value={industry}
            />
            <div className="df fww gap">
                <LabelValue
                    label='Email'
                    value={email}
                />
                <LabelValue
                    label='Mobile'
                    value={'+91 ' + mobile}
                />
            </div>
            <UniqueId
                name='uid'
                value={data.uid}
                onChange={onChange}
            />
            <div className="df gap my fww mt">
                <input
                    name="password"
                    onChange={onChange}
                    style={{ fontFamily: 'sans-serif', background: '#9993' }}
                    className="px py-1 fs1 border"
                    value={data.password}
                    autoComplete="off"
                />
                <button
                    onClick={() => {
                        setData({ ...data, password: GenerateString(6) })
                    }}
                    disabled={loading}
                    className="p-1 df aic gap-2"><Cached />Password</button>
            </div>
            <Checkbox
                checked={checked}
                className='my'
                label='All Background Checked'
                onChange={(e) => {
                    setChecked(e.target.checked)
                }}

            />
            <div className="df jcsb">
                <button disabled={!checked} onClick={submit} className="btn pbg">Approve</button>
                <button
                    className="error-text btn"
                    onClick={handleDelete}
                >Delete</button>
            </div>
        </div>
    )
}


let t
function UniqueId({ value, onChange, name }) {

    const [uid, setUid] = useState(null)
    const [loading, setLoading] = useState(0)

    useEffect(() => {
        if (!uid) return
        clearTimeout(t)
        t = setTimeout(() => {
            setLoading(1)
            POST('/api/employer/uid', { uid })
                .then(res => {
                    if (res.data === 0) {
                        setUid(null)
                        onChange({ target: { value: uid, name } })
                        setLoading(0)
                    } else {
                        setLoading(2)
                    }
                })
                .catch(err => {
                    alert(err.message)
                })
        }, 1000)
    }, [uid])

    useEffect(() => {
        getUid()
    }, [])

    function getUid() {
        POST('/api/employer/uid?generate=new')
            .then(res => {
                let count = res.data.toString()
                while (count.length < 3) {
                    count = '0' + count;
                }
                setUid(null)
                onChange({ target: { value: `FCEMYR${count}`, name } })
            })
            .catch(err => {
                alert(err.message)
            })
    }

    const val = typeof uid === 'string' ? uid : value

    return (
        <div className="df gap my fww">
            <div>
                <input
                    name="uid"
                    onChange={(e) => setUid(e.target.value)}
                    style={{ fontFamily: 'sans-serif', background: '#9993' }}
                    className="px py-1 fs1 border h-full"
                    value={val}
                    autoComplete="off"
                />
                <div className="ce absolute caption">
                    {typeof uid === 'string' && !uid ? 'uid is required'
                        : loading === 1 ? 'Loading...' : loading === 2 ? 'User id already exist' : null}
                </div>
            </div>
            <button className="p-1 df aic gap-2" onClick={getUid}><Cached />Generate Unique Id</button>
        </div>)
}