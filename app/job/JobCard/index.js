'use client'
import useServerFn from '@/PagesComponents/useServerFn'
import useQuery from '@/UW/Hooks/useQuery'
import Link from 'next/link'


let status = [
    {
        name: 'In Active',
        color: 'text-red-600'
    },
    {
        name: 'Live',
        color: 'text-green-400'
    },
]

export default function JobCard() {
    const { data, loading } = useServerFn('jobCardData')
    let { tab = 'inactive' } = useQuery()

    return (
        <div className='md:m m-2 df gap my jcs overflow-auto'>
            {status.map(d => {
                let { name, color } = d
                name = name.replace(' ', '').toLowerCase()
                let active = name == tab

                return <Link href={`?tab=${name}`} key={name} className={`p w-full border df aic gap bg ${color}`}>
                    <input type='radio' checked={active} />
                    <div className='whitespace-nowrap'>{d.name} ({loading ? '###' : data[name]})</div>
                </Link>
            })}
        </div>
    )
}
