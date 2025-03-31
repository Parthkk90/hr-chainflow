
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, FileText, CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CreateContractModal from "@/components/CreateContractModal";

interface Contract {
  id: number;
  employeeId: number;
  employeeName: string;
  contractType: string;
  startDate: Date;
  endDate: Date | null;
  status: "Draft" | "Pending Signature" | "Active" | "Expired" | "Terminated";
  salary: number;
  workingHours: number;
}

// Mock data for contracts demonstration
const mockContracts: Contract[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Sarah Johnson",
    contractType: "Permanent",
    startDate: new Date(2022, 0, 15),
    endDate: null,
    status: "Active",
    salary: 5000,
    workingHours: 40
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Michael Smith",
    contractType: "Permanent",
    startDate: new Date(2022, 2, 10),
    endDate: null,
    status: "Active",
    salary: 4500,
    workingHours: 40
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Emily Davis",
    contractType: "Contract",
    startDate: new Date(2022, 6, 1),
    endDate: new Date(2023, 5, 30),
    status: "Pending Signature",
    salary: 4800,
    workingHours: 40
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "James Wilson",
    contractType: "Probation",
    startDate: new Date(2023, 3, 15),
    endDate: new Date(2023, 6, 15),
    status: "Active",
    salary: 5200,
    workingHours: 40
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "David Thompson",
    contractType: "Contract",
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2023, 11, 31),
    status: "Draft",
    salary: 5500,
    workingHours: 35
  }
];

// Mock employees data
const mockEmployees = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Michael Smith" },
  { id: 3, name: "Emily Davis" },
  { id: 4, name: "James Wilson" },
  { id: 5, name: "David Thompson" }
];

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employee');
  const selectedEmployeeId = employeeIdParam ? parseInt(employeeIdParam) : undefined;
  const { toast } = useToast();

  // Open create contract modal if employee is specified in URL
  useEffect(() => {
    if (selectedEmployeeId) {
      setIsCreateOpen(true);
    }
  }, [selectedEmployeeId]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Pending Signature":
        return "bg-amber-100 text-amber-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsViewOpen(true);
  };

  const signContract = (id: number) => {
    setContracts(
      contracts.map(contract =>
        contract.id === id ? { ...contract, status: "Active" } : contract
      )
    );
    setIsViewOpen(false);
    
    toast({
      title: "Contract Signed",
      description: "The contract has been signed and recorded on the blockchain",
    });
  };

  const handleCreateContract = (newContract: Omit<Contract, "id">) => {
    const contractToAdd = {
      ...newContract,
      id: contracts.length > 0 ? Math.max(...contracts.map(c => c.id)) + 1 : 1,
    } as Contract;
    
    setContracts([...contracts, contractToAdd]);
  };

  // Filter contracts if employee is specified
  const filteredContracts = selectedEmployeeId 
    ? contracts.filter(contract => contract.employeeId === selectedEmployeeId)
    : contracts;

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
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Employment Contracts</CardTitle>
              <CardDescription>
                {selectedEmployeeId 
                  ? `Viewing contracts for ${mockEmployees.find(e => e.id === selectedEmployeeId)?.name || 'Employee'}`
                  : 'View and manage employee contracts'}
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Create New Contract
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Start Date</TableHead>
                    <TableHead className="hidden md:table-cell">End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.employeeName}</TableCell>
                      <TableCell>{contract.contractType}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contract.startDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contract.endDate ? contract.endDate.toLocaleDateString() : "Indefinite"}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                      </TableCell>
                      <TableCell>${contract.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => viewContract(contract)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredContracts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No contracts found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
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
                HR ChainFlow digitizes employment contracts as smart contracts on the blockchain.
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
        
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[550px]">
            {selectedContract && (
              <>
                <DialogHeader>
                  <DialogTitle>Contract Details</DialogTitle>
                  <DialogDescription>
                    Employment contract for {selectedContract.employeeName}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Contract Type</h3>
                        <p>{selectedContract.contractType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Status</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContract.status)}`}>
                          {selectedContract.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Start Date</h3>
                        <p>{selectedContract.startDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">End Date</h3>
                        <p>{selectedContract.endDate ? selectedContract.endDate.toLocaleDateString() : "Indefinite"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Salary</h3>
                        <p>${selectedContract.salary.toLocaleString()} per month</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Working Hours</h3>
                        <p>{selectedContract.workingHours} hours per week</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Contract Terms</h3>
                      <div className="mt-2 p-4 border rounded-md bg-gray-50 text-sm">
                        <p className="mb-2">This Employment Contract ("Contract") is made and entered into by and between the Employer and the Employee:</p>
                        <p className="mb-2"><strong>Employee:</strong> {selectedContract.employeeName}</p>
                        <p className="mb-2"><strong>Position:</strong> [Position]</p>
                        <p className="mb-2"><strong>Department:</strong> [Department]</p>
                        <p className="mb-2"><strong>Contract Type:</strong> {selectedContract.contractType}</p>
                        <p className="mb-2"><strong>Working Hours:</strong> {selectedContract.workingHours} hours per week, Monday to Friday</p>
                        <p className="mb-2"><strong>Compensation:</strong> ${selectedContract.salary.toLocaleString()} per month</p>
                        <p className="mb-2"><strong>Benefits:</strong> As per company policy</p>
                        <p><strong>Blockchain Verification:</strong> 0x8f5e54a8... (Contract Hash)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                    Close
                  </Button>
                  {selectedContract.status === "Pending Signature" && (
                    <Button onClick={() => signContract(selectedContract.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Sign Contract
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        <CreateContractModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreateContract={handleCreateContract}
          employees={mockEmployees}
          selectedEmployeeId={selectedEmployeeId}
        />
      </div>
    </>
  );
}
