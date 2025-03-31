
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function RecentActivity() {
  const activities = [
    { 
      id: 1, 
      action: "Contract Approved", 
      description: "Employment contract for Sarah Johnson was approved", 
      time: "2 hours ago",
      txHash: "0x3f8e5b7b9c4d2a1e0f7c6b5d4e3c2b1a0"
    },
    { 
      id: 2, 
      action: "Payroll Processed", 
      description: "Monthly payroll was processed for 35 employees", 
      time: "Yesterday",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
    },
    { 
      id: 3, 
      action: "Leave Request", 
      description: "John Doe requested 5 days of vacation leave", 
      time: "3 days ago",
      txHash: "0x7f8e9d0c1b2a3456789abcdef0123456"
    },
    { 
      id: 4, 
      action: "New Employee Added", 
      description: "Michael Brown was added to the system", 
      time: "1 week ago",
      txHash: "0xabcdef0123456789abcdef0123456789"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest transactions on the HR smart contracts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col space-y-1 border-b border-border pb-3 last:border-0">
              <div className="flex justify-between">
                <h3 className="font-medium">{activity.action}</h3>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center text-xs text-hrblue-500">
                <span className="truncate">TX: {activity.txHash}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
