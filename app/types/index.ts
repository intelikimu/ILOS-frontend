export interface LoanApplication {
  id: string;
  loanNumber: string;
  losanNumber?: string;
  applicantName: string;
  cnic: string;
  loanAmount: number;
  loanType: string;
  status: 'pending' | 'in-verification' | 'approved' | 'rejected' | 'disbursed';
  priority: 'high' | 'medium' | 'low';
  applicationDate: string;
  lastUpdated: string;
  currentStep: number;
  rejectionReason?: string;
  documents: Document[];
  vehicleDetails?: {
    make: string;
    model: string;
    year: number;
    price: number;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  size: string;
}

export interface WorkflowStep {
  id: number;
  name: string;
  status: 'completed' | 'current' | 'pending';
  completedDate?: string;
  assignee?: string;
}