"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, MapPin, Camera, Users, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  },
  {
    title: "Assigned to Agents",
    value: "9",
    change: "In progress",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Visits Completed",
    value: "7",
    change: "+3 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Flagged Cases",
    value: "2",
    change: "Needs attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "New":
      return <Badge className="bg-blue-100 text-blue-800">New</Badge>
    case "Agent Assigned":
      return <Badge className="bg-yellow-100 text-yellow-800">Agent Assigned</Badge>
    case "Visit Complete":
      return <Badge className="bg-green-100 text-green-800">Visit Complete</Badge>
    case "Verified":
      return <Badge className="bg-purple-100 text-purple-800">Verified</Badge>
    case "Flagged":
      return <Badge variant="destructive">Flagged</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getAgentStatusBadge(status: string) {
  const statusConfig: Record<string, { variant: "default" | "destructive" | "outline" | "secondary", label: string }> = {
    "active": { variant: "default", label: "Active" },
    "inactive": { variant: "outline", label: "Inactive" },
    "on_leave": { variant: "secondary", label: "On Leave" },
  }

  const config = statusConfig[status] || { variant: "outline", label: status }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function EAMVUDashboardPage() {
  const [activeTab, setActiveTab] = useState("new")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const filteredApplications = applicationsData.filter((app) => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    
    if (activeTab === "new") {
      return matchesSearch && matchesStatus && app.status === "eamvu_new"
    } else if (activeTab === "assigned") {
      return matchesSearch && matchesStatus && app.status === "eamvu_agent_assigned"
    } else if (activeTab === "completed") {
      return matchesSearch && matchesStatus && 
             (app.status === "eamvu_visit_complete" || app.status === "eamvu_verified")
    }
    
    return matchesSearch && matchesStatus
  })

  const handleAssignAgent = () => {
    // Update application status logic would go here
    toast({
      title: "Agent Assigned",
      description: `${selectedAgent.name} has been assigned to this application`,
    })
    setSelectedApplication(null)
    setSelectedAgent(null)
  }

  const handleVerifyVisit = () => {
    // Update application status logic would go here
    toast({
      title: "Visit Verified",
      description: "Application has been verified and sent to CIU",
    })
    setSelectedApplication(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">EAMVU Dashboard</h2>
          <p className="text-muted-foreground">External Asset Management & Verification Unit - Field verification</p>
        </div>
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

      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="new">New Applications</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="completed">Completed Visits</TabsTrigger>
          <TabsTrigger value="agents">Field Agents</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="space-y-4">
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
              <CardTitle>New Applications ({filteredApplications.length})</CardTitle>
              <CardDescription>Applications requiring field agent assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-sm">{app.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{app.applicantName}</div>
                          <div className="text-sm text-muted-foreground">{app.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{app.loanType}</TableCell>
                      <TableCell className="font-medium">{app.amount}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={app.address}>
                          {app.address}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedApplication(app)}>
                              Assign Agent
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Assign Field Agent - {selectedApplication?.id}</DialogTitle>
                              <DialogDescription>
                                Assign a field agent to verify the applicant's details
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
                                        <p className="text-sm">{selectedApplication.applicantName}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Phone</Label>
                                        <p className="text-sm">{selectedApplication.phone}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <Label className="text-sm font-medium">Address</Label>
                                        <p className="text-sm">{selectedApplication.address}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Loan Type</Label>
                                        <p className="text-sm">{selectedApplication.loanType}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Amount</Label>
                                        <p className="text-sm">{selectedApplication.amount}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Available Field Agents</CardTitle>
                                    <CardDescription>
                                      Select an agent to assign for this verification
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Area</TableHead>
                                          <TableHead>Active Assignments</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead className="text-right">Select</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {fieldAgentsData
                                          .filter(agent => agent.status === "active")
                                          .map((agent) => (
                                            <TableRow 
                                              key={agent.id} 
                                              className={selectedAgent?.id === agent.id ? "bg-muted" : ""}
                                            >
                                              <TableCell>
                                                <div>
                                                  <div className="font-medium">{agent.name}</div>
                                                  <div className="text-sm text-muted-foreground">{agent.phone}</div>
                                                </div>
                                              </TableCell>
                                              <TableCell>{agent.area}</TableCell>
                                              <TableCell>{agent.activeAssignments}</TableCell>
                                              <TableCell>{getAgentStatusBadge(agent.status)}</TableCell>
                                              <TableCell className="text-right">
                                                <Button 
                                                  variant={selectedAgent?.id === agent.id ? "default" : "outline"}
                                                  size="sm"
                                                  onClick={() => setSelectedAgent(agent)}
                                                >
                                                  {selectedAgent?.id === agent.id ? "Selected" : "Select"}
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                      </TableBody>
                                    </Table>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Assignment Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea 
                                      placeholder="Add any notes or instructions for the field agent..."
                                    />
                                  </CardContent>
                                </Card>

                                <DialogFooter>
                                  <Button variant="outline" onClick={() => {
                                    setSelectedApplication(null)
                                    setSelectedAgent(null)
                                  }}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={handleAssignAgent}
                                    disabled={!selectedAgent}
                                  >
                                    Assign Agent
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

        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Applications</CardTitle>
              <CardDescription>Applications with assigned field agents for verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "eamvu_agent_assigned")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.applicantName}</div>
                            <div className="text-sm text-muted-foreground">{app.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.loanType}</TableCell>
                        <TableCell>{app.assignedTo}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Visits</CardTitle>
              <CardDescription>Applications with completed field verification visits</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Verified By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "eamvu_visit_complete" || app.status === "eamvu_verified")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.applicantName}</div>
                            <div className="text-sm text-muted-foreground">{app.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.loanType}</TableCell>
                        <TableCell>{app.assignedTo}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setSelectedApplication(app)}>
                                {app.status === "eamvu_visit_complete" ? "Review" : "View Report"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Visit Report - {app.id}</DialogTitle>
                                <DialogDescription>
                                  Field verification report for {app.applicantName}
                                </DialogDescription>
                              </DialogHeader>

                              {app.visitReport && (
                                <div className="space-y-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Visit Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium">Visit Date</Label>
                                          <p className="text-sm">{app.visitReport.visitDate}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Visit Time</Label>
                                          <p className="text-sm">{app.visitReport.visitTime}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Location Verified</Label>
                                          <p className="text-sm">{app.visitReport.locationVerified ? "Yes" : "No"}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Business Verified</Label>
                                          <p className="text-sm">{app.visitReport.businessVerified ? "Yes" : "No"}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <Label className="text-sm font-medium">Comments</Label>
                                          <p className="text-sm">{app.visitReport.comments}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Visit Photos</CardTitle>
                                      <CardDescription>
                                        Geo-tagged photos from the field visit
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-3 gap-4">
                                        {app.visitReport.photos.map((photo, index) => (
                                          <div key={index} className="border rounded-md p-2 flex flex-col items-center">
                                            <div className="bg-gray-100 h-32 w-full rounded-md flex items-center justify-center">
                                              <Camera className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <p className="text-xs mt-2">{photo}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {app.status === "eamvu_visit_complete" && (
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Verification Decision</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="space-y-4">
                                          <div>
                                            <Label htmlFor="verification-notes">Verification Notes</Label>
                                            <Textarea 
                                              id="verification-notes"
                                              placeholder="Add any additional verification notes..."
                                            />
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}

                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                      {app.status === "eamvu_verified" ? "Close" : "Save Draft"}
                                    </Button>
                                    {app.status === "eamvu_visit_complete" && (
                                      <div className="flex gap-2">
                                        <Button variant="destructive">
                                          Reject Verification
                                        </Button>
                                        <Button onClick={handleVerifyVisit}>
                                          Approve & Send to CIU
                                        </Button>
                                      </div>
                                    )}
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

        <TabsContent value="agents" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Field Agents</h3>
              <p className="text-sm text-muted-foreground">Manage field agents and their assignments</p>
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Add New Agent
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Active Assignments</TableHead>
                    <TableHead>Completed Visits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldAgentsData.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div className="font-medium">{agent.name}</div>
                      </TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>{agent.area}</TableCell>
                      <TableCell>{agent.activeAssignments}</TableCell>
                      <TableCell>{agent.completedVisits}</TableCell>
                      <TableCell>{getAgentStatusBadge(agent.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Assignments</DropdownMenuItem>
                            <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                            {agent.status === "active" ? (
                              <DropdownMenuItem className="text-amber-600">Set as Inactive</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">Set as Active</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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