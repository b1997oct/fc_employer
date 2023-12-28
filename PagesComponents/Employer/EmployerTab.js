import Tabs from '@/Components/Tabs'
import { useRouter } from 'next/router'

export default function EmployerTab() {

    const pathname = useRouter().pathname.split('/')
    const tabs = [
        {
            active: pathname[2] === 'new',
            link: '/employer/new',
            title: 'New'
        },
        {
            active: pathname[2] === 'approved',
            link: '/employer/approved',
            title: 'Approved'
        },
    ]
    return (
            <Tabs
                props={tabs}
            />
    )
}
