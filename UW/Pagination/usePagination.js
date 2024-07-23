'use client'

import { useState } from "react"
import AutoPagination from "./AutoPagination"

const initial = {
    skip: 0,
    limit: 24,
    sort: { updatedAt: -1 },
}

export default function usePagination(total, props = {}) {

    const values = { ...initial, ...props },
        [pagination, setPagination] = useState(values),
        resetPagination = (obj = {}) => setPagination({ ...values, ...obj }),
        { limit, skip } = pagination,
        Pagination = () => AutoPagination({ skip, limit, setPagination, total })

    return { pagination, setPagination, resetPagination, Pagination }
}
