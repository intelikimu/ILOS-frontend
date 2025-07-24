"use client";
import { useCustomer } from "@/contexts/CustomerContext";
import { useEffect, useRef, useState } from "react";

// Interface for existing loan data
interface ExistingLoan {
  facility_type: string;
  amount: number | null;
  tenor: number | null;
  purpose: string;
  security_nature_particular: string;
  security_value: number | null;
  repayment_frequency: string;
  monthly_installment?: number | null;
  bank_name?: string;
}

export const SMEExistingLoanDetailsForm = () => {
  const { customerData, updateCustomerData } = useCustomer();
  
  // Use refs to prevent infinite update loops
  const isInitialized = useRef(false);
  const skipNextUpdate = useRef(false);
  const isFirstRender = useRef(true);
  
  const [existingLoans, setExistingLoans] = useState<ExistingLoan[]>([
    {
      bank_name: "",
      facility_type: "",
      amount: null,
      monthly_installment: null,
      tenor: null,
      purpose: "",
      security_nature_particular: "",
      security_value: null,
      repayment_frequency: "Monthly"
    }
  ]);
  
  // Initialize form with data from context (runs once)
  useEffect(() => {
    if (isInitialized.current) return;
    
    // Check if existing loans exist in context
    const savedExistingLoans = Array.isArray(customerData?.existing_loans) ? 
      customerData.existing_loans : [];
      
    // Map saved loans to our local state format
    if (savedExistingLoans.length > 0) {
      setExistingLoans(savedExistingLoans.map(loan => ({
        bank_name: loan.bank_name || "",
        facility_type: loan.facility_type || "",
        amount: loan.amount || null,
        monthly_installment: loan.monthly_installment || null,
        tenor: loan.tenor || null,
        purpose: loan.purpose || "",
        security_nature_particular: loan.security_nature_particular || "",
        security_value: loan.security_value || null,
        repayment_frequency: loan.repayment_frequency || "Monthly"
      })));
    }
    
    isInitialized.current = true;
  }, [customerData]);
  
  // Save to context when form data changes
  const saveToContext = () => {
    if (skipNextUpdate.current || !isInitialized.current) return;
    
    skipNextUpdate.current = true;
    
    // Filter out empty loans (where bank_name or facility_type is not provided)
    const validLoans = existingLoans.filter(
      loan => loan.bank_name?.trim() !== "" || loan.facility_type?.trim() !== ""
    );
    
    // Update the context with loans data
    updateCustomerData({
      existing_loans: validLoans
    } as any);
    
    // Reset the flag after a short delay
    setTimeout(() => {
      skipNextUpdate.current = false;
    }, 50);
  };
  
  // Update context when loans change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveToContext();
  }, [existingLoans]);
  
  // Handle input changes for a specific loan and field
  const handleInputChange = (loanIndex: number, field: string, value: any) => {
    const updatedLoans = [...existingLoans];
    updatedLoans[loanIndex] = {
      ...updatedLoans[loanIndex],
      [field]: value
    };
    setExistingLoans(updatedLoans);
  };
  
  // Add a new loan entry
  const addLoan = () => {
    setExistingLoans([
      ...existingLoans,
      {
        bank_name: "",
        facility_type: "",
        amount: null,
        monthly_installment: null,
        tenor: null,
        purpose: "",
        security_nature_particular: "",
        security_value: null,
        repayment_frequency: "Monthly"
      }
    ]);
  };
  
  // Remove a loan entry
  const removeLoan = (index: number) => {
    if (existingLoans.length <= 1) return; // Always keep at least one entry
    setExistingLoans(existingLoans.filter((_, i) => i !== index));
  };
  
  return (
    <section className="mb-10">
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Existing Loan Details</h3>
      
      {existingLoans.map((loan, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Bank Name"
              value={loan.bank_name}
              onChange={(e) => handleInputChange(index, "bank_name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type of Facility</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Type of Facility"
              value={loan.facility_type}
              onChange={(e) => handleInputChange(index, "facility_type", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Outstanding Amount (Rs.)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Outstanding Amount"
              value={loan.amount === null ? "" : loan.amount}
              onChange={(e) => handleInputChange(index, "amount", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Installment (Rs.)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Monthly Installment"
              value={loan.monthly_installment === null ? "" : loan.monthly_installment}
              onChange={(e) => handleInputChange(index, "monthly_installment", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tenure Remaining (Months)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Tenure Remaining"
              value={loan.tenor === null ? "" : loan.tenor}
              onChange={(e) => handleInputChange(index, "tenor", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Purpose of Loan</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Purpose of Loan"
              value={loan.purpose}
              onChange={(e) => handleInputChange(index, "purpose", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Security Nature/Particular</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Security Nature"
              value={loan.security_nature_particular}
              onChange={(e) => handleInputChange(index, "security_nature_particular", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Security Value</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Security Value"
              value={loan.security_value === null ? "" : loan.security_value}
              onChange={(e) => handleInputChange(index, "security_value", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Repayment Frequency</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              value={loan.repayment_frequency}
              onChange={(e) => handleInputChange(index, "repayment_frequency", e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
          
          {/* Remove button - only show if there's more than one loan */}
          {existingLoans.length > 1 && (
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="button"
                className="text-red-600 hover:text-red-800"
                onClick={() => removeLoan(index)}
              >
                Remove Loan
              </button>
            </div>
          )}
        </div>
      ))}
      
      {/* Add new loan button */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={addLoan}
        >
          Add Another Loan
        </button>
      </div>
    </section>
  );
};
