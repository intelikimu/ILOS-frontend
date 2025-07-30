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
  Flag
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
  const { toast } = useToast();



  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to fetch applications...');
      
      // Use the Next.js API route instead of direct backend call
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/applications/recent/pb?t=${timestamp}`, {
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
          id: app.id,
          applicantName: app.applicantName,
          loanType: app.loanType,
          amount: app.amount,
          status: app.status
        });
      });
      
      // Ensure all application types are properly mapped
      const mappedApplications = data.map((app: any, index: number) => ({
        id: app.id || `UBL-2024-${String(index + 1).padStart(6, '0')}`,
        applicantName: app.applicantName || app.applicant_name || 'Unknown Applicant',
        loanType: app.loanType || app.loan_type || 'Personal Loan',
        amount: app.amount || 'PKR 0',
        status: app.status || 'draft',
        priority: app.priority || 'medium',
        submittedDate: app.submittedDate || app.submitted_date || new Date().toISOString(),
        lastUpdate: app.lastUpdate || app.last_update || new Date().toISOString(),
        completionPercentage: app.completionPercentage || app.completion_percentage || 0,
        branch: app.branch || 'Main Branch',
        // Mock data for fields not in database
        creditScore: app.creditScore || Math.floor(Math.random() * 200) + 600,
        monthlyIncome: app.monthlyIncome || `PKR ${Math.floor(Math.random() * 200000) + 50000}`,
        age: app.age || Math.floor(Math.random() * 30) + 25,
        riskLevel: app.riskLevel || ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        estimatedProcessingTime: app.estimatedProcessingTime || `${Math.floor(Math.random() * 5) + 2}-${Math.floor(Math.random() * 3) + 5} days`,
        documents: app.documents || [
          { name: "CNIC Copy", status: "submitted", required: true },
          { name: "Salary Slip", status: "submitted", required: true },
          { name: "Bank Statement", status: "submitted", required: true },
          { name: "Employment Letter", status: "submitted", required: false },
        ],
        timeline: app.timeline || [
          { date: new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0], event: "Application Created", status: "completed" },
          { date: new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0], event: "Documents Uploaded", status: "completed" },
          { date: new Date(app.submittedDate || app.submitted_date).toISOString().split('T')[0], event: "Initial Review", status: "completed" },
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
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
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
                                  onClick={() => setSelectedApplication(app)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Application Details - {selectedApplication?.id}</DialogTitle>
                                  <DialogDescription>
                                    Complete application information and status
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedApplication && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Applicant Information</Label>
                                        <div className="space-y-2 mt-2">
                                          <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
                                          <p><strong>Age:</strong> {selectedApplication.age} years</p>
                                          <p><strong>Monthly Income:</strong> {selectedApplication.monthlyIncome}</p>
                                          <p><strong>Credit Score:</strong> {selectedApplication.creditScore}</p>
                                          <p><strong>Branch:</strong> {selectedApplication.branch}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Loan Details</Label>
                                        <div className="space-y-2 mt-2">
                                          <p><strong>Type:</strong> {selectedApplication.loanType}</p>
                                          <p><strong>Amount:</strong> {selectedApplication.amount}</p>
                                          <p><strong>Status:</strong> {getStatusBadge(selectedApplication.status)}</p>
                                          <p><strong>Risk Level:</strong> {getRiskLevelBadge(selectedApplication.riskLevel)}</p>
                                          <p><strong>Processing Time:</strong> {selectedApplication.estimatedProcessingTime}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="text-sm font-medium">Application Progress</Label>
                                      <div className="mt-2 space-y-2">
                                        <div className="flex items-center gap-4">
                                          <Progress value={selectedApplication.completionPercentage} className="flex-1" />
                                          <span className="text-sm font-medium">{selectedApplication.completionPercentage}%</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="text-sm font-medium">Documents Status</Label>
                                      <div className="mt-2 space-y-2">
                                        {selectedApplication.documents.map((doc: any, index: number) => (
                                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                                            <div className="flex items-center gap-2">
                                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm">{doc.name}</span>
                                              {doc.required && <span className="text-red-500">*</span>}
                                            </div>
                                            {getDocumentStatusBadge(doc.status)}
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="text-sm font-medium">Application Timeline</Label>
                                      <div className="mt-2 space-y-3">
                                        {selectedApplication.timeline.map((item: any, index: number) => (
                                          <div key={index} className="flex items-center gap-3">
                                            {getTimelineStatusIcon(item.status)}
                                            <div className="flex-1">
                                              <div className="text-sm font-medium">{item.event}</div>
                                              <div className="text-xs text-muted-foreground">{item.date}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {selectedApplication.returnReason && (
                                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <Label className="text-sm font-medium text-yellow-800">Return Reason</Label>
                                        <p className="text-sm text-yellow-700 mt-1">{selectedApplication.returnReason}</p>
                                      </div>
                                    )}

                                    <div className="flex gap-2">
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
                                        Copy
                                      </Button>
                                      {selectedApplication.status === "draft" && (
                                        <Button variant="outline" onClick={() => handleDeleteApplication(selectedApplication.id)}>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </Button>
                                      )}
                                    </div>
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
