"use client"

import { useState, useEffect } from "react"
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
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, ArrowRight, ArrowLeft, X, Download, ExternalLink, Check, Ban } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for SPU dashboard
const applicationsData = [
  {
    id: "UBL-2024-001234",
    applicantName: "Mubashir",
    segment: "Preferred",
    loanType: "Personal Loan",
    amount: "PKR 2,500,000",
    status: "submitted_to_spu",
    lastUpdate: "2024-01-15",
    assignedTo: "Ahmed Khan",
    priority: "High",
    documents: [
      { id: "doc1", name: "CNIC Copy", status: "verified", required: true },
      { id: "doc2", name: "Salary Slip", status: "pending", required: true },
      { id: "doc3", name: "Bank Statement", status: "pending", required: true },
    ],
  },
  {
    id: "UBL-2024-001235",
    applicantName: "Abdul Wasay Ali",
    segment: "Mass",
    loanType: "Auto Loan",
    amount: "PKR 800,000",
    status: "submitted_to_spu",
    lastUpdate: "2024-01-14",
    assignedTo: "Unassigned",
    priority: "Medium",
    documents: [
      { id: "doc4", name: "CNIC Copy", status: "verified", required: true },
      { id: "doc5", name: "Salary Slip", status: "rejected", required: true },
      { id: "doc6", name: "Bank Statement", status: "verified", required: true },
      { id: "doc7", name: "Employment Letter", status: "verified", required: true },
    ],
  },
  {
    id: "UBL-2024-001236",
    applicantName: "Hassan Raza",
    segment: "SME",
    loanType: "Business Loan",
    amount: "PKR 5,000,000",
    status: "submitted_to_spu",
    lastUpdate: "2024-01-13",
    assignedTo: "Unassigned",
    priority: "High",
    documents: [
      { id: "doc8", name: "CNIC Copy", status: "verified", required: true },
      { id: "doc9", name: "Business Registration", status: "pending", required: true },
      { id: "doc10", name: "Bank Statement", status: "pending", required: true },
      { id: "doc11", name: "Tax Returns", status: "missing", required: true },
    ],
  },
]

