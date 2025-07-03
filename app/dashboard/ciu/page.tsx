"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, Search, Shield } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statsData = [
  {
    title: "Pending Investigations",
    value: "16",
    change: "+5 from yesterday",
    icon: Search,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Flagged Applications",
    value: "4",
    change: "Needs attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Verified Today",
    value: "8",
    change: "+2 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Processed",
    value: "132",
    change: "This month",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

const pendingApplications = [
  {
    id: "UBL-2024-001275",
    name: "Nasir Mahmood",
    status: "NADRA Verification",
    priority: "High",
    lastUpdate: "1 hour ago",
    amount: "PKR 3,800,000",
  },
  {
    id: "UBL-2024-001276",
    name: "Rabia Akhtar",
    status: "Blacklist Check",
    priority: "Medium",
    lastUpdate: "2 hours ago",
    amount: "PKR 1,500,000",
  },
  {
    id: "UBL-2024-001277",
    name: "Khalid Mehmood",
    status: "NADRA Verification",
    priority: "High",
    lastUpdate: "3 hours ago",
    amount: "PKR 5,200,000",
  },
  {
    id: "UBL-2024-001278",
    name: "Samina Khan",
    status: "Final Approval",
    priority: "Medium",
    lastUpdate: "4 hours ago",
    amount: "PKR 2,100,000",
  },
  {
    id: "UBL-2024-001279",
    name: "Adeel Ahmed",
    status: "Flagged",
    priority: "Critical",
    lastUpdate: "5 hours ago",
    amount: "PKR 4,500,000",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "NADRA Verification":
      return <Badge className="bg-blue-100 text-blue-800">NADRA Verification</Badge>
    case "Blacklist Check":
      return <Badge className="bg-yellow-100 text-yellow-800">Blacklist Check</Badge>
    case "Final Approval":
      return <Badge className="bg-green-100 text-green-800">Final Approval</Badge>
    case "Verified":
      return <Badge className="bg-purple-100 text-purple-800">Verified</Badge>
    case "Flagged":
      return <Badge variant="destructive">Flagged</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "Low":
      return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
    case "Medium":
      return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>
    case "High":
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>
    default:
      return <Badge variant="secondary">{priority}</Badge>
  }
}

export default function CIUDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Central Investigation Unit Dashboard</h1>
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
          <CardTitle>Investigation Queue</CardTitle>
          <CardDescription>Applications requiring verification and investigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>LOS ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
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
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{getPriorityBadge(application.priority)}</TableCell>
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
                        <DropdownMenuItem>Process Verification</DropdownMenuItem>
                        <DropdownMenuItem>Flag Application</DropdownMenuItem>
                        <DropdownMenuItem>Forward to RRU</DropdownMenuItem>
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