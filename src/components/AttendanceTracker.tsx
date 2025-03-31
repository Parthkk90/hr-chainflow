
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle, Users, AlertTriangle } from "lucide-react";

// Mock data for demonstration
const mockEmployees = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    department: "Human Resources", 
    status: "Present",
    contractId: 1,
    salary: 5000,
    leaveBalance: 20
  },
  { 
    id: 2, 
    name: "Michael Smith", 
    department: "Engineering", 
    status: "Present",
    contractId: 2,
    salary: 4500,
    leaveBalance: 18
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    department: "Marketing", 
    status: "Absent",
    contractId: 3,
    salary: 4800,
    leaveBalance: 15
  },
  { 
    id: 4, 
    name: "James Wilson", 
    department: "Finance", 
    status: "Late",
    contractId: 4,
    salary: 5200,
    leaveBalance: 22
  },
  { 
    id: 5, 
    name: "David Thompson", 
    department: "Product", 
    status: "Present",
    contractId: 5,
    salary: 5500,
    leaveBalance: 20
  },
];

interface AttendanceRecord {
  employeeId: number;
  date: string;
  status: string;
  recordedAt: Date;
}

export default function AttendanceTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [employees, setEmployees] = useState(mockEmployees);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const { toast } = useToast();

  // Generate a date string in YYYY-MM-DD format
  const formatDateForStorage = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Check if we already have attendance for the selected date
  useEffect(() => {
    if (date) {
      const dateStr = formatDateForStorage(date);
      const existingRecords = attendanceHistory.filter(record => record.date === dateStr);
      
      if (existingRecords.length > 0) {
        // Update employee statuses based on saved records
        setEmployees(
          employees.map(emp => {
            const record = existingRecords.find(rec => rec.employeeId === emp.id);
            return record ? { ...emp, status: record.status } : emp;
          })
        );
        
        toast({
          title: "Attendance Loaded",
          description: `Loaded attendance records for ${date.toLocaleDateString()}`,
        });
      }
    }
  }, [date, attendanceHistory]);

  const markAttendance = (employeeId: number, newStatus: string) => {
    // Update employee status in the UI
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: newStatus } : emp
    ));
    
    // Update attendance history
    if (date) {
      const dateStr = formatDateForStorage(date);
      const newRecord: AttendanceRecord = {
        employeeId,
        date: dateStr,
        status: newStatus,
        recordedAt: new Date()
      };
      
      // Remove existing record for this employee and date if it exists
      const filteredHistory = attendanceHistory.filter(
        record => !(record.employeeId === employeeId && record.date === dateStr)
      );
      
      // Add the new record
      setAttendanceHistory([...filteredHistory, newRecord]);
    }
    
    // Update employee contract status if marked as absent
    if (newStatus === "Absent") {
      // In a real implementation, this would update the employee's leave balance
      const employee = employees.find(emp => emp.id === employeeId);
      if (employee && employee.leaveBalance > 0) {
        // Reduce leave balance
        setEmployees(employees.map(emp => 
          emp.id === employeeId ? { ...emp, leaveBalance: emp.leaveBalance - 1 } : emp
        ));
      }
    }
    
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
    if (!date) return;
    
    const dateStr = formatDateForStorage(date);
    
    // Create records for all employees
    const newRecords = employees.map(employee => ({
      employeeId: employee.id,
      date: dateStr,
      status: employee.status,
      recordedAt: new Date()
    }));
    
    // Remove any existing records for this date
    const filteredHistory = attendanceHistory.filter(record => record.date !== dateStr);
    
    // Add new records
    setAttendanceHistory([...filteredHistory, ...newRecords]);
    
    // Impact on payroll for absences
    const absentEmployees = employees.filter(emp => emp.status === "Absent");
    if (absentEmployees.length > 0) {
      // In a real implementation, this would trigger updates to payroll calculations
    }
    
    toast({
      title: "Attendance Recorded",
      description: `Attendance for ${date.toLocaleDateString()} has been recorded on the blockchain`,
    });
  };

  // Auto-generate today's attendance if it doesn't exist
  useEffect(() => {
    const today = formatDateForStorage(new Date());
    const hasToday = attendanceHistory.some(record => record.date === today);
    
    if (!hasToday && attendanceHistory.length === 0) {
      // For demo purposes, let's simulate recording attendance for today
      const initialRecords = employees.map(employee => ({
        employeeId: employee.id,
        date: today,
        status: employee.status,
        recordedAt: new Date()
      }));
      
      setAttendanceHistory(initialRecords);
    }
  }, []);

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
                    <TableHead>Leave Balance</TableHead>
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
                        <div className="flex items-center">
                          {employee.leaveBalance} days
                          {employee.leaveBalance < 5 && (
                            <AlertTriangle className="ml-1 h-4 w-4 text-amber-500" />
                          )}
                        </div>
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
