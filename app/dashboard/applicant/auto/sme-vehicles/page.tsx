"use client";

import { useEffect, useRef, useState } from "react";
import { GeneralInfoForm } from "@/components/forms/smevehicle/SmeVehicleGeneralInfoForm";
import { RelationshipDetailForm } from "@/components/forms/smevehicle/SmeVehicleRelationshipDetailForm";
import { ApplicantPersonalDetailForm } from "@/components/forms/smevehicle/SmeVehicleApplicantPersonalDetailForm";
import { ApplicantBusinessDetailForm } from "@/components/forms/smevehicle/SmeVehicleApplicantBusinessDetailForm";
import { VehicleDetailForm } from "@/components/forms/smevehicle/SmeVehicleVehicleDetailForm";
import { SellerDealerDetailForm } from "@/components/forms/smevehicle/SellerDealerDetailForm";
import { ProposedLoanDetailForm } from "@/components/forms/smevehicle/SmeVehicleProposedLoanDetailForm";
import { ReferencesDetailForm } from "@/components/forms/smevehicle/SmeVehicleReferencesDetailForm";
import { ExistingLoanDetailsForm } from "@/components/forms/smevehicle/SmeVehicleExistingLoanDetailsForm";
import { MarketInfoForm } from "@/components/forms/smevehicle/SmeVehicleMarketInfoForm";
import { FinancialIndicatorsForm } from "@/components/forms/smevehicle/SmeVehicleFinancialIndicatorsForm";
import { UndertakingForm } from "@/components/forms/smevehicle/SmeVehicleUndertakingForm";
import { useCustomer } from "@/contexts/CustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Car, User, CheckCircle2, CreditCard, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { submitCommercialVehicleApplication } from "@/lib/api";

// Helper functions for type conversion
const toValidDate = (dateStr: string | undefined | null): string | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
};

const toNumber = (value: any): number | null => {
  if (value === undefined || value === null || value === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};

const toBoolean = (value: any): boolean => {
  return value === true || value === 'true' || value === 'yes' || value === 'Yes';
};

// 1. Define the section keys
type SectionKey =
  | "generalInfo"
  | "relationshipDetail"
  | "personalDetails"
  | "businessDetails"
  | "vehicleDetails"
  | "sellerDealerDetails"
  | "proposedLoanDetails"
  | "references"
  | "existingLoan"
  | "marketInfo"
  | "financialIndicators"
  | "undertaking";

// 2. Define the sections array for navigation
const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "generalInfo", label: "General Info" },
  { key: "relationshipDetail", label: "Relationship" },
  { key: "personalDetails", label: "Personal Detail" },
  { key: "businessDetails", label: "Business Detail" },
  { key: "vehicleDetails", label: "Vehicle Detail" },
  { key: "sellerDealerDetails", label: "Seller/Dealer" },
  { key: "proposedLoanDetails", label: "Proposed Loan" },
  { key: "references", label: "References" },
  { key: "existingLoan", label: "Existing Loan" },
  { key: "marketInfo", label: "Market Info" },
  { key: "financialIndicators", label: "Financial Indicators" },
  { key: "undertaking", label: "Undertaking" },
];

// 3. Filled logic (backend autofill or manual)
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => ({
  generalInfo:
    !!customerData?.commercialVehicle?.application_no &&
    !!customerData?.commercialVehicle?.date_of_request,
  relationshipDetail:
    !!customerData?.commercialVehicle?.branch_code &&
    !!customerData?.commercialVehicle?.city,
  personalDetails:
    !!customerData?.commercialVehicle?.applicant_name &&
    !!customerData?.commercialVehicle?.applicant_cnic,
  businessDetails:
    !!customerData?.commercialVehicle?.company_name &&
    !!customerData?.commercialVehicle?.type_of_business,
  vehicleDetails:
    !!customerData?.commercialVehicle?.vehicle_manufacturer &&
    !!customerData?.commercialVehicle?.vehicle_model,
  sellerDealerDetails:
    !!customerData?.commercialVehicle?.seller_name ||
    !!customerData?.commercialVehicle?.dealer_name,
  proposedLoanDetails:
    !!customerData?.commercialVehicle?.desired_loan_amount,
  references:
    Array.isArray(customerData?.commercialVehicle?.references) && customerData.commercialVehicle.references.length > 0,
  existingLoan:
    Array.isArray(customerData?.commercialVehicle?.existing_loans) && customerData.commercialVehicle.existing_loans.length > 0,
  marketInfo:
    Array.isArray(customerData?.commercialVehicle?.market_info) && customerData.commercialVehicle.market_info.length > 0,
  financialIndicators:
    !!customerData?.commercialVehicle?.financial_indicators_small ||
    !!customerData?.commercialVehicle?.financial_indicators_medium,
  undertaking:
    !!customerData?.commercialVehicle?.undertaking_agreed,
});

