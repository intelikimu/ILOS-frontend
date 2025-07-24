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
    !!customerData?.generalInfo?.product &&
    !!customerData?.generalInfo?.subOption &&
    !!customerData?.generalInfo?.cnic,
  relationshipDetail:
  !!customerData?.relationshipDetail?.relationshipType &&
  !!customerData?.relationshipDetail?.relationshipStatus &&
  !!customerData?.relationshipDetail?.relationshipStartDate,
  personalDetails:
    !!customerData?.personalDetails?.fullName &&
    !!customerData?.personalDetails?.cnic,
  businessDetails:
    !!customerData?.businessDetails?.businessName &&
    !!customerData?.businessDetails?.businessType &&
    !!customerData?.businessDetails?.registrationNumber,
  vehicleDetails:
    !!customerData?.vehicleDetails?.make &&
    !!customerData?.vehicleDetails?.model,
  sellerDealerDetails:
    !!customerData?.sellerDealerDetails?.dealerName,
  proposedLoanDetails:
    !!customerData?.proposedLoanDetails?.loanAmount,
  references:
    Array.isArray(customerData?.references) && customerData.references.length > 0,
  existingLoan:
    typeof customerData?.existingLoan !== "undefined",
  marketInfo:
    !!customerData?.marketInfo?.marketValue,
  financialIndicators:
    !!customerData?.financialIndicators?.monthlyIncome,
  undertaking:
    !!customerData?.undertaking?.agreed,
});
export default function CommercialVehicleFinancingPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

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



      <form className="space-y-10 mt-8">
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
