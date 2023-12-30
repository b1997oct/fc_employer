import Tabs from '@/Components/Tabs'
import { useRouter } from 'next/router'


export default function EmployerTab() {

    const pathname = useRouter().pathname.split('/')[2]
    const getActive = (value) => pathname === value ? 'success-bg' : 'ci'

    const tabs = [
        {
            className: getActive('new'),
            link: '/employer/new',
            title: 'New'
        },
        {
            className: getActive('approved'),
            link: '/employer/approved',
            title: 'Approved'
        },
    ]
    return (
        <div className='my py-2 bg'>
            <Tabs
                props={tabs}
            />
        </div>
    )
}
