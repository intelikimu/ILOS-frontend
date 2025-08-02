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
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Clock, CheckCircle, AlertTriangle, FileText, Eye, MoreHorizontal, ArrowRight, ArrowLeft, X, Download, ExternalLink, Check, Ban, User, DollarSign, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DocumentExplorer from "@/components/document-explorer"

// // Mock data for SPU dashboard
// const applicationsData = [
//   {
//     id: "UBL-2024-001234",
//     applicantName: "Mubashir",
//     segment: "Preferred",
//     loanType: "Personal Loan",
//     amount: "PKR 2,500,000",
//     status: "submitted_to_spu",
//     lastUpdate: "2024-01-15",
//     assignedTo: "Ahmed Khan",
//     priority: "High",
//     documents: [
//       { id: "doc1", name: "CNIC Copy", status: "verified", required: true },
//       { id: "doc2", name: "Salary Slip", status: "pending", required: true },
//       { id: "doc3", name: "Bank Statement", status: "pending", required: true },
//     ],
//   },
//   {
//     id: "UBL-2024-001235",
//     applicantName: "Abdul Wasay Ali",
//     segment: "Mass",
//     loanType: "Auto Loan",
//     amount: "PKR 800,000",
//     status: "submitted_to_spu",
//     lastUpdate: "2024-01-14",
//     assignedTo: "Unassigned",
//     priority: "Medium",
//     documents: [
//       { id: "doc4", name: "CNIC Copy", status: "verified", required: true },
//       { id: "doc5", name: "Salary Slip", status: "rejected", required: true },
//       { id: "doc6", name: "Bank Statement", status: "verified", required: true },
//       { id: "doc7", name: "Employment Letter", status: "verified", required: true },
//     ],
//   },
//   {
//     id: "UBL-2024-001236",
//     applicantName: "Hassan Raza",
//     segment: "SME",
//     loanType: "Business Loan",
//     amount: "PKR 5,000,000",
//     status: "submitted_to_spu",
//     lastUpdate: "2024-01-13",
//     assignedTo: "Unassigned",
//     priority: "High",
//     documents: [
//       { id: "doc8", name: "CNIC Copy", status: "verified", required: true },
//       { id: "doc9", name: "Business Registration", status: "pending", required: true },
//       { id: "doc10", name: "Bank Statement", status: "pending", required: true },
//       { id: "doc11", name: "Tax Returns", status: "missing", required: true },
//     ],
//   },
// ]

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
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const [showDocumentExplorer, setShowDocumentExplorer] = useState(false)
  const [applicationDocuments, setApplicationDocuments] = useState<any[]>([])
  const [documentVerificationStatus, setDocumentVerificationStatus] = useState<{ [key: string]: { [losId: string]: boolean } }>({})
  const [commentText, setCommentText] = useState("")
  const [existingComments, setExistingComments] = useState<{ [key: string]: string }>({})
  const [allDepartmentComments, setAllDepartmentComments] = useState<{ [key: string]: any[] }>({})
  const { toast } = useToast()



  // Helper function to get application type path for file system
  const getApplicationTypePath = (appType: string) => {
    switch (appType) {
      case 'CashPlus':
        return 'cashplus'
      case 'AutoLoan':
        return 'AutoLoan'
      case 'SMEASAAN':
        return 'smeasaan'
      case 'CommercialVehicle':
        return 'commercialVehicle'
      case 'AmeenDrive':
        return 'ameendrive'
      case 'PlatinumCreditCard':
      case 'ClassicCreditCard':
        return 'creditcard'
      default:
        return 'temp'
    }
  }

  // Function to get dynamic document checklist based on loan type
  const getDocumentChecklist = (application: any) => {
    // If we have form data with documents_checklist, use that
    if (application.formData && application.formData.documents_checklist && application.formData.documents_checklist.length > 0) {
      const checklist = application.formData.documents_checklist[0] // Get the first checklist entry
      
      // Convert the checklist object to an array of document items
      const checklistItems: any[] = []
      
      // Define the field mappings with their display names and required status
      const fieldMappings: { [key: string]: { name: string; required: boolean } } = {
        'cnic': { name: 'CNIC', required: true },
        'photo_1': { name: 'Photo 1', required: true },
        'photo_2': { name: 'Photo 2', required: true },
        'business_ntn': { name: 'Business NTN', required: false },
        'salary_slip_1': { name: 'Salary Slip 1', required: true },
        'salary_slip_2': { name: 'Salary Slip 2', required: true },
        'salary_slip_3': { name: 'Salary Slip 3', required: true },
        'poa_undertaking': { name: 'POA Undertaking', required: false },
        'reference1_cnic': { name: 'Reference 1 CNIC', required: true },
        'reference2_cnic': { name: 'Reference 2 CNIC', required: true },
        'retrieval_letter': { name: 'Retrieval Letter', required: false },
        'calculation_sheet': { name: 'Calculation Sheet', required: true },
        'filer_undertaking': { name: 'Filer Undertaking', required: false },
        'bank_statement_1yr': { name: 'Bank Statement (1 Year)', required: true },
        'reference1_contact': { name: 'Reference 1 Contact', required: true },
        'reference2_contact': { name: 'Reference 2 Contact', required: true },
        'loan_declaration_form': { name: 'Loan Declaration Form', required: true },
        'business_bank_statement': { name: 'Business Bank Statement', required: false },
        'personal_use_undertaking': { name: 'Personal Use Undertaking', required: false },
        'business_letterhead_request': { name: 'Business Letterhead Request', required: false },
        'verification_office_residence': { name: 'Verification Office/Residence', required: true },
        'private_registration_undertaking': { name: 'Private Registration Undertaking', required: false },
        'kfs': { name: 'Key Fact Statement (KFS)', required: true }
      }
      
      // Process each field in the checklist
      Object.keys(checklist).forEach(fieldName => {
        if (fieldName !== 'id' && fieldName !== 'application_id' && fieldName !== 'uploaded_at') {
          const mapping = fieldMappings[fieldName]
          if (mapping) {
            checklistItems.push({
              id: fieldName, // Use the actual field name as ID for API calls
              name: mapping.name,
              required: mapping.required,
              verified: checklist[fieldName] === true,
              rejected: checklist[fieldName] === false,
              uploaded_at: checklist.uploaded_at
            })
          }
        }
      })
      
      return checklistItems
    }
    
    // Fallback to hardcoded list if no checklist data is available
    const baseDocuments = [
      { name: "Verification office/residence document", required: true },
      { name: "CNIC", required: true },
      { name: "Photo 1", required: true },
      { name: "Photo 2", required: true },
      { name: "Reference 1 CNIC", required: true },
      { name: "Reference 1 Contact", required: true },
      { name: "Reference 2 CNIC", required: true },
      { name: "Reference 2 Contact", required: true },
      { name: "Calculation Sheet", required: true },
      { name: "Key Fact Statement (KFS)", required: true },
      { name: "Loan Declaration Form", required: true },
      { name: "Salary Slip 1", required: true },
      { name: "Salary Slip 2", required: true },
      { name: "Salary Slip 3", required: true },
      { name: "Bank Statement (1 Year)", required: true },
      { name: "Business Bank Statement", required: true },
      { name: "Business NTN", required: true },
      { name: "Business Letterhead Request", required: true }
    ]

    // Additional documents specific to loan types
    let additionalDocuments: any[] = []
    
    switch (application.loan_type) {
      case 'CashPlus Loan':
        additionalDocuments = [
          { name: "Retrieval Letter", required: true },
          { name: "Filer Undertaking", required: true },
          { name: "POA Undertaking", required: true },
          { name: "Personal Use Undertaking", required: true },
          { name: "Private Registration Undertaking", required: true }
        ]
        break
      case 'Auto Loan':
        additionalDocuments = [
          { name: "Retrieval Letter", required: true },
          { name: "Filer Undertaking", required: true },
          { name: "POA Undertaking", required: true },
          { name: "Personal Use Undertaking", required: true },
          { name: "Private Registration Undertaking", required: true }
        ]
        break
      case 'Ameen Drive':
        additionalDocuments = [
          { name: "Financial Checklist", required: true },
          { name: "PR Checklist", required: true }
        ]
        break
      case 'SME Asaan':
        // No additional documents for SME Asaan
        break
      case 'Commercial':
        // No additional documents for Commercial
        break
    }

    const allDocuments = [...baseDocuments, ...additionalDocuments]
    
    return allDocuments.map((doc, index) => {
      // Create a mapping from display name to field name for the fallback
      const nameToFieldMap: { [key: string]: string } = {
        'Verification office/residence document': 'verification_office_residence',
        'CNIC': 'cnic',
        'Photo 1': 'photo_1',
        'Photo 2': 'photo_2',
        'Reference 1 CNIC': 'reference1_cnic',
        'Reference 1 Contact': 'reference1_contact',
        'Reference 2 CNIC': 'reference2_cnic',
        'Reference 2 Contact': 'reference2_contact',
        'Calculation Sheet': 'calculation_sheet',
        'Key Fact Statement (KFS)': 'kfs',
        'Loan Declaration Form': 'loan_declaration_form',
        'Salary Slip 1': 'salary_slip_1',
        'Salary Slip 2': 'salary_slip_2',
        'Salary Slip 3': 'salary_slip_3',
        'Bank Statement (1 Year)': 'bank_statement_1yr',
        'Business Bank Statement': 'business_bank_statement',
        'Business NTN': 'business_ntn',
        'Business Letterhead Request': 'business_letterhead_request',
        'Retrieval Letter': 'retrieval_letter',
        'Filer Undertaking': 'filer_undertaking',
        'POA Undertaking': 'poa_undertaking',
        'Personal Use Undertaking': 'personal_use_undertaking',
        'Private Registration Undertaking': 'private_registration_undertaking',
        'Financial Checklist': 'financial_checklist',
        'PR Checklist': 'pr_checklist'
      }
      
      const fieldName = nameToFieldMap[doc.name] || `unknown_${index}`
      const docId = fieldName
      
      const currentLosId = application.los_id?.replace('LOS-', '') || application.id?.split('-')[1]
      return {
        id: docId,
        name: doc.name,
        required: doc.required,
        verified: documentVerificationStatus[docId]?.[currentLosId] || false,
        rejected: documentVerificationStatus[`${docId}-rejected`]?.[currentLosId] || false
      }
    })
  }

  // Function to get all documents for an application (for document explorer)
  const getApplicationDocuments = (application: any) => {
    const appTypePath = getApplicationTypePath(application.application_type)
    const losId = application.los_id?.replace('LOS-', '') || application.id?.split('-')[1]
    
    // Common documents that are typically uploaded
    const commonDocuments = [
      { name: "CNIC Copy.pdf", type: "pdf", category: "Identity" },
      { name: "Salary Slip.pdf", type: "pdf", category: "Income" },
      { name: "Bank Statement.pdf", type: "pdf", category: "Financial" },
      { name: "Employment Letter.pdf", type: "pdf", category: "Employment" },
      { name: "Utility Bill.pdf", type: "pdf", category: "Address" },
      { name: "Property Documents.pdf", type: "pdf", category: "Property" },
      { name: "Vehicle Registration.pdf", type: "pdf", category: "Vehicle" },
      { name: "Business Registration.pdf", type: "pdf", category: "Business" },
      { name: "Tax Returns.pdf", type: "pdf", category: "Tax" },
      { name: "Financial Statements.pdf", type: "pdf", category: "Financial" }
    ]

    // Add application-specific documents based on loan type
    let additionalDocuments: any[] = []
    
    switch (application.loan_type) {
      case 'Auto Loan':
        additionalDocuments = [
          { name: "Vehicle Invoice.pdf", type: "pdf", category: "Vehicle" },
          { name: "Insurance Certificate.pdf", type: "pdf", category: "Insurance" }
        ]
        break
      case 'SME Loan':
        additionalDocuments = [
          { name: "Business Plan.pdf", type: "pdf", category: "Business" },
          { name: "Cash Flow Statement.pdf", type: "pdf", category: "Financial" }
        ]
        break
      case 'CashPlus Loan':
        additionalDocuments = [
          { name: "Income Declaration.pdf", type: "pdf", category: "Income" },
          { name: "Asset Statement.pdf", type: "pdf", category: "Financial" }
        ]
        break
    }

    const allDocuments = [...commonDocuments, ...additionalDocuments]
    
    return allDocuments.map((doc, index) => ({
      id: `doc-${application.id}-${index}`,
      name: doc.name,
      type: doc.type,
      category: doc.category,
      url: `http://localhost:8081/explorer/ilos_loan_application_documents/${appTypePath}/los-${losId}/${doc.name}`,
      status: "uploaded", // Assume uploaded for now
      required: ["CNIC Copy.pdf", "Salary Slip.pdf", "Bank Statement.pdf"].includes(doc.name)
    }))
  }

  // Function to handle viewing all documents
  const handleViewAllDocuments = (application: any) => {
    const documents = getApplicationDocuments(application)
    setApplicationDocuments(documents)
    setShowDocumentsModal(true)
  }

  // Function to handle opening document explorer for an application
  const handleOpenDocumentExplorer = (application: any) => {
    setSelectedApplication(application)
    setShowDocumentExplorer(true)
  }

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

  const handleVerifyDocument = async (docId: string) => {
    if (!selectedApplication) return
    
    try {
      console.log('🔍 Debug: selectedApplication:', selectedApplication)
      console.log('🔍 Debug: selectedApplication.los_id:', selectedApplication.los_id)
      console.log('🔍 Debug: selectedApplication.id:', selectedApplication.id)
      
      const losId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      
      console.log('🔍 Debug: extracted losId:', losId)
      
      // Validate losId
      if (!losId || isNaN(parseInt(losId))) {
        throw new Error(`Invalid LOS ID: ${losId}`)
      }
      
      console.log('🔄 Frontend: Verifying document:', { losId, fieldName: docId, isVerified: true })
      
      const requestBody = {
        losId: losId,
        fieldName: docId,
        isVerified: true
      }
      
      console.log('🔍 Debug: Request body:', requestBody)
      console.log('🔍 Debug: docId (fieldName):', docId)
      
      const response = await fetch('/api/applications/update-checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        console.log('🔍 Debug: Response status:', response.status)
        console.log('🔍 Debug: Response statusText:', response.statusText)
        const errorData = await response.json()
        console.log('🔍 Debug: Error data:', errorData)
        throw new Error(errorData.error || 'Failed to verify document')
      }

      // Update document verification status in frontend
      const currentLosId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      setDocumentVerificationStatus(prev => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          [currentLosId]: true
        },
        [`${docId}-rejected`]: {
          ...prev[`${docId}-rejected`],
          [currentLosId]: false // Clear rejection if it was previously rejected
        }
      }))
      
      toast({
        title: "Document Verified",
        description: "Document has been marked as verified in database",
      })
    } catch (error) {
      console.error('❌ Error verifying document:', error)
      toast({
        title: "Error",
        description: "Failed to verify document. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleRejectDocument = async (docId: string) => {
    if (!selectedApplication) return
    
    try {
      console.log('🔍 Debug: selectedApplication:', selectedApplication)
      console.log('🔍 Debug: selectedApplication.los_id:', selectedApplication.los_id)
      console.log('🔍 Debug: selectedApplication.id:', selectedApplication.id)
      
      const losId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      
      console.log('🔍 Debug: extracted losId:', losId)
      
      // Validate losId
      if (!losId || isNaN(parseInt(losId))) {
        throw new Error(`Invalid LOS ID: ${losId}`)
      }
      
      console.log('🔄 Frontend: Rejecting document:', { losId, fieldName: docId, isVerified: false })
      
      const requestBody = {
        losId: losId,
        fieldName: docId,
        isVerified: false
      }
      
      console.log('🔍 Debug: Request body:', requestBody)
      console.log('🔍 Debug: docId (fieldName):', docId)
      
      const response = await fetch('/api/applications/update-checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        console.log('🔍 Debug: Response status:', response.status)
        console.log('🔍 Debug: Response statusText:', response.statusText)
        const errorData = await response.json()
        console.log('🔍 Debug: Error data:', errorData)
        throw new Error(errorData.error || 'Failed to reject document')
      }

      // Update document verification status in frontend
      const currentLosId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      setDocumentVerificationStatus(prev => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          [currentLosId]: false
        },
        [`${docId}-rejected`]: {
          ...prev[`${docId}-rejected`],
          [currentLosId]: true
        }
      }))
      
      toast({
        title: "Document Rejected",
        description: "Document has been marked as rejected in database",
      })
    } catch (error) {
      console.error('❌ Error rejecting document:', error)
      toast({
        title: "Error",
        description: "Failed to reject document. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Handle comment updates
  const handleUpdateComment = async () => {
    if (!selectedApplication || !commentText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment before saving",
        variant: "destructive"
      })
      return
    }

    try {
      const losId = selectedApplication.los_id.replace('LOS-', '')
      const fieldName = 'spu_comments' // Department-specific comment field
      
      console.log(`🔄 SPU: Updating comment for LOS ID: ${losId}, Field: ${fieldName}`)

      const response = await fetch('/api/applications/update-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId,
          fieldName,
          commentText: commentText.trim()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ SPU: Failed to update comment:', errorData)
        toast({
          title: "Error",
          description: "Failed to save comment. Please try again.",
          variant: "destructive"
        })
        return
      }

      const data = await response.json()
      console.log(`✅ SPU: Comment updated successfully for LOS ID: ${losId}`)

      // Update local state to show the comment
      setExistingComments(prev => ({
        ...prev,
        [losId]: commentText.trim()
      }))

      toast({
        title: "Comment Saved",
        description: "Your comment has been saved successfully",
      })

      // Clear the input field
      setCommentText("")

    } catch (error) {
      console.error('❌ SPU: Error updating comment:', error)
      toast({
        title: "Error",
        description: "Failed to save comment. Please try again.",
        variant: "destructive"
      })
    }
  }

  const fetchAllDepartmentComments = async (losId: string) => {
    try {
      const response = await fetch(`/api/applications/comments/${losId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Error fetching comments:', errorData)
        return
      }

      const data = await response.json()
      console.log('✅ All department comments fetched successfully:', data)

      if (data.success && data.comments) {
        setAllDepartmentComments(prev => ({
          ...prev,
          [losId]: data.comments
        }))
      }

    } catch (error) {
      console.error('❌ Error fetching all department comments:', error)
    }
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

  const handleVerifyApplication = async () => {
    if (!selectedApplication) return
    
    // Check if all required documents are verified using the dynamic checklist
    const documentChecklist = getDocumentChecklist(selectedApplication)
    const requiredDocuments = documentChecklist.filter((doc: any) => doc.required)
    const unverifiedRequired = requiredDocuments.filter((doc: any) => !doc.verified)
    
    if (unverifiedRequired.length > 0) {
      toast({
        title: "Verification Incomplete",
        description: "All required documents must be verified before proceeding",
        variant: "destructive"
      })
      return
    }
    
    try {
      // Update status in backend
      const losId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      console.log('Frontend sending losId:', losId, 'applicationType:', selectedApplication.application_type)
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId: losId,
          status: 'SUBMITTED_TO_COPS',
          applicationType: selectedApplication.application_type
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Backend error response:', errorData)
        throw new Error(`Failed to update status: ${errorData}`)
      }
      
      // Update application status in frontend
      const updatedApplications = spuApplications.map(app => 
        app.id === selectedApplication.id 
          ? { ...app, status: "submitted_to_cops" }
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
      // State is now scoped per application, no need to clear
      setFieldVerification({
        nameVerified: false,
        cnicVerified: false,
        incomeVerified: false,
        addressVerified: false,
        employmentVerified: false
      })
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      })
    }
  }

  const handleReturnApplication = async () => {
    if (!selectedApplication) return
    
    try {
      // Update status in backend
      const losId = selectedApplication.los_id?.replace('LOS-', '') || selectedApplication.id?.split('-')[1]
      console.log('Frontend sending losId:', losId, 'applicationType:', selectedApplication.application_type)
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          losId: losId,
          status: 'SUBMITTED_TO_RRU',
          applicationType: selectedApplication.application_type
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Backend error response:', errorData)
        throw new Error(`Failed to update status: ${errorData}`)
      }
      
      // Update application status in frontend
      const updatedApplications = spuApplications.map(app => 
        app.id === selectedApplication.id 
          ? { ...app, status: "submitted_to_rru" }
          : app
      )
      setSpuApplications(updatedApplications)
      
      toast({
        title: "Application Sent to RRU",
        description: "Application has been sent to Risk Review Unit",
      })
      setSelectedApplication(null)
      setVerificationStep(1)
      setVerificationComments("")
      // State is now scoped per application, no need to clear
      setFieldVerification({
        nameVerified: false,
        cnicVerified: false,
        incomeVerified: false,
        addressVerified: false,
        employmentVerified: false
      })
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      })
    }
  }
  
  const handleViewApplication = async (application: any) => {
    try {
      console.log('🔄 Fetching form data for application:', application.los_id);
      
      // Extract the numeric part from los_id (e.g., "LOS-18" -> "18")
      console.log(application);
      const losIdstr = application.los_id.replace('LOS-', '');
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
      
      // Fetch all department comments for this application
      await fetchAllDepartmentComments(losIdstr);
      
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
        {/* <TabsTrigger value="verified">Verified</TabsTrigger>
        <TabsTrigger value="returned">Returned</TabsTrigger> */}
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
                                   Complete application information for SPU verification
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

                                           {/* Comments Section */}
                                           <div>
                                             <h4 className="font-semibold mb-3 text-purple-600">All Department Comments</h4>
                                             {allDepartmentComments[selectedApplication.los_id.replace('LOS-', '')] && 
                                              allDepartmentComments[selectedApplication.los_id.replace('LOS-', '')].length > 0 ? (
                                               <div className="space-y-3">
                                                 {allDepartmentComments[selectedApplication.los_id.replace('LOS-', '')].map((comment: any, index: number) => (
                                                   <div key={index} className={`border rounded-lg p-3 ${
                                                     comment.department === 'PB' ? 'bg-blue-50 border-blue-200' :
                                                     comment.department === 'SPU' ? 'bg-green-50 border-green-200' :
                                                     comment.department === 'COPS' ? 'bg-purple-50 border-purple-200' :
                                                     comment.department === 'EAMVU' ? 'bg-orange-50 border-orange-200' :
                                                     comment.department === 'CIU' ? 'bg-red-50 border-red-200' :
                                                     comment.department === 'RRU' ? 'bg-indigo-50 border-indigo-200' :
                                                     'bg-gray-50 border-gray-200'
                                                   }`}>
                                                     <div className="flex justify-between items-start mb-2">
                                                       <span className={`text-xs font-medium px-2 py-1 rounded ${
                                                         comment.department === 'PB' ? 'bg-blue-100 text-blue-800' :
                                                         comment.department === 'SPU' ? 'bg-green-100 text-green-800' :
                                                         comment.department === 'COPS' ? 'bg-purple-100 text-purple-800' :
                                                         comment.department === 'EAMVU' ? 'bg-orange-100 text-orange-800' :
                                                         comment.department === 'CIU' ? 'bg-red-100 text-red-800' :
                                                         comment.department === 'RRU' ? 'bg-indigo-100 text-indigo-800' :
                                                         'bg-gray-100 text-gray-800'
                                                       }`}>
                                                         {comment.department}
                                                       </span>
                                                     </div>
                                                     <p className="text-sm text-gray-700">
                                                       {comment.comment_text}
                                                     </p>
                                                   </div>
                                                 ))}
                                               </div>
                                             ) : (
                                               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                                 <p className="text-sm text-gray-500 italic">
                                                   No comments from any department yet
                                                 </p>
                                               </div>
                                             )}
                                           </div>

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

                                   <div className="flex gap-2">
                                     <Button
                                       variant="outline"
                                       onClick={() => handleOpenDocumentExplorer(selectedApplication)}
                                     >
                                       <FileText className="mr-2 h-4 w-4" />
                                       View Documents
                                     </Button>
                                     <Button
                                       variant="outline"
                                       onClick={() => {
                                         setSelectedApplication(null);
                                         setVerificationStep(1);
                                       }}
                                     >
                                       Close
                                     </Button>
                                     <Button
                                       onClick={() => {
                                         setVerificationStep(1);
                                       }}
                                     >
                                       Start Verification
                                     </Button>
                                   </div>
                                 </div>
                               )}
                             </DialogContent>
                           </Dialog>
                           
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
                             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Application Verification</DialogTitle>
                              <DialogDescription>
                                {selectedApplication
                                  ? `Verify application for ${selectedApplication.applicant_name}`
                                  : "Loading..."}
                              </DialogDescription>
                            </DialogHeader>

                            {/* Verification Steps */}
                            <div className="py-4 px-2">
                                                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      "bg-blue-100 text-blue-600"
                                    }`}
                                  >
                                    1
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">Document Verification</p>
                                    <p className="text-sm text-muted-foreground">
                                      Check all required documents
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
                                      {/* Bulk Action Buttons */}
                                      <div className="flex gap-2 mb-4">
                                        <Button
                                          variant="default"
                                          size="sm"
                                          onClick={() => {
                                            const documentChecklist = getDocumentChecklist(selectedApplication);
                                            documentChecklist.forEach((doc: any) => {
                                              handleVerifyDocument(doc.id);
                                            });
                                          }}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <Check className="h-4 w-4 mr-1" />
                                          Verify All
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() => {
                                            const documentChecklist = getDocumentChecklist(selectedApplication);
                                            documentChecklist.forEach((doc: any) => {
                                              handleRejectDocument(doc.id);
                                            });
                                          }}
                                        >
                                          <Ban className="h-4 w-4 mr-1" />
                                          Reject All
                                        </Button>
                                      </div>
                                      
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
                                          {getDocumentChecklist(selectedApplication).map((doc: any) => (
                                            <TableRow key={doc.id}>
                                              <TableCell>{doc.name}</TableCell>
                                              <TableCell>
                                                <Badge variant={doc.verified ? "default" : doc.rejected ? "destructive" : "secondary"}>
                                                  {doc.verified ? "Verified" : doc.rejected ? "Rejected" : "Pending"}
                                                </Badge>
                                              </TableCell>
                                              <TableCell>{doc.required ? "Yes" : "No"}</TableCell>
                                              <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                  <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleVerifyDocument(doc.id)}
                                                    disabled={doc.verified}
                                                    title="Verify Document"
                                                  >
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Verify
                                                  </Button>
                                                  <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleRejectDocument(doc.id)}
                                                    disabled={doc.rejected}
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

                                  {/* Notes Section */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Notes</CardTitle>
                                      <CardDescription>
                                        Add comments and notes about this application
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        {/* Existing Comments Display */}
                                        {selectedApplication && existingComments[selectedApplication.los_id.replace('LOS-', '')] && (
                                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <h4 className="font-medium text-blue-800 mb-2">Previous Comments:</h4>
                                            <p className="text-sm text-blue-700">
                                              {existingComments[selectedApplication.los_id.replace('LOS-', '')]}
                                            </p>
                                          </div>
                                        )}
                                        
                                        {/* Comment Input */}
                                        <div className="space-y-2">
                                          <Label htmlFor="comment">Add Comment</Label>
                                          <Textarea 
                                            id="comment"
                                            placeholder="Add any notes or comments about the verification process..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            rows={4}
                                          />
                                        </div>
                                        
                                        {/* Save Comment Button */}
                                        <Button 
                                          onClick={handleUpdateComment}
                                          disabled={!commentText.trim()}
                                          className="w-full"
                                        >
                                          Save Comment
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <div className="flex justify-between pb-4">
                                    <Button
                                      variant="outline"
                                      onClick={() => setSelectedApplication(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <div className="space-x-2">
                                      <Button variant="destructive" onClick={handleReturnApplication}>
                                        Send to RRU
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
                         </div>
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
                 onClick={() => setShowDocumentViewer(false)} >
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

             {/* Document Explorer Modal */}
       <Dialog open={showDocumentExplorer} onOpenChange={setShowDocumentExplorer}>
         <DialogContent className="max-w-6xl max-h-[90vh]">
           <DialogHeader>
             <DialogTitle>Document Explorer - {selectedApplication?.los_id}</DialogTitle>
             <DialogDescription>
               Browse and view all documents uploaded by Personal Banking for this application
             </DialogDescription>
           </DialogHeader>
           
           {selectedApplication && (
             <div className="space-y-4">
               <div className="flex items-center justify-between mb-4">
                 <div>
                   <h3 className="font-medium">Application: {selectedApplication.applicant_name}</h3>
                   <p className="text-sm text-muted-foreground">
                     LOS ID: {selectedApplication.los_id} | Type: {selectedApplication.application_type}
                   </p>
                 </div>
                 <Button
                   variant="outline"
                   onClick={() => setShowDocumentExplorer(false)}
                 >
                   Close
                 </Button>
               </div>
               
                             <DocumentExplorer 
                losId={selectedApplication?.los_id}
                applicationType={selectedApplication?.application_type}
                onFileSelect={(file) => {
                  // Handle file selection if needed
                  console.log('Selected file:', file)
                }}
              />
             </div>
           )}
         </DialogContent>
       </Dialog>
    </div>
  );
  }
