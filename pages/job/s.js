import Layout from '@/Layout'
import JobTable from '@/PagesComponents/Job/JobTable'
import JobTabs from '@/PagesComponents/Job/JobTabs'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout>
            <div className='df my aic bg pr fww'>
                
              <JobTabs/>
                <div className='f-1'/>
                <Link href='/job/new' className='m-2'>
                    <button className='btn p-btn'>Post new job</button>
                </Link>
            </div>

            <JobTable />
        </Layout>
    )
}
