import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the base URL for the backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    console.log('🔄 Frontend: Starting to fetch applications...');
    console.log('🔄 Frontend: Backend URL:', `${baseUrl}/api/applications/recent/pb`);
    
    // Make request to backend
    const response = await fetch(`${baseUrl}/api/applications/recent/pb`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 Frontend: Backend response status:', response.status);

    if (!response.ok) {
      console.error('❌ Frontend: Backend responded with status:', response.status);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Frontend: Backend returned applications:', data);
    console.log('✅ Frontend: Number of applications received:', data.length);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Frontend: Error fetching recent applications:', error);
    
    // Return fallback data if backend is not available
    console.log('Returning fallback data due to backend error');
    return NextResponse.json([
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
  }
} 