// app/dashboard/applicant/platinum-creditcard/page.tsx

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


export default function PlatinumCreditCardPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        UBL Platinum Credit Card Application
      </h1>
      <form className="space-y-10">
        <PlatinumPersonalInfoForm />
        <PlatinumNextOfKinForm />
        <PlatinumEmploymentDetailsForm />
        <PlatinumIncomeDetailsForm />
        <PlatinumBankingDetailsForm />
        <PlatinumAutoDebitForm />
        <PlatinumReferenceForm />
        <PlatinumDeclarationForm />
        <PlatinumDeclarationBankSectionForm />
        <PlatinumCreditGuardianSmsAlertForm />
        <PlatinumSupplementaryCardForm />
        <PlatinumLienMarkedForm />
        <PlatinumBankUseOnlyForm />
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
