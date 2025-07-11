// app/dashboard/applicant/cashplus/page.tsx

import { useCustomer } from "@/contexts/CustomerContext";
import { useState, useEffect } from "react";

// components/forms/CashplusBankingDetailsForm.tsx
export const CashplusBankingDetailsForm = () => {
  const { customerData } = useCustomer();

  // Safely pull bank details from context (support both locations for robustness)
  const clientBanks = customerData?.clientBanks ||
    customerData?.cifData?.clientBanks || {};

  // Controlled state for the fields
  const [formData, setFormData] = useState({
    isUblCustomer: "",
    ublAccountNumber: "",
  });

  useEffect(() => {
    if (!clientBanks) return;

    setFormData({
      isUblCustomer: clientBanks.bank_name === "UBL" ? "Yes" : "No",
      ublAccountNumber: clientBanks.actt_no || "",
    });
  }, [clientBanks]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());
  useEffect(() => {
    const prefilled = new Set<string>();
    if (formData.isUblCustomer) prefilled.add("isUblCustomer");
    if (formData.ublAccountNumber) prefilled.add("ublAccountNumber");
    setPrefilledFields(prefilled);
  }, [formData]);

   const getFieldClasses = (fieldName: string) => {
    const base = "w-full border rounded-xl px-4 py-2";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold mb-4">6. Banking Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Are you a UBL Customer?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isUblCustomer"
                value="Yes"
                checked={formData.isUblCustomer === "Yes"}
                onChange={() => handleInputChange("isUblCustomer", "Yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isUblCustomer"
                value="No"
                checked={formData.isUblCustomer === "No"}
                onChange={() => handleInputChange("isUblCustomer", "No")}
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">UBL Account Number</label>
         <input
  type="text"
  className={getFieldClasses("ublAccountNumber")}
  placeholder="UBL Account Number"
  value={formData.ublAccountNumber || ""}
  onChange={(e) => handleInputChange("ublAccountNumber", e.target.value)}
/>

          <span className="block text-xs text-gray-500 mt-1">
            Non-disclosure of this information may result in rejection of application.
          </span>
        </div>
      </div>
    </section>
  );
}