export default function CommercialVehicleFinancingPage() {
  const { customerData, updateCustomerData } = useCustomer();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4. Create a ref for each section
  const generalInfoRef = useRef<HTMLDivElement>(null);
  const relationshipDetailRef = useRef<HTMLDivElement>(null);
  const personalDetailsRef = useRef<HTMLDivElement>(null);
  const businessDetailsRef = useRef<HTMLDivElement>(null);
  const vehicleDetailsRef = useRef<HTMLDivElement>(null);
  const sellerDealerDetailsRef = useRef<HTMLDivElement>(null);
  const proposedLoanDetailsRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);
  const existingLoanRef = useRef<HTMLDivElement>(null);
  const marketInfoRef = useRef<HTMLDivElement>(null);
  const financialIndicatorsRef = useRef<HTMLDivElement>(null);
  const undertakingRef = useRef<HTMLDivElement>(null);

  // 5. Map section keys to refs
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    generalInfo: generalInfoRef,
    relationshipDetail: relationshipDetailRef,
    personalDetails: personalDetailsRef,
    businessDetails: businessDetailsRef,
    vehicleDetails: vehicleDetailsRef,
    sellerDealerDetails: sellerDealerDetailsRef,
    proposedLoanDetails: proposedLoanDetailsRef,
    references: referencesRef,
    existingLoan: existingLoanRef,
    marketInfo: marketInfoRef,
    financialIndicators: financialIndicatorsRef,
    undertaking: undertakingRef,
  };

  const [currentSection, setCurrentSection] = useState<SectionKey | "">("");

  // 6. Determine which sections are filled (autofilled or user)
  const sectionFilled = useSectionFilled(customerData || {});

  // 7. Scroll helper
  const scrollToSection = (key: SectionKey) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentSection(key);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Customer data is missing. Please fill the form first.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Test backend connection first
      console.log("Testing backend connection...");
      const connectionTest = await fetch('/api/test-backend-connection');
      const connectionData = await connectionTest.json();

      if (!connectionData.success) {
        toast({
          variant: "destructive",
          title: "Backend Connection Error",
          description: "Cannot connect to the backend server. Please make sure the server is running.",
        });
        console.error("Backend connection test failed:", connectionData);
        setIsSubmitting(false);
        return;
      }

      console.log("Backend connection successful:", connectionData);

      // Prepare form data for submission
      const commercialVehicle = customerData?.commercialVehicle || {};
      
      // Format data according to backend expectations
      const formData: Record<string, any> = {
        // Customer ID
        customer_id: customerData.customerId || customerData.cnic || `CV-${Date.now()}`,

        // General Info and Application Details
        application_no: commercialVehicle.application_no || `CV-${Date.now()}`,
        date_of_request: toValidDate(commercialVehicle.date_of_request) || new Date().toISOString().split('T')[0],

        // Relationship Manager Details
        branch_code: commercialVehicle.branch_code || "",
        city: commercialVehicle.city || "",
        sales_officer_emp_no: commercialVehicle.sales_officer_emp_no || "",
        sales_manager_emp_no: commercialVehicle.sales_manager_emp_no || "",
        pb_bm_employee_no: commercialVehicle.pb_bm_employee_no || "",
        channel: commercialVehicle.channel || "",

        // Personal Details
        applicant_name: commercialVehicle.applicant_name || "",
        applicant_cnic: commercialVehicle.applicant_cnic || "",
        cnic_issuance_date: toValidDate(commercialVehicle.cnic_issuance_date),
        cnic_expiry_date: toValidDate(commercialVehicle.cnic_expiry_date),
        date_of_birth: toValidDate(commercialVehicle.date_of_birth),
        father_husband_name: commercialVehicle.father_husband_name || "",
        mother_maiden_name: commercialVehicle.mother_maiden_name || "",
        gender: commercialVehicle.gender || "",
        marital_status: commercialVehicle.marital_status || "",
        residence_landline_no: commercialVehicle.residence_landline_no || "",
        cell_no: commercialVehicle.cell_no || "",
        residence_tenure_months: toNumber(commercialVehicle.residence_tenure_months),
        residence_type: commercialVehicle.residence_type || "",
        num_dependents: toNumber(commercialVehicle.num_dependents),
        education_level: commercialVehicle.education_level || "",
        current_address: commercialVehicle.current_address || "",
        permanent_address: commercialVehicle.permanent_address || "",

        // Business Details
        company_name: commercialVehicle.company_name || "",
        group_name: commercialVehicle.group_name || "",
        company_legal_status: commercialVehicle.company_legal_status || "",
        type_of_business: commercialVehicle.type_of_business || "",
        experience_years: toNumber(commercialVehicle.experience_years),
        nature_of_business: commercialVehicle.nature_of_business || "",
        business_landline_no: commercialVehicle.business_landline_no || "",
        business_cell_no: commercialVehicle.business_cell_no || "",
        national_tax_no: commercialVehicle.national_tax_no || "",
        tax_payer: toBoolean(commercialVehicle.tax_payer),
        email: commercialVehicle.email || "",
        nearest_landmark: commercialVehicle.nearest_landmark || "",
        num_employees: toNumber(commercialVehicle.num_employees),
        annual_sales_pkr: toNumber(commercialVehicle.annual_sales_pkr),
        business_address: commercialVehicle.business_address || "",
        political_affiliation: toBoolean(commercialVehicle.political_affiliation),
        ubl_bank_account_no: commercialVehicle.ubl_bank_account_no || "",
        ubl_bank_title: commercialVehicle.ubl_bank_title || "",
        fax_no: commercialVehicle.fax_no || "",
        company_est_date: toValidDate(commercialVehicle.company_est_date),
        business_premises: commercialVehicle.business_premises || "",
        main_business_account_bank: commercialVehicle.main_business_account_bank || "",
        main_business_account_no: commercialVehicle.main_business_account_no || "",
        main_business_account_open_date: toValidDate(commercialVehicle.main_business_account_open_date),
        registration_no: commercialVehicle.registration_no || "",

        // Vehicle Details
        vehicle_manufacturer: commercialVehicle.vehicle_manufacturer || "",
        vehicle_model: commercialVehicle.vehicle_model || "",
        vehicle_year: toNumber(commercialVehicle.vehicle_year),
        vehicle_local_assembled: toBoolean(commercialVehicle.vehicle_local_assembled),
        vehicle_new_used: commercialVehicle.vehicle_new_used || "",
        engine_no: commercialVehicle.engine_no || "",
        engine_size_cc: toNumber(commercialVehicle.engine_size_cc),
        chassis_no: commercialVehicle.chassis_no || "",
        purchase_type: commercialVehicle.purchase_type || "",
        vehicle_price: toNumber(commercialVehicle.vehicle_price),

        // Seller/Dealer Info
        seller_name: commercialVehicle.seller_name || "",
        seller_cnic: commercialVehicle.seller_cnic || "",
        seller_address: commercialVehicle.seller_address || "",
        seller_contact_no: commercialVehicle.seller_contact_no || "",
        dealer_name: commercialVehicle.dealer_name || "",
        dealer_email: commercialVehicle.dealer_email || "",
        dealer_address: commercialVehicle.dealer_address || "",
        dealer_contact_no: commercialVehicle.dealer_contact_no || "",

        // Loan Details
        vehicle_name: commercialVehicle.vehicle_name || "",
        desired_loan_amount: toNumber(commercialVehicle.desired_loan_amount),
        tenure_years: toNumber(commercialVehicle.tenure_years),
        pricing: commercialVehicle.pricing || "",
        down_payment_percent: toNumber(commercialVehicle.down_payment_percent),
        down_payment_amount: toNumber(commercialVehicle.down_payment_amount),
        insurance_company_name: commercialVehicle.insurance_company_name || "",
        tracker_company_name: commercialVehicle.tracker_company_name || "",

        // Child tables - must match backend schema exactly
        references: Array.isArray(commercialVehicle.references) ? commercialVehicle.references : [],
        existing_loans: Array.isArray(commercialVehicle.existing_loans) ? commercialVehicle.existing_loans : [],
        business_descriptions: Array.isArray(commercialVehicle.business_descriptions) ? commercialVehicle.business_descriptions : [],
        market_info: Array.isArray(commercialVehicle.market_info) ? commercialVehicle.market_info : [],
        financial_indicators_small: commercialVehicle.financial_indicators_small || null,
        financial_indicators_medium: commercialVehicle.financial_indicators_medium || null
      };

      // Clean the data before submission
      const cleanedData = { ...formData };

      // Fix date formats
      ['date_of_request', 'cnic_issuance_date', 'cnic_expiry_date', 'date_of_birth', 
       'company_est_date', 'main_business_account_open_date'].forEach(dateField => {
        if (cleanedData[dateField]) {
          try {
            const date = new Date(cleanedData[dateField]);
            if (isNaN(date.getTime())) {
              cleanedData[dateField] = null;
            } else {
              cleanedData[dateField] = date.toISOString().substring(0, 10);
            }
          } catch (e) {
            cleanedData[dateField] = null;
          }
        } else {
          cleanedData[dateField] = null;
        }
      });

      // Fix numeric fields
      const numericFields = [
        'residence_tenure_months', 'num_dependents', 'experience_years',
        'num_employees', 'annual_sales_pkr', 'vehicle_price', 'engine_size_cc',
        'desired_loan_amount', 'tenure_years', 'down_payment_percent', 'down_payment_amount'
      ];

      numericFields.forEach(field => {
        if (field in cleanedData) {
          const value = cleanedData[field];
          if (value === "" || value === undefined) {
            cleanedData[field] = null;
          } else if (typeof value === 'string' && !isNaN(Number(value))) {
            cleanedData[field] = Number(value);
          } else if (typeof value === 'string' && isNaN(Number(value))) {
            cleanedData[field] = null;
          }
        }
      });

      // Ensure all required arrays exist
      ['references', 'existing_loans', 'business_descriptions', 'market_info'].forEach(field => {
        if (!cleanedData[field] || !Array.isArray(cleanedData[field])) {
          cleanedData[field] = [];
        }
      });

      // Remove any undefined or circular reference values
      const safeData = JSON.parse(JSON.stringify(cleanedData));

      console.log("Sending commercial vehicle data to backend:", safeData);

      // Submit to backend
      const result = await submitCommercialVehicleApplication(safeData);

      console.log("Commercial vehicle application submitted successfully:", result);

      // Show success message
      toast({
        title: "Application Submitted",
        description: `Commercial Vehicle application ID: ${result.application_id || result.id} has been successfully submitted.`,
      });

      // Optionally navigate to a success page
      // router.push(`/dashboard/applicant/auto/sme-vehicles/success?id=${result.application_id}`);

    } catch (error: any) {
      console.error('Error submitting commercial vehicle form:', error);

      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error.message || "Failed to submit application. Please try again.",
      });
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
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        Commercial Vehicle Financing (Business Segment)
      </h1>

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
                <h1 className="text-2xl font-bold text-center mb-10 text-gray-800">
                  Commercial Vehicle Financing 
                </h1>
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

      {/* Chips/Tabs Navigation */}
      <div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-2">Form Sections</h3>
        <div className="flex flex-wrap gap-2 mb-6 justify-between">
          {FORM_SECTIONS.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => scrollToSection(section.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-2xl shadow
                text-sm font-semibold border transition-all
                ${currentSection === section.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-800 border-gray-200"}
                ${sectionFilled[section.key] ? "ring-2 ring-green-400" : ""}
              `}
            >
              {section.label}
              {sectionFilled[section.key] && (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-10 mt-8" onSubmit={handleSubmit}>
        <div ref={generalInfoRef}><GeneralInfoForm /></div>
        <div ref={relationshipDetailRef}><RelationshipDetailForm /></div>
        <div ref={personalDetailsRef}><ApplicantPersonalDetailForm /></div>
        <div ref={businessDetailsRef}><ApplicantBusinessDetailForm /></div>
        <div ref={vehicleDetailsRef}><VehicleDetailForm /></div>
        <div ref={sellerDealerDetailsRef}><SellerDealerDetailForm /></div>
        <div ref={proposedLoanDetailsRef}><ProposedLoanDetailForm /></div>
        <div ref={referencesRef}><ReferencesDetailForm /></div>
        <div ref={existingLoanRef}><ExistingLoanDetailsForm /></div>
        <div ref={marketInfoRef}><MarketInfoForm /></div>
        <div ref={financialIndicatorsRef}><FinancialIndicatorsForm /></div>
        <div ref={undertakingRef}><UndertakingForm /></div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
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
}
