"use client";
import React, { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

const toInputDate = (date?: string) =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

export const CreditCardApplicantInfoForm = () => {
  const { customerData } = useCustomer();
  const ind = customerData?.cifData?.individualInfo || {};
  const cnicData = customerData?.cifData?.customerIdType || {};
  const dir = customerData?.cifData?.dirDetails || {};

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    nameOnCard: "",
    cnic: "",
    cnicIssue: "",
    cnicExpiry: "",
    oldNic: "",
    fatherHusband: "",
    dob: "",
    gender: "",
    motherMaiden: "",
    marital: "",
    dependents: "",
    education: "",
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefilled = new Set<string>();
    const newFormData = { ...formData };
    console.log("Customer Data:==>", customerData?.cifData);

    if (ind?.title) { newFormData.title = ind.title; prefilled.add("title"); }
    if (customerData?.cifData.fullname) { newFormData.fullName = customerData.cifData.fullname; prefilled.add("fullName"); }
    if (customerData?.cifData.shortName) { newFormData.nameOnCard = customerData.cifData.shortName; prefilled.add("nameOnCard"); }
    if (customerData?.cnic) { newFormData.cnic = customerData.cnic; prefilled.add("cnic"); }
    if (cnicData?.expiry_date) { newFormData.cnicExpiry = toInputDate(cnicData.expiry_date); prefilled.add("cnicExpiry"); }
    if (ind?.date_of_birth) { newFormData.dob = toInputDate(ind.date_of_birth); prefilled.add("dob"); }
    if (dir?.father_name) { newFormData.fatherHusband = dir.father_name; prefilled.add("fatherHusband"); }
    if (ind?.maiden_name) { newFormData.motherMaiden = ind.maiden_name; prefilled.add("motherMaiden"); }
    if (ind?.sex) { newFormData.gender = ind.sex === "M" ? "Male" : ind.sex === "F" ? "Female" : ""; prefilled.add("gender"); }
    if (ind?.maritial_status) {
      const m = ind.maritial_status;
      newFormData.marital =
        m === "M" ? "Married"
        : m === "S" ? "Single"
        : m === "D" ? "Divorced"
        : m === "W" ? "Widowed"
        : ""; prefilled.add("marital");
    }
    // Old NIC and Dependents/Education left blank unless present in backend
    setFormData(newFormData);
    setPrefilledFields(prefilled);
    // eslint-disable-next-line
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldClasses = (field: string) => {
    const base = "w-full rounded-xl border border-gray-300 px-4 py-2";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(field) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-primary mb-6">3. Introduce Yourself</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <div className="flex gap-4 mt-2">
            {["Mr", "Mrs", "Ms"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="title"
                  checked={formData.title === opt}
                  onChange={() => handleInputChange("title", opt)}
                  className={prefilledFields.has("title") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className={getFieldClasses("fullName")}
            placeholder="Full Name"
            value={formData.fullName}
            onChange={e => handleInputChange("fullName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            className={getFieldClasses("nameOnCard")}
            placeholder="Name on Card"
            value={formData.nameOnCard}
            onChange={e => handleInputChange("nameOnCard", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Computerized NIC / Passport No.</label>
          <input
            type="text"
            className={getFieldClasses("cnic")}
            placeholder="CNIC or Passport"
            value={formData.cnic}
            onChange={e => handleInputChange("cnic", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC Issuance Date</label>
          <input
            type="date"
            className={getFieldClasses("cnicIssue")}
            value={formData.cnicIssue}
            onChange={e => handleInputChange("cnicIssue", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC Expiry Date</label>
          <input
            type="date"
            className={getFieldClasses("cnicExpiry")}
            value={formData.cnicExpiry}
            onChange={e => handleInputChange("cnicExpiry", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Old NIC Number</label>
          <input
            type="text"
            className={getFieldClasses("cnic")}
            placeholder="Old NIC Number"
            value={formData.cnic}
            onChange={e => handleInputChange("cnic", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Father's / Husband’s Name</label>
          <input
            type="text"
            className={getFieldClasses("fatherHusband")}
            placeholder="Father's / Husband's Name"
            value={formData.fatherHusband}
            onChange={e => handleInputChange("fatherHusband", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className={getFieldClasses("dob")}
            value={formData.dob}
            onChange={e => handleInputChange("dob", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex gap-4 mt-2">
            {["Male", "Female"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={formData.gender === opt}
                  onChange={() => handleInputChange("gender", opt)}
                  className={prefilledFields.has("gender") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mother’s Maiden Name</label>
          <input
            type="text"
            className={getFieldClasses("motherMaiden")}
            placeholder="Mother's Maiden Name"
            value={formData.motherMaiden}
            onChange={e => handleInputChange("motherMaiden", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <div className="flex flex-wrap gap-2">
            {["Single", "Married", "Divorced", "Widowed"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="maritalStatus"
                  checked={formData.marital === opt}
                  onChange={() => handleInputChange("marital", opt)}
                  className={prefilledFields.has("marital") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">No. of Dependents</label>
          <input
            type="number"
            className={getFieldClasses("dependents")}
            placeholder="No. of Dependents"
            value={formData.dependents}
            onChange={e => handleInputChange("dependents", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Educational Qualification</label>
          <div className="flex flex-wrap gap-2">
            {["Matric/O Levels", "Inter/A Levels", "Bachelors", "Masters"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="education"
                  checked={formData.education === opt}
                  onChange={() => handleInputChange("education", opt)}
                  className={prefilledFields.has("education") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
