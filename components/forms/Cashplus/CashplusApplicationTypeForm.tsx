"use client";
import React, { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

export const CashplusApplicationTypeForm = () => {
  const { customerData } = useCustomer();

  const [formData, setFormData] = useState({
    ublExistingCustomer: "",
    branch: "",
    account: "",
    loanPurpose: "",
    loanPurposeOther: "",
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

useEffect(() => {
  if (!customerData) return;

  const prefilled = new Set<string>();
  const newFormData = { ...formData };

  // UBL Existing Customer: Yes if clientBanks.bank_name === "UBL"
  if (customerData?.cifData?.clientBanks.bank_name === "UBL") {
    newFormData.ublExistingCustomer = "Yes";
    prefilled.add("ublExistingCustomer");
  } else if (customerData?.cifData?.clientBanks.bank_name) {
    newFormData.ublExistingCustomer = "No";
    prefilled.add("ublExistingCustomer");
  } else {
    newFormData.ublExistingCustomer = "";
  }

  // Branch: Prefer clientBanks.branch, fallback to controlBranch
  if (customerData.clientBanks?.branch) {
    newFormData.branch = customerData?.cifData?.clientBanks.branch;
    prefilled.add("branch");
  } else if (customerData?.cifData?.clientBanks.branch) {
    newFormData.branch = customerData?.cifData?.clientBanks.branch;
    prefilled.add("branch");
  }

  // Account: clientBanks.actt_no
  if (customerData?.cifData?.clientBanks?.actt_no) {
    newFormData.account = customerData.cifData?.clientBanks?.actt_no ?? "";
    prefilled.add("account");
  }

  setFormData(newFormData);
  setPrefilledFields(prefilled);
  // eslint-disable-next-line
}, [customerData]);


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "loanPurpose" && value !== "Other" ? { loanPurposeOther: "" } : {}),
    }));
  };

  const getFieldClasses = (fieldName: string) => {
    const base = "w-full border rounded-xl px-4 py-2";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold mb-4">2. Application Type</h3>
      {prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <b>Note:</b> Fields highlighted in yellow are pre-filled from your existing data. You can edit them if needed.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UBL Existing Customer */}
        <div>
          <label className="block mb-2">UBL Existing Customer</label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ublExistingCustomer"
              value="Yes"
              checked={formData.ublExistingCustomer === "Yes"}
              onChange={() => handleInputChange("ublExistingCustomer", "Yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ublExistingCustomer"
              value="No"
              checked={formData.ublExistingCustomer === "No"}
              onChange={() => handleInputChange("ublExistingCustomer", "No")}
            />
            No
          </label>
        </div>
        {/* Branch */}
        <div>
          <label className="block mb-2">Branch</label>
          <input
            type="text"
            className={getFieldClasses("branch")}
            placeholder="Branch"
            value={formData.branch || ""}
            onChange={(e) => handleInputChange("branch", e.target.value)}
          />
        </div>
        {/* Account */}
        <div>
          <label className="block mb-2">Account</label>
          <input
            type="text"
            className={getFieldClasses("account")}
            placeholder="Account"
            value={formData.account}
            onChange={(e) => handleInputChange("account", e.target.value)}
          />
        </div>
        {/* Purpose of Loan */}
        <div className="md:col-span-3">
          <label className="block mb-2">Purpose of Loan</label>
          <div className="flex flex-wrap gap-3 mb-2">
            {["Education", "Travel", "Wedding", "Other"].map((purpose) => (
              <label key={purpose} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loanPurpose"
                  value={purpose}
                  checked={formData.loanPurpose === purpose}
                  onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                />
                {purpose}
              </label>
            ))}
            {formData.loanPurpose === "Other" && (
              <input
                type="text"
                className="rounded-xl border bg-white px-4 py-2"
                placeholder="If Other, please specify"
                value={formData.loanPurposeOther}
                onChange={(e) => handleInputChange("loanPurposeOther", e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
