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
      const response = await axios.post('http://localhost:5000/getNTB_ETB', {
        cnic: cnic
      });

      const { isETB, consumerId, customerData: cifData } = response.data;
      
      const customerInfo: CustomerData = {
        consumerId,
        isETB,
        customerType: isETB ? 'ETB' : 'NTB',
        personalDetails: cifData?.personalDetails || {},
        addressDetails: cifData?.addressDetails || {},
        employmentDetails: cifData?.employmentDetails || {},
        bankingDetails: cifData?.bankingDetails || {},
        referenceContacts: cifData?.referenceContacts || [],
        nextOfKin: cifData?.nextOfKin || {}
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