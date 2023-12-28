import Layout from "@/Layout";
import EmployerTab from "@/PagesComponents/Employer/EmployerTab";
import NewEmployerTable from "@/PagesComponents/Employer/NewEmployerTable";

export default function Page() {

  return (
    <Layout title='Employers'>
      <EmployerTab/>
      <NewEmployerTable/>
    </Layout>
  )
}
