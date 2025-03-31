
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle, Users } from "lucide-react";

// Mock data for demonstration
const mockEmployees = [
  { id: 1, name: "Sarah Johnson", department: "Human Resources", status: "Present" },
  { id: 2, name: "Michael Smith", department: "Engineering", status: "Present" },
  { id: 3, name: "Emily Davis", department: "Marketing", status: "Absent" },
  { id: 4, name: "James Wilson", department: "Finance", status: "Late" },
  { id: 5, name: "David Thompson", department: "Product", status: "Present" },
];

export default function AttendanceTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [employees, setEmployees] = useState(mockEmployees);
  const { toast } = useToast();

  const markAttendance = (employeeId: number, newStatus: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: newStatus } : emp
    ));
    
    toast({
      title: "Attendance updated",
      description: `Employee attendance status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      case "Late":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const recordAllAttendance = () => {
    toast({
      title: "Attendance Recorded",
      description: `Attendance for ${date?.toLocaleDateString()} has been recorded on the blockchain`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-80">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              Choose a date to record or view attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={recordAllAttendance} className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Record All Attendance
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Daily Attendance</CardTitle>
                <CardDescription>
                  {date ? date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "Select a date"}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select 
                          defaultValue={employee.status} 
                          onValueChange={(value) => markAttendance(employee.id, value)}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-muted-foreground">
                Present: {employees.filter(e => e.status === "Present").length} | 
                Absent: {employees.filter(e => e.status === "Absent").length} | 
                Late: {employees.filter(e => e.status === "Late").length}
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
