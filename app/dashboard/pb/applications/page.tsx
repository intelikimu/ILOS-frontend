"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import DocumentExplorer from "@/components/document-explorer"
import { 
  Eye, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  DollarSign,
  Activity,
  TrendingUp,
  BarChart3,
  Send,
  Copy,
  Paperclip,
  Flag,
  FolderOpen
} from "lucide-react"

// Application statistics
const applicationStats = {
  totalApplications: 156,
  draftApplications: 23,
  submittedApplications: 89,
  approvedApplications: 34,
  rejectedApplications: 10,
  avgProcessingTime: "4.2 days",
  approvalRate: 77.3,
  totalLoanAmount: "PKR 245,000,000",
};

function getStatusBadge(status: string) {
  switch (status) {
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "submitted_to_spu":
      return <Badge className="bg-blue-100 text-blue-800">Submitted to SPU</Badge>;
    case "returned_from_spu":
      return <Badge variant="destructive">Returned from SPU</Badge>;
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    case "disbursed":
      return <Badge className="bg-purple-100 text-purple-800">Disbursed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-100 text-red-800">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case "low":
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
}

function getRiskLevelBadge(risk: string) {
  switch (risk) {
    case "low":
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    case "high":
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    default:
      return <Badge variant="secondary">{risk}</Badge>;
  }
}

function getDocumentStatusBadge(status: string) {
  switch (status) {
    case "submitted":
      return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>;
    case "verified":
      return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
    case "missing":
      return <Badge className="bg-red-100 text-red-800">Missing</Badge>;
    case "revision_required":
      return <Badge className="bg-orange-100 text-orange-800">Revision Required</Badge>;
    case "not_required":
      return <Badge variant="outline">Not Required</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getTimelineStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "current":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-gray-400" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
}

export default function MyApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loanTypeFilter, setLoanTypeFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDocumentExplorer, setShowDocumentExplorer] = useState(false);
  const { toast } = useToast();



  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to fetch applications...');
      
      // Use the Next.js API route instead of direct backend call
      const timestamp = new Date().getTime();
      const response = await fetch(`http://localhost:5000/api/applications/department/pb`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      console.log('📊 Raw data from API:', data);
      console.log('📊 Number of applications received:', data.length);
      
      // Log each application type
      data.forEach((app: any, index: number) => {
        console.log(`📋 Application ${index + 1}:`, {
          id: app.los_id,
          applicantName: app.applicantName,
          loanType: app.loanType,
          amount: app.loan_amount,
          status: app.status
        });
      });
      
      // Ensure all application types are properly mapped
      const mappedApplications = data.map((app: any, index: number) => ({
        id: app.los_id || app.id || `ILOS-${String(index + 1).padStart(6, '0')}`,
        applicantName: app.applicantName || app.applicant_name || 'Unknown Applicant',
        loanType: app.loanType || app.loan_type || 'Personal Loan',
        amount: "PKR " + (app.loan_amount ? app.loan_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-'),
        status: app.status || 'draft',
        priority: app.priority || 'medium',
        submittedDate: app.submittedDate || app.submitted_date || new Date().toISOString(),
        lastUpdate: app.lastUpdate || app.last_update || new Date().toISOString(),
        completionPercentage: app.completionPercentage || app.completion_percentage || 0,
        branch: app.branch || 'Main Branch',
        // Mock data for fields not in database
        creditScore: app.creditScore || Math.floor(Math.random() * 200) + 600,
        monthlyIncome: app.net_monthly_income || '-',
        age: '-',
        riskLevel: app.riskLevel || ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        estimatedProcessingTime: app.estimatedProcessingTime || `${Math.floor(Math.random() * 5) + 2}-${Math.floor(Math.random() * 3) + 5} days`,
        documents: app.documents || [
          { name: "CNIC Copy", status: "submitted", required: true },
          { name: "Salary Slip", status: "submitted", required: true },
          { name: "Bank Statement", status: "submitted", required: true },
          { name: "Employment Letter", status: "submitted", required: false },
        ],
        timeline: app.timeline || [
          { 
            date: app.submittedDate || app.submitted_date 
              ? new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0] 
              : new Date().toISOString().split('T')[0], 
            event: "Application Created", 
            status: "completed" 
          },
          { 
            date: app.submittedDate || app.submitted_date 
              ? new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0] 
              : new Date().toISOString().split('T')[0], 
            event: "Documents Uploaded", 
            status: "completed" 
          },
          { 
            date: app.submittedDate || app.submitted_date 
              ? new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0] 
              : new Date().toISOString().split('T')[0], 
            event: "Initial Review", 
            status: "completed" 
          },
          { date: "TBD", event: "SPU Verification", status: "pending" },
        ],
      }));
      
      console.log('✅ Mapped applications:', mappedApplications);
      console.log('✅ Setting applications state with', mappedApplications.length, 'applications');
      setApplications(mappedApplications);
    } catch (err) {
      console.error('❌ Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      
      // Fallback to mock data if API fails
      setApplications([
        {
          id: "UBL-2024-001240",
          applicantName: "Ali Raza",
          loanType: "CashPlus Loan",
          amount: "PKR 1,500,000",
          status: "submitted_to_spu",
          priority: "medium",
          submittedDate: "2024-01-15 14:30:25",
          lastUpdate: "2024-01-18 10:45:15",
          completionPercentage: 95,
          creditScore: 720,
          monthlyIncome: "PKR 120,000",
          age: 32,
          branch: "Karachi Main",
          riskLevel: "medium",
          estimatedProcessingTime: "3-5 days",
          documents: [
            { name: "CNIC Copy", status: "submitted", required: true },
            { name: "Salary Slip", status: "submitted", required: true },
            { name: "Bank Statement", status: "submitted", required: true },
            { name: "Employment Letter", status: "submitted", required: false },
          ],
          timeline: [
            { date: "2024-01-15", event: "Application Created", status: "completed" },
            { date: "2024-01-16", event: "Documents Uploaded", status: "completed" },
            { date: "2024-01-17", event: "Initial Review", status: "completed" },
            { date: "2024-01-18", event: "Submitted to SPU", status: "current" },
            { date: "TBD", event: "SPU Verification", status: "pending" },
          ],
        },
        {
          id: "UBL-2024-001241",
          applicantName: "Zara Khan",
          loanType: "Auto Loan",
          amount: "PKR 850,000",
          status: "draft",
          priority: "low",
          submittedDate: "2024-01-12 09:20:30",
          lastUpdate: "2024-01-19 16:15:45",
          completionPercentage: 60,
          creditScore: 680,
          monthlyIncome: "PKR 85,000",
          age: 28,
          branch: "Karachi Main",
          riskLevel: "low",
          estimatedProcessingTime: "2-3 days",
          documents: [
            { name: "CNIC Copy", status: "submitted", required: true },
            { name: "Salary Slip", status: "missing", required: true },
            { name: "Bank Statement", status: "missing", required: true },
            { name: "Vehicle Registration", status: "not_required", required: false },
          ],
          timeline: [
            { date: "2024-01-12", event: "Application Created", status: "completed" },
            { date: "2024-01-13", event: "Basic Information", status: "completed" },
            { date: "TBD", event: "Document Upload", status: "current" },
            { date: "TBD", event: "Review & Submit", status: "pending" },
          ],
        },
        {
          id: "UBL-2024-001242",
          applicantName: "Ahmed Bilal",
          loanType: "Business Loan",
          amount: "PKR 2,000,000",
          status: "returned_from_spu",
          priority: "high",
          submittedDate: "2024-01-08 11:45:20",
          lastUpdate: "2024-01-19 14:20:10",
          completionPercentage: 85,
          creditScore: 750,
          monthlyIncome: "PKR 200,000",
          age: 45,
          branch: "Lahore Main",
          riskLevel: "medium",
          estimatedProcessingTime: "5-7 days",
          returnReason: "Additional income verification required",
          documents: [
            { name: "CNIC Copy", status: "verified", required: true },
            { name: "Business Registration", status: "verified", required: true },
            { name: "Tax Returns", status: "submitted", required: true },
            { name: "Financial Statements", status: "revision_required", required: true },
          ],
          timeline: [
            { date: "2024-01-08", event: "Application Created", status: "completed" },
            { date: "2024-01-10", event: "Documents Uploaded", status: "completed" },
            { date: "2024-01-12", event: "Submitted to SPU", status: "completed" },
            { date: "2024-01-18", event: "Returned from SPU", status: "current" },
            { date: "TBD", event: "Revision Required", status: "pending" },
          ],
        },
        {
          id: "UBL-2024-001243",
          applicantName: "Sara Ahmed",
          loanType: "Home Loan",
          amount: "PKR 5,500,000",
          status: "approved",
          priority: "high",
          submittedDate: "2024-01-05 08:30:15",
          lastUpdate: "2024-01-19 11:30:25",
          completionPercentage: 100,
          creditScore: 800,
          monthlyIncome: "PKR 350,000",
          age: 35,
          branch: "Islamabad",
          riskLevel: "low",
          estimatedProcessingTime: "7-10 days",
          approvalDate: "2024-01-18",
          disbursementDate: "2024-01-22",
          documents: [
            { name: "CNIC Copy", status: "verified", required: true },
            { name: "Salary Slip", status: "verified", required: true },
            { name: "Property Documents", status: "verified", required: true },
            { name: "Property Valuation", status: "verified", required: true },
          ],
          timeline: [
            { date: "2024-01-05", event: "Application Created", status: "completed" },
            { date: "2024-01-07", event: "Documents Uploaded", status: "completed" },
            { date: "2024-01-10", event: "Submitted to SPU", status: "completed" },
            { date: "2024-01-15", event: "SPU Verification", status: "completed" },
            { date: "2024-01-18", event: "Approved", status: "completed" },
            { date: "2024-01-22", event: "Disbursement", status: "current" },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Load applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesLoanType = loanTypeFilter === "all" || app.loanType === loanTypeFilter;
    
    return matchesSearch && matchesStatus && matchesLoanType;
  });

  const handleCreateApplication = () => {
    toast({
      title: "New Application",
      description: "Redirecting to application creation wizard...",
    });
  };

  const handleEditApplication = (appId: string) => {
    toast({
      title: "Edit Application",
      description: `Opening application ${appId} for editing...`,
    });
  };

  const handleSubmitApplication = (appId: string) => {
    toast({
      title: "Application Submitted",
      description: `Application ${appId} has been submitted to SPU for review.`,
    });
  };

  const handleDeleteApplication = (appId: string) => {
    toast({
      title: "Application Deleted",
      description: `Application ${appId} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleCopyApplication = (appId: string) => {
    toast({
      title: "Application Copied",
      description: `Created a copy of application ${appId}.`,
    });
  };

  const handleViewApplication = async (application: any) => {
    try {
      console.log('🔄 Fetching form data for application:', application.los_id);
      
      // Extract the numeric part from los_id (e.g., "LOS-18" -> "18")
      console.log(application);
      const losIdstr = application.id.replace('LOS-', '');
      const losId = parseInt(losIdstr);
      const response = await fetch(`http://localhost:5000/api/applications/form/${losId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch form data');
      }
      
      const data = await response.json();
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
      // Update the selected application with the fetched form data
      setSelectedApplication({
        ...application,
        formData: data.formData
      });
      
      toast({
        title: "Form Data Loaded",
        description: `Application form data has been loaded successfully.`,
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

  const handleRefresh = () => {
    fetchApplications();
    toast({
      title: "Refreshed",
      description: "Application data has been refreshed.",
    });
  };

  const getMissingDocumentsCount = (documents: any[]) => {
    return documents.filter(doc => doc.status === "missing" && doc.required).length;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Applications</h2>
            <p className="text-muted-foreground">Manage and track your loan applications</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Applications</h2>
            <p className="text-muted-foreground">Manage and track your loan applications</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-600 mb-2">Error loading applications</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchApplications} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Applications</h2>
          <p className="text-muted-foreground">Manage and track your loan applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleCreateApplication}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">All time applications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{applicationStats.approvedApplications}</div>
            <p className="text-xs text-muted-foreground">Successful approvals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{applicationStats.submittedApplications}</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{applicationStats.approvalRate}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by applicant name or LOS ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="submitted_to_spu">Submitted to SPU</SelectItem>
                      <SelectItem value="returned_from_spu">Returned from SPU</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Loan Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                      <SelectItem value="Auto Loan">Auto Loan</SelectItem>
                      <SelectItem value="Business Loan">Business Loan</SelectItem>
                      <SelectItem value="SME Loan">SME Loan</SelectItem>
                      <SelectItem value="Home Loan">Home Loan</SelectItem>
                      <SelectItem value="CashPlus Loan">CashPlus Loan</SelectItem>
                      <SelectItem value="Auto Loan">Auto Loan</SelectItem>
                      <SelectItem value="AmeenDrive Loan">AmeenDrive Loan</SelectItem>
                      <SelectItem value="Commercial Vehicle Loan">Commercial Vehicle Loan</SelectItem>
                      <SelectItem value="Platinum Credit Card">Platinum Credit Card</SelectItem>
                      <SelectItem value="Classic Credit Card">Classic Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>



          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>Complete history of your loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>LOS ID</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app,index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{app.applicantName}</div>
                            <div className="text-sm text-muted-foreground">{app.branch}</div>
                          </div>
                        </TableCell>
                        <TableCell>{app.loanType}</TableCell>
                        <TableCell className="font-medium">{app.amount}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>{getPriorityBadge(app.priority)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Progress value={app.completionPercentage} className="h-2 w-16" />
                              <span className="text-sm text-muted-foreground">{app.completionPercentage}%</span>
                            </div>
                            {getMissingDocumentsCount(app.documents) > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {getMissingDocumentsCount(app.documents)} docs missing
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(app.submittedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewApplication(app)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                                <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                                  <DialogTitle>Application Details - {selectedApplication?.id}</DialogTitle>
                                  <DialogDescription>
                                    Complete application information and status
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
                                            <span>{selectedApplication.formData.first_name} {selectedApplication.formData.middle_name} {selectedApplication.formData.last_name}</span>
                                            <span className="font-medium">Age:</span>
                                            <span>{selectedApplication.formData.age} years</span>
                                            <span className="font-medium">Monthly Income:</span>
                                            <span>{selectedApplication.formData.monthly_income}</span>
                                            {/* <span className="font-medium">Credit Score:</span>
                                            <span>{selectedApplication.formData.credit_score}</span> */}
                                            <span className="font-medium">Branch:</span>
                                            <span>{selectedApplication.formData.branch_code}</span>
                                            <span className="font-medium">Application Date:</span>
                                            <span>{new Date(selectedApplication.formData.submitted_date).toLocaleDateString()}</span>
                                            <span className="font-medium">Last Updated:</span>
                                            <span>{new Date(selectedApplication.formData.last_updated).toLocaleDateString()}</span>
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
                                              <span>{selectedApplication.loanType}</span>
                                              <span className="font-medium">Amount:</span>
                                              <span className="font-semibold text-green-600">{selectedApplication.amount}</span>
                                              <span className="font-medium">Status:</span>
                                              <span>{getStatusBadge(selectedApplication.formData.status)}</span>
                                              <span className="font-medium">Risk Level:</span>
                                              <span>{getRiskLevelBadge(selectedApplication.formData.risk_level)}</span>
                                              <span className="font-medium">Priority:</span>
                                              <span>{getPriorityBadge(selectedApplication.formData.priority)}</span>
                                              <span className="font-medium">Processing Time:</span>
                                              <span>{selectedApplication.formData.estimated_processing_time}</span>
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
                                              <span className="text-sm font-bold">{selectedApplication.completionPercentage}%</span>
                                            </div>
                                            <Progress value={selectedApplication.completionPercentage} className="w-full" />
                                            <div className="text-xs text-muted-foreground">
                                              {selectedApplication.completionPercentage < 100 
                                                ? `${100 - selectedApplication.completionPercentage}% remaining`
                                                : "Application complete"
                                              }
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Documents Section */}
                                    {/* <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <FileText className="h-5 w-5" />
                                          Documents Status
                                        </CardTitle>
                                        <CardDescription>
                                          Required and optional documents for this application
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid gap-3">
                                          {selectedApplication.documents.map((doc: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                              <div className="flex items-center gap-3">
                                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                  <span className="text-sm font-medium">{doc.name}</span>
                                                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                {getDocumentStatusBadge(doc.status)}
                                                {doc.required && (
                                                  <Badge variant="outline" className="text-xs">Required</Badge>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                          <div className="text-sm text-blue-800">
                                            <strong>Missing Documents:</strong> {getMissingDocumentsCount(selectedApplication.documents)} required documents
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card> */}

                                    {/* Application Timeline */}
                                    {/* <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <Calendar className="h-5 w-5" />
                                          Application Timeline
                                        </CardTitle>
                                        <CardDescription>
                                          Complete timeline of application milestones
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="space-y-4">
                                          {selectedApplication.timeline.map((item: any, index: number) => (
                                            <div key={index} className="flex items-start gap-4">
                                              <div className="flex-shrink-0">
                                                {getTimelineStatusIcon(item.status)}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium">{item.event}</div>
                                                <div className="text-xs text-muted-foreground">{item.date}</div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card> */}

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

                                     {/* Additional Information */}
                                     {selectedApplication.returnReason && (
                                       <Card>
                                         <CardHeader>
                                           <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                                             <AlertTriangle className="h-5 w-5" />
                                             Return Information
                                           </CardTitle>
                                         </CardHeader>
                                         <CardContent>
                                           <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                             <div className="text-sm">
                                               <div className="font-medium text-yellow-800 mb-2">Return Reason:</div>
                                               <p className="text-yellow-700">{selectedApplication.returnReason}</p>
                                             </div>
                                           </div>
                                         </CardContent>
                                       </Card>
                                     )}

                                    {/* Approval Information */}
                                    {selectedApplication.status === "approved" && (
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                                            <CheckCircle className="h-5 w-5" />
                                            Approval Information
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                              <span className="font-medium">Approval Date:</span>
                                              <span className="ml-2">{selectedApplication.approvalDate}</span>
                                            </div>
                                            <div>
                                              <span className="font-medium">Disbursement Date:</span>
                                              <span className="ml-2">{selectedApplication.disbursementDate}</span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )}

                                    {/* Action Buttons */}
                                    {/* <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Actions</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedApplication.status === "draft" && (
                                            <>
                                              <Button onClick={() => handleEditApplication(selectedApplication.id)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Application
                                              </Button>
                                              <Button variant="outline" onClick={() => handleSubmitApplication(selectedApplication.id)}>
                                                <Send className="mr-2 h-4 w-4" />
                                                Submit
                                              </Button>
                                            </>
                                          )}
                                          {selectedApplication.status === "returned_from_spu" && (
                                            <Button onClick={() => handleEditApplication(selectedApplication.id)}>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Revise Application
                                            </Button>
                                          )}
                                          <Button variant="outline" onClick={() => handleCopyApplication(selectedApplication.id)}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy Application
                                          </Button>
                                          {selectedApplication.status === "draft" && (
                                            <Button variant="outline" onClick={() => handleDeleteApplication(selectedApplication.id)}>
                                              <Trash2 className="mr-2 h-4 w-4" />
                                              Delete
                                            </Button>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card> */}

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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Explorer Dialog */}
        <Dialog open={showDocumentExplorer} onOpenChange={setShowDocumentExplorer}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
              <DialogTitle>Document Explorer - {selectedApplication?.id}</DialogTitle>
              <DialogDescription>
                View uploaded documents for this application
              </DialogDescription>
            </DialogHeader>
            {selectedApplication && (
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <DocumentExplorer 
                  losId={selectedApplication.id}
                  applicationType={selectedApplication.loanType}
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Average Processing Time</Label>
                    <span className="font-medium">{applicationStats.avgProcessingTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Total Loan Amount</Label>
                    <span className="font-medium text-green-600">{applicationStats.totalLoanAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Approval Rate</Label>
                    <span className="font-medium text-blue-600">{applicationStats.approvalRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Approved
                    </Label>
                    <span className="font-medium">{applicationStats.approvedApplications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      In Progress
                    </Label>
                    <span className="font-medium">{applicationStats.submittedApplications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      Draft
                    </Label>
                    <span className="font-medium">{applicationStats.draftApplications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Rejected
                    </Label>
                    <span className="font-medium">{applicationStats.rejectedApplications}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Upload and manage your application documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CNIC Copy</span>
                        <Badge className="bg-green-100 text-green-800">Uploaded</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Salary Slip</span>
                        <Badge className="bg-red-100 text-red-800">Missing</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bank Statement</span>
                        <Badge className="bg-green-100 text-green-800">Uploaded</Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Document Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Salary Certificate Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Income Declaration Form
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Bank Statement Format
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Document Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• All documents must be clear and legible</p>
                      <p>• Maximum file size: 5MB per document</p>
                      <p>• Accepted formats: PDF, JPG, PNG</p>
                      <p>• Documents must be recent (within 3 months)</p>
                      <p>• Ensure all pages are included</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
