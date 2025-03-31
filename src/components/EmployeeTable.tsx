
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  status: "Active" | "On Leave" | "Inactive";
  walletAddress: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    status: "Active",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  },
  {
    id: 2,
    name: "Michael Smith",
    position: "Software Engineer",
    department: "Engineering",
    status: "Active",
    walletAddress: "0xb794f5ea0ba39494ce839613fffba74279579268"
  },
  {
    id: 3,
    name: "Emily Davis",
    position: "Marketing Specialist",
    department: "Marketing",
    status: "On Leave",
    walletAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Financial Analyst",
    department: "Finance",
    status: "Active",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  },
  {
    id: 5,
    name: "David Thompson",
    position: "Product Manager",
    department: "Product",
    status: "Inactive",
    walletAddress: "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8"
  }
];

export default function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEmployees = mockEmployees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button>Add Employee</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Wallet Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        employee.status === 'On Leave' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'}`}
                  >
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-xs">{employee.walletAddress.substring(0, 6)}...{employee.walletAddress.substring(employee.walletAddress.length - 4)}</span>
                </TableCell>
              </TableRow>
            ))}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
