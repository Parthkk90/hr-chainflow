
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            The attendance and leave management module is under development. Check back soon for automated tracking features.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance & Leave Management</CardTitle>
            <CardDescription>
              Smart contract-based attendance tracking and leave management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <p>
                The HR ChainFlow attendance system will utilize smart contracts to track employee attendance 
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
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
