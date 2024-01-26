import Layout from "@/Layout";
import DashboardCard from "@/PagesComponents/Dashboard/DashboardCard";

export default function Page() {

  return (
    <Layout>
      <div className="h-screen">
        <h3>Wellcome to Your Dashboard</h3>

        <div className="df fww aic">
          <DashboardCard
            title='Active Jobs'
            url='/api/job/count'
            body={{ publish: true }}
          />
          <DashboardCard
            title='Inactive Jobs'
            url='/api/job/count'
            body={{ publish: { $ne: true } }}
          />
        </div>
      </div>
    </Layout>
  )
}
