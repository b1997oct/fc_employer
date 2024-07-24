'use client'
import Button from '@/UW/Button';
import useErrors from '@/UW/Hooks/useErrors';
import Input from '@/UW/Input';
import { useState } from 'react'
import ServerFunction from '@/server';

const fields = [
  {
    name: "email",
    pl: 'eg:example@mail.com',
    label: "Enter Email ID",
    error: { min: 1 }
  },
  {
    name: "password",
    placeholder: 'Enter password',
    label: "Password",
    pl: '****',
    error: { min: 1 }
  }
]

export default function Page() {

  const { data, inputParse, isFocus } = useErrors(fields),
    [loading, setLoading] = useState(),
    [error, setError] = useState(false),
    handler = ServerFunction('login', { setLoading, setError, onResponse }),
    touched = typeof loading == 'boolean'

  function onResponse() {
    location.replace('/')
  }
  function submit() {
    if (isFocus()) {
      setLoading(false)
      return
    }
    handler(data)
  }


  return (
    <div className='df jcc aic h-screen'>
      <div className=' md:w-[500px] py-8 px md:px-8 bg m w-full  border-b-black border'>
        <h1 className='font-bold tac my'>
          <span className='cp'>Firstcareer</span> Wellcome You To Job Posting
        </h1>
        <div className='df fdc gap-2'>
          {fields.map(d => {
            const { name } = d
            return <Input key={name} touched={touched} {...inputParse(d)} />
          })}
        </div>
        {/* <div className='my tae'>
                        <button
                            disabled={loading}
                            onClick={() => r.push('/account/reset')}
                            className='text-btn'>
                            Forgot Password
                        </button>
                    </div> */}
        <div className='ce mt-8'>{error}</div>
        <Button onClick={submit} disabled={loading} className='w-full'>
          Login
        </Button>
        <div className='df jcc my gap-2'>
          Or Continue With
          <a href='mailto:info@firstcareer.co'
            // href={"https://wa.me/+918904472228?text=" + encodeURIComponent(`Hello, I am having problem while signup/login. And i need to know its my end or not`)}
            target='_blank' className='a'>Signup</a>
        </div>
      </div>
    </div>
  )
}