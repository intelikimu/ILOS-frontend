"use client"
import React from 'react';
import { AmeenDriveBankUseOnlyForm } from "@/components/forms/ameendrive/AmeenDriveBankUseOnlyForm";
import { AmeenDriveIncomeBankDetailsForm } from "@/components/forms/ameendrive/AmeenDriveIncomeBankDetailsForm";
import { AmeenDriveNonTaxPayersForm } from "@/components/forms/ameendrive/AmeenDriveNonTaxPayersForm";
import { AmeenDriveOccupationForm } from "@/components/forms/ameendrive/AmeenDriveOccupationForm";
import { AmeenDrivePersonalDetailsForm } from "@/components/forms/ameendrive/AmeenDrivePersonalDetailsForm";
import { AmeenDriveProductProgramForm } from "@/components/forms/ameendrive/AmeenDriveProductProgramForm";
import { AmeenDriveProfessionDetailsForm } from "@/components/forms/ameendrive/AmeenDriveProfessionDetailsForm";
import { AmeenDriveReferenceDetailsForm } from "@/components/forms/ameendrive/AmeenDriveReferenceDetailsForm";
import { AmeenDriveSignatureSectionForm } from "@/components/forms/ameendrive/AmeenDriveSignatureSectionForm";
import AmeenDriveStampsForm from "@/components/forms/ameendrive/AmeenDriveStampsForm";
import { AmeenDriveTakafulDetailsForm } from "@/components/forms/ameendrive/AmeenDriveTakafulDetailsForm";
import { AmeenDriveVehicleDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleDetailsForm";
import { AmeenDriveVehicleFacilityDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleFacilityDetailsForm";
import { useCustomer } from '@/contexts/CustomerContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AmeenDrivePage() {
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
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
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
                                    UBL Ameen Drive Application
                                </h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-lg font-semibold text-gray-700">
                                        Consumer ID: {customerData.customerId || 'N/A'}
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
                <AmeenDriveProductProgramForm />
                <AmeenDriveVehicleDetailsForm />
                <AmeenDriveVehicleFacilityDetailsForm />
                <AmeenDriveTakafulDetailsForm />
                <AmeenDrivePersonalDetailsForm />
                <AmeenDriveOccupationForm />
                <AmeenDriveProfessionDetailsForm />
                <AmeenDriveIncomeBankDetailsForm />
                <AmeenDriveNonTaxPayersForm />
                <AmeenDriveReferenceDetailsForm />
                <AmeenDriveSignatureSectionForm />
                <AmeenDriveStampsForm />
                <AmeenDriveBankUseOnlyForm />
            </div>
        </div>
    );
}
