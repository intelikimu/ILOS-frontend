"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface CustomerData {
  consumerId: string;
  isETB: boolean;
  customerType: 'ETB' | 'NTB';
  personalDetails?: {
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    cnic?: string;
    fatherName?: string;
    motherName?: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    education?: string;
    mobileNumber?: string;
    email?: string;
    ntn?: string;
    passportNumber?: string;
    numberOfChildren?: number;
    numberOfDependents?: number;
  };
  addressDetails?: {
    currentAddress?: {
      houseNo?: string;
      street?: string;
      area?: string;
      city?: string;
      country?: string;
      postalCode?: string;
      nearestLandmark?: string;
      residentialStatus?: string;
      monthlyRent?: number;
      yearsAtAddress?: number;
      yearsInCity?: number;
    };
    permanentAddress?: {
      houseNo?: string;
      street?: string;
      area?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
  };
  employmentDetails?: {
    employerName?: string;
    designation?: string;
    department?: string;
    employmentType?: string;
    businessType?: string;
    workExperience?: number;
    monthlySalary?: number;
    officeAddress?: string;
    officePhone?: string;
  };
  bankingDetails?: {
    bankName?: string;
    branchName?: string;
    accountNumber?: string;
    accountType?: string;
    relationshipDuration?: number;
  };
  referenceContacts?: Array<{
    name?: string;
    relationship?: string;
    cnic?: string;
    mobileNumber?: string;
    address?: string;
  }>;
  nextOfKin?: {
    name?: string;
    relationship?: string;
    cnic?: string;
    contactNumber?: string;
  };
}

interface CustomerContextType {
  customerData: CustomerData | null;
  loading: boolean;
  error: string | null;
  fetchCustomerData: (cnic: string) => Promise<void>;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  clearCustomerData: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomerData = async (cnic: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await axios.get(`${API_URL}/api/getNTB_ETB/${cnic}`);

      const { isETB, customer } = response.data;
      
      const customerInfo: CustomerData = {
        consumerId: customer?.cif || '',
        isETB,
        customerType: isETB ? 'ETB' : 'NTB',
        personalDetails: customer ? {
          title: customer.title,
          firstName: customer.firstName,
          lastName: customer.lastName,
          cnic: customer.cnic,
          fatherName: customer.fatherName,
          motherName: customer.motherName,
          dateOfBirth: customer.dateOfBirth,
          gender: customer.gender,
          maritalStatus: customer.maritalStatus,
          education: customer.education,
          mobileNumber: customer.mobileNumber,
          email: customer.emailAddress,
        } : {},
        addressDetails: customer ? {
          currentAddress: {
            houseNo: customer.residentialAddress?.split(',')[0] || '',
            street: customer.residentialAddress?.split(',')[1] || '',
            area: customer.residentialAddress?.split(',')[2] || '',
            city: customer.residentialAddress?.split(',')[3] || '',
          },
        } : {},
        employmentDetails: customer ? {
          employerName: customer.profession,
          monthlySalary: customer.income,
          officeAddress: customer.officeAddress,
        } : {},
        bankingDetails: customer ? {
          bankName: customer.bankName,
          branchName: customer.branchName,
          accountNumber: customer.accountNumber,
        } : {},
        referenceContacts: customer ? [
          {
            name: customer.referenceContact1?.split('-')[0] || '',
            mobileNumber: customer.referenceContact1?.split('-')[1] || '',
          },
          {
            name: customer.referenceContact2?.split('-')[0] || '',
            mobileNumber: customer.referenceContact2?.split('-')[1] || '',
          }
        ] : [],
        nextOfKin: customer ? {
          name: customer.nextOfKinName,
          relationship: customer.nextOfKinRelation,
          contactNumber: customer.nextOfKinContact,
        } : {}
      };

      setCustomerData(customerInfo);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch customer data');
      console.error('Error fetching customer data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerData = (data: Partial<CustomerData>) => {
    setCustomerData(prev => prev ? { ...prev, ...data } : null);
  };

  const clearCustomerData = () => {
    setCustomerData(null);
    setError(null);
  };

  return (
    <CustomerContext.Provider
      value={{
        customerData,
        loading,
        error,
        fetchCustomerData,
        updateCustomerData,
        clearCustomerData
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}; 