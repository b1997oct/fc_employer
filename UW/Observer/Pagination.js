import React, { useEffect, useState } from 'react'
import Observer from '.'
import { POST } from '@/lib/FETCH'

export default function Pagination({ url, body = {}, loadData, totalCount, isNext, active = true }) {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(1)
    const [next, setNext] = useState()

    function fetchPage(pageNew) {
        if (loading) return
        setLoading(true)
        POST(url, { body: { page: pageNew, ...body } })
            .then(res => {
                loadData(res)
                const count = res.totalCount
                if (typeof count === 'number') {
                    setTotal(count)
                    totalCount && totalCount(count)
                }
                setPage(pageNew)

            })
            .catch(err => {
                console.log('err: ', err.message);
            })
            .finally(() => setLoading(false))
    }

    const nxt = page < Math.ceil(total / 24)
    isNext && isNext(nxt)

    useEffect(() => {

        if (next && nxt && active) {
            fetchPage(page + 1)
        }

    }, [next])

    return (<Observer isIntersecting={setNext} />)
}
