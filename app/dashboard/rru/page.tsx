"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, CheckCircle, AlertTriangle, FileText, Eye, Shield, X, CheckSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Real data interface for RRU applications
interface RRUApplication {
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

// Stats for dashboard
const statsData = [
  {
    title: "Pending Review",
    value: "8",
    change: "+2 from yesterday",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Approved Today",
    value: "5",
    change: "This week",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Rejected Today",
    value: "2",
    change: "Risk assessment",
    icon: X,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Total Processed",
    value: "156",
    change: "This month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "SUBMITTED_TO_RRU":
      return <Badge className="bg-green-100 text-green-800">SUBMITTED_TO_RRU</Badge>
    case "":
      return <Badge variant="destructive">Rejected</Badge>
    case "Application_Returned":
      return <Badge className="bg-yellow-100 text-yellow-800">Returned</Badge>
    case "SUBMITTED_TO_RRU":
      return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High Risk</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
    default:
      return <Badge variant="secondary">{priority}</Badge>
  }
}

export default function RRUDashboardPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedApplication, setSelectedApplication] = useState<RRUApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applicationsData, setApplicationsData] = useState<RRUApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewNotes, setReviewNotes] = useState("")
  const { toast } = useToast()

  // Fetch RRU applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/applications/rru')
        const data = await response.json()
        
        if (response.ok) {
          setApplicationsData(data)
          console.log('✅ RRU: Fetched', data.length, 'applications')
          console.log('📋 RRU Applications:', data)
        } else {
          console.error('❌ RRU: Failed to fetch applications:', data)
          toast({
            title: "Error",
            description: "Failed to fetch applications",
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error('❌ RRU: Error fetching applications:', error)
        toast({
          title: "Error",
          description: "Failed to connect to server",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  const filteredApplications = applicationsData.filter((app: RRUApplication) => {
    const matchesSearch = app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.los_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    
    // RRU can see applications with final statuses
    const rruAllowedStatuses = ['Application_Accepted', 'Application_Rejected', 'Application_Returned', 'SUBMITTED_TO_RRU']
    const isRruAllowed = rruAllowedStatuses.includes(app.status)
    
    if (activeTab === "pending") {
      return matchesSearch && matchesStatus && app.status === "SUBMITTED_TO_RRU"
    } else if (activeTab === "approved") {
      return matchesSearch && matchesStatus && app.status === "Application_Accepted"
    } else if (activeTab === "rejected") {
      return matchesSearch && matchesStatus && app.status === "Application_Rejected"
    } else if (activeTab === "returned") {
      return matchesSearch && matchesStatus && app.status === "Application_Returned"
    }
    
    return matchesSearch && matchesStatus && isRruAllowed
  })

  const handleApproveApplication = async () => {
    if (!selectedApplication) return

    try {
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId: selectedApplication.los_id.replace('LOS-', ''),
          status: 'Application_Accepted',
          applicationType: selectedApplication.application_type
        })
      })

      if (response.ok) {
        toast({
          title: "Application Approved",
          description: "Application has been approved successfully",
        })
        setSelectedApplication(null)
        setReviewNotes("")
        // Refresh applications
        window.location.reload()
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: "Failed to approve application",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error approving application:', error)
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive"
      })
    }
  }

  const handleRejectApplication = async () => {
    if (!selectedApplication) return

    try {
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId: selectedApplication.los_id.replace('LOS-', ''),
          status: 'Application_Rejected',
          applicationType: selectedApplication.application_type
        })
      })

      if (response.ok) {
        toast({
          title: "Application Rejected",
          description: "Application has been rejected",
        })
        setSelectedApplication(null)
        setReviewNotes("")
        // Refresh applications
        window.location.reload()
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: "Failed to reject application",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error rejecting application:', error)
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive"
      })
    }
  }

  const handleReturnApplication = async () => {
    if (!selectedApplication) return

    try {
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId: selectedApplication.los_id.replace('LOS-', ''),
          status: 'Application_Returned',
          applicationType: selectedApplication.application_type
        })
      })

      if (response.ok) {
        toast({
          title: "Application Returned",
          description: "Application has been returned for additional information",
        })
        setSelectedApplication(null)
        setReviewNotes("")
        // Refresh applications
        window.location.reload()
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: "Failed to return application",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error returning application:', error)
      toast({
        title: "Error",
        description: "Failed to return application",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading RRU applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Risk Review Unit Dashboard</h1>
        <Button>Generate Reports</Button>
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

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or LOS ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Applications ({filteredApplications.length})</CardTitle>
              <CardDescription>Applications pending final risk review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{app.applicant_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {app.assigned_officer ? `Assigned to: ${app.assigned_officer}` : "Unassigned"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.loan_type}</TableCell>
                      <TableCell className="font-medium">PKR {Number(app.loan_amount).toLocaleString()}</TableCell>
                      <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedApplication(app)}>
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Risk Review - {selectedApplication?.los_id}</DialogTitle>
                              <DialogDescription>
                                Perform final risk assessment and make decision
                              </DialogDescription>
                            </DialogHeader>

                            {selectedApplication && (
                              <div className="space-y-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Applicant Information</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Applicant Name</Label>
                                        <p className="text-sm">{selectedApplication.applicant_name}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Loan Type</Label>
                                        <p className="text-sm">{selectedApplication.loan_type}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Amount</Label>
                                        <p className="text-sm">PKR {Number(selectedApplication.loan_amount).toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Risk Level</Label>
                                        <p className="text-sm">{getPriorityBadge(selectedApplication.priority)}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Risk Assessment Checklist</CardTitle>
                                    <CardDescription>
                                      Complete all required risk assessment checks
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="flex items-center space-x-2">
                                        <CheckSquare className="h-4 w-4 text-green-600" />
                                        <Label>Credit Score Verification</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <CheckSquare className="h-4 w-4 text-green-600" />
                                        <Label>Income Verification</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <CheckSquare className="h-4 w-4 text-green-600" />
                                        <Label>Employment Verification</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <CheckSquare className="h-4 w-4 text-green-600" />
                                        <Label>Document Verification</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <CheckSquare className="h-4 w-4 text-green-600" />
                                        <Label>Collateral Assessment</Label>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Review Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea 
                                      placeholder="Add your risk assessment notes and findings..."
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      rows={4}
                                    />
                                  </CardContent>
                                </Card>

                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                    Save Progress
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={handleRejectApplication}
                                  >
                                    Reject Application
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={handleReturnApplication}
                                  >
                                    Return for Info
                                  </Button>
                                  <Button 
                                    onClick={handleApproveApplication}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Approve Application
                                  </Button>
                                </DialogFooter>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Applications</CardTitle>
              <CardDescription>Applications that have been approved by RRU</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Approval Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "Application_Accepted")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                        <TableCell>{app.applicant_name}</TableCell>
                        <TableCell>{app.loan_type}</TableCell>
                        <TableCell className="font-medium">PKR {Number(app.loan_amount).toLocaleString()}</TableCell>
                        <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>Applications that have been rejected by RRU</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Rejection Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "Application_Rejected")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                        <TableCell>{app.applicant_name}</TableCell>
                        <TableCell>{app.loan_type}</TableCell>
                        <TableCell className="font-medium">PKR {Number(app.loan_amount).toLocaleString()}</TableCell>
                        <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Returned Applications</CardTitle>
              <CardDescription>Applications returned for additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Return Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "Application_Returned")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                        <TableCell>{app.applicant_name}</TableCell>
                        <TableCell>{app.loan_type}</TableCell>
                        <TableCell className="font-medium">PKR {Number(app.loan_amount).toLocaleString()}</TableCell>
                        <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 