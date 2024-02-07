import Input from '@/Components/Input';
import Modal from '@/Components/Modal';
import Toast from '@/Components/Toast';
import { POST } from '@upgradableweb/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react'

export default function Page() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const r = useRouter()

    const submit = () => {
        setLoading(true)
        const url = open ? '/api/acc/reset' : '/api/acc/login'
        POST(url, data)
            .then(res => {
                if (open) {
                    Toast(`reset link sent to ${res.data?.email}`)
                } else {
                    r.replace('/')
                }
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function onChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    return (
        <div style={{ background: '#66f1' }}>
            <div className='df jcc aic h-screen'>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <br/>   
                    <div className='df jcc'>
                        {/* <Link href='https://firstcareer.co/user/login'>
                            <button className={`tab-btn `}>Job Seeker Login</button>
                        </Link> */}
                        <div>Employer Login</div>
                    </div>
                    <br/>  
                    <div className='df fdc gap-2'>
                        <Input
                            name="email"
                            value={data.email || ''}
                            placeholder='Enter registered email'
                            label="Registered email"
                            onChange={onChange}
                        />
                        <Input
                            name="password"
                            value={data.password || ''}
                            label="Password"
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='my tae'>
                        <button
                            disabled={loading}
                            onClick={() => setOpen(true)}
                            className='text-btn'>
                            Forgot Password
                        </button>
                    </div>
                    <button disabled={loading} onClick={submit} className='primary-btn w-full'>
                        Login
                    </button>
                    <Link href='/account' target='_blank'>
                        <button className='btn w-full mt'>
                            Create New Account
                        </button>
                    </Link>
                    <div className='df jce my'>
                        <a href='mailto:info@firstcareer.co'
                            // href={"https://wa.me/+918904472228?text=" + encodeURIComponent(`Hello, I am having problem while signup/login. And i need to know its my end or not`)}
                            target='_blank' className='a undeline'>Contact Support</a>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => !loading && setOpen(false)}
            >
                <p>Password reset link will be sent to your registered email</p>
                <Input
                    name="email"
                    value={data.email || ''}
                    placeholder='Enter registered email'
                    label="Registered email"
                    onChange={onChange}
                />
                <button
                    disabled={loading}
                    onClick={submit} className='w-full primary-btn mt'>
                    Send
                </button>
            </Modal>
        </div>
    )
}

