import Drawer from '@/Components/Drawer'
import { Menu } from '@/Components/Icons'
import { POST } from '@upgradableweb/client'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

const menus = [
    {
        title: 'Dashboard',
        href: '/'
    },
    {
        title: 'Jobs',
        href: '/job/live'
    },
    {
        title: 'Company Profile',
        href: '/company/profile'
    },
]

export default function Sidebar() {
    const [open, setOpen] = useState(false)

    function logout() {
        if (!confirm('confirm logout')) return
        POST('/api/logout')
            .then(res => {
                Router.replace('/login')
            })
            .catch(err => {
                alert(err.message)
            })
    }
    return (
        <div>
            <button onClick={() => setOpen(!open)} style={{ borderRadius: 4 }} className='icon-btn'><Menu /></button>
            <Drawer open={open} onClose={() => setOpen(!open)}>
                <div className='m'>
                    <div>
                        <h2 style={{ minWidth: 260 }}>Firstcareer</h2>
                    </div>
                    <hr className='my' />
                    {menus.map((dat, i) => (
                        <Link href={dat.href} key={i}>
                            <div className={`menu p rounded-sm bold`}>
                                {dat.title}
                            </div>
                        </Link>))}
                    <button
                        className='menu border py-2 mt bold rounded-sm'
                        onClick={logout}
                    >Logout</button>
                </div>
            </Drawer>
        </div>
    )
}
