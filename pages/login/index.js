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


    const submit = () => {
        setLoading(true)
        const url = open ? '/api/acc/reset' : '/api/acc/login'
        POST(url, data)
            .then(res => {
                if (open) {
                    Toast(`reset link sent to ${res.data?.email}`)
                } else {
                    location.replace('/')
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
            <div className='container'>
                <div className='content'>
                    <p><b>Welcome to Our Professional Recruitment Service</b></p>
                    <p>At First Career {`we're`} dedicated to facilitating seamless connections between employers and job seekers. Our comprehensive approach encompasses thorough communication with candidates, verification of their profiles, and meticulous refinement of resumes to ensure an optimal match for your organization.</p>
                    <h2>Our Comprehensive Process:</h2>
                    <p>
                        <b>Engaging Communication:</b> We prioritize building meaningful relationships with job seekers through personalized communication. By understanding their career goals, skills, and aspirations, we can effectively assess their suitability for your organization.
                    </p>
                    <p><b>Profile Verification:</b> Integrity is at the core of our recruitment process. We conduct rigorous checks to verify the accuracy of each {`candidate's`} qualifications, employment history, and salary details. You can trust that the information provided is reliable and transparent.</p>
                    <p><b>Resume Enhancement:</b> A well-crafted resume is key to making a strong impression. Our team of experts meticulously refine each resume, highlighting the {`candidate's`} strengths, achievements, and relevant experiences. We ensure that every aspect of their professional journey is showcased to its fullest potential.</p>
                    <p><b>Personalized Career Guidance:</b> Beyond resume refinement, we offer personalized career guidance to help candidates navigate their job search journey effectively. From interview preparation to career advancement strategies, we provide valuable support every step of the way.</p>
                    <br />
                    <br />
                    <h3>Why Partner with Us:</h3>
                    <p><b>Efficiency:</b> Save time and resources by leveraging our efficient recruitment process. We handle the complexities of candidate screening and resume refinement, allowing you to focus on core business activities.</p>
                    <p><b>Quality Assurance:</b> Our commitment to quality is unwavering. We adhere to strict standards of excellence in every aspect of our service delivery, ensuring that you receive only the most qualified and suitable candidates for your organization.</p>
                    <p><b>Long-Term Partnerships:</b> We believe in fostering long-term partnerships built on trust and mutual respect. Whether {`you're`} hiring for immediate needs or planning for future growth, {`we're`} dedicated to supporting your talent acquisition goals every step of the way.</p>
                    <br/>
                    <p><b>{`Let's`} Connect:</b></p>
                    <p>Ready to elevate your recruitment experience and find the perfect candidates for your team? Contact us today to explore how our professional recruitment services can drive success for your organization.</p>

                </div>
                <div style={{ maxWidth: 450 }} className='card shadow m'>
                    <h2 className='bold tac'>First Career</h2>
                    <br />
                    <div className='df jcc'>
                        {/* <Link href='https://firstcareer.co/user/login'>
                            <button className={`tab-btn `}>Job Seeker Login</button>
                        </Link> */}
                        <div>Employer Login</div>
                    </div>
                    <br />
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

