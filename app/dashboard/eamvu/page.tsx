"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MapPin, Camera, Users, Upload, BarChart3, TrendingUp, Calendar, Phone, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data for EAMVU dashboard
const applicationsData = [
  {
    id: "UBL-2024-001234",
    applicantName: "Muhammad Ali Khan",
    segment: "Preferred",
    loanType: "Personal Loan",
    amount: "PKR 2,500,000",
    status: "eamvu_new",
    lastUpdate: "2024-01-15",
    assignedTo: "Unassigned",
    priority: "High",
    address: "House 123, Block A, Gulshan-e-Iqbal, Karachi",
    phone: "+92-300-1234567",
  },
  {
    id: "UBL-2024-001235",
    applicantName: "Fatima Ahmed",
    segment: "Mass",
    loanType: "Auto Loan",
    amount: "PKR 800,000",
    status: "eamvu_agent_assigned",
    lastUpdate: "2024-01-14",
    assignedTo: "Bilal Khan",
    priority: "Medium",
    address: "Flat 456, DHA Phase 2, Karachi",
    phone: "+92-321-9876543",
  },
  {
    id: "UBL-2024-001236",
    applicantName: "Hassan Raza",
    segment: "SME",
    loanType: "Business Loan",
    amount: "PKR 5,000,000",
    status: "eamvu_visit_complete",
    lastUpdate: "2024-01-13",
    assignedTo: "Sara Ahmed",
    priority: "High",
    address: "Office 789, Clifton Commercial Area, Karachi",
    phone: "+92-333-5555555",
    visitReport: {
      visitDate: "2024-01-12",
      visitTime: "14:30",
      locationVerified: true,
      businessVerified: true,
      comments: "Business premises verified. Operational with 15 employees present.",
      photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    }
  },
]

// Field agents data
const fieldAgentsData = [
  {
    id: "agent1",
    name: "Bilal Khan",
    phone: "+92-300-1111111",
    area: "Karachi Central",
    activeAssignments: 2,
    completedVisits: 15,
    status: "active",
  },
  {
    id: "agent2",
    name: "Sara Ahmed",
    phone: "+92-321-2222222",
    area: "Karachi South",
    activeAssignments: 1,
    completedVisits: 23,
    status: "active",
  },
  {
    id: "agent3",
    name: "Usman Ali",
    phone: "+92-333-3333333",
    area: "Karachi East",
    activeAssignments: 0,
    completedVisits: 18,
    status: "inactive",
  },
]

// Stats for dashboard
const statsData = [
  {
    title: "New Applications",
    value: "14",
    change: "+4 from yesterday",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    link: "/dashboard/eamvu/new"
  },
  {
    title: "Assigned to Agents",
    value: "9",
    change: "In progress",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    link: "/dashboard/eamvu/assigned"
  },
  {
    title: "Visits Completed",
    value: "7",
    change: "+3 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    link: "/dashboard/eamvu/completed"
  },
  {
    title: "Flagged Cases",
    value: "2",
    change: "Needs attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    link: "/dashboard/eamvu/reports"
  },
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    type: "visit_completed",
    message: "Field visit completed for UBL-2024-001236",
    agent: "Sara Ahmed",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 2,
    type: "agent_assigned",
    message: "Agent Bilal Khan assigned to UBL-2024-001235",
    agent: "System",
    time: "4 hours ago",
    status: "info"
  },
  {
    id: 3,
    type: "new_application",
    message: "New application received: UBL-2024-001234",
    agent: "System",
    time: "6 hours ago",
    status: "info"
  },
  {
    id: 4,
    type: "verification_failed",
    message: "Verification failed for UBL-2024-001230",
    agent: "Usman Ali",
    time: "1 day ago",
    status: "warning"
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "eamvu_new":
      return <Badge className="bg-blue-100 text-blue-800">New</Badge>
    case "eamvu_agent_assigned":
      return <Badge className="bg-yellow-100 text-yellow-800">Agent Assigned</Badge>
    case "eamvu_visit_complete":
      return <Badge className="bg-green-100 text-green-800">Visit Complete</Badge>
    case "eamvu_verified":
      return <Badge className="bg-purple-100 text-purple-800">Verified</Badge>
    case "eamvu_flagged":
      return <Badge variant="destructive">Flagged</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "High":
      return <Badge className="bg-red-100 text-red-800">High</Badge>
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
    case "Low":
      return <Badge className="bg-green-100 text-green-800">Low</Badge>
    default:
      return <Badge variant="secondary">{priority}</Badge>
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case "visit_completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "agent_assigned":
      return <Users className="h-4 w-4 text-blue-600" />
    case "new_application":
      return <FileText className="h-4 w-4 text-orange-600" />
    case "verification_failed":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export default function EAMVUDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const recentApplications = applicationsData.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">EAMVU Dashboard</h2>
          <p className="text-muted-foreground">External Asset Management & Verification Unit - Field verification overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
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
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest applications requiring attention</CardDescription>
              </div>
              <Link href="/dashboard/eamvu/new">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>LOS ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-mono text-sm">{app.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{app.applicantName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {app.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest field verification activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {activity.agent}
                      <span>•</span>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Field Agent Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Field Agents</CardTitle>
                <CardDescription>Agent status and assignments</CardDescription>
              </div>
              <Link href="/dashboard/eamvu/agents">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fieldAgentsData.slice(0, 3).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.area}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{agent.activeAssignments}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common EAMVU tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/dashboard/eamvu/new">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Assign New Application
                </Button>
              </Link>
              <Link href="/dashboard/eamvu/reports">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Field Reports
                </Button>
              </Link>
              <Link href="/dashboard/eamvu/photos">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="mr-2 h-4 w-4" />
                  Review Visit Photos
                </Button>
              </Link>
              <Link href="/dashboard/eamvu/agents">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Agents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>This week's field verification metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">87%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.3</div>
                <div className="text-sm text-muted-foreground">Avg. Days per Visit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-muted-foreground">Agent Satisfaction</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Performance is up 12% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 