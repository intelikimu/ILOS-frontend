"use client";

// app/dashboard/applicant/platinum-creditcard/page.tsx

import { useEffect, useRef, useState } from "react";
import { PlatinumPersonalInfoForm } from "@/components/forms/Platinum/PlatinumPersonalInfoForm";
import { PlatinumNextOfKinForm } from "@/components/forms/Platinum/PlatinumNextOfKinForm";
import { PlatinumEmploymentDetailsForm } from "@/components/forms/Platinum/PlatinumEmploymentDetailsForm";
import { PlatinumIncomeDetailsForm } from "@/components/forms/Platinum/PlatinumIncomeDetailsForm";
import { PlatinumBankingDetailsForm } from "@/components/forms/Platinum/PlatinumBankingDetailsForm";
import { PlatinumAutoDebitForm } from "@/components/forms/Platinum/PlatinumAutoDebitForm";
import { PlatinumReferenceForm } from "@/components/forms/Platinum/PlatinumReferenceForm";
import { PlatinumDeclarationForm } from "@/components/forms/Platinum/PlatinumDeclarationForm";
import { PlatinumDeclarationBankSectionForm } from "@/components/forms/Platinum/PlatinumDeclarationBankSectionForm";
import { PlatinumCreditGuardianSmsAlertForm } from "@/components/forms/Platinum/PlatinumCreditGuardianSmsAlertForm";
import { PlatinumSupplementaryCardForm } from "@/components/forms/Platinum/PlatinumSupplementaryCardForm";
import { PlatinumLienMarkedForm } from "@/components/forms/Platinum/PlatinumLienMarkedForm";
import { PlatinumBankUseOnlyForm } from "@/components/forms/Platinum/PlatinumBankUseOnlyForm";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomer } from "@/contexts/CustomerContext";
import { ArrowLeft, ChevronUp, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SectionKey =
  | "personal"
  | "kin"
  | "employment"
  | "income"
  | "banking"
  | "autoDebit"
  | "reference"
  | "declaration"
  | "declarationBank"
  | "guardianSms"
  | "supplementary"
  | "lien"
  | "bankUse";

// Define the CustomerData type
type CustomerData = {
  personalDetails?: { fullName?: string; cnic?: string; dateOfBirth?: string };
  nextOfKin?: { fullName?: string };
  employmentDetails?: { organization?: string };
  incomeDetails?: { monthlyIncome?: number };
  bankingDetails?: { accountNumber?: string };
  autoDebit?: { accountNumber?: string };
  reference?: Array<any>;
  declaration?: { agreed?: boolean };
  declarationBank?: { verified?: boolean };
  guardianSms?: { enabled?: boolean };
  supplementary?: { fullName?: string };
  lien?: { marked?: boolean };
  bankUse?: { verified?: boolean };
  isETB?: boolean;
  cifData?: { customerId?: string };
};

const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "personal", label: "Personal Info" },
  { key: "kin", label: "Next of Kin" },
  { key: "employment", label: "Employment" },
  { key: "income", label: "Income" },
  { key: "banking", label: "Banking" },
  { key: "autoDebit", label: "Auto Debit" },
  { key: "reference", label: "Reference" },
  { key: "declaration", label: "Declaration" },
  { key: "declarationBank", label: "Bank Declaration" },
  { key: "guardianSms", label: "Guardian/SMS Alert" },
  { key: "supplementary", label: "Supplementary Card" },
  { key: "lien", label: "Lien Marked" },
  { key: "bankUse", label: "Bank Use Only" },
];

const useSectionFilled = (customerData: CustomerData): Record<SectionKey, boolean> => ({
  personal:
    !!customerData?.personalDetails?.fullName &&
    !!customerData?.personalDetails?.cnic &&
    !!customerData?.personalDetails?.dateOfBirth,
  kin: !!customerData?.nextOfKin?.fullName,
  employment: !!customerData?.employmentDetails?.organization,
  income: !!customerData?.incomeDetails?.monthlyIncome,
  banking: !!customerData?.bankingDetails?.accountNumber,
  autoDebit: !!customerData?.autoDebit?.accountNumber,
  reference: Array.isArray(customerData?.reference) && customerData.reference.length > 0,
  declaration: !!customerData?.declaration?.agreed,
  declarationBank: !!customerData?.declarationBank?.verified,
  guardianSms: !!customerData?.guardianSms?.enabled,
  supplementary: !!customerData?.supplementary?.fullName,
  lien: !!customerData?.lien?.marked,
  bankUse: !!customerData?.bankUse?.verified,
});

