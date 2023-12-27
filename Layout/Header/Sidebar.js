import Drawer from '@/Components/Drawer'
import Link from 'next/link'
import { useState } from 'react'

const menus = [
    {
        title: 'Dashboard',
        href: '/'
    },
    {
        title: 'All Jobs',
        href: '/job/all'
    },
    {
        title: 'Your Company Page',
        href: '/profile'
    },
]
export default function Sidebar() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button onClick={() => setOpen(!open)} style={{ borderRadius: 4 }} className='icon-btn'>Sidebar</button>
            <Drawer open={open} onClose={() => setOpen(!open)}>
                <div className='m'>
                    <div>
                        <h2 style={{ minWidth: 260 }}>Firstcareer</h2>
                    </div>
                    <hr className='my' />
                        {menus.map((dat, i) => (
                            <Link href={dat.href} key={i}>
                                <h3 className={`menu p rounded-sm bold`}>
                                   {dat.title}
                                </h3>
                            </Link>))}
                </div>
            </Drawer>
        </div>
    )
}
