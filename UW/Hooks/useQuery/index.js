'use client'
import { useSearchParams } from 'next/navigation'

export default function useQuery() {
    let searchParams = useSearchParams(),
        query = {}

    for (const [key, value] of searchParams.entries()) {
        query[key] = value
    }
    return query
}
