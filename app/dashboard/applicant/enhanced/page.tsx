"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import { DocumentUploadStep } from "@/components/intake/document-upload-step"
import { InteractiveChecklistStep } from "@/components/intake/interactive-checklist-step"
import { ReviewSubmitStep } from "@/components/intake/review-submit-step"
import { OdemOriginationStep } from "@/components/intake/odem-origination-step"
import { ApplicationLoanStep } from "@/components/intake/application-loan-step"
import { PersonalDetailsStep } from "@/components/intake/personal-details-step"
import { AddressContactStep } from "@/components/intake/address-contact-step"
import { EmploymentStep } from "@/components/intake/employment-step"
import { IncomeReferenceStep } from "@/components/intake/income-reference-step"
import { VerificationStep } from "@/components/intake/verification-step"
import { useToast } from "@/hooks/use-toast"

export interface ApplicantData {
  // Basic Info
  cnic: string
  name: string
  fatherName: string
  dob: string
  cbsId: string
  segment: string
  address: string
  phone: string
  employmentType: string
  company: string
  designation: string
  monthlyIncome: string
  loanType: string
  loanAmount: string
  tenure: string
  channel: string
  additionalNotes: string

  // ODEM & Origination
  idType: string
  quickDeApplicationId: string
  referenceNumber: string
  productSubClass: string
  productType: string
  programType: string
  idNo: string
  campaignCode: string
  originCity: string
  referralBranch: string
  trackingReferenceNo: string
  sourceOfInformation: string
  applicationDate: string

  // Application Type & Loan
  readerPrintingOption: string
  preferredMailingAddress: string
  referralCardNo: string
  pbbimEmployeeNo: string
  propertyFinalize: boolean
  cardDestination: string
  promoCode: string
  soEmployeeNo: string
  paymentMode: string
  referredByDealer: boolean
  natureOfTelephone: string
  smEmployeeNo: string
  desiredFinancing: string
  currency: string
  tenureUnit: string
  purpose: string

  // Personal Details
  title: string
  firstName: string
  lastName: string
  newNic: string
  oldNic: string
  issueDate: string
  expiryDate: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  noOfChildren: string
  noOfDependents: string
  fatherHusbandName: string
  fatherHusbandCnic: string
  motherMaidenName: string
  passportNo: string
  education: string
  nationality: string
  ntn: string
  perinfoP: string
  publicFigure: boolean

  // Address & Contact
  currentAddress: {
    houseNo: string
    street: string
    area: string
    city: string
    district: string
    tehsil: string
    state: string
    postCode: string
    country: string
    residenceType: string
    accommodationType: string
    nearestLandmark: string
    residingSince: string
    livingInCity: string
    monthlyRent: string
  }
  permanentAddress: {
    sameAsCurrent: boolean
    houseNo: string
    street: string
    city: string
    tehsil: string
    address4: string
    state: string
    postCode: string
    country: string
  }
  phoneEmail: {
    phoneCurrent: string
    phonePermanent: string
    mobile: string
    email: string
  }

  // Employment
  currentEmployment: {
    occupationCategory: string
    employmentStatus: string
    industry: string
    department: string
    typeOfBusiness: string
    status: string
    occupationProfession: string
    employmentSegment: string
    natureOfBusiness: string
    gradeLevel: string
    sharesHoldInBusiness: string
    companyName: string
    otherCompanyName: string
    designation: string
    dateOfJoining: string
    sourceOfBusiness: string
    empNo: string
    familyBusiness: boolean
    experience: string
    noOfEmployees: string
    name: string
  }
  previousEmployment: {
    employmentStatus: string
    others: string
    occupationCategory: string
    yearsExperience: string
    professional: string
    employmentSegment: string
    monthsExperience: string
    companyName: string
    startDate: string
    phone: string
    otherCompanyName: string
    previousEndDate: string
  }

  // Income & References
  customerIncome: {
    currency: string
    grossIncome: string
    otherIncome: string
    totalIncome: string
  }
  reference1: {
    title: string
    firstName: string
    middleName: string
    lastName: string
    gender: string
    relationship: string
    newNic: string
    contact: {
      houseNo: string
      street: string
      address: string
      address4: string
      city: string
      state: string
      tehsil: string
      nearestLandmark: string
      country: string
      phoneResidence: string
      phoneOffice: string
      mobileNo: string
      email: string
    }
  }
  reference2: {
    title: string
    firstName: string
    middleName: string
    lastName: string
    gender: string
    relationship: string
    newNic: string
    contact: {
      houseNo: string
      street: string
      address: string
      address4: string
      city: string
      state: string
      tehsil: string
      nearestLandmark: string
      country: string
      phoneResidence: string
      phoneOffice: string
      mobileNo: string
      email: string
    }
  }
}

