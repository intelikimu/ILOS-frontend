// pages/auto-loan.tsx
import React from 'react';
import { ProductProgramForm } from '@/components/forms/autoloan/ProductProgramForm';
import { VehicleDetailsForm } from '@/components/forms/autoloan/VehicleDetailsForm';
import { InsuranceDetailsForm } from '@/components/forms/autoloan/InsuranceDetailsForm';
import { DealerDetailsForm } from '@/components/forms/autoloan/DealerDetailsForm';
import { PersonalDetailsForm } from '@/components/forms/autoloan/PersonalDetailsForm';
import { OccupationForm } from '@/components/forms/autoloan/OccupationForm';
import { IncomeDetailsForm } from '@/components/forms/autoloan/IncomeDetailsForm';
import { BankingDetailsForm } from '@/components/forms/autoloan/BankingDetailsForm';
import { ExposureUndertakingForm } from '@/components/forms/autoloan/ExposureUndertakingForm';
import { ReferencesForm } from '@/components/forms/autoloan/ReferencesForm';
import { FinancingOptionForm } from '@/components/forms/autoloan/FinancingOptionForm';
import { SignaturesForm } from '@/components/forms/autoloan/SignaturesForm';
import { BankUseOnlyForm } from '@/components/forms/autoloan/BankUseOnlyForm';

export default function AutoLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-8">UBL Auto Loan Application Form</h1>
      <ProductProgramForm />
      <VehicleDetailsForm />
      <InsuranceDetailsForm />
      <DealerDetailsForm />
      <PersonalDetailsForm />
      <OccupationForm />
      <IncomeDetailsForm />
      <BankingDetailsForm />
      <ExposureUndertakingForm />
      <ReferencesForm />
      <FinancingOptionForm />
      <SignaturesForm />
      <BankUseOnlyForm />
    </div>
  );
}
