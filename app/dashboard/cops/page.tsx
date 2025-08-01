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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, ArrowRight, Database, CheckSquare, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for COPS dashboard
const applicationsData = [
  {
    id: "UBL-2024-001234",
    applicantName: "Muhammad Ali Khan",
    segment: "Preferred",
    loanType: "Personal Loan",
    amount: "PKR 2,500,000",
    status: "cops_data_entry",
    lastUpdate: "2024-01-15",
    assignedTo: "Zainab Ali",
    priority: "High",
    dataEntryProgress: 40,
    complianceChecks: [
      { id: "check1", name: "KYC Verification", status: "pending" },
      { id: "check2", name: "Credit Score Check", status: "pending" },
      { id: "check3", name: "AML Screening", status: "pending" },
      { id: "check4", name: "Internal Policy Check", status: "pending" },
    ],
  },
  {
    id: "UBL-2024-001235",
    applicantName: "Fatima Ahmed",
    segment: "Mass",
    loanType: "Auto Loan",
    amount: "PKR 800,000",
    status: "cops_compliance_check",
    lastUpdate: "2024-01-14",
    assignedTo: "Omar Khan",
    priority: "Medium",
    dataEntryProgress: 100,
    complianceChecks: [
      { id: "check5", name: "KYC Verification", status: "completed" },
      { id: "check6", name: "Credit Score Check", status: "completed" },
      { id: "check7", name: "AML Screening", status: "pending" },
      { id: "check8", name: "Internal Policy Check", status: "pending" },
    ],
  },
  {
    id: "UBL-2024-001236",
    applicantName: "Hassan Raza",
    segment: "SME",
    loanType: "Business Loan",
    amount: "PKR 5,000,000",
    status: "cops_data_entry",
    lastUpdate: "2024-01-13",
    assignedTo: "Unassigned",
    priority: "High",
    dataEntryProgress: 20,
    complianceChecks: [
      { id: "check9", name: "KYC Verification", status: "pending" },
      { id: "check10", name: "Credit Score Check", status: "pending" },
      { id: "check11", name: "AML Screening", status: "pending" },
      { id: "check12", name: "Internal Policy Check", status: "pending" },
    ],
  },
]

