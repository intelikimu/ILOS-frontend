"use client"

import { useState, useEffect } from "react"
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

// Real data interface for EAMVU applications
interface EAMVUApplication {
  id: string
  los_id: string
  applicant_name: string
  loan_type: string
  loan_amount: string
  status: string
  priority: string
  created_at: string
  application_type: string
  assigned_officer?: string
  branch?: string
  documents?: Array<{
    id: string
    name: string
    status: string
    required: boolean
  }>
}



// Stats for dashboard - will be calculated from real data
const getStatsData = (applications: EAMVUApplication[]) => {
  const submittedToCIU = applications.filter(app => app.status === 'SUBMITTED_TO_CIU').length
  const submittedToRRU = applications.filter(app => app.status === 'SUBMITTED_TO_RRU').length
  const accepted = applications.filter(app => app.status === 'Application_Accepted').length
  const rejected = applications.filter(app => app.status === 'Application_Rejected').length

  return [
    {
      title: "Submitted to CIU",
      value: submittedToCIU.toString(),
      change: "Pending verification",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      link: "/dashboard/eamvu/new"
    },
    {
      title: "Submitted to RRU",
      value: submittedToRRU.toString(),
      change: "Pending review",
      icon: Users,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      link: "/dashboard/eamvu/assigned"
    },
    {
      title: "Accepted",
      value: accepted.toString(),
      change: "Approved applications",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      link: "/dashboard/eamvu/completed"
    },
    {
      title: "Rejected",
      value: rejected.toString(),
      change: "Rejected applications",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      link: "/dashboard/eamvu/reports"
    },
  ]
}


function getStatusBadge(status: string) {
  switch (status) {
    case "SUBMITTED_TO_CIU":
      return <Badge className="bg-blue-100 text-blue-800">Submitted to CIU</Badge>
    case "SUBMITTED_TO_RRU":
      return <Badge className="bg-yellow-100 text-yellow-800">Submitted to RRU</Badge>
    case "Application_Accepted":
      return <Badge className="bg-green-100 text-green-800">Accepted</Badge>
    case "Application_Rejected":
      return <Badge variant="destructive">Rejected</Badge>
    case "Application_Returned":
      return <Badge className="bg-orange-100 text-orange-800">Returned</Badge>
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
  const [applicationsData, setApplicationsData] = useState<EAMVUApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 EAMVU: Starting to fetch applications...')
      
      const response = await fetch('/api/applications/eamvu', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      
      const data = await response.json()
      console.log('✅ EAMVU: Fetched', data.length, 'applications')
      console.log('📋 EAMVU Applications:', data)
      
      setApplicationsData(data)
    } catch (err) {
      console.error('❌ EAMVU: Error fetching applications:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  // Load applications on component mount
  useEffect(() => {
    fetchApplications()
  }, [])

  const recentApplications = applicationsData.slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">EAMVU Dashboard</h2>
            <p className="text-muted-foreground">External Asset Management & Verification Unit - Field verification overview</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">EAMVU Dashboard</h2>
            <p className="text-muted-foreground">External Asset Management & Verification Unit - Field verification overview</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-600 mb-2">Error loading applications</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchApplications} variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
        {getStatsData(applicationsData).map((stat) => (
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Recent Applications */}
        <Card className="lg:col-span-4">
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
                    <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{app.applicant_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {app.branch || 'Main Branch'}
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

      </div>
    </div>
  )
} 