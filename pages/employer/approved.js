import Layout from "@/Layout";
import ApprovedTable from "@/PagesComponents/Employer/ApprovedTable";
import EmployerTab from "@/PagesComponents/Employer/EmployerTab";

export default function Page() {

    return (
        <Layout title='Employers'>
            <EmployerTab />
            <ApprovedTable/>
        </Layout>
    )
}