// Stats for dashboard
const statsData = [
  {
    title: "Data Entry Queue",
    value: "12",
    change: "+3 from yesterday",
    icon: Database,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Compliance Check",
    value: "7",
    change: "Pending review",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Processed Today",
    value: "9",
    change: "+2 from yesterday",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Processed",
    value: "128",
    change: "This month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Data Entry":
      return <Badge className="bg-blue-100 text-blue-800">Data Entry</Badge>
    case "Compliance Check":
      return <Badge className="bg-yellow-100 text-yellow-800">Compliance Check</Badge>
    case "Verified":
      return <Badge className="bg-green-100 text-green-800">Verified</Badge>
    case "Flagged":
      return <Badge variant="destructive">Flagged</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getCheckStatusBadge(status: string) {
  const statusConfig: Record<string, { variant: "default" | "destructive" | "outline" | "secondary", label: string }> = {
    "completed": { variant: "default", label: "Completed" },
    "pending": { variant: "outline", label: "Pending" },
    "failed": { variant: "destructive", label: "Failed" },
  }

  const config = statusConfig[status] || { variant: "outline", label: status }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function COPSDashboardPage() {
  const [activeTab, setActiveTab] = useState("data-entry")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const filteredApplications = applicationsData.filter((app) => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    
    if (activeTab === "data-entry") {
      return matchesSearch && matchesStatus && app.status === "cops_data_entry"
    } else if (activeTab === "compliance") {
      return matchesSearch && matchesStatus && app.status === "cops_compliance_check"
    } else if (activeTab === "processed") {
      return matchesSearch && matchesStatus && app.status === "cops_verified"
    }
    
    return matchesSearch && matchesStatus
  })

  const handleCompleteDataEntry = () => {
    // Update application status logic would go here
    toast({
      title: "Data Entry Completed",
      description: "Application has been moved to compliance check",
    })
    setSelectedApplication(null)
  }

  const handleCompleteCompliance = () => {
    // Update application status logic would go here
    toast({
      title: "Compliance Check Completed",
      description: "Application has been verified and sent to EAMVU",
    })
    setSelectedApplication(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consumer Operations Dashboard</h1>
        <Button>Assign Tasks</Button>
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

      <Tabs defaultValue="data-entry" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
          {/* <TabsTrigger value="compliance">Compliance Check</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger> */}
        </TabsList>
        <TabsContent value="data-entry" className="space-y-4">
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
              <CardTitle>Data Entry Queue ({filteredApplications.length})</CardTitle>
              <CardDescription>Applications requiring data entry into core banking systems</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Update</TableHead>
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
                          <div className="text-sm text-muted-foreground">
                            {app.assignedTo !== "Unassigned" ? `Assigned to: ${app.assignedTo}` : "Unassigned"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.loanType}</TableCell>
                      <TableCell className="font-medium">{app.amount}</TableCell>
                      <TableCell>
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">{app.dataEntryProgress}%</span>
                          </div>
                          <Progress value={app.dataEntryProgress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(app.lastUpdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedApplication(app)}>
                              Continue
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Data Entry - {selectedApplication?.id}</DialogTitle>
                              <DialogDescription>
                                Enter application data into core banking systems
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
                                        <Label className="text-sm font-medium">Loan Type</Label>
                                        <p className="text-sm">{selectedApplication.loanType}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Amount</Label>
                                        <p className="text-sm">{selectedApplication.amount}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Segment</Label>
                                        <p className="text-sm">{selectedApplication.segment}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Data Entry Checklist</CardTitle>
                                    <CardDescription>
                                      Mark each system as data is entered
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="caps" />
                                        <Label htmlFor="caps">CAPS (Core Banking System)</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="crm" />
                                        <Label htmlFor="crm">CRM System</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="los" />
                                        <Label htmlFor="los">LOS System</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="kyc" />
                                        <Label htmlFor="kyc">KYC System</Label>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea 
                                      placeholder="Add any notes or comments about the data entry process..."
                                    />
                                  </CardContent>
                                </Card>

                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                    Save Progress
                                  </Button>
                                  <Button onClick={handleCompleteDataEntry}>
                                    Complete & Move to Compliance
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

        {/* <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Check Queue</CardTitle>
              <CardDescription>Applications requiring compliance and internal checks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsData
                    .filter(app => app.status === "cops_compliance_check")
                    .map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.applicantName}</div>
                            <div className="text-sm text-muted-foreground">
                              {app.assignedTo !== "Unassigned" ? `Assigned to: ${app.assignedTo}` : "Unassigned"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{app.loanType}</TableCell>
                        <TableCell className="font-medium">{app.amount}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setSelectedApplication(app)}>
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Compliance Check - {app.id}</DialogTitle>
                                <DialogDescription>
                                  Perform compliance and internal policy checks
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Compliance Checklist</CardTitle>
                                    <CardDescription>
                                      Complete all required compliance checks
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Check</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {app.complianceChecks.map((check: any) => (
                                          <TableRow key={check.id}>
                                            <TableCell>{check.name}</TableCell>
                                            <TableCell>{getCheckStatusBadge(check.status)}</TableCell>
                                            <TableCell className="text-right">
                                              <div className="flex justify-end gap-2">
                                                <Button 
                                                  variant="default" 
                                                  size="sm" 
                                                  disabled={check.status === "completed"}
                                                >
                                                  <CheckCircle className="h-4 w-4 mr-1" />
                                                  Complete
                                                </Button>
                                                <Button 
                                                  variant="destructive" 
                                                  size="sm" 
                                                  disabled={check.status === "failed"}
                                                >
                                                  <X className="h-4 w-4 mr-1" />
                                                  Fail
                                                </Button>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Compliance Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea 
                                      placeholder="Add any compliance notes or findings..."
                                    />
                                  </CardContent>
                                </Card>

                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                    Save Progress
                                  </Button>
                                  <Button onClick={handleCompleteCompliance}>
                                    Complete & Send to EAMVU
                                  </Button>
                                </DialogFooter>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* <TabsContent value="processed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processed Applications</CardTitle>
              <CardDescription>Applications that have been fully processed and sent to EAMVU</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Processed applications will appear here...</p>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
} 