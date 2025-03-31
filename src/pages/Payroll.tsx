
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Payroll() {
  return (
    <>
      <Helmet>
        <title>Payroll | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            Manage and process blockchain-based payroll for your employees.
          </p>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            The payroll module is under development. Check back soon for automated blockchain payroll features.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>Payroll Overview</CardTitle>
            <CardDescription>
              Smart contract-based payroll automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <p>
                The HR ChainFlow payroll system will utilize smart contracts to automate salary payments,
                ensuring transparency, accuracy, and security. Payments will be executed directly on the
                blockchain, creating an immutable record of all transactions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Automated Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts automatically execute payments based on predefined conditions
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Transparent Records</h3>
                  <p className="text-sm text-muted-foreground">
                    All payment records are stored on the blockchain, providing complete transparency
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Real-time Auditing</h3>
                  <p className="text-sm text-muted-foreground">
                    Financial records can be audited in real-time, ensuring compliance
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