export default function PlatinumCreditCardPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

  // Create refs for each section
  const personalRef = useRef<HTMLDivElement>(null);
  const kinRef = useRef<HTMLDivElement>(null);
  const employmentRef = useRef<HTMLDivElement>(null);
  const incomeRef = useRef<HTMLDivElement>(null);
  const bankingRef = useRef<HTMLDivElement>(null);
  const autoDebitRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const declarationRef = useRef<HTMLDivElement>(null);
  const declarationBankRef = useRef<HTMLDivElement>(null);
  const guardianSmsRef = useRef<HTMLDivElement>(null);
  const supplementaryRef = useRef<HTMLDivElement>(null);
  const lienRef = useRef<HTMLDivElement>(null);
  const bankUseRef = useRef<HTMLDivElement>(null);

  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    personal: personalRef,
    kin: kinRef,
    employment: employmentRef,
    income: incomeRef,
    banking: bankingRef,
    autoDebit: autoDebitRef,
    reference: referenceRef,
    declaration: declarationRef,
    declarationBank: declarationBankRef,
    guardianSms: guardianSmsRef,
    supplementary: supplementaryRef,
    lien: lienRef,
    bankUse: bankUseRef,
  };

  const [currentSection, setCurrentSection] = useState<SectionKey | "">("");
  const sectionFilled = useSectionFilled(customerData || {});

  // Helper to scroll to section
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
        UBL Platinum Credit Card Application
      </h1>

      <div>
        <Card className="bg-gradient-to-r from-green-50 to-green-50 border-green-200">
          <CardContent className="p-6">
            {/* Customer info header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {customerData?.isETB ? (
                  <User className="w-8 h-8 text-green-600" />
                ) : (
                  <CreditCard className="w-8 h-8 text-blue-600" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    UBL Platinum Credit Card Application
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
            {customerData && customerData.personalDetails && (
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
                {customerData.personalDetails.dateOfBirth && (
                  <div>
                    <span className="font-medium text-gray-600">Date of Birth:</span>
                    <div className="text-gray-900">{customerData.personalDetails.dateOfBirth}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

       {/* Chips Navigation */}
       <div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-2">Form Sections</h3>
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
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-50 text-gray-800 border-gray-200"}
              ${sectionFilled[section.key] ? "ring-2 ring-green-400" : ""}
            `}
          >
            {section.label}
            {sectionFilled[section.key] && (
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            )}
          </button>
        ))}
      </div>
       </div>

      <form className="space-y-10 mt-10">
        <div ref={personalRef}><PlatinumPersonalInfoForm /></div>
        <div ref={kinRef}><PlatinumNextOfKinForm /></div>
        <div ref={employmentRef}><PlatinumEmploymentDetailsForm /></div>
        <div ref={incomeRef}><PlatinumIncomeDetailsForm /></div>
        <div ref={bankingRef}><PlatinumBankingDetailsForm /></div>
        <div ref={autoDebitRef}><PlatinumAutoDebitForm /></div>
        <div ref={referenceRef}><PlatinumReferenceForm /></div>
        <div ref={declarationRef}><PlatinumDeclarationForm /></div>
        <div ref={declarationBankRef}><PlatinumDeclarationBankSectionForm /></div>
        <div ref={guardianSmsRef}><PlatinumCreditGuardianSmsAlertForm /></div>
        <div ref={supplementaryRef}><PlatinumSupplementaryCardForm /></div>
        <div ref={lienRef}><PlatinumLienMarkedForm /></div>
        <div ref={bankUseRef}><PlatinumBankUseOnlyForm /></div>
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