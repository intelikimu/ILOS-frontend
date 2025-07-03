"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, Pause, RotateCcw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statsData = [
  {
    title: "Under Review",
    value: "12",
    change: "+4 from yesterday",
    icon: Pause,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Resumed Applications",
    value: "5",
    change: "Back in process",
    icon: RotateCcw,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Returned Applications",
    value: "3",
    change: "Rejected",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Total Processed",
    value: "87",
    change: "This month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

const pendingApplications = [
  {
    id: "UBL-2024-001285",
    name: "Shahid Afridi",
    reason: "Income verification failed",
    status: "Under Review",
    lastUpdate: "1 hour ago",
    amount: "PKR 2,300,000",
  },
  {
    id: "UBL-2024-001286",
    name: "Aisha Malik",
    reason: "Document discrepancy",
    status: "Under Review",
    lastUpdate: "2 hours ago",
    amount: "PKR 1,700,000",
  },
  {
    id: "UBL-2024-001287",
    name: "Farhan Ahmed",
    reason: "Address verification failed",
    status: "Under Review",
    lastUpdate: "3 hours ago",
    amount: "PKR 3,500,000",
  },
  {
    id: "UBL-2024-001288",
    name: "Sadia Khan",
    reason: "Blacklist match found",
    status: "Returned",
    lastUpdate: "4 hours ago",
    amount: "PKR 900,000",
  },
  {
    id: "UBL-2024-001289",
    name: "Tahir Hussain",
    reason: "Employment verification issue",
    status: "Resumed",
    lastUpdate: "5 hours ago",
    amount: "PKR 4,200,000",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Under Review":
      return <Badge className="bg-orange-100 text-orange-800">Under Review</Badge>
    case "Resumed":
      return <Badge className="bg-green-100 text-green-800">Resumed</Badge>
    case "Returned":
      return <Badge variant="destructive">Returned</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function RRUDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rejection Review Unit Dashboard</h1>
        <Button>Process Next</Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Review Queue</CardTitle>
          <CardDescription>Applications requiring review after rejection</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>LOS ID</TableHead>
                <TableHead>Rejection Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.name}</div>
                      <div className="text-sm text-muted-foreground">{application.lastUpdate}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{application.id}</TableCell>
                  <TableCell>{application.reason}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell className="font-medium">{application.amount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Resume Application</DropdownMenuItem>
                        <DropdownMenuItem>Request Additional Info</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Confirm Rejection</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 