// app/dashboard/applicant/sme-asaan/page.tsx

import { SMEGeneralInfoForm } from "@/components/forms/smeasaan/SMEGeneralInfoForm";
import { SMERelationshipDetailForm } from "@/components/forms/smeasaan/SMERelationshipDetailForm";
import { SMEApplicantPersonalDetailForm } from "@/components/forms/smeasaan/SMEApplicantPersonalDetailForm";
import { SMEApplicantBusinessDetailForm } from "@/components/forms/smeasaan/SMEApplicantBusinessDetailForm";
import { SMEBankingDetailsForm } from "@/components/forms/smeasaan/SMEBankingDetailsForm";
import { SMELoanFacilityDetailsForm } from "@/components/forms/smeasaan/SMELoanFacilityDetailsForm";
import { SMEReferencesForm } from "@/components/forms/smeasaan/SMEReferencesForm";
import { SMEExistingLoanDetailsForm } from "@/components/forms/smeasaan/SMEExistingLoanDetailsForm";
import { SMEDeclarationForm } from "@/components/forms/smeasaan/SMEDeclarationForm";


export default function SMEAsaanPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        SME Asaan Application Form
      </h1>
      <form className="space-y-10">
        <SMEGeneralInfoForm />
        <SMERelationshipDetailForm />
        <SMEApplicantPersonalDetailForm />
        <SMEApplicantBusinessDetailForm />
        <SMEBankingDetailsForm />
        <SMELoanFacilityDetailsForm />
        <SMEReferencesForm />
        <SMEExistingLoanDetailsForm />
        <SMEDeclarationForm />
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
