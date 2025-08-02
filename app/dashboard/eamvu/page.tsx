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
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MapPin, Camera, Users, Upload, BarChart3, TrendingUp, Calendar, Phone, User, DollarSign, Activity, FolderOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import DocumentExplorer from "@/components/document-explorer"

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
  formData?: any
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
  const [selectedApplication, setSelectedApplication] = useState<EAMVUApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDocumentExplorer, setShowDocumentExplorer] = useState(false)
  const { toast } = useToast()

  // Function to handle viewing application form data
  const handleViewApplication = async (application: any) => {
    try {
      console.log('🔄 Fetching form data for application:', application.los_id);
      const losId = application.los_id.replace('LOS-', ''); // Extract numeric part
      const response = await fetch(`/api/applications/form/${losId}`, { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' } 
      });
      if (!response.ok) { 
        throw new Error('Failed to fetch form data'); 
      }
      const data = await response.json();
      console.log('✅ Form data fetched successfully:', data);
      
      // Improved age calculation
      let age = 0; 
      if (data.formData.date_of_birth) { 
        console.log('Raw date_of_birth:', data.formData.date_of_birth);
        
        const dob = new Date(data.formData.date_of_birth); 
        const today = new Date(); 
        
        console.log('Parsed DOB:', dob);
        console.log('Today:', today);
        
        // Check if the date is valid
        if (isNaN(dob.getTime())) {
          console.error('Invalid date of birth:', data.formData.date_of_birth);
          age = 0;
        } else {
          age = today.getFullYear() - dob.getFullYear(); 
          
          // Check if birthday hasn't occurred this year yet
          const monthDiff = today.getMonth() - dob.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) { 
            age--; 
          }
          
          console.log('Calculated age:', age);
        }
      } else {
        console.log('No date_of_birth found in formData');
      }

      // Add age to the data 
      data.formData.age = age; 
      console.log('✅ Form data fetched successfully:', data); 
      
      setSelectedApplication({ ...application, formData: data.formData });
      toast({ 
        title: "Form Data Loaded", 
        description: `Application form data has been loaded successfully.` 
      });
    } catch (error) {
      console.error('❌ Error fetching form data:', error);
      toast({ 
        title: "Error", 
        description: "Failed to fetch application form data.", 
        variant: "destructive" 
      });
    }
  };

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
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewApplication(app)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                            <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                              <DialogTitle>Application Details - {selectedApplication?.los_id}</DialogTitle>
                              <DialogDescription>
                                Complete application information for EAMVU verification
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="overflow-y-auto max-h-[calc(90vh-120px)] space-y-6 pr-2">
                                {/* Basic Information Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Applicant Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="font-medium">Full Name:</span>
                                        <span>{selectedApplication.formData?.first_name} {selectedApplication.formData?.middle_name} {selectedApplication.formData?.last_name}</span>
                                        <span className="font-medium">Age:</span>
                                        <span>{selectedApplication.formData?.age || 0} years</span>
                                        <span className="font-medium">Monthly Income:</span>
                                        <span>{selectedApplication.formData?.net_monthly_income ? `PKR ${selectedApplication.formData.net_monthly_income.toLocaleString()}` : 'Not provided'}</span>
                                        <span className="font-medium">Branch:</span>
                                        <span>{selectedApplication.formData?.branch_code || 'Not provided'}</span>
                                        <span className="font-medium">Application Date:</span>
                                        <span>{selectedApplication.formData?.created_at ? new Date(selectedApplication.formData.created_at).toLocaleDateString() : 'Not provided'}</span>
                                        <span className="font-medium">Status:</span>
                                        <span>{getStatusBadge(selectedApplication.status)}</span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Loan Details
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="font-medium">Loan Type:</span>
                                        <span>{selectedApplication.loan_type}</span>
                                        <span className="font-medium">Amount:</span>
                                        <span className="font-semibold text-green-600">PKR {selectedApplication.loan_amount?.toLocaleString()}</span>
                                        <span className="font-medium">Status:</span>
                                        <span>{getStatusBadge(selectedApplication.status)}</span>
                                        <span className="font-medium">Priority:</span>
                                        <span>{selectedApplication.priority}</span>
                                        <span className="font-medium">LOS ID:</span>
                                        <span>{selectedApplication.los_id}</span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        Application Progress
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-medium">Completion</span>
                                          <span className="text-sm font-bold">85%</span>
                                        </div>
                                        <Progress value={85} className="w-full" />
                                        <div className="text-xs text-muted-foreground">
                                          15% remaining
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Form Data Section */}
                                {selectedApplication.formData && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Application Form Data
                                      </CardTitle>
                                      <CardDescription>
                                        Complete form data retrieved from database
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-6">
                                        {/* Personal Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-blue-600">Personal Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Full Name:</span> {selectedApplication.formData.first_name} {selectedApplication.formData.middle_name} {selectedApplication.formData.last_name}</div>
                                            <div><span className="font-medium">Title:</span> {selectedApplication.formData.title || 'Not provided'}</div>
                                            <div><span className="font-medium">CNIC:</span> {selectedApplication.formData.cnic}</div>
                                            <div><span className="font-medium">NTN:</span> {selectedApplication.formData.ntn || 'Not provided'}</div>
                                            <div><span className="font-medium">Date of Birth:</span> {selectedApplication.formData.date_of_birth || 'Not provided'}</div>
                                            <div><span className="font-medium">Gender:</span> {selectedApplication.formData.gender || 'Not provided'}</div>
                                            <div><span className="font-medium">Marital Status:</span> {selectedApplication.formData.marital_status || 'Not provided'}</div>
                                            <div><span className="font-medium">Father/Husband Name:</span> {selectedApplication.formData.father_or_husband_name}</div>
                                            <div><span className="font-medium">Mother's Maiden Name:</span> {selectedApplication.formData.mother_maiden_name || 'Not provided'}</div>
                                            <div><span className="font-medium">Education:</span> {selectedApplication.formData.education_qualification || 'Not provided'}</div>
                                            <div><span className="font-medium">Preferred Mailing Address:</span> {selectedApplication.formData.preferred_mailing_address || 'Not provided'}</div>
                                            <div><span className="font-medium">Application Source:</span> {selectedApplication.formData.application_source || 'Not provided'}</div>
                                            <div><span className="font-medium">Program Code:</span> {selectedApplication.formData.program_code || 'Not provided'}</div>
                                            <div><span className="font-medium">Channel Code:</span> {selectedApplication.formData.channel_code || 'Not provided'}</div>
                                            <div><span className="font-medium">Branch Code:</span> {selectedApplication.formData.branch_code || 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-green-600">Contact Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Mobile:</span> {selectedApplication.formData.mobile}</div>
                                            <div><span className="font-medium">Mobile Type:</span> {selectedApplication.formData.mobile_type || 'Not provided'}</div>
                                            <div><span className="font-medium">Current Phone:</span> {selectedApplication.formData.tel_current}</div>
                                            <div><span className="font-medium">Permanent Phone:</span> {selectedApplication.formData.tel_permanent || 'Not provided'}</div>
                                            <div><span className="font-medium">Other Contact:</span> {selectedApplication.formData.other_contact || 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Address Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-purple-600">Address Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Current Address:</span> {selectedApplication.formData.address}</div>
                                            <div><span className="font-medium">Permanent Address:</span> {selectedApplication.formData.permanent_street}, {selectedApplication.formData.permanent_city}</div>
                                            <div><span className="font-medium">City:</span> {selectedApplication.formData.city}</div>
                                            <div><span className="font-medium">Permanent City:</span> {selectedApplication.formData.permanent_city}</div>
                                            <div><span className="font-medium">Postal Code:</span> {selectedApplication.formData.postal_code}</div>
                                            <div><span className="font-medium">Residing Since:</span> {selectedApplication.formData.residing_since || 'Not provided'}</div>
                                            <div><span className="font-medium">House No:</span> {selectedApplication.formData.permanent_house_no || 'Not provided'}</div>
                                            <div><span className="font-medium">Nearest Landmark:</span> {selectedApplication.formData.nearest_landmark || 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Employment Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-orange-600">Employment Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Employment Status:</span> {selectedApplication.formData.employment_status}</div>
                                            <div><span className="font-medium">Company Name:</span> {selectedApplication.formData.company_name || 'Not provided'}</div>
                                            <div><span className="font-medium">Company Type:</span> {selectedApplication.formData.company_type || 'Not provided'}</div>
                                            <div><span className="font-medium">Designation:</span> {selectedApplication.formData.designation || 'Not provided'}</div>
                                            <div><span className="font-medium">Grade Level:</span> {selectedApplication.formData.grade_level || 'Not provided'}</div>
                                            <div><span className="font-medium">Department:</span> {selectedApplication.formData.department || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Phone 1:</span> {selectedApplication.formData.office_tel1 || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Phone 2:</span> {selectedApplication.formData.office_tel2 || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Fax:</span> {selectedApplication.formData.office_fax || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Extension:</span> {selectedApplication.formData.office_ext || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Area:</span> {selectedApplication.formData.office_area || 'Not provided'}</div>
                                            <div><span className="font-medium">Office City:</span> {selectedApplication.formData.office_city || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Street:</span> {selectedApplication.formData.office_street || 'Not provided'}</div>
                                            <div><span className="font-medium">Office House No:</span> {selectedApplication.formData.office_house_no || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Landmark:</span> {selectedApplication.formData.office_landmark || 'Not provided'}</div>
                                            <div><span className="font-medium">Office Postal Code:</span> {selectedApplication.formData.office_postal_code || 'Not provided'}</div>
                                            <div><span className="font-medium">SM Employee No:</span> {selectedApplication.formData.sm_employee_no || 'Not provided'}</div>
                                            <div><span className="font-medium">SO Employee No:</span> {selectedApplication.formData.so_employee_no || 'Not provided'}</div>
                                            <div><span className="font-medium">PB BM Employee No:</span> {selectedApplication.formData.pb_bm_employee_no || 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Loan Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-red-600">Loan Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Amount Requested:</span> PKR {selectedApplication.formData.amount_requested?.toLocaleString()}</div>
                                            <div><span className="font-medium">Purpose of Loan:</span> {selectedApplication.formData.purpose_of_loan || 'Not provided'}</div>
                                            <div><span className="font-medium">Tenure:</span> {selectedApplication.formData.tenure || 'Not provided'} years</div>
                                            <div><span className="font-medium">Min Amount Acceptable:</span> {selectedApplication.formData.min_amount_acceptable ? `PKR ${selectedApplication.formData.min_amount_acceptable.toLocaleString()}` : 'Not provided'}</div>
                                            <div><span className="font-medium">Max Affordable Installment:</span> {selectedApplication.formData.max_affordable_installment ? `PKR ${selectedApplication.formData.max_affordable_installment.toLocaleString()}` : 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Financial Information */}
                                        <div>
                                          <h4 className="font-semibold mb-3 text-indigo-600">Financial Information</h4>
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="font-medium">Gross Monthly Salary:</span> {selectedApplication.formData.gross_monthly_salary ? `PKR ${selectedApplication.formData.gross_monthly_salary.toLocaleString()}` : 'Not provided'}</div>
                                            <div><span className="font-medium">Net Monthly Income:</span> {selectedApplication.formData.net_monthly_income ? `PKR ${selectedApplication.formData.net_monthly_income.toLocaleString()}` : 'Not provided'}</div>
                                            <div><span className="font-medium">Other Monthly Income:</span> {selectedApplication.formData.other_monthly_income ? `PKR ${selectedApplication.formData.other_monthly_income.toLocaleString()}` : 'Not provided'}</div>
                                            <div><span className="font-medium">Other Income Sources:</span> {selectedApplication.formData.other_income_sources || 'Not provided'}</div>
                                            <div><span className="font-medium">Monthly Rent:</span> {selectedApplication.formData.monthly_rent ? `PKR ${selectedApplication.formData.monthly_rent.toLocaleString()}` : 'Not provided'}</div>
                                            <div><span className="font-medium">UBL Account Number:</span> {selectedApplication.formData.ubl_account_number || 'Not provided'}</div>
                                            <div><span className="font-medium">Is UBL Customer:</span> {selectedApplication.formData.is_ubl_customer ? 'Yes' : 'No'}</div>
                                            <div><span className="font-medium">Customer ID:</span> {selectedApplication.formData.customer_id || 'Not provided'}</div>
                                            <div><span className="font-medium">Accommodation Type:</span> {selectedApplication.formData.accommodation_type || 'Not provided'}</div>
                                            <div><span className="font-medium">Dependants:</span> {selectedApplication.formData.dependants || 'Not provided'}</div>
                                            <div><span className="font-medium">Experience (Current):</span> {selectedApplication.formData.exp_current_years || 'Not provided'} years</div>
                                            <div><span className="font-medium">Experience (Previous):</span> {selectedApplication.formData.exp_prev_years || 'Not provided'} years</div>
                                            <div><span className="font-medium">Previous Employer:</span> {selectedApplication.formData.prev_employer_name || 'Not provided'}</div>
                                          </div>
                                        </div>

                                        {/* Credit Cards Clean */}
                                        {selectedApplication.formData.credit_cards_clean && selectedApplication.formData.credit_cards_clean.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold mb-3 text-emerald-600">Clean Credit Cards</h4>
                                            <div className="space-y-3">
                                              {selectedApplication.formData.credit_cards_clean.map((card: any, index: number) => (
                                                <div key={card.id} className="border rounded-lg p-3 bg-green-50">
                                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div><span className="font-medium">Bank Name:</span> {card.bank_name}</div>
                                                    <div><span className="font-medium">Approved Limit:</span> PKR {card.approved_limit?.toLocaleString()}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Credit Cards Secured */}
                                        {selectedApplication.formData.credit_cards_secured && selectedApplication.formData.credit_cards_secured.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold mb-3 text-amber-600">Secured Credit Cards</h4>
                                            <div className="space-y-3">
                                              {selectedApplication.formData.credit_cards_secured.map((card: any, index: number) => (
                                                <div key={card.id} className="border rounded-lg p-3 bg-yellow-50">
                                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div><span className="font-medium">Bank Name:</span> {card.bank_name}</div>
                                                    <div><span className="font-medium">Approved Limit:</span> PKR {card.approved_limit?.toLocaleString()}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Personal Loans Secured */}
                                        {selectedApplication.formData.personal_loans_secured && selectedApplication.formData.personal_loans_secured.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold mb-3 text-red-600">Secured Personal Loans</h4>
                                            <div className="space-y-3">
                                              {selectedApplication.formData.personal_loans_secured.map((loan: any, index: number) => (
                                                <div key={loan.id} className="border rounded-lg p-3 bg-red-50">
                                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div><span className="font-medium">Bank Name:</span> {loan.bank_name}</div>
                                                    <div><span className="font-medium">Approved Limit:</span> PKR {loan.approved_limit?.toLocaleString()}</div>
                                                    <div><span className="font-medium">Outstanding Amount:</span> PKR {loan.outstanding_amount?.toLocaleString()}</div>
                                                    <div><span className="font-medium">As of Date:</span> {loan.as_of}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Other Facilities */}
                                        {selectedApplication.formData.other_facilities && selectedApplication.formData.other_facilities.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold mb-3 text-blue-600">Other Banking Facilities</h4>
                                            <div className="space-y-3">
                                              {selectedApplication.formData.other_facilities.map((facility: any, index: number) => (
                                                <div key={facility.id} className="border rounded-lg p-3 bg-blue-50">
                                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div><span className="font-medium">Nature:</span> {facility.nature}</div>
                                                    <div><span className="font-medium">Bank Name:</span> {facility.bank_name}</div>
                                                    <div><span className="font-medium">Approved Limit:</span> PKR {facility.approved_limit?.toLocaleString()}</div>
                                                    <div><span className="font-medium">Current Outstanding:</span> PKR {facility.current_outstanding?.toLocaleString()}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* References */}
                                        {selectedApplication.formData.references && selectedApplication.formData.references.length > 0 && (
                                          <div>
                                            <h4 className="font-semibold mb-3 text-teal-600">References</h4>
                                            <div className="space-y-3">
                                              {selectedApplication.formData.references.map((ref: any, index: number) => (
                                                <div key={ref.id} className="border rounded-lg p-3 bg-gray-50">
                                                  <div className="font-medium text-sm mb-2">Reference {index + 1}</div>
                                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div><span className="font-medium">Name:</span> {ref.name || 'Not provided'}</div>
                                                    <div><span className="font-medium">Relationship:</span> {ref.relationship || 'Not provided'}</div>
                                                    <div><span className="font-medium">Mobile:</span> {ref.mobile || 'Not provided'}</div>
                                                    <div><span className="font-medium">CNIC:</span> {ref.cnic || 'Not provided'}</div>
                                                    <div><span className="font-medium">Address:</span> {ref.street}, {ref.city}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Raw Data (for debugging) */}
                                        <details className="mt-4">
                                          <summary className="cursor-pointer text-sm font-medium text-gray-600">View Raw Data</summary>
                                          <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                              {JSON.stringify(selectedApplication.formData, null, 2)}
                                            </pre>
                                          </div>
                                        </details>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* View Documents Button */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <FolderOpen className="h-5 w-5" />
                                      Documents
                                    </CardTitle>
                                    <CardDescription>
                                      View uploaded documents for this application
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <Button 
                                        variant="outline" 
                                        onClick={() => setShowDocumentExplorer(true)}
                                        className="w-full"
                                      >
                                        <FolderOpen className="mr-2 h-4 w-4" />
                                        View Documents
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>

                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setSelectedApplication(null)}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Document Explorer Dialog */}
                        <Dialog open={showDocumentExplorer} onOpenChange={setShowDocumentExplorer}>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                            <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                              <DialogTitle>Document Explorer - {selectedApplication?.los_id}</DialogTitle>
                              <DialogDescription>
                                View uploaded documents for this application
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                                <DocumentExplorer 
                                  losId={selectedApplication.los_id}
                                  applicationType={selectedApplication.loan_type}
                                  onFileSelect={(file) => {
                                    toast({
                                      title: "File selected",
                                      description: `Selected: ${file.name}`,
                                    });
                                  }} 
                                />
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
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