import Input from '@/Components/Input';
import { useRouter } from 'next/router';
import { useState } from 'react'

export default function Page() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        payload: "",
        password: ""
    })

    const r = useRouter()

    const submit = () => {
        console.log(data);
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
                    <p className='tac fs1 '>Employer Login</p>
                    <div className='df fdc gap-2'>
                        <Input
                            name="payload"
                            value={data.payload || ''}
                            placeholder='Enter Email or Mobile Number'
                            label="Registered Email or Mobile Number"
                            onChange={onChange}
                        />
                        <Input
                            name="password"
                            value={data.password || ''}
                            label="Password"
                            placeholder='Enter password'
                            type='password'
                            // InputProps={{
                            //     endAdornment: <IconButton onClick={handleShow} sx={{ color: blue[400] }}>
                            //         {show ? <VisibilityOff /> : <Visibility />}
                            //     </IconButton>
                            // }}
                            onChange={onChange}
                        />
                    </div>
                    <div className='my tae'>
                        <button onClick={() => r.push('/')} className='text-btn'>Forgot Password</button>
                    </div>
                    <button onClick={submit} className='btn w-full pbg'>
                        Login
                    </button>
                    <button
                        className='btn w-full mt'
                        onClick={() => r.push("/account")}>
                        Create New Account
                    </button>
                    <div className='df jce my'>
                        <a href='mailto:info@firstcareer.co'
                            // href={"https://wa.me/+918904472228?text=" + encodeURIComponent(`Hello, I am having problem while signup/login. And i need to know its my end or not`)}
                            target='_blank' className='a undeline'>Contact Support</a>
                    </div>
                </div>

            </div>
        </div >
    )
}

