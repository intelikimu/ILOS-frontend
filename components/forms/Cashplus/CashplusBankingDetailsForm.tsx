import { useCustomer } from "@/contexts/CustomerContext";
import { useState, useEffect } from "react";

// components/forms/CashplusBankingDetailsForm.tsx
export const CashplusBankingDetailsForm = () => {
  const { customerData } = useCustomer();

  // Support both places for bank data
  const clientBanks = customerData?.clientBanks || customerData?.cifData?.clientBanks || {};

  // Controlled state for the fields
  const [formData, setFormData] = useState({
    isUblCustomer: "",
    ublAccountNumber: "",
  });

  // Only update formData if incoming backend values are different from what is in state
  useEffect(() => {
    if (!clientBanks) return;
    const isUbl = clientBanks.bank_name === "UBL" ? "Yes" : "No";
    const accNo = clientBanks.actt_no || "";

    if (
      formData.isUblCustomer !== isUbl ||
      formData.ublAccountNumber !== accNo
    ) {
      setFormData({
        isUblCustomer: isUbl,
        ublAccountNumber: accNo,
      });
    }
    // eslint-disable-next-line
  }, [clientBanks?.bank_name, clientBanks?.actt_no]);

  // Prefilled field highlighting
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());
  useEffect(() => {
    const prefilled = new Set<string>();
    if (formData.isUblCustomer) prefilled.add("isUblCustomer");
    if (formData.ublAccountNumber) prefilled.add("ublAccountNumber");
    setPrefilledFields(prefilled);
  }, [formData.isUblCustomer, formData.ublAccountNumber]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">6. Banking Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
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
};