// Stats for dashboard
const statsData = [
  {
    title: "New Applications",
    value: "15",
    change: "+5 from yesterday",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
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
    title: "Returned Applications",
    value: "3",
    change: "Documentation issues",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Total Processed",
    value: "142",
    change: "This month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "submitted_to_spu":
      return <Badge className="bg-blue-100 text-blue-800">New</Badge>
    case "under_review":
      return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
    case "verified":
      return <Badge className="bg-green-100 text-green-800">Verified</Badge>
    case "returned":
      return <Badge variant="destructive">Returned</Badge>
    case "New":
      return <Badge className="bg-blue-100 text-blue-800">New</Badge>
    case "Document Check":
      return <Badge className="bg-yellow-100 text-yellow-800">Document Check</Badge>
    case "Final Review":
      return <Badge className="bg-purple-100 text-purple-800">Final Review</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getDocumentStatusBadge(status: string) {
  const statusConfig: Record<string, { variant: "default" | "destructive" | "outline" | "secondary", label: string }> = {
    "verified": { variant: "default", label: "Verified" },
    "pending": { variant: "outline", label: "Pending" },
    "rejected": { variant: "destructive", label: "Rejected" },
    "missing": { variant: "destructive", label: "Missing" },
  }

  const config = statusConfig[status] || { variant: "outline", label: status }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function SPUDashboardPage() {
  const [activeTab, setActiveTab] = useState("new")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [verificationStep, setVerificationStep] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [spuApplications, setSpuApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState(statsData)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)
  const [verificationComments, setVerificationComments] = useState("")
  const [fieldVerification, setFieldVerification] = useState({
    nameVerified: false,
    cnicVerified: false,
    incomeVerified: false,
    addressVerified: false,
    employmentVerified: false
  })
  const { toast } = useToast()

  // Fetch SPU applications from backend
  useEffect(() => {
    fetchSpuApplications()
  }, [])

  const fetchSpuApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Starting to fetch SPU applications...')
      
      // Use the Next.js API route instead of direct backend call
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/applications/spu?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch SPU applications')
      }
      
      const data = await response.json()
      console.log('📊 Raw SPU data from API:', data)
      console.log('📊 Number of SPU applications received:', data.length)
      
      // Log each application
      data.forEach((app: any, index: number) => {
        console.log(`📋 SPU Application ${index + 1}:`, {
          id: app.id,
          los_id: app.los_id,
          applicant_name: app.applicant_name,
          loan_type: app.loan_type,
          loan_amount: app.loan_amount,
          status: app.status
        })
      })
      
      setSpuApplications(data)
      
      // Update stats based on real data
      setStats(prev => [
        { ...prev[0], value: data.filter((app: any) => app.status === 'submitted_to_spu').length.toString() },
        { ...prev[1], value: data.filter((app: any) => app.status === 'verified').length.toString() },
        { ...prev[2], value: data.filter((app: any) => app.status === 'returned').length.toString() },
        { ...prev[3], value: data.length.toString() }
      ])
    } catch (err) {
      console.error('❌ Error fetching SPU applications:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch SPU applications')
      
      toast({
        title: "Error",
        description: "Failed to fetch SPU applications",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  } 

  // Use real data from API instead of mock data
  const filteredApplications = spuApplications.filter((app) => {
    const matchesSearch = app.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.los_id?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleVerifyDocument = (docId: string) => {
    if (!selectedApplication) return
    
    // Update document status in the application
    const updatedApplication = {
      ...selectedApplication,
      documents: selectedApplication.documents.map((doc: any) => 
        doc.id === docId ? { ...doc, status: "verified" } : doc
      )
    }
    setSelectedApplication(updatedApplication)
    
    toast({
      title: "Document Verified",
      description: "Document has been marked as verified",
    })
  }

  const handleRejectDocument = (docId: string) => {
    if (!selectedApplication) return
    
    // Update document status in the application
    const updatedApplication = {
      ...selectedApplication,
      documents: selectedApplication.documents.map((doc: any) => 
        doc.id === docId ? { ...doc, status: "rejected" } : doc
      )
    }
    setSelectedApplication(updatedApplication)
    
    toast({
      title: "Document Rejected",
      description: "Document has been marked as rejected",
    })
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentViewer(true)
  }

  const handleDownloadDocument = (document: any) => {
    // Simulate document download
    const link = document.createElement('a')
    link.href = `http://localhost:8081/explorer/ilos_loan_application_documents/${selectedApplication?.application_type}/${selectedApplication?.los_id}/${document.name}`
    link.download = document.name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Download Started",
      description: `Downloading ${document.name}...`,
    })
  }

  const handleVerifyApplication = () => {
    if (!selectedApplication) return
    
    // Check if all required documents are verified
    const requiredDocuments = selectedApplication.documents.filter((doc: any) => doc.required)
    const unverifiedRequired = requiredDocuments.filter((doc: any) => doc.status !== "verified")
    
    if (unverifiedRequired.length > 0) {
      toast({
        title: "Verification Incomplete",
        description: "All required documents must be verified before proceeding",
        variant: "destructive"
      })
      return
    }
    
    // Check if all field verifications are complete
    const allFieldsVerified = Object.values(fieldVerification).every(verified => verified)
    if (!allFieldsVerified) {
      toast({
        title: "Field Verification Incomplete",
        description: "All field verifications must be completed before proceeding",
        variant: "destructive"
      })
      return
    }
    
    // Update application status
    const updatedApplications = spuApplications.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, status: "verified" }
        : app
    )
    setSpuApplications(updatedApplications)
    
    toast({
      title: "Application Verified",
      description: "Application has been verified and sent to COPS",
    })
    setSelectedApplication(null)
    setVerificationStep(1)
    setVerificationComments("")
    setFieldVerification({
      nameVerified: false,
      cnicVerified: false,
      incomeVerified: false,
      addressVerified: false,
      employmentVerified: false
    })
  }

  const handleReturnApplication = () => {
    if (!selectedApplication) return
    
    if (!verificationComments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide comments for returning the application",
        variant: "destructive"
      })
      return
    }
    
    // Update application status
    const updatedApplications = spuApplications.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, status: "returned" }
        : app
    )
    setSpuApplications(updatedApplications)
    
    toast({
      title: "Application Returned",
      description: "Application has been returned to PB for corrections",
    })
    setSelectedApplication(null)
    setVerificationStep(1)
    setVerificationComments("")
    setFieldVerification({
      nameVerified: false,
      cnicVerified: false,
      incomeVerified: false,
      addressVerified: false,
      employmentVerified: false
    })
  }

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Sales Processing Unit Dashboard</h1>
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

    <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="new">New Applications</TabsTrigger>
        <TabsTrigger value="verified">Verified</TabsTrigger>
        <TabsTrigger value="returned">Returned</TabsTrigger>
      </TabsList>

      {/* New Applications Tab */}
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

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted_to_spu">New</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
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
            <CardDescription>Applications pending SPU verification</CardDescription>
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
                  <TableHead>Last Update</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading applications...
                    </TableCell>
                  </TableRow>
                ) : filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No applications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{app.applicant_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {app.assigned_officer
                              ? `Assigned to: ${app.assigned_officer}`
                              : "Unassigned"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.loan_type}</TableCell>
                      <TableCell className="font-medium">
                        PKR {app.loan_amount?.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setSelectedApplication(app);
                                setVerificationStep(1);
                              }}
                            >
                              Verify
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Application Verification</DialogTitle>
                              <DialogDescription>
                                {selectedApplication
                                  ? `Verify application for ${selectedApplication.applicant_name}`
                                  : "Loading..."}
                              </DialogDescription>
                            </DialogHeader>

                            {/* Verification Steps */}
                            <div className="py-4">
                              <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      verificationStep === 1
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-green-100 text-green-600"
                                    }`}
                                  >
                                    {verificationStep > 1 ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : (
                                      "1"
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">Document Verification</p>
                                    <p className="text-sm text-muted-foreground">
                                      Check all required documents
                                    </p>
                                  </div>
                                </div>
                                <div className="flex-1 mx-4 border-t border-gray-200"></div>
                                <div className="flex items-center">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      verificationStep === 2
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                                  >
                                    {verificationStep > 2 ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : (
                                      "2"
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">Field Verification</p>
                                    <p className="text-sm text-muted-foreground">
                                      Validate application details
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Step 1 */}
                              {verificationStep === 1 && selectedApplication && (
                                <div className="space-y-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Required Documents</CardTitle>
                                      <CardDescription>
                                        Verify all required documents are present and valid
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Document</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Required</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedApplication.documents.map((doc: any) => (
                                            <TableRow key={doc.id}>
                                              <TableCell>{doc.name}</TableCell>
                                              <TableCell>
                                                {getDocumentStatusBadge(doc.status)}
                                              </TableCell>
                                              <TableCell>{doc.required ? "Yes" : "No"}</TableCell>
                                                                                             <TableCell className="text-right">
                                                 <div className="flex justify-end gap-2">
                                                   <Button
                                                     variant="outline"
                                                     size="sm"
                                                     onClick={() => handleViewDocument(doc)}
                                                     title="View Document"
                                                   >
                                                     <Eye className="h-4 w-4 mr-1" />
                                                     View
                                                   </Button>
                                                   <Button
                                                     variant="outline"
                                                     size="sm"
                                                     onClick={() => handleDownloadDocument(doc)}
                                                     title="Download Document"
                                                   >
                                                     <Download className="h-4 w-4 mr-1" />
                                                     Download
                                                   </Button>
                                                   <Button
                                                     variant="default"
                                                     size="sm"
                                                     onClick={() => handleVerifyDocument(doc.id)}
                                                     disabled={doc.status === "verified"}
                                                     title="Verify Document"
                                                   >
                                                     <Check className="h-4 w-4 mr-1" />
                                                     Verify
                                                   </Button>
                                                   <Button
                                                     variant="destructive"
                                                     size="sm"
                                                     onClick={() => handleRejectDocument(doc.id)}
                                                     disabled={doc.status === "rejected"}
                                                     title="Reject Document"
                                                   >
                                                     <Ban className="h-4 w-4 mr-1" />
                                                     Reject
                                                   </Button>
                                                 </div>
                                               </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </CardContent>
                                  </Card>

                                  <div className="flex justify-between">
                                    <Button
                                      variant="outline"
                                      onClick={() => setSelectedApplication(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={() => setVerificationStep(2)}>
                                      Next
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Step 2 */}
                              {verificationStep === 2 && (
                                <div className="space-y-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Field Verification</CardTitle>
                                      <CardDescription>
                                        Verify application details match with documents
                                      </CardDescription>
                                    </CardHeader>
                                                                         <CardContent>
                                       <div className="space-y-6">
                                         <div className="grid grid-cols-2 gap-4">
                                           <div className="space-y-4">
                                             <div className="flex items-center space-x-2">
                                               <Checkbox
                                                 id="nameVerified"
                                                 checked={fieldVerification.nameVerified}
                                                 onCheckedChange={(checked) => 
                                                   setFieldVerification(prev => ({ ...prev, nameVerified: !!checked }))
                                                 }
                                               />
                                               <Label htmlFor="nameVerified">Applicant Name Verified</Label>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                               <Checkbox
                                                 id="cnicVerified"
                                                 checked={fieldVerification.cnicVerified}
                                                 onCheckedChange={(checked) => 
                                                   setFieldVerification(prev => ({ ...prev, cnicVerified: !!checked }))
                                                 }
                                               />
                                               <Label htmlFor="cnicVerified">CNIC Verified</Label>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                               <Checkbox
                                                 id="incomeVerified"
                                                 checked={fieldVerification.incomeVerified}
                                                 onCheckedChange={(checked) => 
                                                   setFieldVerification(prev => ({ ...prev, incomeVerified: !!checked }))
                                                 }
                                               />
                                               <Label htmlFor="incomeVerified">Income Details Verified</Label>
                                             </div>
                                           </div>
                                           <div className="space-y-4">
                                             <div className="flex items-center space-x-2">
                                               <Checkbox
                                                 id="addressVerified"
                                                 checked={fieldVerification.addressVerified}
                                                 onCheckedChange={(checked) => 
                                                   setFieldVerification(prev => ({ ...prev, addressVerified: !!checked }))
                                                 }
                                               />
                                               <Label htmlFor="addressVerified">Address Verified</Label>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                               <Checkbox
                                                 id="employmentVerified"
                                                 checked={fieldVerification.employmentVerified}
                                                 onCheckedChange={(checked) => 
                                                   setFieldVerification(prev => ({ ...prev, employmentVerified: !!checked }))
                                                 }
                                               />
                                               <Label htmlFor="employmentVerified">Employment Details Verified</Label>
                                             </div>
                                           </div>
                                         </div>

                                         <div className="space-y-2">
                                           <Label htmlFor="comments">Verification Comments</Label>
                                           <Textarea
                                             id="comments"
                                             placeholder="Add any comments or notes about this verification..."
                                             value={verificationComments}
                                             onChange={(e) => setVerificationComments(e.target.value)}
                                           />
                                         </div>
                                       </div>
                                     </CardContent>
                                  </Card>

                                  <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => setVerificationStep(1)}>
                                      <ArrowLeft className="mr-2 h-4 w-4" />
                                      Previous
                                    </Button>
                                    <div className="space-x-2">
                                      <Button variant="destructive" onClick={handleReturnApplication}>
                                        Return to PB
                                      </Button>
                                      <Button onClick={handleVerifyApplication}>
                                        Verify & Send to COPS
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="verified" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Verified Applications</CardTitle>
            <CardDescription>
              Applications that have been verified and sent to COPS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Verified applications will appear here...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="returned" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Returned Applications</CardTitle>
            <CardDescription>
              Applications that have been returned to PB for corrections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Returned applications will appear here...</p>
          </CardContent>
        </Card>
             </TabsContent>
     </Tabs>

     {/* Document Viewer Modal */}
     <Dialog open={showDocumentViewer} onOpenChange={setShowDocumentViewer}>
       <DialogContent className="max-w-4xl max-h-[80vh]">
         <DialogHeader>
           <DialogTitle>Document Viewer</DialogTitle>
           <DialogDescription>
             {selectedDocument ? `Viewing: ${selectedDocument.name}` : "Loading document..."}
           </DialogDescription>
         </DialogHeader>
         
         {selectedDocument && (
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="font-medium">{selectedDocument.name}</h3>
                 <p className="text-sm text-muted-foreground">
                   Status: {getDocumentStatusBadge(selectedDocument.status)}
                 </p>
               </div>
               <div className="flex gap-2">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => handleDownloadDocument(selectedDocument)}
                 >
                   <Download className="h-4 w-4 mr-2" />
                   Download
                 </Button>
                                   <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`http://localhost:8081/explorer/ilos_loan_application_documents/${selectedApplication?.application_type}/${selectedApplication?.los_id}/${selectedDocument.name}`, '_blank')}
                  >
                   <ExternalLink className="h-4 w-4 mr-2" />
                   Open in New Tab
                 </Button>
               </div>
             </div>
             
             <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
               <div className="text-center">
                 <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                 <p className="text-gray-600 mb-2">Document Preview</p>
                 <p className="text-sm text-gray-500">
                   Click "Open in New Tab" to view the full document
                 </p>
               </div>
             </div>
             
             <div className="flex justify-end gap-2">
               <Button
                 variant="outline"
                 onClick={() => setShowDocumentViewer(false)}
               >
                 Close
               </Button>
               <Button
                 variant="default"
                 onClick={() => {
                   handleVerifyDocument(selectedDocument.id)
                   setShowDocumentViewer(false)
                 }}
                 disabled={selectedDocument.status === "verified"}
               >
                 <Check className="h-4 w-4 mr-2" />
                 Verify Document
               </Button>
             </div>
           </div>
         )}
       </DialogContent>
     </Dialog>
   </div>
 );
 }
