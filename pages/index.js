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
        url='/api/job/count?q=active'
      />
       <DashboardCard
        title='Inactive Jobs'
        url='/api/job/count?q=inactive'
      />
      </div>
     
    </Layout>
  )
}
