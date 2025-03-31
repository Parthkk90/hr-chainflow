
import { Helmet } from "react-helmet";
import EmployeeTable from "@/components/EmployeeTable";

export default function Employees() {
  return (
    <>
      <Helmet>
        <title>Employees | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your employees and their blockchain-verified records.
          </p>
        </div>
        
        <EmployeeTable />
      </div>
    </>
  );
}
