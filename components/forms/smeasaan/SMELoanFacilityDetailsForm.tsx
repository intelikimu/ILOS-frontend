"use client";
import { useCustomer } from "@/contexts/CustomerContext";
import { useEffect, useRef, useState } from "react";

// Define interface for loan facility data
interface LoanFacilityData {
  facility_type: string;
  purpose: string;
  requested_amount: number | null;
  tenure_months: number | null;
  repayment_frequency: string;
  installment_amount: number | null;
}

export const SMELoanFacilityDetailsForm = () => {
  const { customerData, updateCustomerData } = useCustomer();
  
  // Use refs to prevent infinite update loops
  const isInitialized = useRef(false);
  const skipNextUpdate = useRef(false);
  const isFirstRender = useRef(true);
  
  // Controlled state
  const [formData, setFormData] = useState<LoanFacilityData>({
    facility_type: "",
    purpose: "",
    requested_amount: null,
    tenure_months: null,
    repayment_frequency: "",
    installment_amount: null
  });
  
  // Initialize form with data from context (runs once)
  useEffect(() => {
    if (isInitialized.current) return;
    
    // Get existing data from context if available
    const existingData = customerData?.loanFacility || {};
    
    // Update form data with existing values
    const newFormData = {
      facility_type: existingData.facility_type || "",
      purpose: existingData.purpose || "",
      requested_amount: existingData.requested_amount || null,
      tenure_months: existingData.tenure_months || null,
      repayment_frequency: existingData.repayment_frequency || "",
      installment_amount: existingData.installment_amount || null
    };
    
    // Also check for specific SME application fields that might have loan info
    const smeApp = customerData?.smeApplication || {};
    if (smeApp.desired_loan_amount && !newFormData.requested_amount) {
      newFormData.requested_amount = Number(smeApp.desired_loan_amount);
    }
    if (smeApp.tenure_years && !newFormData.tenure_months) {
      newFormData.tenure_months = Number(smeApp.tenure_years) * 12; // Convert years to months
    }
    
    setFormData(newFormData);
    isInitialized.current = true;
  }, [customerData]);
  
  // Save to context when form data changes
  const saveToContext = () => {
    if (skipNextUpdate.current || !isInitialized.current) return;
    
    skipNextUpdate.current = true;
    
    // Map form data to the expected API format
    updateCustomerData({
      loanFacility: formData,
      // Also update related SME application fields for consistency
      smeApplication: {
        ...(customerData?.smeApplication || {}),
        desired_loan_amount: formData.requested_amount,
        tenure_years: formData.tenure_months ? formData.tenure_months / 12 : null
      }
    } as any);
    
    // Reset the flag after a short delay
    setTimeout(() => {
      skipNextUpdate.current = false;
    }, 50);
  };
  
  // Update context when form data changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveToContext();
  }, [formData]);
  
  // Handle input changes
  const handleChange = (field: keyof LoanFacilityData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <section className="mb-10">
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Loan/Facility Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        <div>
          <label className="block text-sm font-medium mb-1">Type of Facility</label>
          <select 
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
            value={formData.facility_type}
            onChange={(e) => handleChange("facility_type", e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="Running Finance">Running Finance</option>
            <option value="Term Finance">Term Finance</option>
            <option value="Letter of Credit">Letter of Credit</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purpose of Loan/Facility</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-gray-300 px-4 py-2" 
            placeholder="Purpose" 
            value={formData.purpose}
            onChange={(e) => handleChange("purpose", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Requested Amount (Rs.)</label>
          <input 
            type="number" 
            className="w-full rounded-xl border border-gray-300 px-4 py-2" 
            placeholder="Requested Amount" 
            value={formData.requested_amount === null ? "" : formData.requested_amount}
            onChange={(e) => handleChange("requested_amount", e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tenure (Months)</label>
          <input 
            type="number" 
            className="w-full rounded-xl border border-gray-300 px-4 py-2" 
            placeholder="Tenure (Months)" 
            value={formData.tenure_months === null ? "" : formData.tenure_months}
            onChange={(e) => handleChange("tenure_months", e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Repayment Frequency</label>
          <select 
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
            value={formData.repayment_frequency}
            onChange={(e) => handleChange("repayment_frequency", e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Installment Amount (Rs.)</label>
          <input 
            type="number" 
            className="w-full rounded-xl border border-gray-300 px-4 py-2" 
            placeholder="Installment Amount" 
            value={formData.installment_amount === null ? "" : formData.installment_amount}
            onChange={(e) => handleChange("installment_amount", e.target.value ? Number(e.target.value) : null)}
          />
        </div>
      </div>
    </section>
  );
};
