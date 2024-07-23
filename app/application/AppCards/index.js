import useServerFn from '@/PagesComponents/useServerFn'


let status = ['Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected']
let colors = ['text-blue-400', 'text-yellow-400', 'text-yellow-400', 'text-orange-400', 'text-green-400', 'text-red-600']

export default function AppCards() {

    const { data, loading } = useServerFn('applicationTabCount')

    return (
        <div className='df p gap-2 overflow-auto'>
            {status.map((d, i) => <div key={i} className={`p bg w-full border border-[rgb(var(--pc))] ${colors[i]}`}>
                <div className='text-xl'>{loading ? 'loading...' : data[d.toLowerCase()] || 0}</div>
                {d}
            </div>)}
        </div>
    )
}
