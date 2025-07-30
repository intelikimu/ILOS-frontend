"use client";

import { experimental_useEffectEvent, useEffect, useRef, useState } from "react";
import { SMEGeneralInfoForm } from "@/components/forms/smeasaan/SMEGeneralInfoForm";
import { SMERelationshipDetailForm } from "@/components/forms/smeasaan/SMERelationshipDetailForm";
import { SMEApplicantPersonalDetailForm } from "@/components/forms/smeasaan/SMEApplicantPersonalDetailForm";
import { SMEApplicantBusinessDetailForm } from "@/components/forms/smeasaan/SMEApplicantBusinessDetailForm";
// import { SMEBankingDetailsForm } from "@/components/forms/smeasaan/SMEBankingDetailsForm";
import { SMELoanFacilityDetailsForm } from "@/components/forms/smeasaan/SMELoanFacilityDetailsForm";
import { SMEReferencesForm } from "@/components/forms/smeasaan/SMEReferencesForm";
import { SMEExistingLoanDetailsForm } from "@/components/forms/smeasaan/SMEExistingLoanDetailsForm";
import { SMEDeclarationForm } from "@/components/forms/smeasaan/SMEDeclarationForm";
import { useCustomer } from "@/contexts/CustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, CheckCircle2, CreditCard, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { submitSmeAsaanApplication } from "@/lib/api";
import { SMEProposedLoanDetailSection } from "@/components/forms/smeasaan/SMEProposedLoanDetailSection";
import { SMESellerDealerDetailsSection } from "@/components/forms/smeasaan/SMESellerDealerDetailsSection";
import { SMEVehicleDetailsSection } from "@/components/forms/smeasaan/SMEVehicleDetailsSection";
import SmeAsaanDetailsSection from "@/components/forms/smeasaan/SmeAsaanDetailsSection";

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

// Get base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000'; // Local development backend
  }
  return ''; // Same domain in production (relative URL)
};

// 1. Section keys/types
type SectionKey =
  | "general"
  | "relationship"
  | "personalDetail"
  | "businessDetail"
  | "banking"
  | "loanFacility"
  | "references"
  | "existingLoan"
  | "declaration"
  | "proposedLoan"
  | "sellerDealer"
  | "vehicle"
  | "asaanDetails"; // <-- add this;

// 2. Section/tab info
const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "general", label: "General Info" },
  { key: "relationship", label: "Relationship Detail" },
  { key: "personalDetail", label: "Personal Detail" },
  { key: "businessDetail", label: "Business Detail" },
  { key: "vehicle", label: "Vehicle Details" },
  { key: "sellerDealer", label: "Seller/Dealer" },
  { key: "proposedLoan", label: "Proposed Loan" },
  { key: "banking", label: "Banking Details" },
  { key: "loanFacility", label: "Loan Facility" },
  { key: "references", label: "References" },
  { key: "existingLoan", label: "Existing Loan" },
  { key: "asaanDetails", label: "SME Asaan Details" },
  { key: "declaration", label: "Declaration" },
];

// 3. Filled check (adapt logic to your data shape)
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => {
  // These are examples; change as per your actual context/backend!
  return {
    general: !!customerData?.smeApplication?.application_no,
    relationship: !!customerData?.smeApplication?.branch_code,
    personalDetail: !!customerData?.smeApplication?.applicant_name,
    businessDetail: !!customerData?.smeApplication?.company_name,
    banking: !!customerData?.smeApplication?.main_business_account_bank,
    loanFacility: !!customerData?.smeApplication?.desired_loan_amount,
    references: Array.isArray(customerData?.references) && customerData.references.length > 0,
    existingLoan: Array.isArray(customerData?.smeApplication?.existing_loans) && customerData.smeApplication.existing_loans.length > 0,
    declaration: !!customerData?.declaration?.termsAgreed,
    proposedLoan: !!customerData?.smeApplication?.vehicle_name,
    sellerDealer: !!customerData?.smeApplication?.seller_name,
    vehicle: !!customerData?.smeApplication?.vehicle_manufacturer,
    asaanDetails: !!customerData?.smeApplication?.smeAsaanDetails,
  };
};

