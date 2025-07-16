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
      <div className="space-y-10">
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
            />
            <CashplusExposureTable
              title="B. Credit Cards (Secured)"
              columns={["Sr #", "Bank Name", "Approved Limit"]}
              rows={3}
            />
            <CashplusExposureTable
              title="C. Personal Loans (Clean) – Existing"
              columns={["Sr #", "Bank Name", "Approved Limit", "Outstanding Amount", "As of (Application Date)"]}
              rows={3}
            />
            <CashplusExposureTable
              title="D. Other Facilities (Clean & Secured)"
              columns={["Sr #", "Bank Name", "Approved Limit", "Nature", "Current Outstanding"]}
              rows={3}
            />
            <CashplusExposureTable
              title="E. Personal Loans Under Process"
              columns={["Sr #", "Bank Name", "Facility Under Process", "Nature of Facility"]}
              rows={3}
            />
          </div>
        </div>
        <div ref={refs.references}><CashplusReferencesForm /></div>
        <div ref={refs.declaration}><CashplusApplicantDeclarationForm /></div>
        <div ref={refs.bankUse}><CashplusBankUseOnlyForm /></div>
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
  };

