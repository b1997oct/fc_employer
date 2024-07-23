import onAssign from '../JS/onAssign'

export default function AutoPagination({ total, skip, limit, loading, setPagination }) {

    const next = skip + limit

    function onNext() {
        setPagination(onAssign({ skip: next }))
    }

    return (
        <div className='df mt'>
            <div className='f-1 df jcc'>
            </div>  
            <button
                disabled={loading || !(next < total)}
                onClick={onNext}
                className='rounded-none bg border bold w-full md:w-auto'>{next < total ? 'View More' : 'No More'} ({Math.min(total, next)})
            </button>
        </div>
    )


}