export default function SMEAsaanPage() {
  const { customerData, updateCustomerData } = useCustomer();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Section refs for scroll
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    general: useRef<HTMLDivElement>(null),
    relationship: useRef<HTMLDivElement>(null),
    personalDetail: useRef<HTMLDivElement>(null),
    businessDetail: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    loanFacility: useRef<HTMLDivElement>(null),
    references: useRef<HTMLDivElement>(null),
    existingLoan: useRef<HTMLDivElement>(null),
    declaration: useRef<HTMLDivElement>(null),
    proposedLoan: useRef<HTMLDivElement>(null),
    sellerDealer: useRef<HTMLDivElement>(null),
    vehicle: useRef<HTMLDivElement>(null),
    asaanDetails: useRef<HTMLDivElement>(null), // New section ref
  };

  const [currentSection, setCurrentSection] = useState<SectionKey | "">("");
  const sectionFilled = useSectionFilled(customerData || {});
  
  // State for the new form components
  const [vehicleDetails, setVehicleDetails] = useState<Record<string, any>>({});
  const [sellerDealerDetails, setSellerDealerDetails] = useState<Record<string, any>>({});
  const [proposedLoanDetails, setProposedLoanDetails] = useState<Record<string, any>>({});
  
  // Initialize form data from customerData
  useEffect(() => {
    if (customerData?.smeApplication) {
      const smeApp = customerData.smeApplication;
      
      // Initialize vehicle details
      setVehicleDetails({
        manufacturer: smeApp.vehicle_manufacturer || "",
        model: smeApp.vehicle_model || "",
        year: smeApp.vehicle_year || "",
        engineSize: smeApp.engine_size_cc || "",
        engineNo: smeApp.engine_no || "",
        chassisNo: smeApp.chassis_no || "",
        price: smeApp.vehicle_price || "",
        assembledType: smeApp.vehicle_local_assembled ? "local" : smeApp.vehicle_imported ? "imported" : "",
        newUsed: smeApp.vehicle_new ? "new" : smeApp.vehicle_used ? "used" : "",
        purchaseAdvance: smeApp.purchase_poa || false,
        purchaseDelivery: smeApp.purchase_pod || false,
      });
      
      // Initialize seller/dealer details
      setSellerDealerDetails({
        sellerName: smeApp.seller_name || "",
        sellerCnic: smeApp.seller_cnic || "",
        sellerAddress: smeApp.seller_address || "",
        sellerContact: smeApp.seller_contact_no || "",
        dealerName: smeApp.dealer_name || "",
        dealerEmail: smeApp.dealer_email || "",
        dealerAddress: smeApp.dealer_address || "",
        dealerContact: smeApp.dealer_contact_no || "",
      });
      
      // Initialize proposed loan details
      setProposedLoanDetails({
        vehicleName: smeApp.vehicle_name || "",
        desiredLoanAmount: smeApp.desired_loan_amount || "",
        tenureYears: smeApp.tenure_years || "",
        pricing: smeApp.pricing || "",
        downPaymentPercent: smeApp.down_payment_percent || "",
        downPaymentAmount: smeApp.down_payment_amount || "",
        insuranceCompany: smeApp.insurance_company_name || "",
        trackerCompany: smeApp.tracker_company_name || "",
      });
    }
  }, [customerData]);

  // Scroll to section
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

  // Add backend connectivity check before form submission
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

    // Test backend connection before proceeding
    setIsSubmitting(true);
    try {
      // Check if the backend server is running first
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

      // Proceed with form submission
      // Add type assertion to prevent TypeScript errors for customer data
      const customerDataAny = customerData as any;
      const generalInfo = customerDataAny?.smeApplication || {};
      const relationshipManager = customerDataAny?.smeApplication || {};
      const personalDetails = customerDataAny?.personalDetails || {};
      const businessDetails = customerDataAny?.smeApplication || {};
      const bankingDetails = customerDataAny?.bankingDetails || {};
     
     









      const references = Array.isArray(customerDataAny?.smeReferences) ?
        customerDataAny.smeReferences :
        (Array.isArray(customerDataAny?.references) ?
          customerDataAny.references.map((ref: any) => ({
            reference_no: ref.reference_no || ref.referenceNo || "",
            name: ref.name || "",
            cnic: ref.cnic || "",
            relationship: ref.relationship || "",
            contact_no: ref.contact_no || ref.contactNo || "",
            address: ref.address || ""
          })) : []),

        existingLoans = Array.isArray(customerDataAny?.smeApplication?.existing_loans) ? customerDataAny.smeApplication.existing_loans : [];
      const businessDescriptions = Array.isArray(customerDataAny?.businessDescriptions) ? customerDataAny.businessDescriptions : [];
      const marketInfo = Array.isArray(customerDataAny?.marketInfo) ? customerDataAny.marketInfo : [];
      const financialIndicators = Array.isArray(customerDataAny?.financialIndicators) ? customerDataAny.financialIndicators : [];
      const financialIndicatorsMedium = Array.isArray(customerDataAny?.financialIndicatorsMedium) ? customerDataAny.financialIndicatorsMedium : [];
      const declaration = customerDataAny?.declaration || {};


      
      
      // Save form data to customer context
      updateCustomerData({
        smeApplication: {
          ...customerDataAny?.smeApplication,
          // General Info
          application_no: generalInfo.application_no || `SME-${Date.now()}`,
          date_of_request: toValidDate(generalInfo.date_of_request) || new Date().toISOString().split('T')[0],
          lcv: toBoolean(generalInfo.lcv),
          pmkj_yes: toBoolean(generalInfo.pmkj_yes),
          
          // Relationship Manager Details
          branch_code: relationshipManager.branch_code || "",
          city: relationshipManager.city || "",
          sales_officer_emp_no: relationshipManager.sales_officer_emp_no || "",
          sales_manager_emp_no: relationshipManager.sales_manager_emp_no || "",
          fr_br_emp_no: relationshipManager.fr_br_emp_no || "",
          channel: relationshipManager.channel || "",
          
          // Business Details
          company_name: businessDetails.company_name || "",
          company_legal_status: businessDetails.company_legal_status || "",
          group_name: businessDetails.group_name || "",
          experience_years: toNumber(businessDetails.experience_years),
          business_landline_no: businessDetails.business_landline_no || "",
          business_cell_no: businessDetails.business_cell_no || "",
          sector_se: toBoolean(businessDetails.sector_se),
          sector_me: toBoolean(businessDetails.sector_me),
          sector_manufacturing: toBoolean(businessDetails.sector_manufacturing),
          sector_traders_distributors: toBoolean(businessDetails.sector_traders_distributors),
          sector_wholesaler_retailer: toBoolean(businessDetails.sector_wholesaler_retailer),
          sector_services: toBoolean(businessDetails.sector_services),
          sector_individuals: toBoolean(businessDetails.sector_individuals),
          national_tax_no: businessDetails.national_tax_no || "",
          tax_payer: toBoolean(businessDetails.tax_payer),
          email: businessDetails.email || "",
          nearest_landmark: businessDetails.nearest_landmark || "",
          num_employees: toNumber(businessDetails.num_employees),
          annual_sales_pkr: toNumber(businessDetails.annual_sales_pkr),
          business_address: businessDetails.business_address || "",
          political_affiliation: toBoolean(businessDetails.political_affiliation),
          business_est_date: toValidDate(businessDetails.business_est_date),
          business_premises: businessDetails.business_premises || "",
          registration_no: businessDetails.registration_no || "",
          main_business_account_bank: bankingDetails.main_business_account_bank || "",
          main_business_account_no: bankingDetails.main_business_account_no || "",
          main_business_account_open_date: toValidDate(bankingDetails.main_business_account_open_date),
          
          // Vehicle Details
          vehicle_manufacturer: vehicleDetails.manufacturer || "",
          vehicle_model: vehicleDetails.model || "",
          vehicle_year: vehicleDetails.year || "",
          vehicle_local_assembled: vehicleDetails.assembledType === "local",
          vehicle_imported: vehicleDetails.assembledType === "imported",
          vehicle_new: vehicleDetails.newUsed === "new",
          vehicle_used: vehicleDetails.newUsed === "used",
          engine_no: vehicleDetails.engineNo || "",
          engine_size_cc: toNumber(vehicleDetails.engineSize),
          chassis_no: vehicleDetails.chassisNo || "",
          purchase_poa: toValidDate(vehicleDetails.purchaseAdvance),
          purchase_pod: toValidDate(vehicleDetails.purchaseDelivery),
          vehicle_price: toNumber(vehicleDetails.price),
          
          // Seller/Dealer Info
          seller_name: sellerDealerDetails.sellerName || "",
          seller_cnic: sellerDealerDetails.sellerCnic || "",
          seller_address: sellerDealerDetails.sellerAddress || "",
          seller_contact_no: sellerDealerDetails.sellerContact || "",
          dealer_name: sellerDealerDetails.dealerName || "",
          dealer_address: sellerDealerDetails.dealerAddress || "",
          dealer_email: sellerDealerDetails.dealerEmail || "",
          dealer_contact_no: sellerDealerDetails.dealerContact || "",
          
          // Loan Details
          vehicle_name: proposedLoanDetails.vehicleName || "",
          desired_loan_amount: toNumber(proposedLoanDetails.desiredLoanAmount),
          tenure_years: toNumber(proposedLoanDetails.tenureYears),
          pricing: proposedLoanDetails.pricing || "",
          down_payment_percent: toNumber(proposedLoanDetails.downPaymentPercent),
          down_payment_amount: toNumber(proposedLoanDetails.downPaymentAmount),
          insurance_company_name: proposedLoanDetails.insuranceCompany || "",
          tracker_company_name: proposedLoanDetails.trackerCompany || "",
          
          // SME Asaan Details - preserve existing data
          smeAsaanDetails: customerDataAny?.smeApplication?.smeAsaanDetails || {},
          existing_loans: customerDataAny?.smeApplication?.existing_loans || [],
          business_descriptions: customerDataAny?.smeApplication?.business_descriptions || [],
          market_info: customerDataAny?.smeApplication?.market_info || [],
          financial_indicators: customerDataAny?.smeApplication?.financial_indicators || [],
        },
        // Personal details are handled by the form components themselves
        // References are handled by the form components themselves
        // Declaration is handled by the form components themselves
      });


      // ✅ Clean block to safely extract and format SME Asaan fields in page.tsx
      const smeAsaan = customerData?.smeApplication?.smeAsaanDetails || {};

      const formattedExistingLoans = (smeAsaan.existingLoan || []).map((loan: any) => ({
        facility_type: loan.type,
        amount: Number(loan.amount) || null,
        tenor: loan.tenor,
        purpose: loan.purpose,
        security_nature_particular: loan.collateral,
        security_value: Number(loan.collateralValue) || null,
        repayment_frequency: loan.repayment
      }));

      const formattedBusinessDescriptions = [{
        business_type: smeAsaan.enterpriseType,
        products_services_offered: smeAsaan.smallProducts
      }];

      const formattedMarketInfo = (smeAsaan.smallMarket || []).map((m: any) => ({
        type: "supplier_customer",
        name: m.name,
        terms_of_trade: m.terms,
        cash_percent: Number(m.cash) || null,
        credit_percent: Number(m.credit) || null,
        tenor: m.tenor,
        relationship_since_years: Number(m.years) || null
      }));

      const smallFinancial = smeAsaan.smallFinancial || {
        assets: "",
        liabilities: "",
        borrowings: "",
        revenue: "",
        expenses: ""
      };

      const formattedFinancialIndicators = [{
        assets: Number(smallFinancial.assets) || null,
        liabilities: Number(smallFinancial.liabilities) || null,
        borrowings: Number(smallFinancial.borrowings) || null,
        revenue: Number(smallFinancial.revenue) || null,
        expenses: Number(smallFinancial.expenses) || null
      }];

      // Format data according to backend expectations
      const formData: Record<string, any> = {
        // Customer ID
        customer_id: customerData.customerId || customerData.cnic || `SME-${Date.now()}`,

        // General Info and Application Details
        application_no: generalInfo.applicationNumber || `SME-${Date.now()}`,
        date_of_request: toValidDate(generalInfo.requestDate) || new Date().toISOString().split('T')[0],
        lcv: toBoolean(generalInfo.lcv),
        pmkj_yes: toBoolean(generalInfo.pmkj),

        vehicle: customerData.smeApplication?.vehicleDetails,
        sellerDealer: customerData.smeApplication?.sellerDealerDetails,
        proposedLoan: customerData.smeApplication?.proposedLoanDetails,
        // Relationship Manager Details
        branch_code: relationshipManager.branchCode || "",
        city: relationshipManager.city || "",
        sales_officer_emp_no: relationshipManager.salesOfficerEmpNo || "",
        sales_manager_emp_no: relationshipManager.salesManagerEmpNo || "",
        fr_br_emp_no: relationshipManager.frBrEmpNo || "",
        channel: relationshipManager.channel || "",

        // Personal Details - ensure we use smeApplication data if it exists
        applicant_name: customerDataAny?.smeApplication?.applicant_name || personalDetails.name || personalDetails.fullName || "",
        applicant_cnic: customerDataAny?.smeApplication?.applicant_cnic || personalDetails.cnic || customerData.cnic || "",
        cnic_issuance_date: customerDataAny?.smeApplication?.cnic_issuance_date || toValidDate(personalDetails.cnicIssue),
        cnic_expiry_date: customerDataAny?.smeApplication?.cnic_expiry_date || toValidDate(personalDetails.cnicExpiry),
        applicant_dob: customerDataAny?.smeApplication?.applicant_dob || toValidDate(personalDetails.dob),
        father_husband_name: customerDataAny?.smeApplication?.father_husband_name || personalDetails.fatherOrHusband || "",
        gender: customerDataAny?.smeApplication?.gender || personalDetails.gender || "",
        mother_maiden_name: customerDataAny?.smeApplication?.mother_maiden_name || personalDetails.motherMaiden || "",
        residence_landline_no: customerDataAny?.smeApplication?.residence_landline_no || personalDetails.landline || "",
        marital_status: customerDataAny?.smeApplication?.marital_status || personalDetails.marital || "",
        cell_no: customerDataAny?.smeApplication?.cell_no || personalDetails.cell || "",
        residence_tenure_months: customerDataAny?.smeApplication?.residence_tenure_months || toNumber(personalDetails.tenure),
        residence_type: customerDataAny?.smeApplication?.residence_type || personalDetails.residenceType || "",
        num_dependents: customerDataAny?.smeApplication?.num_dependents || toNumber(personalDetails.dependents),
        education_level: customerDataAny?.smeApplication?.education_level || personalDetails.education || "",
        curr_residence_address: customerDataAny?.smeApplication?.curr_residence_address || personalDetails.currentAddress || "",
        perm_residence_address: customerDataAny?.smeApplication?.perm_residence_address || personalDetails.permanentAddress || "",

        // Business Details
        company_name: businessDetails.companyName || "",
        company_legal_status: businessDetails.legalStatus || "",
        group_name: businessDetails.groupName || "",
        experience_years: toNumber(businessDetails.experienceYears),
        business_landline_no: businessDetails.landlineNo || "",
        business_cell_no: businessDetails.cellNo || "",
        sector_se: toBoolean(businessDetails.sectorSE),
        sector_me: toBoolean(businessDetails.sectorME),
        sector_manufacturing: toBoolean(businessDetails.sectorManufacturing),
        sector_traders_distributors: toBoolean(businessDetails.sectorTraders),
        sector_wholesaler_retailer: toBoolean(businessDetails.sectorRetail),
        sector_services: toBoolean(businessDetails.sectorServices),
        sector_individuals: toBoolean(businessDetails.sectorIndividuals),
        national_tax_no: businessDetails.ntn || "",
        tax_payer: toBoolean(businessDetails.taxPayer),
        email: businessDetails.email || personalDetails.email || "",
        nearest_landmark: businessDetails.nearestLandmark || "",
        num_employees: toNumber(businessDetails.numEmployees),
        annual_sales_pkr: toNumber(businessDetails.annualSales),
        business_address: businessDetails.address || "",
        political_affiliation: toBoolean(businessDetails.politicalAffiliation),

        // Banking Details
        ubl_bank_account_no: bankingDetails.ublAccountNo || "",
        ubl_bank_title: bankingDetails.ublAccountTitle || "",
        fax_no: bankingDetails.faxNo || businessDetails.faxNo || "",
        business_est_date: toValidDate(businessDetails.establishmentDate),
        business_premises: businessDetails.premisesType || "",
        registration_no: businessDetails.registrationNo || "",
        main_business_account_bank: bankingDetails.mainBank || "",
        main_business_account_no: bankingDetails.mainAccountNo || "",
        main_business_account_open_date: toValidDate(bankingDetails.mainAccountOpenDate),

        // Vehicle Details (if applicable)
        vehicle_manufacturer: (vehicleDetails || {}).manufacturer || "",
        vehicle_model: (vehicleDetails || {}).model || "",
        vehicle_year: (vehicleDetails || {}).year || "",
        vehicle_local_assembled: (vehicleDetails || {}).assembledType === "local",
        vehicle_imported: (vehicleDetails || {}).assembledType === "imported",
        vehicle_new: (vehicleDetails || {}).newUsed === "new",
        vehicle_used: (vehicleDetails || {}).newUsed === "used",
        engine_no: (vehicleDetails || {}).engineNo || "",
        engine_size_cc: toNumber((vehicleDetails || {}).engineSize),
        chassis_no: (vehicleDetails || {}).chassisNo || "",
        purchase_poa: toValidDate((vehicleDetails || {}).purchaseAdvance),
        purchase_pod: toValidDate((vehicleDetails || {}).purchaseDelivery),
        vehicle_price: toNumber((vehicleDetails || {}).price),

        // Seller/Dealer Info (if applicable)
        seller_name: (sellerDealerDetails || {}).sellerName || "",
        seller_cnic: (sellerDealerDetails || {}).sellerCnic || "",
        seller_address: (sellerDealerDetails || {}).sellerAddress || "",
        seller_contact_no: (sellerDealerDetails || {}).sellerContact || "",
        dealer_name: (sellerDealerDetails || {}).dealerName || "",
        dealer_address: (sellerDealerDetails || {}).dealerAddress || "",
        dealer_email: (sellerDealerDetails || {}).dealerEmail || "",
        dealer_contact_no: (sellerDealerDetails || {}).dealerContact || "",

        // Loan Details
        vehicle_name: (proposedLoanDetails || {}).vehicleName || "",
        desired_loan_amount: toNumber((proposedLoanDetails || {}).desiredLoanAmount),
        tenure_years: toNumber((proposedLoanDetails || {}).tenureYears),
        pricing: (proposedLoanDetails || {}).pricing || "",
        down_payment_percent: toNumber((proposedLoanDetails || {}).downPaymentPercent),
        down_payment_amount: toNumber((proposedLoanDetails || {}).downPaymentAmount),
        insurance_company_name: (proposedLoanDetails || {}).insuranceCompany || "",
        tracker_company_name: (proposedLoanDetails || {}).trackerCompany || "",

        // Declaration
        declaration_agreed: toBoolean(declaration.agreed),
        declaration_date: toValidDate(declaration.date) || new Date().toISOString().split('T')[0],
        declaration_name: declaration.name || personalDetails.fullName || "",
        declaration_cnic: declaration.cnic || personalDetails.cnic || customerData.cnic || "",
        declaration_signature: declaration.signature || "",




                 // SME Asaan Details
                 existing_loans: formattedExistingLoans,
                 business_descriptions: formattedBusinessDescriptions,
                 market_info: formattedMarketInfo,
                 financial_indicators: formattedFinancialIndicators,
                 




        // Child tables - must match backend schema exactly
        references: references.map((ref: any) => ({
          reference_no: ref.reference_no || ref.referenceNo || "",
          name: ref.name || "",
          cnic: ref.cnic || "",
          relationship: ref.relationship || "",
          contact_no: ref.contact_no || ref.contactNo || "",
          address: ref.address || ""
        })),

        // existing_loans: existingLoans.map((loan: any) => ({
        //   facility_type: loan.facility_type || loan.facilityType || "",
        //   amount: toNumber(loan.amount),
        //   tenor: loan.tenor || "",
        //   purpose: loan.purpose || "",
        //   security_nature_particular: loan.security_nature_particular || loan.securityNature || "",
        //   security_value: toNumber(loan.security_value || loan.securityValue),
        //   repayment_frequency: loan.repayment_frequency || loan.repaymentFrequency || ""
        // })),

        // business_descriptions: businessDescriptions.map((desc: any) => ({
        //   business_type: desc.business_type || desc.businessType || "",
        //   products_services_offered: desc.products_services_offered || desc.productsServices || ""
        // })),

        // market_info: marketInfo.map((mi: any) => ({
        //   type: mi.type || "",
        //   name: mi.name || "",
        //   terms_of_trade: mi.terms_of_trade || mi.termsOfTrade || "",
        //   cash_percent: toNumber(mi.cash_percent || mi.cashPercent),
        //   credit_percent: toNumber(mi.credit_percent || mi.creditPercent),
        //   tenor: mi.tenor || "",
        //   relationship_since_years: toNumber(mi.relationship_since_years || mi.relationshipYears)
        // })),

        // financial_indicators: financialIndicators.map((fi: any) => ({
        //   assets: toNumber(fi.assets),
        //   liabilities: toNumber(fi.liabilities),
        //   borrowings: toNumber(fi.borrowings),
        //   revenue: toNumber(fi.revenue),
        //   expenses: toNumber(fi.expenses)
        // })),

        financial_indicators_medium: financialIndicatorsMedium.map((fi: any) => ({
          cash_in_hand: toNumber(fi.cash_in_hand || fi.cashInHand),
          cash_at_bank: toNumber(fi.cash_at_bank || fi.cashAtBank),
          inventory_value: toNumber(fi.inventory_value || fi.inventoryValue),
          investments: toNumber(fi.investments),
          fixed_investments: toNumber(fi.fixed_investments || fi.fixedInvestments),
          current_assets: toNumber(fi.current_assets || fi.currentAssets),
          total_assets: toNumber(fi.total_assets || fi.totalAssets),
          current_liabilities: toNumber(fi.current_liabilities || fi.currentLiabilities),
          borrowings: toNumber(fi.borrowings),
          total_liabilities: toNumber(fi.total_liabilities || fi.totalLiabilities),
          total_equity: toNumber(fi.total_equity || fi.totalEquity),
          gross_revenue: toNumber(fi.gross_revenue || fi.grossRevenue),
          total_expenses: toNumber(fi.total_expenses || fi.totalExpenses),
          profit_after_tax: toNumber(fi.profit_after_tax || fi.profitAfterTax)
        }))
      };

      // Log the form data being sent for debugging
      console.log("Sending data to backend:", formData);
      console.log("Raw customer data:", customerData);
      console.log("SME Application data:", customerData?.smeApplication);
      console.log("Personal details:", customerData?.personalDetails);
      console.log("Banking details:", customerData?.bankingDetails);
      console.log("Vehicle details:", vehicleDetails);
      console.log("Seller/Dealer details:", sellerDealerDetails);
      console.log("Proposed loan details:", proposedLoanDetails);

      // Add better debugging to check key fields
      console.log("Critical fields check:", {
        customer_id: formData.customer_id,
        application_no: formData.application_no,
        applicant_name: formData.applicant_name,
        applicant_cnic: formData.applicant_cnic,
        references: formData.references,

      });

      // Check for missing fields or null/undefined values in required fields
      const requiredFields = [
        "customer_id", "application_no", "date_of_request",
        "applicant_name", "applicant_cnic", "father_husband_name",
        "gender", "marital_status", "cell_no"
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        console.warn("Missing required fields:", missingFields);
        toast({
          variant: "destructive",
          title: "Missing Required Fields",
          description: `Please fill in all required fields: ${missingFields.join(", ")}`,
        });
        setIsSubmitting(false);
        return;
      }

      // Send data directly to backend for better error debugging
      try {
        console.log("Making direct API request to submit SME ASAAN application...");

        // Use direct fetch instead of the API utility for better debugging
        const backendUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000'
          : '';

        // Fix possible issues with the data before submission
        const cleanedData = { ...formData };

        // 1. Fix date formats to ensure they are YYYY-MM-DD
        if (cleanedData.date_of_request) {
          try {
            cleanedData.date_of_request = new Date(cleanedData.date_of_request).toISOString().substring(0, 10);
          } catch (e) {
            console.warn("Could not format date_of_request", e);
          }
        }

        // 2. Set all other date fields to null if they're invalid
        ['cnic_issuance_date', 'cnic_expiry_date', 'applicant_dob', 'business_est_date',
          'main_business_account_open_date', 'purchase_poa', 'purchase_pod'].forEach(dateField => {
            if (cleanedData[dateField]) {
              try {
                const date = new Date(cleanedData[dateField]);
                // Check if it's a valid date and not the epoch date (1970-01-01)
                if (isNaN(date.getTime()) || date.getTime() === 0) {
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

        // 3. IMPORTANT: Fix smallint/numeric fields - convert empty strings to null
        // These are all the potential numeric fields in the database schema
        const numericFields = [
          'residence_tenure_months', 'num_dependents', 'experience_years',
          'num_employees', 'annual_sales_pkr', 'vehicle_price',
          'engine_size_cc', 'desired_loan_amount', 'tenure_years',
          'down_payment_percent', 'down_payment_amount'
        ];

        numericFields.forEach(field => {
          if (field in cleanedData) {
            const value = cleanedData[field];

            // Convert empty strings to null
            if (value === "" || value === undefined) {
              cleanedData[field] = null;
            }
            // Convert string numbers to actual numbers
            else if (typeof value === 'string' && !isNaN(Number(value))) {
              cleanedData[field] = Number(value);
            }
            // Non-numeric strings become null
            else if (typeof value === 'string' && isNaN(Number(value))) {
              cleanedData[field] = null;
            }
          }
        });

        // Special handling for vehicle_year which might be a smallint in the database
        if ('vehicle_year' in cleanedData && cleanedData.vehicle_year === '') {
          cleanedData.vehicle_year = null;
        }

        // 4. Ensure all required arrays exist and are properly formatted
        const arrayFields = [
          'references', 'existing_loans', 'business_descriptions',
          'market_info', 'financial_indicators', 'financial_indicators_medium'
        ];

        arrayFields.forEach(field => {
          // If the field doesn't exist or isn't an array, set to empty array
          if (!cleanedData[field] || !Array.isArray(cleanedData[field])) {
            cleanedData[field] = [];
          }

          // Special handling for references field
          if (field === 'references' && cleanedData.references.length > 0) {
            // Make sure each reference has the correct fields
            cleanedData.references = cleanedData.references.map((ref: Record<string, any>) => ({
              reference_no: ref.reference_no || ref.referenceNo || "",
              name: ref.name || "",
              cnic: ref.cnic || "",
              relationship: ref.relationship || "",
              contact_no: ref.contact_no || ref.contactNo || "",
              address: ref.address || ""
            }));
          }
        });

        // 4. Remove any undefined or circular reference values
        const safeData = JSON.parse(JSON.stringify(cleanedData));

        // 5. Additional validation - check for problematic values
        const problematicFields = [];
        Object.entries(safeData).forEach(([key, value]) => {
          if (value === "1970-01-01" || value === "1970-01-01T00:00:00.000Z") {
            safeData[key] = null;
            problematicFields.push(key);
          }
        });
        
        if (problematicFields.length > 0) {
          console.warn("Fixed problematic date fields:", problematicFields);
        }

        console.log("Sending cleaned data to backend:", safeData);

        let response;

        try {
          // First attempt with full data including references
          response = await fetch(`${backendUrl}/api/smeasaan`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(safeData)
          });

          // If that fails, try again without child tables
          if (!response.ok) {
            console.log("First attempt failed, trying without child tables...");

            // Create a stripped down version without child tables
            const mainFieldsOnly = { ...safeData };

            // Remove child tables which might be causing issues
            delete mainFieldsOnly.references;
            delete mainFieldsOnly.existing_loans;
            delete mainFieldsOnly.business_descriptions;
            delete mainFieldsOnly.market_info;
            delete mainFieldsOnly.financial_indicators;
            delete mainFieldsOnly.financial_indicators_medium;

            // Try again with just the main fields
            response = await fetch(`${backendUrl}/api/smeasaan`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(mainFieldsOnly)
            });
          }
        } catch (fetchError: unknown) {
          console.error("Fetch error:", fetchError);
          throw new Error("Network error: " + (fetchError instanceof Error ? fetchError.message : String(fetchError)));
        }

        // Try to parse response as text first
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let result;
        try {
          result = JSON.parse(responseText);
          console.log("Parsed response:", result);
        } catch (e) {
          console.error("Failed to parse response as JSON:", e);
          result = { message: responseText };
        }

        if (!response.ok) {
          console.error("Backend error details:", {
            status: response.status,
            statusText: response.statusText,
            responseText: responseText,
            result: result
          });
          throw new Error(result.error || result.message || `Server responded with status: ${response.status}`);
        }

        console.log("API request successful:", result);

        // Show success message
        toast({
          title: "Application Submitted",
          description: `Application ID: ${result.application_id || result.id} has been successfully submitted.`,
        });

        // Optionally navigate to a success page
        // router.push(`/dashboard/applicant/auto/sme-asaan/success?id=${result.application_id}`);
      } catch (error: any) {
        console.error('Error from API:', error);

        toast({
          variant: "destructive",
          title: "Submission Error",
          description: error.message || "Failed to submit application. Please try again.",
        });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Could not connect to the server. Please check your network connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        SME Asaan Application Form
      </h1>

      {/* Customer Info Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {customerData?.isETB ? (
                <User className="w-8 h-8 text-green-600" />
              ) : (
                <CreditCard className="w-8 h-8 text-blue-600" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  SME Asaan Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Consumer ID: {customerData?.cifData?.customerId || 'N/A'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${customerData?.isETB
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}>
                    {customerData?.isETB ? 'Existing Customer (ETB)' : 'New Customer (NTB)'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/debug-smeasaan-submission', { method: 'POST' });
                    const data = await response.json();
                    console.log('🧪 Test submission result:', data);
                    alert(`Test result: ${data.success ? 'SUCCESS' : 'FAILED'}\n${data.message || data.error}`);
                  } catch (error) {
                    console.error('Test failed:', error);
                    alert('Test failed');
                  }
                }}
              >
                Test Submission
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/applicant')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Selection
              </Button>
            </div>
          </div>

          {customerData?.personalDetails && (
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

      {/* Chips Navigation */}
      <h3 className="text-lg font-semibold mt-10 text-gray-700 mb-2">Form Sections</h3>
      <div className="flex flex-wrap gap-2 mb-6">
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

      <form className="space-y-10" onSubmit={handleSubmit}>
        <div className="mt-8" ref={refs.general}><SMEGeneralInfoForm /></div>
        <div ref={refs.relationship}><SMERelationshipDetailForm /></div>
        <div ref={refs.personalDetail}><SMEApplicantPersonalDetailForm /></div>
        <div ref={refs.businessDetail}><SMEApplicantBusinessDetailForm /></div>
        <div ref={refs.vehicle}>
          <SMEVehicleDetailsSection
            values={vehicleDetails}
            onChange={(field, value) => setVehicleDetails(prev => ({ ...prev, [field]: value }))}
          />
        </div>
        <div ref={refs.sellerDealer}>
          <SMESellerDealerDetailsSection
            values={sellerDealerDetails}
            onChange={(field, value) => setSellerDealerDetails(prev => ({ ...prev, [field]: value }))}
          />
        </div>
        <div ref={refs.proposedLoan}>
          <SMEProposedLoanDetailSection
            values={proposedLoanDetails}
            onChange={(field, value) => setProposedLoanDetails(prev => ({ ...prev, [field]: value }))}
          />
        </div>
        <div ref={refs.loanFacility}><SMELoanFacilityDetailsForm /></div>
        <div ref={refs.references}><SMEReferencesForm /></div>

        {/* noo need these form section */}
        {/* <div ref={refs.banking}><SMEBankingDetailsForm /></div> */}

        {/* noo need these form section */}
        {/* <div ref={refs.existingLoan}><SMEExistingLoanDetailsForm /></div> */}
        <div ref={refs.declaration}><SMEDeclarationForm /></div>
        <div ref={refs.asaanDetails}><SmeAsaanDetailsSection /></div>
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
