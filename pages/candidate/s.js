import usePagination from '@/Components/Pagination/usePagination'
import Layout from '@/Layout'
import AppHeader from '@/PagesComponents/Candidates/AppHeader'
import AppTable from '@/PagesComponents/Candidates/AppTable'


export default function Page() {

  const [pagination, setPagination, reset] = usePagination()

  return (
    <Layout>
      <AppHeader resetPagination={reset} />
      <AppTable pagination={pagination} setPagination={setPagination} />
    </Layout>
  )
}
