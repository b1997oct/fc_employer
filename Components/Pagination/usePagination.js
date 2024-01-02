import { useState } from "react"

const initial = {
    skip: 0,
    limit: 24,
    sort_field: 'updatedAt',
    sort: -1,
}

/**
 * 
 * @param {Object} props - Additional properties to customize the initial pagination state.
 * @param {number | 0} props.skip - default > 0 | skip number.
 * @param {number} props.limit -default > 24 | The number of items per page.
 * @param {string} props.sort_field - default > updatedAt | The field to use for sorting.
 * @param {number} props.sort - default > -1 | The sorting order.
 * @returns {[{ page:number,limit:number, sort_field:string, sort: -1 | 1}, ()=>void]}
 */
export default function usePagination(props) {
    const [data, setData] = useState({ ...initial, ...props })
    return [data, setData]
}
