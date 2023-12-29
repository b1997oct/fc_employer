import Layout from "@/Layout";
import DashboardCard from "@/PagesComponents/Dashboard/DashboardCard";

export default function Page() {

  return (
    <Layout>
      <div>
        <h3>Wellcome to Your Dashboard</h3>
      </div>
      <div className="df fww jcc">
      <DashboardCard
        title='Active Jobs'
        value={20}
      />
       <DashboardCard
        title='Inactive Jobs'
        value={2}
      />
      </div>
     
    </Layout>
  )
}
