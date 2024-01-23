import Layout from '@/Layout'
import { useState } from 'react'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import JobPost from '@/PagesComponents/Job/JobPost'
import { useRouter } from 'next/router'


export default function Page() {

    const [py, setPy] = useState({})
    function handleData(d) {
        d.requirement = d.lost_date ? 'last_date' : 'person'
        d.last_date = d.lost_date
        const ed = d.education.split('-')
        d.education = ed[0]
        d.stream = ed[1]
        setPy(d)
    }
    const id = useRouter().query.id
    const url = id && id !== 'new' && '/api/job'

    useDataFetch(url, { id }, { setData: handleData })


    return (
        <Layout>
            <JobPost
                py={py}
            />
        </Layout>
    )
}
