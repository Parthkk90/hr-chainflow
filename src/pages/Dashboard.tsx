
import { Helmet } from "react-helmet";
import DashboardStats from "@/components/DashboardStats";
import BlockchainInfo from "@/components/BlockchainInfo";
import RecentActivity from "@/components/RecentActivity";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to HR ChainFlow. Here's an overview of your HR operations.
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BlockchainInfo />
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  );
}
