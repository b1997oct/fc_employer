import Drawer from '@/Components/Drawer'
import { Menu } from '@/Components/Icons'
import { POST } from '@upgradableweb/client'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'



export default function Sidebar() {
    const [open, setOpen] = useState(false)

    const pathname = useRouter().pathname.split('/')

    const menus = [
        {
            title: 'Dashboard',
            href: '/',
            active: pathname[1] === ''
        },
        {
            title: 'Jobs',
            href: '/job/live',
            active: pathname[1] === 'job'
        },
        {
            title: 'Candidates',
            href: '/candidate/s?status=shortlisted',
            active: pathname[1] === 'candidate'
        },
        {
            title: 'Company Profile',
            href: '/company/profile',
            active: pathname[1] === 'company'
        },
    ]


    function logout() {
        if (!confirm('confirm logout')) return
        POST('/api/acc/logout')
            .then(res => {
                Router.replace('/login')
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <div>
            <button onClick={() => setOpen(!open)} style={{ borderRadius: 4 }} className='icon-btn mr-2'><Menu /></button>
            <Drawer open={open} onClose={() => setOpen(!open)}>
                <div className='m'>
                    <div>
                        <h2 style={{ minWidth: 260 }}>Firstcareer</h2>
                    </div>
                    <hr className='my' />
                    {menus.map((dat, i) => {
                        const cn = dat.active ?'menu-selected':''
                        return(
                        <Link href={dat.href} key={i}>
                            <div className={`menu  p rounded-sm bold ${cn}`}>
                                {i + 1}. {dat.title}
                            </div>
                        </Link>)})}
                    <button
                        className='menu border py-2 mt bold rounded-sm'
                        onClick={logout}
                    >Logout</button>
                </div>
            </Drawer>
        </div>
    )
}
