"use client";
import React from "react";

interface ExposureUndertakingFormProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: string | number) => void;
}

export const ExposureUndertakingForm = ({ formData, handleInputChange }: ExposureUndertakingFormProps) => {
  const getValue = (section: string, field: string) =>
    formData?.[section]?.[0]?.[field] || "";

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">
        9. Undertaking – Existing Exposure from Entire Banking Sector
      </h2>

      <form className="space-y-10">
        {/* A. Credit Cards (Clean) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">A. Credit Cards (Clean)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name of Bank / DFI"
              value={getValue("credit_cards_clean", "name")}
              onChange={(e) => handleInputChange("credit_cards_clean", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Approved Limit"
              value={getValue("credit_cards_clean", "limit")}
              onChange={(e) => handleInputChange("credit_cards_clean", "limit", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* B. Credit Cards (Secured) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">B. Credit Cards (Secured)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name of Bank / DFI"
              value={getValue("credit_cards_secured", "name")}
              onChange={(e) => handleInputChange("credit_cards_secured", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Approved Limit"
              value={getValue("credit_cards_secured", "limit")}
              onChange={(e) => handleInputChange("credit_cards_secured", "limit", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* C. Personal Loans (Clean) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">C. Personal Loan (Clean)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Name of Bank"
              value={getValue("personal_loans_clean", "name")}
              onChange={(e) => handleInputChange("personal_loans_clean", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Approved Limit"
              value={getValue("personal_loans_clean", "limit")}
              onChange={(e) => handleInputChange("personal_loans_clean", "limit", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Outstanding"
              value={getValue("personal_loans_clean", "outstanding")}
              onChange={(e) => handleInputChange("personal_loans_clean", "outstanding", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* D. Personal Loans (Secured) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">D. Personal Loan (Secured)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Name of Bank"
              value={getValue("personal_loans_secured", "name")}
              onChange={(e) => handleInputChange("personal_loans_secured", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Approved Limit"
              value={getValue("personal_loans_secured", "limit")}
              onChange={(e) => handleInputChange("personal_loans_secured", "limit", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Outstanding"
              value={getValue("personal_loans_secured", "outstanding")}
              onChange={(e) => handleInputChange("personal_loans_secured", "outstanding", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* E. Other Facilities */}
        <div>
          <h3 className="text-lg font-semibold mb-4">E. Other Facilities (Clean & Secured)</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              type="text"
              placeholder="Bank / DFI"
              value={getValue("other_facilities", "name")}
              onChange={(e) => handleInputChange("other_facilities", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Approved Limit"
              value={getValue("other_facilities", "limit")}
              onChange={(e) => handleInputChange("other_facilities", "limit", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Nature (Clean/Secured)"
              value={getValue("other_facilities", "nature")}
              onChange={(e) => handleInputChange("other_facilities", "nature", e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Outstanding"
              value={getValue("other_facilities", "outstanding")}
              onChange={(e) => handleInputChange("other_facilities", "outstanding", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* F. Applied Limits */}
        <div>
          <h3 className="text-lg font-semibold mb-4">F. Applied Limits (Including Current Application)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Bank / DFI"
              value={getValue("applied_limits", "name")}
              onChange={(e) => handleInputChange("applied_limits", "name", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Facility under Process"
              value={getValue("applied_limits", "facility")}
              onChange={(e) => handleInputChange("applied_limits", "facility", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Nature (Clean/Secured)"
              value={getValue("applied_limits", "nature")}
              onChange={(e) => handleInputChange("applied_limits", "nature", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

// Tailwind input class shortcut
const inputClass = "w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
