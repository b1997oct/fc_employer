import Layout from '@/Layout'
import JobTable from '@/PagesComponents/Job/JobTable'
import JobHeader from '@/PagesComponents/Job/JobHeader'

export default function Page() {
    return (
        <Layout>
            <JobHeader />
            <JobTable
                url='/api/job/closed'
                body={{ status: { $exists: false }, publish: { $ne: true } }}
            />
        </Layout>
    )
}
