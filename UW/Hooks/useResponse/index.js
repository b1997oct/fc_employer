import AutoPagination from '@/UW/Pagination/AutoPagination'
import { useRef, useState } from 'react'

const initial = {
    skip: 0,
    limit: 24
}

export default function useResponse(props = { sort: { createdAt: -1 } }) {

    props = Object.assign({}, initial, props)
    const [data, setData] = useState([]),
        count = useRef(0),
        total = count.current,
        [pagination, setPagination] = useState(props),
        resetPagination = (obj = {}) => setPagination({ ...props, ...obj }),
        Pagination = ({ loading }) => AutoPagination({ ...pagination, loading, setPagination, total }),

        onResponse = res => {
            count.current = res.total || 0
            let { skip } = pagination
            if (!skip) {
                setData(res.data)
            } else {
                setData(prev => [...prev, ...res.data])
            }

        }


    return { data, total, setData, onResponse, Pagination, pagination, resetPagination }
}
