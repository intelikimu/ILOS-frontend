"use client"
import React, { useEffect, useRef, useState } from 'react';
import { CreditCardTypeForm } from "@/components/forms/creditcard/CreditCardTypeForm";
import { CreditCardRewardProgramForm } from "@/components/forms/creditcard/CreditCardRewardProgramForm";
import { CreditCardApplicantInfoForm } from "@/components/forms/creditcard/CreditCardApplicantInfoForm";
import { CreditCardAddressForm } from "@/components/forms/creditcard/CreditCardAddressForm";
import { CreditCardEmploymentIncomeForm } from "@/components/forms/creditcard/CreditCardEmploymentIncomeForm";
import { CreditCardBankingDetailsForm } from "@/components/forms/creditcard/CreditCardBankingDetailsForm";
import { CreditCardReferencesForm } from "@/components/forms/creditcard/CreditCardReferencesForm";
import { CreditCardDeclarationForm } from "@/components/forms/creditcard/CreditCardDeclarationForm";
import { CreditCardIncomeDetailsForm } from "@/components/forms/creditcard/CreditCardIncomeDetailsForm";
import { CreditCardPreviousEmploymentForm } from "@/components/forms/creditcard/CreditCardPreviousEmploymentForm";
import { CreditCardNextOfKinForm } from "@/components/forms/creditcard/CreditCardNextOfKinForm";
import { CreditCardEmploymentDetailsForm } from "@/components/forms/creditcard/CreditCardEmploymentDetailsForm";
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type SectionKey =
  | "type"
  | "reward"
  | "applicant"
  | "address"
  | "employment"
  | "prevEmployment"
  | "employmentIncome"
  | "income"
  | "banking"
  | "references"
  | "kin"
  | "declaration";

const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "type", label: "Card Type" },
  { key: "reward", label: "Reward Program" },
  { key: "applicant", label: "Applicant Info" },
  { key: "address", label: "Address" },
  { key: "employment", label: "Employment Details" },
  { key: "prevEmployment", label: "Previous Employment" },
  { key: "employmentIncome", label: "Employment Income" },
  { key: "income", label: "Income Details" },
  { key: "banking", label: "Banking" },
  { key: "references", label: "References" },
  { key: "kin", label: "Next of Kin" },
  { key: "declaration", label: "Declaration" },
];

const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => ({
  type: !!customerData?.cardType, // Replace with real check if needed
  reward: !!customerData?.rewardProgram, // Same
  applicant: !!customerData?.personalDetails
    && !!customerData.personalDetails.fullName
    && !!customerData.personalDetails.cnic
    && !!customerData.personalDetails.dateOfBirth,
  address: !!customerData?.addressDetails
    && !!customerData.addressDetails.currentAddress
    && !!customerData.addressDetails.permanentAddress,
  employment: !!customerData?.employmentDetails
    && !!customerData.employmentDetails.organization
    && !!customerData.employmentDetails.designation
    && !!customerData.employmentDetails.dateOfJoining,
  prevEmployment: !!customerData?.previousEmployment
    && !!customerData.previousEmployment.organization,
  employmentIncome: !!customerData?.employmentIncome
    && !!customerData.employmentIncome.monthlySalary,
  income: !!customerData?.incomeDetails
    && !!customerData.incomeDetails.otherIncome,
  banking: !!customerData?.bankingDetails
    && !!customerData.bankingDetails.accountNumber,
  references: !!customerData?.references
    && customerData.references.length > 0,
  kin: !!customerData?.nextOfKin
    && !!customerData.nextOfKin.fullName,
  declaration: !!customerData?.declaration
    && !!customerData.declaration.agreeToTerms,
});




export default function CreditCardApplicationPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
  type: useRef<HTMLDivElement>(null),
  reward: useRef<HTMLDivElement>(null),
  applicant: useRef<HTMLDivElement>(null),
  address: useRef<HTMLDivElement>(null),
  employment: useRef<HTMLDivElement>(null),
  prevEmployment: useRef<HTMLDivElement>(null),
  employmentIncome: useRef<HTMLDivElement>(null),
  income: useRef<HTMLDivElement>(null),
  banking: useRef<HTMLDivElement>(null),
  references: useRef<HTMLDivElement>(null),
  kin: useRef<HTMLDivElement>(null),
  declaration: useRef<HTMLDivElement>(null),
};

  const [currentSection, setCurrentSection] = useState("");
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
  const scrollToSection = (key: string) => {
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
                  UBL Credit Card Application
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
                  <div className="text-gray-900">{customerData.personalDetails.firstName} {customerData.personalDetails.lastName}</div>
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

      {/* Tabs/Chips Navigation */}
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
              ${currentSection === section.key ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-800 border-gray-200"}
              ${sectionFilled[section.key] ? "ring-2 ring-green-400" : ""}
            `}
          >
            {section.label}
            {sectionFilled[section.key] && <CheckCircle2 className="w-4 h-4 text-green-600" />}
          </button>
        ))}
      </div>
      </div>

      {/* Form Sections Wrapped with refs for scroll */}
      <div className="space-y-10">
        <div ref={refs.type}><CreditCardTypeForm /></div>
        <div ref={refs.reward}><CreditCardRewardProgramForm /></div>
        <div ref={refs.applicant}><CreditCardApplicantInfoForm /></div>
        <div ref={refs.address}><CreditCardAddressForm /></div>
        <div ref={refs.employment}><CreditCardEmploymentDetailsForm /></div>
        <div ref={refs.kin}><CreditCardNextOfKinForm /></div>
        <div ref={refs.prevEmployment}><CreditCardPreviousEmploymentForm /></div>
        <div ref={refs.employmentIncome}><CreditCardEmploymentIncomeForm /></div>
        <div ref={refs.income}><CreditCardIncomeDetailsForm /></div>
        <div ref={refs.banking}><CreditCardBankingDetailsForm /></div>
        <div ref={refs.references}><CreditCardReferencesForm /></div>
        <div ref={refs.declaration}><CreditCardDeclarationForm /></div>
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
