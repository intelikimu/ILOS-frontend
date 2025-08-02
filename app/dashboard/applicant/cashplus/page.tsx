"use client"
import React, { useEffect, useRef, useState } from 'react';
import { CashplusApplicationTypeForm } from '@/components/forms/Cashplus/CashplusApplicationTypeForm';
import { CashplusPersonalInfoForm } from '@/components/forms/Cashplus/CashplusPersonalInfoForm';
import { CashplusEmploymentInfoForm } from '@/components/forms/Cashplus/CashplusEmploymentInfoForm';
import { CashplusIncomeDetailsForm } from '@/components/forms/Cashplus/CashplusIncomeDetailsForm';
import { CashplusBankingDetailsForm } from '@/components/forms/Cashplus/CashplusBankingDetailsForm';
import { CashplusLoanPreferenceForm } from '@/components/forms/Cashplus/CashplusLoanPreferenceForm';
import { CashplusExposureTable } from '@/components/forms/Cashplus/CashplusExposureTable';
import { CashplusReferencesForm } from '@/components/forms/Cashplus/CashplusReferencesForm';
import { CashplusApplicantDeclarationForm } from '@/components/forms/Cashplus/CashplusApplicantDeclarationForm';
import { CashplusBankUseOnlyForm } from '@/components/forms/Cashplus/CashplusBankUseOnlyForm';
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// 1. Define your section key type
type SectionKey =
  | "type"
  | "personal"
  | "employment"
  | "income"
  | "banking"
  | "loan"
  | "exposure"
  | "references"
  | "declaration"
  | "bankUse";

const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "type", label: "Application Type" },
  { key: "personal", label: "Personal Info" },
  { key: "employment", label: "Employment Info" },
  { key: "income", label: "Income Details" },
  { key: "banking", label: "Banking" },
  { key: "loan", label: "Loan Pref." },
  { key: "exposure", label: "Exposure" },
  { key: "references", label: "References" },
  { key: "declaration", label: "Declaration" },
  { key: "bankUse", label: "Bank Use Only" },
];

// Dummy filled-check logic: replace with real check per your state/form validation!
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => ({
  type: !!customerData?.applicationType,
  personal: !!customerData?.personalDetails?.fullName,
  employment: !!customerData?.employmentDetails?.designation,
  income: !!customerData?.incomeDetails,
  banking: !!customerData?.clientBanks,
  loan: !!customerData?.loanPreference,
  exposure: !!customerData?.exposure, // update as needed
  references: !!customerData?.referenceContacts,
  declaration: !!customerData?.declaration,
  bankUse: !!customerData?.bankUse,
});

