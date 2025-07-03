export interface LoanApplication {
  id: string;
  loanNumber: string;
  losanNumber?: string;
  applicantName: string;
  cnic: string;
  loanAmount: number;
  loanType: string;
  status: ApplicationStatus;
  priority: 'high' | 'medium' | 'low';
  applicationDate: string;
  lastUpdated: string;
  currentStep: number;
  rejectionReason?: string;
  documents: Document[];
  currentDepartment: Department;
  workflow: WorkflowStep[];
  history: WorkflowHistory[];
  
  // Applicant details
  applicantDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    education: string;
    occupation: string;
    segment: 'Preferred' | 'Mass' | 'SME';
  };
  
  // Contact details
  contactDetails?: {
    email: string;
    phone: string;
    mobilePhone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  
  // Employment details
  employmentDetails?: {
    employerName: string;
    employerAddress: string;
    designation: string;
    employmentDuration: string;
    monthlyIncome: number;
    employmentType: 'salaried' | 'self-employed' | 'business' | 'other';
  };
  
  // Loan details
  loanDetails?: {
    purpose: string;
    tenor: number; // in months
    requestedAmount: number;
    approvedAmount?: number;
    interestRate?: number;
    emi?: number;
    disbursementDate?: string;
    firstInstallmentDate?: string;
  };
  
  // Vehicle details (for auto loans)
  vehicleDetails?: {
    make: string;
    model: string;
    year: number;
    price: number;
    engineNumber?: string;
    chassisNumber?: string;
    registrationNumber?: string;
  };
  
  // Business details (for business loans)
  businessDetails?: {
    businessName: string;
    businessType: string;
    businessAddress: string;
    registrationNumber: string;
    yearEstablished: string;
    annualTurnover: number;
    numberOfEmployees: number;
  };
  
  // SPU verification
  spuVerification?: {
    verifiedBy: string;
    verificationDate: string;
    comments: string;
    missingDocuments: string[];
  };
  
  // COPS verification
  copsVerification?: {
    dataEntryBy: string;
    dataEntryDate: string;
    complianceCheckBy: string;
    complianceCheckDate: string;
    systemEntries: {
      system: string;
      status: 'pending' | 'completed';
      completedBy?: string;
      completedDate?: string;
    }[];
    complianceChecks: {
      check: string;
      status: 'pending' | 'completed' | 'failed';
      completedBy?: string;
      completedDate?: string;
      comments?: string;
    }[];
  };
  
  // EAMVU verification
  eamvuVerification?: {
    assignedAgent: string;
    assignmentDate: string;
    visitDate?: string;
    visitTime?: string;
    locationVerified: boolean;
    businessVerified?: boolean;
    comments: string;
    photos: string[];
    verifiedBy: string;
    verificationDate: string;
  };
  
  // CIU-RRU review
  ciuRruReview?: {
    reviewedBy: string;
    reviewDate: string;
    decision: 'resume' | 'return' | 'reject';
    comments: string;
    pauseReason?: string;
  };
  
  // CIU-AFD verification
  ciuAfdVerification?: {
    verifiedBy: string;
    verificationDate: string;
    fraudChecks: {
      check: string;
      status: 'pending' | 'completed' | 'flagged';
      completedBy?: string;
      completedDate?: string;
      flagReason?: string;
    }[];
    flagged: boolean;
    flagReason?: string;
    comments: string;
  };
  
  // CIU-Acceptance decision
  ciuAcceptanceDecision?: {
    decidedBy: string;
    decisionDate: string;
    decision: 'approved' | 'conditional' | 'rejected';
    conditions?: string[];
    rejectionReason?: string;
    comments: string;
    riskScore: number;
  };
  
  // Disbursement details
  disbursementDetails?: {
    disbursedBy: string;
    disbursementDate: string;
    disbursementAmount: number;
    disbursementAccount: string;
    disbursementMethod: string;
    transactionReference: string;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  required: boolean;
  status: 'pending' | 'verified' | 'rejected' | 'missing';
  uploadDate?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  rejectionReason?: string;
  fileUrl?: string;
  fileSize?: string;
}

export interface WorkflowStep {
  id: number;
  name: string;
  department: Department;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  assignedTo?: string;
  startDate?: string;
  completionDate?: string;
  comments?: string;
}

export interface WorkflowHistory {
  timestamp: string;
  department: Department;
  action: string;
  user: string;
  comments?: string;
}

export type Department = 'pb' | 'spu' | 'cops' | 'eamvu' | 'ciu' | 'rru';

export type ApplicationStatus = 
  // PB statuses
  | 'draft' 
  | 'submitted_to_spu'
  // SPU statuses
  | 'spu_verified'
  | 'spu_returned'
  // COPS statuses
  | 'cops_data_entry'
  | 'cops_compliance_check'
  | 'cops_verified'
  // EAMVU statuses
  | 'eamvu_new'
  | 'eamvu_agent_assigned'
  | 'eamvu_visit_complete'
  | 'eamvu_verified'
  // CIU statuses
  | 'ciu_review'
  | 'ciu_flagged'
  | 'ciu_verified'
  // RRU statuses
  | 'rru_review'
  | 'rru_resumed'
  | 'rru_returned'
  // Final statuses
  | 'approved'
  | 'conditional_approved'
  | 'rejected'
  | 'disbursed';

export type UserRole = 'pb' | 'spu' | 'cops' | 'eamvu' | 'ciu' | 'rru';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
  department?: string;
}