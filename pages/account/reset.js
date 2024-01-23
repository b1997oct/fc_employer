import Checkbox from '@/Components/Checkbox';
import useDataFetch from '@/Components/Hooks/useDataFetch';
import Input from '@/Components/Input';
import Toast from '@/Components/Toast';
import { PATCH, PUT } from '@upgradableweb/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page() {

    const [data, setData] = useState({
        password: "",
        remember: false
    })
    const [loading, setLoading] = useState(false);
    const [expire, setExpired] = useState(false);

    const r = useRouter()
    const { token } = r.query

    const { remember, password } = data

    useEffect(() => {
        if (!token) return
        setLoading(true)
        PUT('/api/acc/reset', { token })
            .catch(err => {
                if (err.responseStatus === 401) {
                    setExpired('ce')
                }
            })
            .finally(() => setLoading(false))
    }, [token])

    function onChange(e) {
        let { name, value, checked } = e.target
        if (name === 'remember') {
            value = checked
        }
        setData({ ...data, [name]: value })
    }

    const submit = () => {
        if (password.length < 6) {
            Toast('password length must be at least 6')
            document.getElementsByName('password')[0]?.focus()
            return
        }
        setLoading(true)
        PUT('/api/acc/reset', { ...data, token })
            .then(res => {
                r.replace('/')
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    const disabled = loading || !remember

    return (
        <div style={{ background: '#66f1' }}>

            <div className='df jcc aic h-screen'>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>Manage Account</h2>
                    <p className={`tac fs1 ${expire}`}>{expire ? 'This link is expired please go to Login' : 'Reset password'}</p>

                    <div className='df fdc gap'>
                        <Input
                            name="password"
                            value={password}
                            placeholder='Enter new password'
                            label="Enetr new password"
                            onChange={onChange}
                        />
                        <Checkbox
                            name='remember'
                            checked={remember}
                            onChange={onChange}
                            label='I remeber new password'
                        />
                    </div>
                    <button
                        onClick={submit}
                        disabled={disabled}
                        className='btn w-full my-4 primary-bg'>
                        Submit
                    </button>
                    <div className='df jce aic gap'>
                        <Link href='/login' className='a'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

