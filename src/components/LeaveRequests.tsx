
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Plus, Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockLeaveRequests = [
  { 
    id: 1, 
    employeeName: "Sarah Johnson", 
    leaveType: "Vacation", 
    startDate: new Date(2023, 5, 15), 
    endDate: new Date(2023, 5, 20), 
    status: "Approved", 
    daysCount: 5 
  },
  { 
    id: 2, 
    employeeName: "Michael Smith", 
    leaveType: "Sick Leave", 
    startDate: new Date(2023, 5, 10), 
    endDate: new Date(2023, 5, 12), 
    status: "Pending", 
    daysCount: 2
  },
  { 
    id: 3, 
    employeeName: "Emily Davis", 
    leaveType: "Personal", 
    startDate: new Date(2023, 6, 5), 
    endDate: new Date(2023, 6, 7), 
    status: "Pending", 
    daysCount: 2
  }
];

// Mock employees for select dropdown
const mockEmployees = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Michael Smith" },
  { id: 3, name: "Emily Davis" },
  { id: 4, name: "James Wilson" },
  { id: 5, name: "David Thompson" }
];

export default function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setLeaveRequests(
      leaveRequests.map(request =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
    
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved and recorded on the blockchain",
    });
  };

  const handleReject = (id: number) => {
    setLeaveRequests(
      leaveRequests.map(request =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
    
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmployee || !leaveType || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate days difference
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    const newLeaveRequest = {
      id: leaveRequests.length + 1,
      employeeName: selectedEmployee,
      leaveType,
      startDate,
      endDate,
      status: "Pending",
      daysCount: diffDays
    };
    
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setIsDialogOpen(false);
    
    // Reset form
    setSelectedEmployee("");
    setLeaveType("");
    setStartDate(undefined);
    setEndDate(undefined);
    
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>
              Manage and track employee leave requests
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Leave Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Leave Request</DialogTitle>
                <DialogDescription>
                  Submit a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger id="employee">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEmployees.map(employee => (
                          <SelectItem key={employee.id} value={employee.name}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger id="leaveType">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vacation">Vacation</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Maternity/Paternity">Maternity/Paternity</SelectItem>
                        <SelectItem value="Bereavement">Bereavement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="startDate"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="endDate"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={date => !startDate || date < startDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.employeeName}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(request.startDate, "MMM d")} - {format(request.endDate, "MMM d")}
                      <span className="ml-1 text-xs text-muted-foreground">({request.daysCount} days)</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.status === "Pending" && (
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {request.status !== "Pending" && (
                        <span className="text-xs text-muted-foreground">No actions available</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {leaveRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Total requests: {leaveRequests.length} | 
            Pending: {leaveRequests.filter(r => r.status === "Pending").length} | 
            Approved: {leaveRequests.filter(r => r.status === "Approved").length} | 
            Rejected: {leaveRequests.filter(r => r.status === "Rejected").length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
