
import Layout from '@/PagesComponents/Layout'
import Application from '.'

export default function Page({ searchParams }) {
  let { user, job } = searchParams
  return (
    <Layout active='Applications'>
      <Application user={user} job={job} />
    </Layout>
  )
}
