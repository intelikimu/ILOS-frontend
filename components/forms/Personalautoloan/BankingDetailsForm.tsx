import { useCustomer } from "@/contexts/CustomerContext";
import { useEffect, useState } from "react";

export const BankingDetailsForm = () => {
  const { customerData } = useCustomer();
  // Prefer flat, then fallback to inside cifData
  const clientBanks = customerData?.clientBanks || customerData?.cifData?.clientBanks || {};

  // Controlled state for the main account
  const [formData, setFormData] = useState({
    bankName: "",
    branch: "",
    accountNo: "",
    // You can add more fields if needed
  });
  // Track which fields are prefilled
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  // Prefill from backend
  useEffect(() => {
    const newForm = {
      bankName: clientBanks.bank_name || "",
      branch: clientBanks.branch || "",
      accountNo: clientBanks.actt_no || "",
    };
    setFormData(newForm);

    // Mark prefilled fields
    const prefilled = new Set<string>();
    if (clientBanks.bank_name) prefilled.add("bankName");
    if (clientBanks.branch) prefilled.add("branch");
    if (clientBanks.actt_no) prefilled.add("accountNo");
    setPrefilledFields(prefilled);
  }, [clientBanks]);

  // Controlled handler
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Highlight prefilled
  const getFieldClasses = (fieldName: string) => {
    const base = "w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-gray-50";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">
        8. Banking Details - Direct Debit / Repayment Account
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input
            type="text"
            placeholder="Bank Name"
            className={getFieldClasses("bankName")}
            value={formData.bankName}
            onChange={e => handleInputChange("bankName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Branch</label>
          <input
            type="text"
            placeholder="Branch"
            className={getFieldClasses("branch")}
            value={formData.branch}
            onChange={e => handleInputChange("branch", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account No.</label>
          <input
            type="text"
            placeholder="Account No."
            className={getFieldClasses("accountNo")}
            value={formData.accountNo}
            onChange={e => handleInputChange("accountNo", e.target.value)}
          />
        </div>
        {/* -- Add Account Type, Currency, etc, as needed -- */}
        {/* Example: */}
        <div className="flex flex-col col-span-2">
          <label className="font-semibold text-sm mb-2">Account Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> PLS
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Current
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Fixed Deposit
            </label>
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <label className="font-semibold text-sm mb-2">Currency Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Local
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Foreign (please specify)
            </label>
          </div>
        </div>
        {/* ...rest of your form (repeat as above for Other Account Details if you want to prefill there too) */}
      </form>
    </section>
  );
};