export default function CashplusPage() {
  const { customerData } = useCustomer();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get base URL for API calls
  const getBaseUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      return process.env.NEXT_PUBLIC_API_URL || 'https://ilos-backend.vercel.app';
    }
    return 'http://localhost:5000';
  };

  // 2. Section refs for scroll with correct typing
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    type: useRef<HTMLDivElement>(null),
    personal: useRef<HTMLDivElement>(null),
    employment: useRef<HTMLDivElement>(null),
    income: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    loan: useRef<HTMLDivElement>(null),
    exposure: useRef<HTMLDivElement>(null),
    references: useRef<HTMLDivElement>(null),
    declaration: useRef<HTMLDivElement>(null),
    bankUse: useRef<HTMLDivElement>(null),
  };

  // Which section is currently viewed/highlighted (optional)
  const [currentSection, setCurrentSection] = useState<SectionKey>("type");

  // Section filled check (replace with your real logic for each section)
  const sectionFilled = useSectionFilled(customerData);

  // Function to collect form data from all components
  const collectFormData = () => {
    // Get all form elements within the page
    const formElements = document.querySelectorAll('input, select, textarea');
    const formData: Record<string, any> = {};
    
    // Add customer ID and basic info
    formData.customer_id = customerData?.customerId || '';
    formData.cnic = customerData?.personalDetails?.cnic || customerData?.cnic || '';
    
    // Collect form field values
    formElements.forEach(element => {
      const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      if (input.name) {
        if (input.type === 'radio' || input.type === 'checkbox') {
          const radioInput = input as HTMLInputElement;
          if (radioInput.checked) {
            formData[input.name] = radioInput.value || 'on';
          }
        } else {
          formData[input.name] = input.value;
        }
      }
    });
    
    // Collect exposure tables data
    const exposureTables = document.querySelectorAll('.exposure-table');
    const creditCardsClean: any[] = [];
    const creditCardsSecured: any[] = [];
    const personalLoansExisting: any[] = [];
    const otherFacilities: any[] = [];
    const personalLoansUnderProcess: any[] = [];
    const references: any[] = [];
    
    // Process each exposure table
    exposureTables.forEach((table, tableIndex) => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Skip header row
        
        const inputs = row.querySelectorAll('input, select');
        if (inputs.length === 0) return;
        
        const rowData: Record<string, any> = {};
        inputs.forEach(input => {
          const element = input as HTMLInputElement | HTMLSelectElement;
          if (element.name) {
            rowData[element.name.split('-')[0]] = element.value;
          }
        });
        
        // Skip empty rows
        const isEmpty = Object.values(rowData).every(value => !value);
        if (isEmpty) return;
        
        // Add to appropriate array based on table index
        switch(tableIndex) {
          case 0: creditCardsClean.push(rowData); break;
          case 1: creditCardsSecured.push(rowData); break;
          case 2: personalLoansExisting.push(rowData); break;
          case 3: otherFacilities.push(rowData); break;
          case 4: personalLoansUnderProcess.push(rowData); break;
        }
      });
    });
    
    // Add reference data
    const referenceElements = document.querySelectorAll('.reference-section');
    referenceElements.forEach((refSection, refIndex) => {
      const inputs = refSection.querySelectorAll('input, select');
      const refData: Record<string, any> = { reference_no: refIndex + 1 };
      
      inputs.forEach(input => {
        const element = input as HTMLInputElement | HTMLSelectElement;
        if (element.name && element.name.startsWith('ref')) {
          refData[element.name.replace('ref', '')] = element.value;
        }
      });
      
      // Skip empty references
      const isEmpty = Object.values(refData).every((value, index) => index === 0 || !value);
      if (!isEmpty) {
        references.push(refData);
      }
    });
    
    // Add child tables to main form data
    formData.credit_cards_clean = creditCardsClean;
    formData.credit_cards_secured = creditCardsSecured;
    formData.personal_loans_existing = personalLoansExisting;
    formData.other_facilities = otherFacilities;
    formData.personal_loans_under_process = personalLoansUnderProcess;
    formData.references = references;
    
    return formData;
  };

  // Submit form data to the API
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Format data from our context properly
      if (!customerData) throw new Error("No customer data found");
      if (!customerData.customerId) throw new Error("No customer ID found - please try again");

      // Transform our context data into the expected backend structure
      const formData = {
        // Customer identification
        customer_id: customerData.customerId,
        cnic: customerData.personalDetails?.cnic || customerData.cnic || '',
        
        // Loan preference fields
        loan_type: customerData.loanPreference?.loanType || '',
        amount_requested: customerData.loanPreference?.amountRequested || '',
        min_amount_acceptable: customerData.loanPreference?.minAmountAcceptable || '',
        max_affordable_installment: customerData.loanPreference?.maxAffordableInstallment || '',
        tenure: customerData.loanPreference?.tenure || '',
        
        // Application type fields - Convert string to boolean
        is_ubl_existing_customer: applicationTypeToBoolean(customerData.applicationDetails?.ublExistingCustomer),
        branch: customerData.applicationDetails?.branch || '',
        account: customerData.applicationDetails?.account || '',
        purpose_of_loan: customerData.applicationDetails?.loanPurpose || '',
        purpose_of_loan_other: customerData.applicationDetails?.loanPurposeOther || '',
        
        // Personal details fields
        title: customerData.personalDetails?.title || '',
        first_name: customerData.personalDetails?.firstName || '',
        middle_name: customerData.personalDetails?.middleName || '',
        last_name: customerData.personalDetails?.lastName || '',
        date_of_birth: customerData.personalDetails?.dateOfBirth || '',
        gender: customerData.personalDetails?.gender || '',
        marital_status: customerData.personalDetails?.maritalStatus || '',
        dependants: customerData.personalDetails?.numberOfDependents || '',
        education_qualification: customerData.personalDetails?.education || '',
        education_qualification_other: customerData.personalDetails?.educationOther || '',
        father_or_husband_name: customerData.personalDetails?.fatherName || '',
        mother_maiden_name: customerData.personalDetails?.motherName || '',
        mobile: customerData.personalDetails?.mobileNumber || '',
        ntn: customerData.personalDetails?.ntn || '',
        
        // Employment status
        employment_status: customerData.employmentDetails?.employmentStatus || '',
        
        // Address fields
        address: customerData.addressDetails?.currentAddress?.fullAddress || '',
        nearest_landmark: customerData.addressDetails?.currentAddress?.nearestLandmark || '',
        city: customerData.addressDetails?.currentAddress?.city || '',
        postal_code: customerData.addressDetails?.currentAddress?.postalCode || '',
        residing_since: customerData.addressDetails?.currentAddress?.yearsAtAddress || '',
        accommodation_type: customerData.addressDetails?.currentAddress?.residentialStatus || '',
        accommodation_type_other: customerData.addressDetails?.currentAddress?.residentialStatusOther || '',
        monthly_rent: customerData.addressDetails?.currentAddress?.monthlyRent || '',
        tel_current: customerData.addressDetails?.currentAddress?.telephone || '',
        
        // Permanent address
        permanent_house_no: customerData.addressDetails?.permanentAddress?.houseNo || '',
        permanent_street: customerData.addressDetails?.permanentAddress?.street || '',
        permanent_city: customerData.addressDetails?.permanentAddress?.city || '',
        permanent_postal_code: customerData.addressDetails?.permanentAddress?.postalCode || '',
        tel_permanent: customerData.addressDetails?.permanentAddress?.telephone || '',
        
        // Contact details
        preferred_mailing_address: customerData.contactDetails?.preferredMailingAddress || '',
        mobile_type: customerData.contactDetails?.mobileType || '',
        other_contact: customerData.contactDetails?.otherContact || '',
        
        // Employment details
        company_name: customerData.employmentDetails?.companyName || '',
        company_type: customerData.employmentDetails?.companyType || '',
        company_type_other: customerData.employmentDetails?.companyTypeOther || '',
        department: customerData.employmentDetails?.department || '',
        designation: customerData.employmentDetails?.designation || '',
        grade_level: customerData.employmentDetails?.grade || '',
        exp_current_years: customerData.employmentDetails?.currentExperience || '',
        prev_employer_name: customerData.employmentDetails?.previousEmployer || '',
        exp_prev_years: customerData.employmentDetails?.previousExperience || '',
        
        // Office address
        office_house_no: customerData.employmentDetails?.officeAddress?.houseNo || '',
        office_street: customerData.employmentDetails?.officeAddress?.street || '',
        office_area: customerData.employmentDetails?.officeAddress?.tehsil || '',
        office_landmark: customerData.employmentDetails?.officeAddress?.nearestLandmark || '',
        office_city: customerData.employmentDetails?.officeAddress?.city || '',
        office_postal_code: customerData.employmentDetails?.officeAddress?.postalCode || '',
        office_fax: customerData.employmentDetails?.officeAddress?.fax || '',
        office_tel1: customerData.employmentDetails?.officeAddress?.telephone1 || '',
        office_tel2: customerData.employmentDetails?.officeAddress?.telephone2 || '',
        office_ext: customerData.employmentDetails?.officeAddress?.extension || '',
        
        // Income details
        gross_monthly_salary: customerData.incomeDetails?.grossMonthlySalary || '',
        other_monthly_income: customerData.incomeDetails?.otherMonthlyIncome || '',
        net_monthly_income: customerData.incomeDetails?.netMonthlyIncome || '',
        other_income_sources: customerData.incomeDetails?.otherIncomeSource || '',
        
        // Banking details - Convert string to boolean
        is_ubl_customer: applicationTypeToBoolean(customerData.bankingDetails?.isUblCustomer),
        ubl_account_number: customerData.bankingDetails?.ublAccountNumber || '',
        
        // Declaration
        applicant_signature: customerData.declaration?.signature || '',
        applicant_signature_date: customerData.declaration?.date || '',
        
        // Bank use only
        application_source: customerData.bankUseOnly?.applicationSource || '',
        channel_code: customerData.bankUseOnly?.channelCode || '',
        so_employee_no: customerData.bankUseOnly?.soEmployeeNo || '',
        program_code: customerData.bankUseOnly?.programCode || '',
        pb_bm_employee_no: customerData.bankUseOnly?.pbEmployeeNo || '',
        branch_code: customerData.bankUseOnly?.branchCode || '',
        sm_employee_no: customerData.bankUseOnly?.smEmployeeNo || '',
        bm_signature_stamp: customerData.bankUseOnly?.bmSignature || '',
        
        // Prepare array data (if available)
        references: Array.isArray(customerData.references) ? 
          customerData.references.map((ref, index) => ({
            reference_no: index + 1,
            name: ref.name || '',
            cnic: ref.cnic || '',
            relationship: ref.relationship || '',
            house_no: ref.houseNo || '',
            street: ref.street || '',
            area: ref.area || '',
            city: ref.city || '',
            postal_code: ref.postalCode || '',
            tel_residence: ref.telephoneResidence || '',
            tel_office: ref.telephoneOffice || '',
            mobile: ref.mobile || '',
            fax: ref.fax || '',
            email: ref.email || ''
          })) : [],
          
        // Exposure tables
        credit_cards_clean: customerData.exposures?.creditCardsClean || [],
        credit_cards_secured: customerData.exposures?.creditCardsSecured || [],
        personal_loans_existing: customerData.exposures?.personalLoansExisting || [],
        other_facilities: customerData.exposures?.otherFacilities || [],
        personal_loans_under_process: customerData.exposures?.personalLoansUnderProcess || []
      };
      
      // Helper function for converting Yes/No to true/false
      function applicationTypeToBoolean(value: string | undefined): boolean | null {
        if (value === 'Yes') return true;
        if (value === 'No') return false;
        return null; // Return null for empty or undefined values
      }
      
      // Convert string numeric values to actual numbers or null
      function toNumber(value: any): number | null {
        if (value === undefined || value === null || value === '') {
          return null;
        }
        const num = Number(value);
        return isNaN(num) ? null : num;
      }
      
      // Validate and format date or return null
      function toValidDate(value: any): string | null {
        if (value === undefined || value === null || value === '') {
          return null;
        }
        
        // Try to create a valid date object
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return null; // Not a valid date
        }
        
        // Format as YYYY-MM-DD for PostgreSQL
        return date.toISOString().split('T')[0];
      }
      
      // Transform specific fields to ensure they are numbers
      const formDataWithTypes = {
        ...formData,
        // Number fields
        tenure: toNumber(formData.tenure),
        dependants: toNumber(formData.dependants),
        exp_current_years: toNumber(formData.exp_current_years),
        exp_prev_years: toNumber(formData.exp_prev_years),
        monthly_rent: toNumber(formData.monthly_rent),
        amount_requested: toNumber(formData.amount_requested),
        min_amount_acceptable: toNumber(formData.min_amount_acceptable),
        max_affordable_installment: toNumber(formData.max_affordable_installment),
        gross_monthly_salary: toNumber(formData.gross_monthly_salary),
        other_monthly_income: toNumber(formData.other_monthly_income),
        net_monthly_income: toNumber(formData.net_monthly_income),
        
        // Date fields
        date_of_birth: toValidDate(formData.date_of_birth),
        applicant_signature_date: toValidDate(formData.applicant_signature_date),
      };
      
      // Also handle date fields in arrays
      if (Array.isArray(formDataWithTypes.personal_loans_existing)) {
        formDataWithTypes.personal_loans_existing = formDataWithTypes.personal_loans_existing.map(loan => {
          const updatedLoan = { ...loan };
          // Handle as_of date - use undefined instead of null for TypeScript compatibility
          const asOfDate = toValidDate(loan.as_of);
          updatedLoan.as_of = asOfDate === null ? undefined : asOfDate;
          return updatedLoan;
        });
      }
  
      // Log the submission data for debugging
      console.log("Submitting application data:", formDataWithTypes);
  
      const response = await fetch(`${getBaseUrl()}/api/cashplus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithTypes),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({ title: "Success!", description: "Your application has been submitted successfully." });
        router.push('/dashboard/pb/applications');
      } else {
        throw new Error(data.error || 'Failed to submit application');
      }
    } catch (error: any) { // Type annotation for error
      console.error("Application submission error:", error);
      toast({ title: "Error", description: error.message || 'Failed to submit application', variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!customerData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <div className="text-gray-600 mb-4">No customer data found. Please go back and enter CNIC first.</div>
          <Button onClick={() => router.push('/dashboard/applicant')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Helper for scroll
  const scrollToSection = (key: SectionKey) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentSection(key);
  };

    // Up Arrow visibility state
  const [showUpArrow, setShowUpArrow] = useState(false);

  // Listen for scroll to show/hide up arrow
  useEffect(() => {
    const handleScroll = () => {
      setShowUpArrow(window.scrollY > 300); // Show after 300px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl rounded-lg mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl text-center text-blue-500 font-bold "> UBL Cashplus Application</h2>

      {/* Customer Info Header */}
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {customerData.isETB ? (
          <User className="w-8 h-8 text-green-600" />
        ) : (
          <CreditCard className="w-8 h-8 text-blue-600" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            UBL Cashplus Application
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-lg font-semibold text-gray-700">
              Consumer ID: {customerData?.cifData?.customerId || 'N/A'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              customerData.isETB 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {customerData.isETB ? 'Existing Customer (ETB)' : 'New Customer (NTB)'}
            </span>
          </div>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={() => router.push('/dashboard/applicant')}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Selection
      </Button>
    </div>
    
    {customerData.personalDetails && (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {customerData.personalDetails.firstName && (
          <div>
            <span className="font-medium text-gray-600">Name:</span>
            <div className="text-gray-900">
              {customerData.personalDetails.firstName} {customerData.personalDetails.lastName}
            </div>
          </div>
        )}
        {customerData.personalDetails.cnic && (
          <div>
            <span className="font-medium text-gray-600">CNIC:</span>
            <div className="text-gray-900">{customerData.personalDetails.cnic}</div>
          </div>
        )}
        {customerData.personalDetails.mobileNumber && (
          <div>
            <span className="font-medium text-gray-600">Mobile:</span>
            <div className="text-gray-900">{customerData.personalDetails.mobileNumber}</div>
          </div>
        )}
      </div>
    )}
  </CardContent>
</Card>

 {/* Chips for Navigation */}
 <div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Form Sections</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {FORM_SECTIONS.map(section => (
          <button
            key={section.key}
            type="button"
            onClick={() => scrollToSection(section.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-2xl shadow 
              text-sm font-semibold border 
              transition-all
              ${currentSection === section.key ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-800 border-gray-200"}
              ${sectionFilled[section.key] ? "ring-2 ring-green-400" : ""}
            `}
          >
            {section.label}
            {sectionFilled[section.key] && <CheckCircle2 className="w-4 h-4 text-green-600" />}
          </button>
        ))}
      </div>
 </div>


      {/* Sections - Wrapped in refs for scroll */}
      <form id="cashplusForm" className="space-y-10">
        <div ref={refs.loan}><CashplusLoanPreferenceForm /></div>
        <div ref={refs.type}><CashplusApplicationTypeForm /></div>
        <div ref={refs.personal}><CashplusPersonalInfoForm /></div>
        <div ref={refs.employment}><CashplusEmploymentInfoForm /></div>
        <div ref={refs.income}><CashplusIncomeDetailsForm /></div>
        <div ref={refs.banking}><CashplusBankingDetailsForm /></div>
        <div ref={refs.exposure}>
          {/* Exposure Tables */}
          <div className="space-y-6">
            <CashplusExposureTable
              title="A. Credit Cards (Clean)"
              columns={["Sr #", "Bank Name", "Approved Limit"]}
              rows={3}
              exposureType="creditCardsClean"
            />
            <CashplusExposureTable
              title="B. Credit Cards (Secured)"
              columns={["Sr #", "Bank Name", "Approved Limit"]}
              rows={3}
              exposureType="creditCardsSecured"
            />
            <CashplusExposureTable
              title="C. Personal Loans (Clean) – Existing"
              columns={["Sr #", "Bank Name", "Approved Limit", "Outstanding Amount", "As of (Application Date)"]}
              rows={3}
              exposureType="personalLoansExisting"
            />
            <CashplusExposureTable
              title="D. Other Facilities (Clean & Secured)"
              columns={["Sr #", "Bank Name", "Approved Limit", "Nature", "Current Outstanding"]}
              rows={3}
              exposureType="otherFacilities"
            />
            <CashplusExposureTable
              title="E. Personal Loans Under Process"
              columns={["Sr #", "Bank Name", "Facility Under Process", "Nature of Facility"]}
              rows={3}
              exposureType="personalLoansUnderProcess"
            />
          </div>
        </div>
        <div ref={refs.references}><CashplusReferencesForm /></div>
        <div ref={refs.declaration}><CashplusApplicantDeclarationForm /></div>
        <div ref={refs.bankUse}><CashplusBankUseOnlyForm /></div>
         <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>

      {/* Up Arrow Button */}
      {showUpArrow && (
        <button
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-4 z-50 bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 shadow-xl transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
  };

