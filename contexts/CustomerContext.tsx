"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface CustomerData {
  customerId: string | null;
  isETB: boolean;
  customerType: 'ETB' | 'NTB';
  cnic?: string;
  status?: string;
  losId?: string;
  cifData?: {
    category?: string;
    controlBranch?: string;
    creationDate?: string;
    credtingRating?: string;
    customerType?: string;
    domicileCountry?: string;
    domicileState?: string;
    fullname?: string;
    indicator?: string;
    industry?: string;
    internalFlag?: string;
    profitCenter?: string;
    relManager?: string;
    residentFlag?: string;
    riskCountry?: string;
    shortName?: string;
    tableInd?: string;
    typeIndicator?: string;
    class1?: string;
    class2?: string;
    class4?: string;
    business?: string;
    district?: string;
    city?: string;
    clientNoCmc?: string;
    ftRateCategory?: string;
    reclass?: string;
    oenaceCode?: string;
    reporting?: string;
    stopSc?: string;
    clientVersion?: string;
    taxRegCompFlag?: string;
    incorporationCountry?: string;
    location?: string;
    aminusB?: string;
    annualSales?: string;
    // Related CIF data
    customerIdType?: any;
    relationship?: any;
    dirDetails?: any;
    clientBanks?: any;
    postal?: any;
    email?: any;
    phone?: any;
    fax?: any;
    swift?: any;
    collect?: any;
    individualInfo?: any;
  };
  personalDetails?: {
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?: string;
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
    nationality?: string;
    placeOfBirth?: string;
    occupationCode?: string;
  };
  addressDetails?: {
    currentAddress?: {
      houseNo?: string;
      street?: string;
      area?: string;
      address?: string;
      city?: string;
      country?: string;
      postalCode?: string;
      district?: string;
      state?: string;
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
      address?: string;
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
      // Automatically detect backend URL based on environment
      const getBackendURL = () => {
        // If running in production (deployed), use the deployed backend
        if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
          return process.env.NEXT_PUBLIC_API_URL || 'https://ilos-backend.vercel.app';
        }
        // If running locally, try local backend first, fallback to deployed
        return 'http://localhost:5000';
      };
      
      const API_URL = getBackendURL();
      
      // First check customer status with intelligent endpoint detection
      // Remove dashes from CNIC for API call
      const cleanCnic = cnic.replace(/-/g, '');
      
      let statusResponse;
      let isExisting, customerId, status, customerCnic;
      
      try {
        // Try local backend endpoint first
        console.log('Trying local endpoint:', `${API_URL}/customer-status/${cleanCnic}`);
        statusResponse = await axios.get(`${API_URL}/customer-status/${cleanCnic}`);
        console.log('Local endpoint response:', statusResponse.data);
        ({ isExisting, customerId, status, cnic: customerCnic } = statusResponse.data);
      } catch (error) {
        // If local fails, try deployed backend endpoint
        console.log('Local endpoint failed, trying deployed endpoint:', `https://ilos-backend.vercel.app/api/getNTB_ETB/${cleanCnic}`);
        try {
          statusResponse = await axios.get(`https://ilos-backend.vercel.app/api/getNTB_ETB/${cleanCnic}`);
          console.log('Deployed endpoint response:', statusResponse.data);
          
          // Handle deployed backend response format
          if (statusResponse.data.hasOwnProperty('isETB')) {
            isExisting = statusResponse.data.isETB;
            customerCnic = cleanCnic;
            status = isExisting ? statusResponse.data.customer?.status || 'A' : 'NTB';
            customerId = isExisting && statusResponse.data.customer ? statusResponse.data.customer.customerId || statusResponse.data.customer.cif : null;
          } else {
            ({ isExisting, customerId, status, cnic: customerCnic } = statusResponse.data);
          }
        } catch (deployedError) {
          throw new Error('Both local and deployed backends are unreachable');
        }
      }
      
      console.log('Parsed status response:', { isExisting, customerId, status, customerCnic });
      
      let cifData = null;
      let autoFilledData: any = {};
      
      // If customer exists (ETB), fetch complete CIF details
      if (isExisting && customerId) {
        try {
          // Try local CIF endpoint first
          console.log('Trying local CIF endpoint:', `${API_URL}/cif/${customerId}`);
          try {
            const cifResponse = await axios.get(`${API_URL}/cif/${customerId}`);
            console.log('Local CIF response:', cifResponse.data);
            cifData = cifResponse.data;
          } catch (localError) {
            // If local fails, try deployed backend CIF endpoint
            console.log('Local CIF failed, trying deployed CIF endpoint:', `https://ilos-backend.vercel.app/api/cif/details/${customerId}`);
            try {
              const cifResponse = await axios.get(`https://ilos-backend.vercel.app/api/cif/details/${customerId}`);
              console.log('Deployed CIF response:', cifResponse.data);
              cifData = cifResponse.data;
            } catch (deployedError) {
              console.log('Both CIF endpoints failed, continuing without CIF data');
              cifData = null;
            }
          }
          
                    // Auto-fill form fields from CIF data - handle both local and deployed formats
          const isLocalFormat = cifData.hasOwnProperty('individualInfo');
          
          autoFilledData = {
            personalDetails: {
              firstName: isLocalFormat 
                ? (cifData.individualInfo?.given_name1 || cifData.fullname?.split(' ')[0] || '')
                : (cifData.customer?.firstName || cifData.fullname?.split(' ')[0] || ''),
              lastName: isLocalFormat
                ? (cifData.individualInfo?.surname || cifData.fullname?.split(' ').slice(-1)[0] || '')
                : (cifData.customer?.lastName || cifData.fullname?.split(' ').slice(-1)[0] || ''),
              fullName: cifData.fullname || cifData.customer?.fullname || '',
              cnic: cifData.cnic || cifData.customer?.cnic || cleanCnic,
              fatherName: isLocalFormat 
                ? (cifData.individualInfo?.father_husband_name || '')
                : (cifData.customer?.fatherName || ''),
              dateOfBirth: isLocalFormat
                ? (cifData.individualInfo?.date_of_birth || '')
                : (cifData.customer?.dateOfBirth || ''),
              gender: isLocalFormat
                ? (cifData.individualInfo?.sex === 'M' ? 'Male' : cifData.individualInfo?.sex === 'F' ? 'Female' : '')
                : (cifData.customer?.gender || ''),
              maritalStatus: isLocalFormat
                ? (cifData.individualInfo?.maritial_status === 'M' ? 'Married' : cifData.individualInfo?.maritial_status === 'S' ? 'Single' : '')
                : (cifData.customer?.maritalStatus || ''),
              mobileNumber: isLocalFormat
                ? (cifData.phone?.phone_no || '')
                : (cifData.customer?.mobileNumber || ''),
              email: isLocalFormat
                ? (cifData.email?.address || '')
                : (cifData.customer?.emailAddress || ''),
              nationality: isLocalFormat
                ? (cifData.individualInfo?.country_citizenship || '')
                : (cifData.customer?.nationality || ''),
              placeOfBirth: cifData.individualInfo?.palce_of_birth || '',
              occupationCode: cifData.individualInfo?.occupation_code || '',
                          },
              addressDetails: {
                currentAddress: {
                  address: isLocalFormat 
                    ? (cifData.postal?.address || '')
                    : (cifData.customer?.residentialAddress || ''),
                  city: cifData.city || cifData.customer?.city || '',
                  country: cifData.domicileCountry || cifData.customer?.domicileCountry || '',
                  postalCode: cifData.postal?.postal_code || '',
                  district: cifData.district || cifData.customer?.district || '',
                  state: cifData.domicileState || cifData.customer?.domicileState || '',
                },
                permanentAddress: {
                  address: isLocalFormat 
                    ? (cifData.postal?.address || '')
                    : (cifData.customer?.residentialAddress || ''),
                  city: cifData.city || cifData.customer?.city || '',
                  country: cifData.domicileCountry || cifData.customer?.domicileCountry || '',
                  postalCode: cifData.postal?.postal_code || '',
                }
              },
              employmentDetails: {
                businessType: cifData.business || cifData.customer?.business || '',
                industry: cifData.industry || cifData.customer?.industry || '',
                occupation: isLocalFormat 
                  ? (cifData.individualInfo?.occupation_code || '')
                  : (cifData.customer?.profession || ''),
                monthlySalary: cifData.customer?.income || '',
                officeAddress: cifData.customer?.officeAddress || '',
              },
              bankingDetails: {
                bankName: isLocalFormat
                  ? (cifData.clientBanks?.bank_name || '')
                  : (cifData.customer?.bankName || ''),
                branchName: isLocalFormat
                  ? (cifData.clientBanks?.branch || '')
                  : (cifData.customer?.branchName || ''),
                accountNumber: isLocalFormat
                  ? (cifData.clientBanks?.actt_no || '')
                  : (cifData.customer?.accountNumber || ''),
                customerId: cifData.customerId || cifData.customer?.customerId || '',
                clientNumber: cifData.clientNoCmc || '',
              },
              referenceContacts: isLocalFormat && cifData.relationship ? [{
                name: cifData.relationship.relate_customer_name || '',
                relationship: cifData.relationship.relationship_type || '',
                customerId: cifData.relationship.related_customer_id || '',
              }] : (cifData.customer ? [
                { name: cifData.customer.referenceContact1 || '', relationship: '', mobileNumber: '' },
                { name: cifData.customer.referenceContact2 || '', relationship: '', mobileNumber: '' }
              ] : []),
              nextOfKin: isLocalFormat && cifData.relationship ? {
                name: cifData.relationship.relate_customer_name || '',
                relationship: cifData.relationship.relationship_type || '',
                customerId: cifData.relationship.related_customer_id || '',
              } : (cifData.customer ? {
                name: cifData.customer.nextOfKinName || '',
                relationship: cifData.customer.nextOfKinRelation || '',
                contactNumber: cifData.customer.nextOfKinContact || '',
              } : {}),
            directorDetails: cifData.dirDetails ? {
              name: cifData.dirDetails.director_name || '',
              address: cifData.dirDetails.address || '',
              ntn: cifData.dirDetails.ntn || '',
              cnic: cifData.dirDetails.nic || '',
              fatherName: cifData.dirDetails.father_name || '',
              nationality: cifData.dirDetails.nationality || '',
              netWorth: cifData.dirDetails.estimated_net_worth || '',
              appointmentDate: cifData.dirDetails.date_appointment || '',
            } : {},
            contactDetails: {
              phone: cifData.phone?.phone_no || '',
              email: cifData.email?.address || '',
              fax: cifData.fax?.fax_no || '',
              postalAddress: cifData.postal?.address || '',
              language: cifData.postal?.client_lang || '',
            }
          };
            
          } catch (cifError) {
          console.error('Error fetching CIF details:', cifError);
        }
      }
      
      const customerInfo: CustomerData = {
        customerId,
        isETB: isExisting,
        customerType: isExisting ? 'ETB' : 'NTB',
        cnic: customerCnic,
        status,
        cifData: cifData || {},
        ...autoFilledData,
        // Initialize empty structures for NTB customers
        personalDetails: autoFilledData.personalDetails || {},
        addressDetails: autoFilledData.addressDetails || {},
        employmentDetails: autoFilledData.employmentDetails || {},
        bankingDetails: autoFilledData.bankingDetails || {},
        referenceContacts: autoFilledData.referenceContacts || [],
        nextOfKin: autoFilledData.nextOfKin || {}
      };

      console.log('Final customerInfo object:', customerInfo);
      setCustomerData(customerInfo);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch customer data');
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