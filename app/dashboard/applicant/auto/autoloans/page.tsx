"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ProductProgramForm } from '@/components/forms/autoloan/ProductProgramForm';
import { VehicleDetailsForm } from '@/components/forms/autoloan/VehicleDetailsForm';
import { InsuranceDetailsForm } from '@/components/forms/autoloan/InsuranceDetailsForm';
import { DealerDetailsForm } from '@/components/forms/autoloan/DealerDetailsForm';
import { PersonalDetailsForm } from '@/components/forms/autoloan/PersonalDetailsForm';
import { OccupationForm } from '@/components/forms/autoloan/OccupationForm';
import { IncomeDetailsForm } from '@/components/forms/autoloan/IncomeDetailsForm';
import { BankingDetailsForm } from '@/components/forms/autoloan/BankingDetailsForm';
import { ExposureUndertakingForm } from '@/components/forms/autoloan/ExposureUndertakingForm';
import { ReferencesForm } from '@/components/forms/autoloan/ReferencesForm';
import { FinancingOptionForm } from '@/components/forms/autoloan/FinancingOptionForm';
import { SignaturesForm } from '@/components/forms/autoloan/SignaturesForm';
import { BankUseOnlyForm } from '@/components/forms/autoloan/BankUseOnlyForm';
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// 1. Define section keys and labels
type SectionKey =
  | "product"
  | "vehicle"
  | "insurance"
  | "dealer"
  | "personal"
  | "occupation"
  | "income"
  | "banking"
  | "exposure"
  | "references"
  | "financing"
  | "signatures"
  | "bankUse";

const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "product", label: "Product Program" },
  { key: "vehicle", label: "Vehicle Details" },
  { key: "insurance", label: "Insurance Details" },
  { key: "dealer", label: "Dealer Details" },
  { key: "personal", label: "Personal Details" },
  { key: "occupation", label: "Occupation" },
  { key: "income", label: "Income Details" },
  { key: "banking", label: "Banking Details" },
  { key: "exposure", label: "Exposure/Undertaking" },
  { key: "references", label: "References" },
  { key: "financing", label: "Financing Option" },
  { key: "signatures", label: "Signatures" },
  { key: "bankUse", label: "Bank Use Only" },
];

// 2. Dummy "filled" checks (adjust as needed for real validation)
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => ({
  product: !!customerData?.productProgram,
  vehicle: !!customerData?.vehicleDetails,
  insurance: !!customerData?.insuranceDetails,
  dealer: !!customerData?.dealerDetails,
  personal: !!customerData?.personalDetails?.fullName,
  occupation: !!customerData?.occupation,
  income: !!customerData?.incomeDetails,
  banking: !!customerData?.bankingDetails,
  exposure: !!customerData?.exposureUndertaking,
  references: !!customerData?.references,
  financing: !!customerData?.financingOption,
  signatures: !!customerData?.signatures,
  bankUse: !!customerData?.bankUseOnly,
});

export default function AutoLoanPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

  // 3. Section refs for scroll
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    product: useRef<HTMLDivElement>(null),
    vehicle: useRef<HTMLDivElement>(null),
    insurance: useRef<HTMLDivElement>(null),
    dealer: useRef<HTMLDivElement>(null),
    personal: useRef<HTMLDivElement>(null),
    occupation: useRef<HTMLDivElement>(null),
    income: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    exposure: useRef<HTMLDivElement>(null),
    references: useRef<HTMLDivElement>(null),
    financing: useRef<HTMLDivElement>(null),
    signatures: useRef<HTMLDivElement>(null),
    bankUse: useRef<HTMLDivElement>(null),
  };

  const [currentSection, setCurrentSection] = useState<SectionKey>("product");
  const sectionFilled = useSectionFilled(customerData);

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

  // 4. Scroll helper
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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Chips/Tabs Navigation */} 
       <h2 className="text-3xl text-center font-bold text-blue-600"> UBL Auto Loan Application</h2>
      

      {/* Customer Info Header */}
      <Card className="bg-gradient-to-r from-green-50 to-green-50 border-green-200">
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
                  UBL Auto Loan Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Customer ID: {customerData.customerId}
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
              {customerData.personalDetails.fullName && (
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <div className="text-gray-900">{customerData.personalDetails.fullName}</div>
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

<div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mt-10 mb-2">Form Sections</h3>
      <div className="flex flex-wrap gap-2 mb-6 ">
        {FORM_SECTIONS.map(section => (
          <button
            key={section.key}
            type="button"
            onClick={() => scrollToSection(section.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-2xl shadow
              text-sm font-semibold border transition-all
              ${currentSection === section.key
                ? "bg-blue-500 text-white border-blue-500"
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

      {/* Sections with refs for scroll */}
      <div className="space-y-10">
        <div ref={refs.product}><ProductProgramForm /></div>
        <div ref={refs.vehicle}><VehicleDetailsForm /></div>
        <div ref={refs.insurance}><InsuranceDetailsForm /></div>
        <div ref={refs.dealer}><DealerDetailsForm /></div>
        <div ref={refs.personal}><PersonalDetailsForm /></div>
        <div ref={refs.occupation}><OccupationForm /></div>
        <div ref={refs.income}><IncomeDetailsForm /></div>
        <div ref={refs.banking}><BankingDetailsForm /></div>
        <div ref={refs.exposure}><ExposureUndertakingForm /></div>
        <div ref={refs.references}><ReferencesForm /></div>
        <div ref={refs.financing}><FinancingOptionForm /></div>
        <div ref={refs.signatures}><SignaturesForm /></div>
        <div ref={refs.bankUse}><BankUseOnlyForm /></div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
          >
            Submit Application
          </button>
        </div>
      </div>

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
