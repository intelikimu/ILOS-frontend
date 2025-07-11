// pages/auto-loan.tsx
"use client"
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
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AutoLoanPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Customer Info Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
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
                  UBL Auto Loan Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Customer ID: {customerData.customerId}
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

      {/* Form Sections */}
      <div className="space-y-10">
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
    </div>
  );
}
