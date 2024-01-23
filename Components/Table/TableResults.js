import { Search } from '../Icons'

export default function TableResults({ loading, total }) {
    return (
        <div className="bg p">
            {loading ?
                <div className="df aic"><Search />Loading...</div>
                : `${total} results found`}
        </div>
    )
}
