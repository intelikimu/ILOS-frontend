// app/dashboard/applicant/creditcard/page.tsx

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


export default function CreditCardApplicationPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        UBL Credit Card Application Form
      </h1>
      <form className="space-y-10">
        <CreditCardTypeForm />
        <CreditCardRewardProgramForm />
        <CreditCardApplicantInfoForm />
        <CreditCardAddressForm />
        <CreditCardEmploymentIncomeForm />
        <CreditCardNextOfKinForm />
        <CreditCardEmploymentDetailsForm />
        <CreditCardPreviousEmploymentForm />
        <CreditCardIncomeDetailsForm />
        <CreditCardBankingDetailsForm />
        <CreditCardReferencesForm />
        <CreditCardDeclarationForm />
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