export interface DocumentData {
  [key: string]: {
    file?: File
    parsed?: any
    status: "pending" | "uploading" | "parsing" | "completed" | "error" | "skipped"
    skipReason?: string
    confidence?: number
  }
}

export interface ChecklistItem {
  id: string
  title: string
  description: string
  required: boolean
  documentType?: string
  status: "pending" | "completed" | "skipped" | "error"
  conditional?: {
    field: string
    value: string | string[]
  }
}

const steps = [
  { id: 1, title: "ODEM & Origination", description: "Application identification and origination details" },
  { id: 2, title: "Application & Loan", description: "Application type and loan requirements" },
  { id: 3, title: "Personal Details", description: "Comprehensive personal information" },
  { id: 4, title: "Address & Contact", description: "Current and permanent address details" },
  { id: 5, title: "Employment", description: "Current and previous employment information" },
  { id: 6, title: "Income & References", description: "Income details and reference information" },
  { id: 7, title: "Document Upload", description: "Upload and parse required documents" },
  { id: 8, title: "Verification Checklist", description: "Review and verify all requirements" },
  { id: 9, title: "Final Verification", description: "System verification and validation" },
  { id: 10, title: "Review & Submit", description: "Final review and submission" },
]

const initialChecklistItems: ChecklistItem[] = [
  {
    id: "cnic-copy",
    title: "CNIC Copy",
    description: "Front and back copy of valid CNIC",
    required: true,
    documentType: "cnic",
    status: "pending",
  },
  {
    id: "salary-slip",
    title: "Salary Slip",
    description: "Latest 3 months salary slips",
    required: true,
    documentType: "salary-slip",
    status: "pending",
    conditional: {
      field: "employmentType",
      value: ["salaried"],
    },
  },
  {
    id: "bank-statement",
    title: "Bank Statement",
    description: "3-month bank statement",
    required: true,
    documentType: "bank-statement",
    status: "pending",
  },
  {
    id: "business-registration",
    title: "Business Registration",
    description: "Business registration certificate",
    required: true,
    documentType: "business-registration",
    status: "pending",
    conditional: {
      field: "employmentType",
      value: ["self-employed", "business"],
    },
  },
  {
    id: "income-certificate",
    title: "Income Certificate",
    description: "Income verification from employer",
    required: true,
    documentType: "income-certificate",
    status: "pending",
    conditional: {
      field: "employmentType",
      value: ["salaried"],
    },
  },
  {
    id: "property-documents",
    title: "Property Documents",
    description: "Property ownership documents (if applicable)",
    required: false,
    status: "pending",
    conditional: {
      field: "loanType",
      value: ["home", "property"],
    },
  },
  {
    id: "vehicle-documents",
    title: "Vehicle Documents",
    description: "Vehicle registration and insurance documents",
    required: true,
    status: "pending",
    conditional: {
      field: "loanType",
      value: ["auto"],
    },
  },
  {
    id: "guarantor-documents",
    title: "Guarantor Documents",
    description: "Guarantor CNIC and income proof",
    required: true,
    status: "pending",
    conditional: {
      field: "loanAmount",
      value: "5000000", // If loan amount > 5M
    },
  },
]

export default function EnhancedApplicantIntakePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicantData, setApplicantData] = useState<ApplicantData>({
    currentAddress: {},
    permanentAddress: { sameAsCurrent: false },
    phoneEmail: {},
    currentEmployment: { familyBusiness: false },
    previousEmployment: {},
    customerIncome: {},
    reference1: { contact: {} },
    reference2: { contact: {} },
  } as ApplicantData)
  const [documentData, setDocumentData] = useState<DocumentData>({})
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialChecklistItems)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Calculate progress
  const progress = (currentStep / steps.length) * 100

  // Filter checklist items based on conditional logic
  const getVisibleChecklistItems = () => {
    return checklistItems.filter((item) => {
      if (!item.conditional) return true

      const fieldValue = applicantData[item.conditional.field as keyof ApplicantData]
      if (!fieldValue) return false

      if (Array.isArray(item.conditional.value)) {
        return item.conditional.value.includes(fieldValue as string)
      }

      // Special handling for loan amount comparison
      if (item.conditional.field === "loanAmount") {
        const loanAmount = Number.parseInt(applicantData.loanAmount || "0")
        const threshold = Number.parseInt(item.conditional.value)
        return loanAmount > threshold
      }

      return fieldValue === item.conditional.value
    })
  }

  // Update checklist when documents change
  useEffect(() => {
    const updatedItems = checklistItems.map((item) => {
      if (item.documentType && documentData[item.documentType]) {
        const docStatus = documentData[item.documentType].status
        if (docStatus === "completed") {
          return { ...item, status: "completed" as const }
        } else if (docStatus === "skipped") {
          return { ...item, status: "skipped" as const }
        } else if (docStatus === "error") {
          return { ...item, status: "error" as const }
        }
      }
      return item
    })
    setChecklistItems(updatedItems)
  }, [documentData])

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: // ODEM & Origination
        return applicantData.idType && applicantData.productType && applicantData.applicationDate
      case 2: // Application & Loan
        return applicantData.desiredFinancing && applicantData.currency && applicantData.purpose
      case 3: // Personal Details
        return applicantData.firstName && applicantData.newNic && applicantData.dateOfBirth
      case 4: // Address & Contact
        return (
          applicantData.currentAddress?.houseNo &&
          applicantData.currentAddress?.city &&
          applicantData.phoneEmail?.mobile
        )
      case 5: // Employment
        return (
          applicantData.currentEmployment?.occupationCategory &&
          applicantData.currentEmployment?.companyName &&
          applicantData.currentEmployment?.designation
        )
      case 6: // Income & References
        return (
          applicantData.customerIncome?.grossIncome &&
          applicantData.reference1?.firstName &&
          applicantData.reference1?.newNic
        )
      case 7: // Document Upload
        const visibleItems = getVisibleChecklistItems()
        const requiredItems = visibleItems.filter((item) => item.required)
        const completedOrSkipped = requiredItems.filter(
          (item) => item.status === "completed" || item.status === "skipped",
        )
        return completedOrSkipped.length === requiredItems.length
      case 8: // Verification Checklist
        return getVisibleChecklistItems().every(
          (item) => !item.required || item.status === "completed" || item.status === "skipped",
        )
      case 9: // Final Verification
        return true // Auto-validation step
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceedToNext() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Application Submitted Successfully",
        description: "LOS ID: UBL-2024-001240 has been created and submitted for processing.",
      })
      setIsLoading(false)
      // Redirect to case tracker or dashboard
    }, 2000)
  }

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    } else if (stepNumber === currentStep) {
      return <Clock className="h-5 w-5 text-blue-500" />
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Comprehensive Loan Application</h2>
        <p className="text-muted-foreground">
          Complete multi-step loan application with integrated document processing
        </p>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Application Progress</CardTitle>
            <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.slice(0, 5).map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 bg-white mb-2">
                  {getStepIcon(step.id)}
                </div>
                <div className="text-xs font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground hidden md:block">{step.description}</div>
              </div>
            ))}
          </div>
          {steps.length > 5 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t">
              {steps.slice(5).map((step, index) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 bg-white mb-2">
                    {getStepIcon(step.id)}
                  </div>
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground hidden md:block">{step.description}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {currentStep === 1 && <OdemOriginationStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 2 && <ApplicationLoanStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 3 && <PersonalDetailsStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 4 && <AddressContactStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 5 && <EmploymentStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 6 && <IncomeReferenceStep data={applicantData} onChange={setApplicantData} />}

        {currentStep === 7 && (
          <DocumentUploadStep
            applicantData={applicantData}
            documentData={documentData}
            onDocumentChange={setDocumentData}
            checklistItems={getVisibleChecklistItems()}
          />
        )}

        {currentStep === 8 && (
          <InteractiveChecklistStep
            items={getVisibleChecklistItems()}
            documentData={documentData}
            onItemUpdate={(itemId, updates) => {
              setChecklistItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)))
            }}
          />
        )}

        {currentStep === 9 && <VerificationStep applicantData={applicantData} />}

        {currentStep === 10 && (
          <ReviewSubmitStep
            applicantData={applicantData}
            documentData={documentData}
            checklistItems={getVisibleChecklistItems()}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
            </div>

            <div className="flex gap-2">
              {currentStep < steps.length ? (
                <Button onClick={handleNext} disabled={!canProceedToNext()}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canProceedToNext() || isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
