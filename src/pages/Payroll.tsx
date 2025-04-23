import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PayrollRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  daysWorked: number;
  leavesTaken: number;
  baseSalary: number;
  deductions: number;
  finalAmount: number;
  status: "Pending" | "Processed" | "Failed";
  month: string;
  year: number;
}

// Mock employee data with contracts
const mockEmployees = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    contractId: 1,
    baseSalary: 5000,
    department: "Human Resources",
  },
  { 
    id: 2, 
    name: "Michael Smith", 
    contractId: 2,
    baseSalary: 4500,
    department: "Engineering",
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    contractId: 3,
    baseSalary: 4800,
    department: "Marketing",
  },
  { 
    id: 4, 
    name: "James Wilson", 
    contractId: 4,
    baseSalary: 5200,
    department: "Finance",
  },
  { 
    id: 5, 
    name: "David Thompson", 
    contractId: 5,
    baseSalary: 5500,
    department: "Product",
  }
];

// Mock attendance data
const mockAttendance = [
  { employeeId: 1, present: 22, absent: 0, late: 0 },
  { employeeId: 2, present: 20, absent: 2, late: 0 },
  { employeeId: 3, present: 18, absent: 4, late: 0 },
  { employeeId: 4, present: 22, absent: 0, late: 0 },
  { employeeId: 5, present: 21, absent: 1, late: 0 },
];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const { toast } = useToast();

  // Generate payroll records based on employees, contracts, and attendance
  useEffect(() => {
    const newRecords: PayrollRecord[] = mockEmployees.map((employee, index) => {
      const attendance = mockAttendance[index];
      
      // Calculate deductions based on absences
      const absenteeismRate = attendance.absent > 0 ? attendance.absent / 22 : 0;
      const deductions = employee.baseSalary * absenteeismRate;
      
      // Calculate final amount
      const finalAmount = employee.baseSalary - deductions;
      
      return {
        id: index + 1,
        employeeId: employee.id,
        employeeName: employee.name,
        daysWorked: attendance.present,
        leavesTaken: attendance.absent,
        baseSalary: employee.baseSalary,
        deductions: Math.round(deductions * 100) / 100,
        finalAmount: Math.round(finalAmount * 100) / 100,
        status: "Pending" as const, // Explicitly type as one of the allowed status values
        month: selectedMonth,
        year: parseInt(selectedYear)
      };
    });
    
    setPayrollRecords(newRecords);
  }, [selectedMonth, selectedYear]);

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
        record.id === id ? { ...record, status: "Processed" as const } : record
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
        record.status === "Pending" ? { ...record, status: "Processed" as const } : record
      )
    );
    
    toast({
      title: "All Payrolls Processed",
      description: "All pending payrolls have been processed and recorded on the blockchain",
    });
  };

  const generatePayslips = () => {
    toast({
      title: "Payslips Generated",
      description: "All payslips have been generated and are ready for distribution",
    });
  };

  const recalculatePayroll = () => {
    // Simulate updating attendance data and recalculating
    const updatedRecords = payrollRecords.map(record => {
      // For demonstration, we slightly modify the days worked
      const attendance = mockAttendance.find(a => a.employeeId === record.employeeId)!;
      
      // Recalculate based on attendance
      const absenteeismRate = attendance.absent > 0 ? attendance.absent / 22 : 0;
      const deductions = record.baseSalary * absenteeismRate;
      const finalAmount = record.baseSalary - deductions;
      
      return {
        ...record,
        daysWorked: attendance.present,
        leavesTaken: attendance.absent,
        deductions: Math.round(deductions * 100) / 100,
        finalAmount: Math.round(finalAmount * 100) / 100,
        status: "Pending" as const // Explicitly type this as a literal "Pending"
      };
    });
    
    setPayrollRecords(updatedRecords);
    
    toast({
      title: "Payroll Recalculated",
      description: "Payroll has been recalculated based on the latest attendance records",
    });
  };

  const pendingCount = payrollRecords.filter(record => record.status === "Pending").length;
  const currentPeriod = `${selectedMonth} ${selectedYear}`;

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
              <CardDescription className="flex items-center space-x-2">
                <span>For period:</span>
                <div className="flex space-x-2">
                  <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={recalculatePayroll}>
                <Calendar className="mr-2 h-4 w-4" />
                Sync Attendance
              </Button>
              {pendingCount > 0 && (
                <Button onClick={processAllPending}>
                  Process All ({pendingCount})
                </Button>
              )}
            </div>
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
                        {record.status === "Processed" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toast({
                              title: "Payslip Generated",
                              description: `Payslip for ${record.employeeName} has been generated`
                            })}
                          >
                            <Download className="mr-1 h-3 w-3" /> Payslip
                          </Button>
                        )}
                        {record.status === "Failed" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => processPayroll(record.id)}
                          >
                            Retry
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">
                  Total payroll: ${payrollRecords.reduce((sum, record) => sum + record.finalAmount, 0).toLocaleString()}
                </span>
              </div>
              <Button variant="outline" onClick={generatePayslips}>
                <Download className="mr-2 h-4 w-4" /> Generate All Payslips
              </Button>
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
                blockchain, creating an immutable record of all transactions. The system automatically 
                calculates salary based on attendance records.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Automated Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts automatically execute payments based on predefined conditions
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Attendance Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Payroll automatically adjusts based on employee attendance and leave records
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
