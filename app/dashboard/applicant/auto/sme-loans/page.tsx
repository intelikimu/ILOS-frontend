"use client";

import { experimental_useEffectEvent, useEffect, useRef, useState } from "react";
import { SMEGeneralInfoForm } from "@/components/forms/smeasaan/SMEGeneralInfoForm";
import { SMERelationshipDetailForm } from "@/components/forms/smeasaan/SMERelationshipDetailForm";
import { SMEApplicantPersonalDetailForm } from "@/components/forms/smeasaan/SMEApplicantPersonalDetailForm";
import { SMEApplicantBusinessDetailForm } from "@/components/forms/smeasaan/SMEApplicantBusinessDetailForm";
import { SMEBankingDetailsForm } from "@/components/forms/smeasaan/SMEBankingDetailsForm";
import { SMELoanFacilityDetailsForm } from "@/components/forms/smeasaan/SMELoanFacilityDetailsForm";
import { SMEReferencesForm } from "@/components/forms/smeasaan/SMEReferencesForm";
import { SMEExistingLoanDetailsForm } from "@/components/forms/smeasaan/SMEExistingLoanDetailsForm";
import { SMEDeclarationForm } from "@/components/forms/smeasaan/SMEDeclarationForm";
import { useCustomer } from "@/contexts/CustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, CheckCircle2, CreditCard, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

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
  | "declaration";

// 2. Section/tab info
const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "general", label: "General Info" },
  { key: "relationship", label: "Relationship Detail" },
  { key: "personalDetail", label: "Personal Detail" },
  { key: "businessDetail", label: "Business Detail" },
  { key: "banking", label: "Banking Details" },
  { key: "loanFacility", label: "Loan Facility" },
  { key: "references", label: "References" },
  { key: "existingLoan", label: "Existing Loan" },
  { key: "declaration", label: "Declaration" },
];

// 3. Filled check (adapt logic to your data shape)
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => {
  // These are examples; change as per your actual context/backend!
  return {
    general: !!customerData?.generalInfo?.applicationType,
    relationship: !!customerData?.relationshipManager,
    personalDetail: !!customerData?.personalDetails?.fullName,
    businessDetail: !!customerData?.businessDetails?.businessName,
    banking: !!customerData?.bankingDetails?.bank && !!customerData?.bankingDetails?.bankName,
    loanFacility: !!customerData?.loanFacility?.requestedAmount,
    references: Array.isArray(customerData?.references) && customerData.references.length > 0,
    existingLoan: customerData?.existingLoan?.hasExistingLoan !== undefined,
    declaration: !!customerData?.declaration?.agreed,
  };
};

export default function SMEAsaanPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

  // Section refs for scroll
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    general: useRef(null),
    relationship: useRef(null),
    personalDetail: useRef(null),
    businessDetail: useRef(null),
    banking: useRef(null),
    loanFacility: useRef(null),
    references: useRef(null),
    existingLoan: useRef(null),
    declaration: useRef(null),
  };

  const [currentSection, setCurrentSection] = useState<SectionKey | "">("");
  const sectionFilled = useSectionFilled(customerData || {});

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
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              customerData?.isETB 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {customerData?.isETB ? 'Existing Customer (ETB)' : 'New Customer (NTB)'}
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

      <form className="space-y-10 ">
        <div className="mt-8" ref={refs.general}><SMEGeneralInfoForm /></div>
        <div ref={refs.relationship}><SMERelationshipDetailForm /></div>
        <div ref={refs.personalDetail}><SMEApplicantPersonalDetailForm /></div>
        <div ref={refs.businessDetail}><SMEApplicantBusinessDetailForm /></div>
        <div ref={refs.banking}><SMEBankingDetailsForm /></div>
        <div ref={refs.loanFacility}><SMELoanFacilityDetailsForm /></div>
        <div ref={refs.references}><SMEReferencesForm /></div>
        <div ref={refs.existingLoan}><SMEExistingLoanDetailsForm /></div>
        <div ref={refs.declaration}><SMEDeclarationForm /></div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
          >
            Submit Application
          </button>
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
