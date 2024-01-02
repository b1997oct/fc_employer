import { RightArrow } from '../Icons'
import Tooltip from '../Tooltip'

export default function Pagination({ pagination, setPagination, className, ...props }) {
    const { skip, total, limit } = pagination
    const next = skip + limit
    function onNext() {
        setPagination({ ...pagination, skip: next })
    }

    return (
        <div {...props} className={`df aic jce gap p bg my-8 mx-1 ${className}`}>
            <TotalPageNo
                skip={Math.min(total, next)}
                total={total}
            />
            <Tooltip content={next >= total ? `Only ${total} records` : 'Next'}>
                <button
                    disabled={next >= total}
                    onClick={onNext}
                    className='icon-btn'>
                    <RightArrow />
                </button>
            </Tooltip>
        </div>
    )
}

function TotalPageNo({ total, skip }) {
    return (
        <Tooltip content={<span className='nowrap'>Total {total} | Records {skip}</span>}><strong>{total}/{skip}</strong></Tooltip>
    )
}