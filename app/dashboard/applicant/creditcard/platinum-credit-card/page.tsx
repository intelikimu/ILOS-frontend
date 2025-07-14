"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { useCustomer } from "@/contexts/CustomerContext";
import { ArrowLeft, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";



export default function PlatinumCreditCardPage() {
  const { customerData } = useCustomer();
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        UBL Platinum Credit Card Application
      </h1>

      <div>
           <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {customerData?.isETB ? (
                <User className="w-8 h-8 text-green-600" />
              ) : (
                <CreditCard className="w-8 h-8 text-blue-600" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  UBL Credit Card Application
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-gray-700">
                  Consumer ID: {customerData?.cifData?.customerId || 'N/A'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    customerData?.isETB 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {customerData?.isETB ? 'Existing Customer (ETB)' : 'New Customer (NTB)'}
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
          
          {customerData && customerData.personalDetails && (
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
      </div>


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
