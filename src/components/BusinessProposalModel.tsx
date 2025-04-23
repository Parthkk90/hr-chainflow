
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
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Users, 
  Calendar, 
  Briefcase, 
  Wallet, 
  Download, 
  BarChart,
  CheckCircle,
  Building,
  Mail,
  Phone,
  Globe,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

// Sample financial projections
const financialProjections = {
  year1: {
    revenue: "$580,000",
    expenses: "$420,000",
    profit: "$160,000"
  },
  year2: {
    revenue: "$870,000",
    expenses: "$590,000",
    profit: "$280,000"
  },
  year3: {
    revenue: "$1,250,000",
    expenses: "$780,000",
    profit: "$470,000"
  }
};

export default function BusinessProposalModel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [currentHRSystem, setCurrentHRSystem] = useState("");
  const { toast } = useToast();
  
  const generateReport = () => {
    if (!companyName || !contactPerson || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Business Plan Generated",
      description: "Your comprehensive business plan has been generated and is ready for download",
    });
    
    // In a real implementation, this would create a PDF or document
    setTimeout(() => {
      const reportData = {
        companyInfo: {
          name: companyName,
          contactPerson,
          email,
          phone,
          website,
          industryType,
          employeeCount,
          currentHRSystem
        },
        date: new Date().toLocaleDateString(),
        employeeData: mockEmployeeData,
        attendanceData: mockAttendanceData,
        payrollData: mockPayrollData,
        contractData: mockContractData,
        financialProjections
      };
      
      // Create a JSON blob and trigger download
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${companyName.replace(/\s+/g, '_')}_HR_ChainFlow_Business_Plan_${new Date().toISOString().split('T')[0]}.json`;
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
          Business Plan Generator
        </CardTitle>
        <CardDescription>
          Generate a comprehensive business plan for HR ChainFlow implementation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Tabs defaultValue="structure" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="structure">Plan Structure</TabsTrigger>
              <TabsTrigger value="venture">HR ChainFlow</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="structure" className="p-4 border rounded-md mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Business Plan Structure</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our comprehensive business plan follows this academic structure:
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">1.</span>
                  <div>
                    <span className="font-medium text-sm">Introductory Page</span>
                    <p className="text-xs text-muted-foreground">Company information, contact details, and nature of business</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">2.</span>
                  <div>
                    <span className="font-medium text-sm">Executive Summary</span>
                    <p className="text-xs text-muted-foreground">Brief overview of HR ChainFlow and its value proposition</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">3.</span>
                  <div>
                    <span className="font-medium text-sm">Environmental & Industry Analysis</span>
                    <p className="text-xs text-muted-foreground">HR industry trends, blockchain impact, and market overview</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">4.</span>
                  <div>
                    <span className="font-medium text-sm">Description of Venture</span>
                    <p className="text-xs text-muted-foreground">HR ChainFlow system features and benefits</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">5.</span>
                  <div>
                    <span className="font-medium text-sm">Operational Plan</span>
                    <p className="text-xs text-muted-foreground">Implementation process, deployment strategy, and maintenance</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">6.</span>
                  <div>
                    <span className="font-medium text-sm">Marketing Plan</span>
                    <p className="text-xs text-muted-foreground">Target customers, promotion strategy, and competitive analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">7.</span>
                  <div>
                    <span className="font-medium text-sm">Organizational Plan</span>
                    <p className="text-xs text-muted-foreground">Implementation team, support structure, and responsibilities</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">8.</span>
                  <div>
                    <span className="font-medium text-sm">Risk Assessment</span>
                    <p className="text-xs text-muted-foreground">Potential challenges and mitigation strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">9.</span>
                  <div>
                    <span className="font-medium text-sm">Financial Plan</span>
                    <p className="text-xs text-muted-foreground">Cost-benefit analysis, ROI projections, and implementation costs</p>
                  </div>
                </div>
                
                <div className="flex items-start p-2 border-l-2 border-hrblue-500">
                  <span className="font-medium text-sm mr-2">10.</span>
                  <div>
                    <span className="font-medium text-sm">Appendix</span>
                    <p className="text-xs text-muted-foreground">Technical details, smart contract specifications, and references</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="venture" className="p-4 border rounded-md mt-4 space-y-4">
              <h3 className="text-lg font-semibold">HR ChainFlow System</h3>
              <p className="text-sm text-muted-foreground mb-2">
                A comprehensive blockchain-powered HR management system that revolutionizes traditional HR processes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center p-4 border rounded-md bg-slate-50">
                  <Users className="h-8 w-8 text-hrblue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Employee Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Digital identities with blockchain verification
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md bg-slate-50">
                  <Calendar className="h-8 w-8 text-hrblue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Attendance Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Tamper-proof attendance records with smart audits
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md bg-slate-50">
                  <Wallet className="h-8 w-8 text-hrteal-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Payroll Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Automated calculations with blockchain verification
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md bg-slate-50">
                  <Briefcase className="h-8 w-8 text-hrteal-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Contract Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts with digital signatures
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Smart Contract Implementation:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm">Solidity-based employee records with immutable verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm">Automated salary processing with cryptographic security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm">Digital contract enforcement with multi-signature capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm">Role-based access control for secure organizational hierarchy</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="operations" className="p-4 border rounded-md mt-4 space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Operational Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Implementation process and operational workflows for HR ChainFlow
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-md font-medium">Implementation Timeline:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Phase 1: Initial Setup (4 weeks)</span>
                      <span>System architecture and blockchain integration</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Phase 2: Data Migration (3 weeks)</span>
                      <span>Transfer existing HR data to blockchain</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Phase 3: Training (2 weeks)</span>
                      <span>Staff training on new system usage</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Phase 4: Testing (3 weeks)</span>
                      <span>System testing and bug fixing</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Phase 5: Deployment (2 weeks)</span>
                      <span>Full system launch with monitoring</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-md font-medium mb-2">Resource Requirements:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <span className="font-medium w-32">IT Infrastructure:</span>
                      <span>Cloud servers, blockchain nodes, and security systems</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium w-32">Personnel:</span>
                      <span>Blockchain developers, HR specialists, and system administrators</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium w-32">Software:</span>
                      <span>HR ChainFlow platform license and support services</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium w-32">Training:</span>
                      <span>Training materials, workshops, and documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financials" className="p-4 border rounded-md mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Financial Projections</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Three-year financial projection for HR ChainFlow implementation
              </p>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Category</TableHead>
                      <TableHead>Year 1</TableHead>
                      <TableHead>Year 2</TableHead>
                      <TableHead>Year 3</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Revenue</TableCell>
                      <TableCell>{financialProjections.year1.revenue}</TableCell>
                      <TableCell>{financialProjections.year2.revenue}</TableCell>
                      <TableCell>{financialProjections.year3.revenue}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Expenses</TableCell>
                      <TableCell>{financialProjections.year1.expenses}</TableCell>
                      <TableCell>{financialProjections.year2.expenses}</TableCell>
                      <TableCell>{financialProjections.year3.expenses}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Profit</TableCell>
                      <TableCell className="text-green-600">{financialProjections.year1.profit}</TableCell>
                      <TableCell className="text-green-600">{financialProjections.year2.profit}</TableCell>
                      <TableCell className="text-green-600">{financialProjections.year3.profit}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-md font-medium">ROI Analysis:</h4>
                <div className="p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium">Expected ROI: 185% within 2 years</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on cost reduction in HR administration, improved attendance tracking, 
                    and eliminated payroll errors.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 border rounded-md">
                    <h5 className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-hrblue-500" />
                      Implementation Costs
                    </h5>
                    <ul className="mt-2 space-y-1">
                      <li className="text-xs flex justify-between">
                        <span>HR ChainFlow License</span>
                        <span className="font-medium">$48,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Implementation Services</span>
                        <span className="font-medium">$35,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Training</span>
                        <span className="font-medium">$12,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Infrastructure Setup</span>
                        <span className="font-medium">$25,000</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h5 className="text-sm font-medium flex items-center">
                      <Activity className="h-4 w-4 mr-1 text-green-600" />
                      Annual Savings
                    </h5>
                    <ul className="mt-2 space-y-1">
                      <li className="text-xs flex justify-between">
                        <span>HR Administrative Costs</span>
                        <span className="font-medium">$42,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Payroll Error Reduction</span>
                        <span className="font-medium">$28,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Improved Attendance Accuracy</span>
                        <span className="font-medium">$35,000</span>
                      </li>
                      <li className="text-xs flex justify-between">
                        <span>Contract Management Efficiency</span>
                        <span className="font-medium">$22,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="risks" className="p-4 border rounded-md mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Potential risks and mitigation strategies for HR ChainFlow implementation
              </p>
              
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-orange-50">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Technology Adoption Risk</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Employees may resist adopting new blockchain-based HR system
                      </p>
                      <div className="mt-2 pl-2 border-l-2 border-green-500">
                        <h5 className="text-xs font-medium text-green-700">Mitigation Strategy:</h5>
                        <p className="text-xs">
                          Comprehensive training program, user-friendly interface design, and phased implementation approach
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md bg-orange-50">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Data Privacy Concerns</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Concerns about storing sensitive employee data on blockchain
                      </p>
                      <div className="mt-2 pl-2 border-l-2 border-green-500">
                        <h5 className="text-xs font-medium text-green-700">Mitigation Strategy:</h5>
                        <p className="text-xs">
                          Implementation of privacy-preserving techniques, encryption, and compliance with data protection regulations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md bg-orange-50">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Technical Integration Challenges</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Difficulties integrating with existing enterprise systems
                      </p>
                      <div className="mt-2 pl-2 border-l-2 border-green-500">
                        <h5 className="text-xs font-medium text-green-700">Mitigation Strategy:</h5>
                        <p className="text-xs">
                          Development of robust APIs, pre-implementation compatibility assessment, and dedicated integration team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md bg-orange-50">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Regulatory Compliance Risk</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Evolving regulations around blockchain technology in HR
                      </p>
                      <div className="mt-2 pl-2 border-l-2 border-green-500">
                        <h5 className="text-xs font-medium text-green-700">Mitigation Strategy:</h5>
                        <p className="text-xs">
                          Regular compliance audits, legal team involvement, and system adaptability to changing regulations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Government Support & Incentives:</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 border rounded-md">
                <Shield className="h-5 w-5 text-hrblue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Digital India Initiative</h4>
                  <p className="text-xs text-muted-foreground">
                    Eligible for financial incentives under government digitization programs
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 border rounded-md">
                <Shield className="h-5 w-5 text-hrblue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Technology Adoption Fund</h4>
                  <p className="text-xs text-muted-foreground">
                    Subsidies available for blockchain technology implementation in business operations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-3 border rounded-md">
                <Shield className="h-5 w-5 text-hrblue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Small Enterprise Development Program</h4>
                  <p className="text-xs text-muted-foreground">
                    Tax benefits for technology upgrades in small and medium enterprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Generate Complete Business Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Generate Business Plan</DialogTitle>
              <DialogDescription>
                Enter your company details to generate a customized business plan for HR ChainFlow implementation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName" className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    Company Name *
                  </Label>
                  <Input 
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactPerson" className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Contact Person *
                  </Label>
                  <Input 
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Enter contact person's name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email *
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Phone
                  </Label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="website" className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </Label>
                  <Input 
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter company website"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="industryType" className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Industry Type
                  </Label>
                  <Input 
                    id="industryType"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    placeholder="Enter industry type"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeCount" className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Number of Employees
                  </Label>
                  <Input 
                    id="employeeCount"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    placeholder="Enter employee count"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="currentHRSystem" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Current HR System
                  </Label>
                  <Input 
                    id="currentHRSystem"
                    value={currentHRSystem}
                    onChange={(e) => setCurrentHRSystem(e.target.value)}
                    placeholder="Enter current HR system"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="additionalInfo" className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Additional Information
                </Label>
                <Textarea 
                  id="additionalInfo"
                  placeholder="Enter any additional requirements or specific needs"
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={generateReport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download Business Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
