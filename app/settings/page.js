import Layout from '@/PagesComponents/Layout'
import Link from 'next/link'
import React from 'react'

export default function Page() {
    return (
        <Layout active='Settings'>
            <div className='m-2 md:m bg px md:px-20 pb-20 pt-8'>
                <h1 className='mb-8'>Application Settings</h1>
                <div className='df gap md:gap-8 fww mb'>
                    <Wrapper>
                        <div>Business</div>
                        <Anchor href='/business/email' >Email Automation</Anchor>
                        <Anchor href='/business/events'>Events</Anchor>
                    </Wrapper>

                    <Wrapper>
                        <div>Set Up</div>
                        <Anchor href='/values' >Values</Anchor>
                        <Anchor href='/status' >Statuses</Anchor>
                        <Anchor href='/uid' >Unique ids</Anchor>
                    </Wrapper>
                </div>
            </div>
        </Layout>
    )
}

function Anchor({ href, ...props }) {
    return <Link className='a' href={href}  {...props} />
}

function Wrapper(params) {
    return <div className='df fdc gap ais' {...params} />
}