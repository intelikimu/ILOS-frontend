"use client";
import React from "react";
import { useCustomer } from "@/contexts/CustomerContext";

interface Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}


export const BankingDetailsForm: React.FC<Props> = ({ formData, handleInputChange }) => {
  const { customerData } = useCustomer();
  const clientBanks = customerData?.clientBanks || customerData?.cifData?.clientBanks || {};

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">
        8. Banking Details - Direct Debit / Repayment Account
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input
            type="text"
            name="repayment_bank_name"
            value={formData.repayment_bank_name || clientBanks.bank_name || ""}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm font-medium mb-1">Branch</label>
          <input
            type="text"
            name="repayment_branch"
            value={formData.repayment_branch || clientBanks.branch || ""}
            onChange={handleInputChange}
            placeholder="Branch"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2"
          />
        </div>

        {/* Account No */}
        <div>
          <label className="block text-sm font-medium mb-1">Account No.</label>
          <input
            type="text"
            name="repayment_account_no"
            value={formData.repayment_account_no || clientBanks.actt_no || ""}
            onChange={handleInputChange}
            placeholder="Account No."
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2"
          />
        </div>

        {/* Account Type (Radio) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <div className="flex gap-4">
            {["PLS", "Current", "Fixed Deposit"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repayment_account_type"
                  value={type}
                  checked={formData.repayment_account_type === type}
                  onChange={handleInputChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Currency Type (Radio) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Currency Type</label>
          <div className="flex gap-4">
            {["Local", "Foreign"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repayment_currency_type"
                  value={type}
                  checked={formData.repayment_currency_type === type}
                  onChange={handleInputChange}
                />
                {type === "Foreign" ? "Foreign (please specify)" : "Local"}
              </label>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};
