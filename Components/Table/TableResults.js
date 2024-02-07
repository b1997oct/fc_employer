import { Search } from '../Icons'

export default function TableResults({ loading, total, onClick, length, disable }) {
    return (
        <div className="bg p df jcsb">
            {loading ?
                <div className="df aic"><Search />Loading...</div>
                : `${total} results found`}
            {onClick &&
                <div className="df gap-2 aic">
                    {length ? `${length} Selected` : ''}
                    <button disabled={disable} className='border px hover bold py-1' onClick={onClick}>Export</button>
                </div>}
        </div>
    )
}
