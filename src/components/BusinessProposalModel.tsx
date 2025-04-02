
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Users, 
  Calendar, 
  Briefcase, 
  Wallet, 
  Download, 
  BarChart,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for the proposal
const mockEmployeeData = {
  total: 35,
  active: 32,
  onLeave: 2,
  inactive: 1,
  departmentDistribution: {
    "Human Resources": 5,
    "Engineering": 12,
    "Marketing": 7,
    "Finance": 6,
    "Product": 5
  }
};

const mockAttendanceData = {
  averageAttendance: "96%",
  latePercentage: "3%",
  absentPercentage: "1%",
  averageLeaveBalance: 18
};

const mockPayrollData = {
  totalMonthly: "$128,450",
  averageSalary: "$3,670",
  topDepartment: "Engineering ($4,200)",
  payrollGrowth: "+2.5% from last month"
};

const mockContractData = {
  total: 35,
  permanent: 27,
  fixedTerm: 5,
  probation: 3,
  pendingSignatures: 3
};

export default function BusinessProposalModel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const { toast } = useToast();
  
  const generateReport = () => {
    if (!companyName || !contactPerson) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Report Generated",
      description: "Business proposal has been generated and is ready for download",
    });
    
    // In a real implementation, this would create a PDF or document
    setTimeout(() => {
      const reportData = {
        companyName,
        contactPerson,
        date: new Date().toLocaleDateString(),
        employeeData: mockEmployeeData,
        attendanceData: mockAttendanceData,
        payrollData: mockPayrollData,
        contractData: mockContractData
      };
      
      // Create a JSON blob and trigger download
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${companyName.replace(/\s+/g, '_')}_HR_Proposal_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDialogOpen(false);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-6 w-6 text-hrblue-500" />
          Business Proposal Generator
        </CardTitle>
        <CardDescription>
          Generate a comprehensive business proposal based on your HR data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 border rounded-md bg-slate-50">
              <Users className="h-8 w-8 text-hrblue-500 mr-3" />
              <div>
                <h3 className="font-medium">Employee Management</h3>
                <p className="text-sm text-muted-foreground">
                  {mockEmployeeData.total} employees across {Object.keys(mockEmployeeData.departmentDistribution).length} departments
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border rounded-md bg-slate-50">
              <Calendar className="h-8 w-8 text-hrblue-500 mr-3" />
              <div>
                <h3 className="font-medium">Attendance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  {mockAttendanceData.averageAttendance} average attendance rate
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border rounded-md bg-slate-50">
              <Wallet className="h-8 w-8 text-hrteal-500 mr-3" />
              <div>
                <h3 className="font-medium">Payroll Processing</h3>
                <p className="text-sm text-muted-foreground">
                  {mockPayrollData.totalMonthly} monthly payroll
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border rounded-md bg-slate-50">
              <Briefcase className="h-8 w-8 text-hrteal-500 mr-3" />
              <div>
                <h3 className="font-medium">Contract Management</h3>
                <p className="text-sm text-muted-foreground">
                  {mockContractData.total} contracts with blockchain verification
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">HR ChainFlow Benefits:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Streamlined employee management with blockchain-verified identity</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Automated attendance tracking that integrates with payroll</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Transparent leave request system with approval workflows</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Smart contract-based employment agreements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Automated payroll calculation based on attendance</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Generate Business Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Generate Business Proposal</DialogTitle>
              <DialogDescription>
                Enter the company details to generate a customized proposal.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input 
                  id="contactPerson"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Enter contact person's name"
                />
              </div>
            </div>
            
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="p-4 border rounded-md mt-2">
                <h4 className="font-medium mb-2">Proposal Summary</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Complete HR solution with blockchain integration for secure and transparent HR operations.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span>Estimated efficiency increase: 35%</span>
                </div>
              </TabsContent>
              <TabsContent value="employees" className="space-y-2 p-4 border rounded-md mt-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Employees:</span>
                  <span className="text-sm font-medium">{mockEmployeeData.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active:</span>
                  <span className="text-sm font-medium">{mockEmployeeData.active}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">On Leave:</span>
                  <span className="text-sm font-medium">{mockEmployeeData.onLeave}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Inactive:</span>
                  <span className="text-sm font-medium">{mockEmployeeData.inactive}</span>
                </div>
              </TabsContent>
              <TabsContent value="attendance" className="space-y-2 p-4 border rounded-md mt-2">
                <div className="flex justify-between">
                  <span className="text-sm">Average Attendance:</span>
                  <span className="text-sm font-medium">{mockAttendanceData.averageAttendance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Late Percentage:</span>
                  <span className="text-sm font-medium">{mockAttendanceData.latePercentage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Absent Percentage:</span>
                  <span className="text-sm font-medium">{mockAttendanceData.absentPercentage}</span>
                </div>
              </TabsContent>
              <TabsContent value="payroll" className="space-y-2 p-4 border rounded-md mt-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Monthly:</span>
                  <span className="text-sm font-medium">{mockPayrollData.totalMonthly}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Salary:</span>
                  <span className="text-sm font-medium">{mockPayrollData.averageSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Top Department:</span>
                  <span className="text-sm font-medium">{mockPayrollData.topDepartment}</span>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button onClick={generateReport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
