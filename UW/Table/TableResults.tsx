import React from 'react'
import { Search } from '../Icons'
import LinearProgress from '../LinearProgress';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    total: number;
}

export default function TableResults({ loading, total = 0, children, ...props }: Props) {
    return (
        <>
            {loading && <LinearProgress />}
            <div {...props}>
                <div>
                    {loading ?
                        <div className="df aic"><Search />Loading...</div>
                        : `${total} results found`}
                </div>
                {children}
            </div>
        </>
    )
}
