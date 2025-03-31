
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PayrollRecord {
  id: number;
  employeeName: string;
  daysWorked: number;
  leavesTaken: number;
  baseSalary: number;
  deductions: number;
  finalAmount: number;
  status: "Pending" | "Processed" | "Failed";
}

// Mock data for payroll demonstration
const mockPayrollData: PayrollRecord[] = [
  {
    id: 1,
    employeeName: "Sarah Johnson",
    daysWorked: 22,
    leavesTaken: 0,
    baseSalary: 5000,
    deductions: 250,
    finalAmount: 4750,
    status: "Processed"
  },
  {
    id: 2,
    employeeName: "Michael Smith",
    daysWorked: 20,
    leavesTaken: 2,
    baseSalary: 4500,
    deductions: 225,
    finalAmount: 4275,
    status: "Processed"
  },
  {
    id: 3,
    employeeName: "Emily Davis",
    daysWorked: 18,
    leavesTaken: 4,
    baseSalary: 4800,
    deductions: 480,
    finalAmount: 4320,
    status: "Pending"
  },
  {
    id: 4,
    employeeName: "James Wilson",
    daysWorked: 22,
    leavesTaken: 0,
    baseSalary: 5200,
    deductions: 260,
    finalAmount: 4940,
    status: "Pending"
  },
  {
    id: 5,
    employeeName: "David Thompson",
    daysWorked: 21,
    leavesTaken: 1,
    baseSalary: 5500,
    deductions: 275,
    finalAmount: 5225,
    status: "Pending"
  }
];

export default function Payroll() {
  const [currentMonth] = useState("May 2023");
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollData);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Processed":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const processPayroll = (id: number) => {
    setPayrollRecords(
      payrollRecords.map(record =>
        record.id === id ? { ...record, status: "Processed" } : record
      )
    );
    
    toast({
      title: "Payroll Processed",
      description: "The payroll has been processed and recorded on the blockchain",
    });
  };

  const processAllPending = () => {
    setPayrollRecords(
      payrollRecords.map(record =>
        record.status === "Pending" ? { ...record, status: "Processed" } : record
      )
    );
    
    toast({
      title: "All Payrolls Processed",
      description: "All pending payrolls have been processed and recorded on the blockchain",
    });
  };

  const pendingCount = payrollRecords.filter(record => record.status === "Pending").length;

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
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Payroll Processing</CardTitle>
              <CardDescription>
                For period: {currentMonth}
              </CardDescription>
            </div>
            {pendingCount > 0 && (
              <Button onClick={processAllPending}>
                Process All Pending ({pendingCount})
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Days Worked</TableHead>
                    <TableHead className="hidden md:table-cell">Leaves</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead className="hidden md:table-cell">Deductions</TableHead>
                    <TableHead>Final Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.daysWorked}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.leavesTaken}</TableCell>
                      <TableCell>${record.baseSalary.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">${record.deductions.toLocaleString()}</TableCell>
                      <TableCell>${record.finalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {record.status === "Pending" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => processPayroll(record.id)}
                          >
                            Process
                          </Button>
                        )}
                        {record.status !== "Pending" && (
                          <span className="text-xs text-muted-foreground">No actions available</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
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
                The HR ChainFlow payroll system utilizes smart contracts to automate salary payments,
                ensuring transparency, accuracy, and security. Payments are executed directly on the
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
