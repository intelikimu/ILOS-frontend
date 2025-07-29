"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ProductProgramForm } from '@/components/forms/autoloan/AotuloanProductProgramForm';
import { VehicleDetailsForm } from '@/components/forms/autoloan/AutoloanVehicleDetailsForm';
import { InsuranceDetailsForm } from '@/components/forms/autoloan/AutoloanInsuranceDetailsForm';
import { DealerDetailsForm } from '@/components/forms/autoloan/AutoloanDealerDetailsForm';
import { PersonalDetailsForm } from '@/components/forms/autoloan/AutoloanPersonalDetailsForm';
import { OccupationForm } from '@/components/forms/autoloan/AutoloanOccupationForm';
import { IncomeDetailsForm } from '@/components/forms/autoloan/IncomeDetailsForm';
import { BankingDetailsForm } from '@/components/forms/autoloan/AutoloanBankingDetailsForm';
import { ExposureUndertakingForm } from '@/components/forms/autoloan/AutoloanExposureUndertakingForm';
import { ReferencesForm } from '@/components/forms/autoloan/AutoloanReferencesForm';
import { FinancingOptionForm } from '@/components/forms/autoloan/AutoloanFinancingOptionForm';
import { SignaturesForm } from '@/components/forms/autoloan/AutoloanSignaturesForm';
import { BankUseOnlyForm } from '@/components/forms/autoloan/AutoloanBankUseOnlyForm';
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// 1. Section Keys
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

// 2. API base URL
const getBaseUrl = () => {
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return process.env.NEXT_PUBLIC_API_URL || "https://ilos-backend.vercel.app";
  }
  return "http://localhost:5000";
};

const AutoLoanPage = () => {
  const { customerData } = useCustomer();
  const router = useRouter();
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [currentSection, setCurrentSection] = useState("product");

  const refs = {
    product: useRef(null),
    vehicle: useRef(null),
    insurance: useRef(null),
    dealer: useRef(null),
    personal: useRef(null),
    occupation: useRef(null),
    income: useRef(null),
    banking: useRef(null),
    exposure: useRef(null),
    references: useRef(null),
    financing: useRef(null),
    signatures: useRef(null),
    bankUse: useRef(null),
  };

  const [formData, setFormData] = useState<any>({
    customer_id: customerData?.customerId || "",
    applicant_cnic: customerData?.personalDetails?.cnic || "",
    auto_application_id: `AUTO-${Math.floor(100 + Math.random() * 900)}`,
    references: [{}, {}],
    credit_cards_clean: [{}],
    credit_cards_secured: [{}],
    personal_loans_clean: [{}],
    personal_loans_secured: [{}],
    other_facilities: [{}],
    applied_limits: [{}],


    //income details
  gross_monthly_salary: '',
  other_monthly_income: '',
  total_gross_monthly_income: '',
  net_monthly_income: '',
  other_income_type: '', // comma-separated: Rent,Business,etc.
  other_income_specify: '',
  spouse_employed: '',
  spousal_income: '',
  spouse_income_source: '',
  statement_to_be_sent: '', // comma-separated: Home,Office,etc.


    repayment_bank_name: customerData?.clientBanks?.bank_name || customerData?.cifData?.clientBanks?.bank_name || "",
    repayment_branch: customerData?.clientBanks?.branch || customerData?.cifData?.clientBanks?.branch || "",
    repayment_account_no: customerData?.clientBanks?.actt_no || customerData?.cifData?.clientBanks?.actt_no || "",
  });

  useEffect(() => {
    const scrollHandler = () => setShowUpArrow(window.scrollY > 300);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const updated = [...formData.references];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, references: updated }));
  };

  const handleExposureChange = (section: string, field: string, value: string | number) => {
    const updated = [...(formData[section] || [{}])];
    updated[0] = { ...updated[0], [field]: value };
    setFormData((prev: any) => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const payload = {
    ...formData,

    // remap frontend camelCase to backend snake_case
    company_name: formData.companyName,
    nature_of_business: formData.natureOfBusiness,
    shareholding_percent: formData.sharePct,
    employer_city: formData.employerCity,
    employer_country: formData.employerCountry,
    tehsil: formData.tehsil,


    // Exposure/References mappings
    credit_cards_clean: formData.credit_cards_clean?.map((item: any) => ({
      bank_name: item.name,
      approved_limit: item.limit,
    })),
    credit_cards_secured: formData.credit_cards_secured?.map((item: any) => ({
      bank_name: item.name,
      approved_limit: item.limit,
    })),
    personal_loans_clean: formData.personal_loans_clean?.map((item: any) => ({
      bank_name: item.name,
      approved_limit: item.limit,
      outstanding_amount: item.outstanding,
    })),
    personal_loans_secured: formData.personal_loans_secured?.map((item: any) => ({
      bank_name: item.name,
      approved_limit: item.limit,
      outstanding_amount: item.outstanding,
    })),
    other_facilities: formData.other_facilities?.map((item: any) => ({
      bank_name: item.name,
      approved_limit: item.limit,
      nature: item.nature,
      current_outstanding: item.outstanding,
    })),
    applied_limits: formData.applied_limits?.map((item: any) => ({
      bank_name: item.name,
      facility_under_process: item.facility,
      nature_of_facility: item.nature,
    })),
  };

  console.log("✅ Final Payload:", payload);

  try {
    const res = await fetch(`${getBaseUrl()}/api/autoloan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    console.log("✅ Submission Result:", result);
  } catch (err) {
    console.error("❌ Submission Error:", err);
  }
};

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (key: keyof typeof refs) =>
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!customerData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <div className="text-gray-600 mb-4">No customer data found. Please enter CNIC.</div>
          <Button onClick={() => router.push("/dashboard/applicant")}>Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl text-center font-bold text-blue-600">UBL Auto Loan Application</h2>

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
                <h2 className="text-2xl font-bold text-gray-900">UBL Auto Loan Application</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Customer ID: {customerData.customerId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    customerData.isETB ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {customerData.isETB ? "Existing Customer (ETB)" : "New Customer (NTB)"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/applicant")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border mt-8 rounded-lg px-8 border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mt-10 mb-2">Form Sections</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(refs).map(([key, _]) => (
            <button
              key={key}
              type="button"
              onClick={() => scrollToSection(key as keyof typeof refs)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl shadow text-sm font-semibold border transition-all ${
                currentSection === key
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-800 border-gray-200"
              }`}
            >
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        <div ref={refs.product}><ProductProgramForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.vehicle}><VehicleDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.insurance}><InsuranceDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.dealer}><DealerDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.personal}><PersonalDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.occupation}><OccupationForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.income}><IncomeDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.banking}><BankingDetailsForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.exposure}><ExposureUndertakingForm formData={formData} handleInputChange={handleExposureChange} /></div>
        <div ref={refs.references}><ReferencesForm formData={formData} handleReferenceChange={handleReferenceChange} /></div>
        <div ref={refs.financing}><FinancingOptionForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.signatures}><SignaturesForm formData={formData} handleInputChange={handleInputChange} /></div>
        <div ref={refs.bankUse}><BankUseOnlyForm formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} /></div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
        >
          Submit Application
        </button>
      </div>

      {showUpArrow && (
        <button
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-4 z-50 bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 shadow-xl transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </form>
  );
};

export default AutoLoanPage;

