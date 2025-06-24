"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

const statsData = [
  {
    title: "Pending Cases",
    value: "24",
    change: "+2 from yesterday",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Submitted Today",
    value: "12",
    change: "+4 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Flagged Cases",
    value: "3",
    change: "Needs attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Total Applications",
    value: "156",
    change: "This month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

const recentApplicants = [
  {
    id: "UBL-2024-001234",
    name: "Muhammad Ali Khan",
    segment: "Preferred",
    status: "Submitted",
    lastUpdate: "2 hours ago",
    amount: "PKR 2,500,000",
  },
  {
    id: "UBL-2024-001235",
    name: "Fatima Ahmed",
    segment: "Mass",
    status: "Draft",
    lastUpdate: "4 hours ago",
    amount: "PKR 800,000",
  },
  {
    id: "UBL-2024-001236",
    name: "Hassan Raza",
    segment: "SME",
    status: "Flagged",
    lastUpdate: "1 day ago",
    amount: "PKR 5,000,000",
  },
  {
    id: "UBL-2024-001237",
    name: "Ayesha Malik",
    segment: "Preferred",
    status: "Approved",
    lastUpdate: "2 days ago",
    amount: "PKR 1,200,000",
  },
]

const segmentData = [
  { name: "Preferred", value: 45, color: "#3b82f6" },
  { name: "Mass", value: 35, color: "#10b981" },
  { name: "SME", value: 20, color: "#f59e0b" },
]

const trendData = [
  { name: "Mon", applications: 12 },
  { name: "Tue", applications: 19 },
  { name: "Wed", applications: 15 },
  { name: "Thu", applications: 22 },
  { name: "Fri", applications: 18 },
  { name: "Sat", applications: 8 },
  { name: "Sun", applications: 5 },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Submitted":
      return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
    case "Draft":
      return <Badge variant="outline">Draft</Badge>
    case "Flagged":
      return <Badge variant="destructive">Flagged</Badge>
    case "Approved":
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Applications Table */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest loan applications submitted today</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>LOS ID</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">{applicant.lastUpdate}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{applicant.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{applicant.segment}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell className="font-medium">{applicant.amount}</TableCell>
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
                          <DropdownMenuItem>Edit Application</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Application</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Applications by Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {segmentData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
