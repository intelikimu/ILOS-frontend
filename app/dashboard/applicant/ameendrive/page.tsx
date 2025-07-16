"use client"
import React, { useEffect, useRef, useState } from 'react';
import { AmeenDriveBankUseOnlyForm } from "@/components/forms/ameendrive/AmeenDriveBankUseOnlyForm";
import { AmeenDriveIncomeBankDetailsForm } from "@/components/forms/ameendrive/AmeenDriveIncomeBankDetailsForm";
import { AmeenDriveNonTaxPayersForm } from "@/components/forms/ameendrive/AmeenDriveNonTaxPayersForm";
import { AmeenDriveOccupationForm } from "@/components/forms/ameendrive/AmeenDriveOccupationForm";
import { AmeenDrivePersonalDetailsForm } from "@/components/forms/ameendrive/AmeenDrivePersonalDetailsForm";
import { AmeenDriveProductProgramForm } from "@/components/forms/ameendrive/AmeenDriveProductProgramForm";
import { AmeenDriveProfessionDetailsForm } from "@/components/forms/ameendrive/AmeenDriveProfessionDetailsForm";
import { AmeenDriveReferenceDetailsForm } from "@/components/forms/ameendrive/AmeenDriveReferenceDetailsForm";
import { AmeenDriveSignatureSectionForm } from "@/components/forms/ameendrive/AmeenDriveSignatureSectionForm";
import AmeenDriveStampsForm from "@/components/forms/ameendrive/AmeenDriveStampsForm";
import { AmeenDriveTakafulDetailsForm } from "@/components/forms/ameendrive/AmeenDriveTakafulDetailsForm";
import { AmeenDriveVehicleDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleDetailsForm";
import { AmeenDriveVehicleFacilityDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleFacilityDetailsForm";
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';





// 1. Section key type
type SectionKey =
  | "product"
  | "vehicle"
  | "vehicleFacility"
  | "takaful"
  | "personal"
  | "occupation"
  | "profession"
  | "incomeBank"
  | "nonTaxPayer"
  | "reference"
  | "signature"
  | "stamps"
  | "bankUse";

const FORM_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "product", label: "Product Program" },
  { key: "vehicle", label: "Vehicle Details" },
  { key: "vehicleFacility", label: "Vehicle Facility Details" },
  { key: "takaful", label: "Takaful Details" },
  { key: "personal", label: "Personal Details" },
  { key: "occupation", label: "Occupation" },
  { key: "profession", label: "Profession Details" },
  { key: "incomeBank", label: "Income/Bank Details" },
  { key: "nonTaxPayer", label: "Non-Tax Payer" },
  { key: "reference", label: "Reference" },
  { key: "signature", label: "Signature" },
  { key: "stamps", label: "Stamps" },
  { key: "bankUse", label: "Bank Use Only" },
];

// 2. Dummy filled-check logic, update as per your data shape!
const useSectionFilled = (customerData: any): Record<SectionKey, boolean> => ({
  product: !!customerData?.productProgram,
  vehicle: !!customerData?.vehicleDetails,
  vehicleFacility: !!customerData?.vehicleFacilityDetails,
  takaful: !!customerData?.takafulDetails,
  personal: !!customerData?.personalDetails?.firstName && !!customerData?.personalDetails?.cnic,
  occupation: !!customerData?.occupation,
  profession: !!customerData?.professionDetails,
  incomeBank: !!customerData?.incomeBankDetails,
  nonTaxPayer: !!customerData?.nonTaxPayer,
  reference: !!customerData?.referenceDetails,
  signature: !!customerData?.signatureSection,
  stamps: !!customerData?.stamps,
  bankUse: !!customerData?.bankUse,
});

export default function AmeenDrivePage() {
  const { customerData } = useCustomer();
  const router = useRouter();

  // 3. Section refs for scroll with correct typing
  const refs: Record<SectionKey, React.RefObject<HTMLDivElement | null>> = {
    product: useRef<HTMLDivElement>(null),
    vehicle: useRef<HTMLDivElement>(null),
    vehicleFacility: useRef<HTMLDivElement>(null),
    takaful: useRef<HTMLDivElement>(null),
    personal: useRef<HTMLDivElement>(null),
    occupation: useRef<HTMLDivElement>(null),
    profession: useRef<HTMLDivElement>(null),
    incomeBank: useRef<HTMLDivElement>(null),
    nonTaxPayer: useRef<HTMLDivElement>(null),
    reference: useRef<HTMLDivElement>(null),
    signature: useRef<HTMLDivElement>(null),
    stamps: useRef<HTMLDivElement>(null),
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

  // 4. Helper for scroll
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
      <h2 className="text-3xl text-center  font-bold text-blue-500">  UBL Ameen Drive Application</h2>

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
                  UBL Ameen Drive Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Consumer ID: {customerData.customerId || 'N/A'}
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

       {/* Chips/Tabs Navigation */}

       <div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 py-4 mb-2">Form Sections</h3>
      <div className="flex flex-wrap gap-2 mb-6">
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

      {/* Sections - Wrapped in refs for scroll */}
      <div className="space-y-10">
        <div ref={refs.product}><AmeenDriveProductProgramForm /></div>
        <div ref={refs.vehicle}><AmeenDriveVehicleDetailsForm /></div>
        <div ref={refs.takaful}><AmeenDriveTakafulDetailsForm /></div>
        <div ref={refs.vehicleFacility}><AmeenDriveVehicleFacilityDetailsForm /></div>
        <div ref={refs.personal}><AmeenDrivePersonalDetailsForm /></div>
        <div ref={refs.occupation}><AmeenDriveOccupationForm /></div>
        <div ref={refs.profession}><AmeenDriveProfessionDetailsForm /></div>
        <div ref={refs.incomeBank}><AmeenDriveIncomeBankDetailsForm /></div>
        <div ref={refs.nonTaxPayer}><AmeenDriveNonTaxPayersForm /></div>
        <div ref={refs.reference}><AmeenDriveReferenceDetailsForm /></div>
        <div ref={refs.signature}><AmeenDriveSignatureSectionForm /></div>
        <div ref={refs.stamps}><AmeenDriveStampsForm /></div>
        <div ref={refs.bankUse}><AmeenDriveBankUseOnlyForm /></div>
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