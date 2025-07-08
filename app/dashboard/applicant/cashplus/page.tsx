// app/dashboard/applicant/cashplus/page.tsx

"use client"
import React from 'react';
import { CashplusApplicationTypeForm } from '@/components/forms/Cashplus/CashplusApplicationTypeForm';
import { CashplusPersonalInfoForm } from '@/components/forms/Cashplus/CashplusPersonalInfoForm';
import { CashplusEmploymentInfoForm } from '@/components/forms/Cashplus/CashplusEmploymentInfoForm';
import { CashplusIncomeDetailsForm } from '@/components/forms/Cashplus/CashplusIncomeDetailsForm';
import { CashplusBankingDetailsForm } from '@/components/forms/Cashplus/CashplusBankingDetailsForm';
import { CashplusLoanPreferenceForm } from '@/components/forms/Cashplus/CashplusLoanPreferenceForm';
import { CashplusExposureTable } from '@/components/forms/Cashplus/CashplusExposureTable';
import { CashplusReferencesForm } from '@/components/forms/Cashplus/CashplusReferencesForm';
import { CashplusApplicantDeclarationForm } from '@/components/forms/Cashplus/CashplusApplicantDeclarationForm';
import { CashplusBankUseOnlyForm } from '@/components/forms/Cashplus/CashplusBankUseOnlyForm';
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CashplusPage() {
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
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {customerData.customerType === 'ETB' ? (
                <User className="w-8 h-8 text-green-600" />
              ) : (
                <CreditCard className="w-8 h-8 text-blue-600" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  UBL Cashplus Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Consumer ID: {customerData.consumerId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    customerData.customerType === 'ETB' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {customerData.customerType === 'ETB' ? 'Existing Customer (ETB)' : 'New Customer (NTB)'}
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

      {/* Form Sections */}
      <div className="space-y-10">
        <CashplusApplicationTypeForm />
        <CashplusPersonalInfoForm />
        <CashplusEmploymentInfoForm />
        <CashplusIncomeDetailsForm />
        <CashplusBankingDetailsForm />
        <CashplusLoanPreferenceForm />
        {/* Exposure Details - Multiple Tables */}
        <div className="space-y-6">
          <CashplusExposureTable
            title="A. Credit Cards (Clean)"
            columns={["Sr #", "Bank Name", "Approved Limit"]}
            rows={3}
          />
          <CashplusExposureTable
            title="B. Credit Cards (Secured)"
            columns={["Sr #", "Bank Name", "Approved Limit"]}
            rows={3}
          />
          <CashplusExposureTable
            title="C. Personal Loans (Clean) – Existing"
            columns={["Sr #", "Bank Name", "Approved Limit", "Outstanding Amount", "As of (Application Date)"]}
            rows={3}
          />
          <CashplusExposureTable
            title="D. Other Facilities (Clean & Secured)"
            columns={["Sr #", "Bank Name", "Approved Limit", "Nature", "Current Outstanding"]}
            rows={3}
          />
          <CashplusExposureTable
            title="E. Personal Loans Under Process"
            columns={["Sr #", "Bank Name", "Facility Under Process", "Nature of Facility"]}
            rows={3}
          />
        </div>
        <CashplusReferencesForm />
        <CashplusApplicantDeclarationForm />
        <CashplusBankUseOnlyForm />
      </div>
    </div>
  );
}
