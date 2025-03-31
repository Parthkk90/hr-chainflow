
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wallet, Calendar, Briefcase } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-hrblue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">35</div>
          <p className="text-xs text-muted-foreground mt-1">
            +2 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payroll Processed</CardTitle>
          <Wallet className="h-4 w-4 text-hrteal-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$128,450</div>
          <p className="text-xs text-muted-foreground mt-1">
            Last processed on May 28
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
          <Calendar className="h-4 w-4 text-hrblue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground mt-1">
            5 approved, 3 pending
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
          <Briefcase className="h-4 w-4 text-hrteal-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-1">
            3 pending signatures
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
