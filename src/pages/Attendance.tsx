
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceTracker from "@/components/AttendanceTracker";
import LeaveRequests from "@/components/LeaveRequests";
import { Workflow, GitCommit, ArrowRight } from "lucide-react";

export default function Attendance() {
  return (
    <>
      <Helmet>
        <title>Attendance | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Attendance & Leave</h1>
          <p className="text-muted-foreground">
            Track attendance and manage leave requests with blockchain verification.
          </p>
        </div>
        
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
            <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="space-y-4">
            <AttendanceTracker />
          </TabsContent>
          <TabsContent value="leave" className="space-y-4">
            <LeaveRequests />
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance & Leave Automation</CardTitle>
            <CardDescription>
              Smart contract-based attendance tracking and leave management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <p>
                The HR ChainFlow attendance system utilizes smart contracts to track employee attendance 
                and manage leave requests. This ensures accuracy, transparency, and automates the approval process
                based on company policies stored on the blockchain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Immutable Records</h3>
                  <p className="text-sm text-muted-foreground">
                    Attendance records stored on blockchain cannot be manipulated or tampered with
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Automated Approvals</h3>
                  <p className="text-sm text-muted-foreground">
                    Leave requests can be automatically approved based on predefined smart contract rules
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Policy Enforcement</h3>
                  <p className="text-sm text-muted-foreground">
                    Company attendance policies are encoded in smart contracts for consistent enforcement
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Integrated HR System Workflow</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    <div className="relative flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 z-10">
                        <GitCommit className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Employee Onboarding</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Employee contract is created and stored on the blockchain with terms, leave balance, and attendance policy
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="absolute -top-4 left-6 h-4 w-0.5 bg-gray-200"></div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 z-10">
                        <Workflow className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Daily Attendance Tracking</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Attendance is recorded daily and stored on the blockchain, automatically impacting leave balance
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="absolute -top-4 left-6 h-4 w-0.5 bg-gray-200"></div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 z-10">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Leave Request Processing</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Leave requests automatically check contract terms and leave balance before approval
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="absolute -top-4 left-6 h-4 w-0.5 bg-gray-200"></div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 z-10">
                        <GitCommit className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Payroll Calculation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monthly payroll automatically calculated based on attendance records and contract terms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
