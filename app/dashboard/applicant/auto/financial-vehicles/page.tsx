// app/dashboard/applicant/auto/financial-vehicles/page.tsx

import { GeneralInfoForm } from "@/components/forms/vehicle/GeneralInfoForm";
import { RelationshipDetailForm } from "@/components/forms//vehicle/RelationshipDetailForm"
import { ApplicantPersonalDetailForm } from "@/components/forms//vehicle/ApplicantPersonalDetailForm"
import { ApplicantBusinessDetailForm } from "@/components/forms//vehicle/ApplicantBusinessDetailForm"
import { VehicleDetailForm } from "@/components/forms//vehicle/VehicleDetailForm"
import { SellerDealerDetailForm } from "@/components/forms//vehicle/SellerDealerDetailForm"
import { ProposedLoanDetailForm } from "@/components/forms//vehicle/ProposedLoanDetailForm"
import { ReferencesDetailForm } from "@/components/forms//vehicle/ReferencesDetailForm"
import { ExistingLoanDetailsForm } from "@/components/forms//vehicle/ExistingLoanDetailsForm"
import { MarketInfoForm } from "@/components/forms//vehicle/MarketInfoForm"
import { FinancialIndicatorsForm } from "@/components/forms//vehicle/FinancialIndicatorsForm"
import { UndertakingForm } from "@/components/forms//vehicle/UndertakingForm"

export default function CommercialVehicleFinancingPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        Commercial Vehicle Financing (Business Segment)
      </h1>
      <form className="space-y-10">
        <GeneralInfoForm />
        <RelationshipDetailForm />
        <ApplicantPersonalDetailForm />
        <ApplicantBusinessDetailForm />
        <VehicleDetailForm />
        <SellerDealerDetailForm />
        <ProposedLoanDetailForm />
        <ReferencesDetailForm />
        <ExistingLoanDetailsForm />
        <MarketInfoForm />
        <FinancialIndicatorsForm />
        <UndertakingForm />
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
  )
}
