
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Contracts() {
  return (
    <>
      <Helmet>
        <title>Contracts | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Smart Contracts</h1>
          <p className="text-muted-foreground">
            Manage employment contracts using blockchain technology.
          </p>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            The smart contract management module is under development. Check back soon for digital contract features.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>Employment Smart Contracts</CardTitle>
            <CardDescription>
              Digital contracts with blockchain verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <p>
                HR ChainFlow will digitize employment contracts as smart contracts on the blockchain.
                This ensures that contract terms are immutable, transparent, and automatically enforced.
                Digital signatures provide secure and verifiable consent from all parties.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Digital Signatures</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure cryptographic signatures that provide irrefutable proof of agreement
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Immutable Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    Contract terms cannot be altered without consent from all involved parties
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Automated Enforcement</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts can automatically execute terms based on predefined conditions
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
