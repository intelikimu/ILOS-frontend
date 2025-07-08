// app/dashboard/applicant/cashplus/page.tsx

import { CashplusPersonalInfoForm } from "@/components/forms/Cashplus/CashplusPersonalInfoForm";
import { CashplusEmploymentInfoForm } from "@/components/forms/Cashplus/CashplusEmploymentInfoForm";
import { CashplusIncomeDetailsForm } from "@/components/forms/Cashplus/CashplusIncomeDetailsForm";
import { CashplusBankingDetailsForm } from "@/components/forms/Cashplus/CashplusBankingDetailsForm";
import { CashplusExposureTable } from "@/components/forms/Cashplus/CashplusExposureTable";
import { CashplusReferencesForm } from "@/components/forms/Cashplus/CashplusReferencesForm";
import { CashplusApplicantDeclarationForm } from "@/components/forms/Cashplus/CashplusApplicantDeclarationForm";
import { CashplusBankUseOnlyForm } from "@/components/forms/Cashplus/CashplusBankUseOnlyForm";

export default function CashplusFormPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        UBL CashPlus Application Form
      </h1>
      <form className="space-y-10">
        <CashplusPersonalInfoForm />
        <CashplusEmploymentInfoForm />
        <CashplusIncomeDetailsForm />
        <CashplusBankingDetailsForm />

        {/* Exposure Details */}
        <CashplusExposureTable
          title="A. Credit Cards (Clean)"
          columns={["Sr #", "Bank Name", "Approved Limit"]}
        />
        <CashplusExposureTable
          title="B. Credit Cards (Secured)"
          columns={["Sr #", "Bank Name", "Approved Limit"]}
        />
        <CashplusExposureTable
          title="C. Personal Loans (Clean) – Existing"
          columns={["Sr #", "Bank Name", "Approved Limit", "Outstanding Amount", "As of (Application Date)"]}
        />
        <CashplusExposureTable
          title="D. Other Facilities (Clean & Secured)"
          columns={["Sr #", "Bank Name", "Approved Limit", "Nature", "Current Outstanding"]}
        />
        <CashplusExposureTable
          title="E. Personal Loans Under Process"
          columns={["Sr #", "Bank Name", "Facility Under Process", "Nature of Facility"]}
        />

        <CashplusReferencesForm />
        <CashplusApplicantDeclarationForm />
        <CashplusBankUseOnlyForm />

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
