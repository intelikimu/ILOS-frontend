"use client";
import React, { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

// Helper for date fields
const toInputDate = (date?: string) =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

export const SMEApplicantPersonalDetailForm = () => {
  const { customerData } = useCustomer();
  const ind = customerData?.cifData?.individualInfo || {};
  const cnicData = customerData?.cifData?.customerIdType || {};
  const dir = customerData?.cifData?.dirDetails || {};
  const phone = customerData?.cifData?.phone?.phone_no || "";
  const email = customerData?.cifData?.email?.address || "";
  const postal = customerData?.cifData?.postal || {};

  // Controlled state
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    cnicIssue: "",
    cnicExpiry: "",
    dob: "",
    fatherOrHusband: "",
    motherMaiden: "",
    gender: "",
    marital: "",
    cell: "",
    landline: "",
    tenure: "",
    residenceType: "",
    dependents: "",
    education: "",
    currentAddress: "",
    permanentAddress: "",
  });
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    if (customerData?.cifData.fullname) { newFormData.name = customerData?.cifData.fullname; prefilled.add("name"); }
    if (customerData?.cnic) { newFormData.cnic = customerData.cnic; prefilled.add("cnic"); }
    if (cnicData?.expiry_date) { newFormData.cnicExpiry = toInputDate(cnicData.expiry_date); prefilled.add("cnicExpiry"); }
    if (ind?.date_of_birth) { newFormData.dob = toInputDate(ind.date_of_birth); prefilled.add("dob"); }
    if (dir?.father_name) { newFormData.fatherOrHusband = dir.father_name; prefilled.add("fatherOrHusband"); }
    if (ind?.maiden_name) { newFormData.motherMaiden = ind.maiden_name; prefilled.add("motherMaiden"); }
    if (ind?.sex) { newFormData.gender = ind.sex === "M" ? "Male" : ind.sex === "F" ? "Female" : ""; prefilled.add("gender"); }
    if (ind?.maritial_status) { newFormData.marital = ind.maritial_status === "M" ? "Married" : "Single"; prefilled.add("marital"); }
    if (phone) { newFormData.cell = phone; prefilled.add("cell"); }
    if (postal?.address) { newFormData.currentAddress = postal.address; prefilled.add("currentAddress"); }
    // No. of dependents, education, tenure, residenceType, landline, permanentAddress: add as available

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    // eslint-disable-next-line
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldClasses = (fieldName: string) => {
    const base = "w-full rounded-xl border border-gray-300 px-4 py-2";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-primary mb-6">Applicant Personal Detail</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column Group */}
        <div>
          <label className="block text-sm font-medium mb-1">Applicant Name</label>
          <input
            type="text"
            className={getFieldClasses("name")}
            placeholder="Applicant Name"
            value={formData.name}
            onChange={e => handleInputChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC</label>
          <input
            type="text"
            className={getFieldClasses("cnic")}
            placeholder="CNIC"
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
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className={getFieldClasses("dob")}
            value={formData.dob}
            onChange={e => handleInputChange("dob", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Father / Husband Name</label>
          <input
            type="text"
            className={getFieldClasses("fatherOrHusband")}
            placeholder="Father / Husband Name"
            value={formData.fatherOrHusband}
            onChange={e => handleInputChange("fatherOrHusband", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mother Maiden Name</label>
          <input
            type="text"
            className={getFieldClasses("motherMaiden")}
            placeholder="Mother Maiden Name"
            value={formData.motherMaiden}
            onChange={e => handleInputChange("motherMaiden", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={formData.gender === "Male"}
                onChange={() => handleInputChange("gender", "Male")}
                className={prefilledFields.has("gender") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={formData.gender === "Female"}
                onChange={() => handleInputChange("gender", "Female")}
                className={prefilledFields.has("gender") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Female
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maritalStatus"
                checked={formData.marital === "Single"}
                onChange={() => handleInputChange("marital", "Single")}
                className={prefilledFields.has("marital") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Single
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maritalStatus"
                checked={formData.marital === "Married"}
                onChange={() => handleInputChange("marital", "Married")}
                className={prefilledFields.has("marital") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Married
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cell No.</label>
          <input
            type="text"
            className={getFieldClasses("cell")}
            placeholder="Cell No."
            value={formData.cell}
            onChange={e => handleInputChange("cell", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residence Landline No.</label>
          <input
            type="text"
            className={getFieldClasses("landline")}
            placeholder="Landline No."
            value={formData.landline}
            onChange={e => handleInputChange("landline", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residence Tenure (Months)</label>
          <input
            type="number"
            className={getFieldClasses("tenure")}
            placeholder="Months"
            value={formData.tenure}
            onChange={e => handleInputChange("tenure", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residence Type</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="residenceType"
                checked={formData.residenceType === "Own"}
                onChange={() => handleInputChange("residenceType", "Own")}
                className={prefilledFields.has("residenceType") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Own
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="residenceType"
                checked={formData.residenceType === "Rented"}
                onChange={() => handleInputChange("residenceType", "Rented")}
                className={prefilledFields.has("residenceType") ? "bg-yellow-50 border-yellow-300" : ""}
              /> Rented
            </label>
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
          <label className="block text-sm font-medium mb-1">Education Level</label>
          <select
            className={getFieldClasses("education")}
            value={formData.education}
            onChange={e => handleInputChange("education", e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Residence Address</label>
          <textarea
            className={getFieldClasses("currentAddress")}
            rows={2}
            placeholder="Current Address"
            value={formData.currentAddress}
            onChange={e => handleInputChange("currentAddress", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Permanent Residence Address</label>
          <textarea
            className={getFieldClasses("permanentAddress")}
            rows={2}
            placeholder="Permanent Address"
            value={formData.permanentAddress}
            onChange={e => handleInputChange("permanentAddress", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
