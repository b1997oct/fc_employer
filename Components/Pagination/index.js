import Tooltip from '../Tooltip'

export default function Pagination({ pagination, setPagination, className, ...props }) {
    const { skip, total, limit } = pagination
    const next = skip + limit
    function onNext() {
        setPagination({ ...pagination, skip: next })
    }

    return (
        <div {...props} className={`df aic jce gap p bg my mx-1 ${className}`}>
            <TotalPageNo
                skip={Math.min(total, next)}
                total={total}
            />
            <button
                disabled={next >= total}
                onClick={onNext}
                className='pagination-btn'>
                View More
            </button>
        </div>
    )
}

function TotalPageNo({ total, skip }) {
    return (
        <Tooltip content={<span className='nowrap'>Records {skip} | Total {total}</span>}>
            <p className='select-none'>{skip}/{total}</p>
        </Tooltip>
    )
}