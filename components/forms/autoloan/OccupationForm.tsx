"use client";
import React, { useState, useEffect } from 'react';
import { useCustomer } from "@/contexts/CustomerContext";

export const OccupationForm = () => {
  const { customerData } = useCustomer();

  // Collect data from backend as much as possible
  const dirDetails = customerData?.cifData?.dirDetails || customerData?.cifData?.dirDetails || {};
  const individualInfo = customerData?.cifData?.individualInfo || customerData?.cifData?.individualInfo || {};
  const business = customerData?.cifData?.business || customerData?.cifData?.business || "";
  const industry = customerData?.cifData?.industry || customerData?.cifData?.industry || "";
  const companyName = dirDetails.director_name || "";
  const sharePct = dirDetails.share_pct || "";
  const occupationCode = individualInfo.occupation_code || "";
  const natureOfBusiness = business;
  const profession = industry;
  const city = customerData?.cifData?.city || "";
  const district = customerData?.cifData?.district || "";
  const country = customerData?.cifData?.domicileCountry || "PK";

  const [formData, setFormData] = useState({
    employmentType: "",      // "Salaried", "Self-Employed"
    companyName: "",
    businessType: "",        // "Proprietorship", "Partnership", etc.
    businessTypeOther: "",
    profession: "",
    natureOfBusiness: "",
    yearsInBusiness: "",
    sharePct: "",
    employmentStatus: "",    // "Permanent", "Contractual"
    designation: "",
    department: "",
    gradeLevel: "",
    employerAddress: "",
    street: "",
    tehsil: "",
    employerCity: "",
    employerCountry: "",
    postalCode: "",
    employerPhone: "",
    nearestLandmark: "",
    prevEmployerName: "",
    prevDesignation: "",
    prevExperience: "",
    prevPhone: "",
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    // Example mapping from backend
    if (companyName) { newFormData.companyName = companyName; prefilled.add("companyName"); }
    if (sharePct) { newFormData.sharePct = sharePct; prefilled.add("sharePct"); }
    if (occupationCode) { newFormData.profession = occupationCode; prefilled.add("profession"); }
    if (natureOfBusiness) { newFormData.natureOfBusiness = natureOfBusiness; prefilled.add("natureOfBusiness"); }
    if (profession) { newFormData.profession = profession; prefilled.add("profession"); }
    if (city) { newFormData.employerCity = city; prefilled.add("employerCity"); }
    if (district) { newFormData.tehsil = district; prefilled.add("tehsil"); }
    if (country) { newFormData.employerCountry = country; prefilled.add("employerCountry"); }
    // You can map more fields as your backend grows

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    // eslint-disable-next-line
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFieldClasses = (fieldName: string) => {
    const base = "w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-gray-50";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">6. Occupation</h2>

      {prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <b>Note:</b> Fields highlighted in yellow are pre-filled from your existing data. You can edit them if needed.
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employment Type */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Employment Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.employmentType === "Salaried"}
                onChange={() => handleInputChange("employmentType", "Salaried")}
              /> Salaried
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.employmentType === "Self-Employed"}
                onChange={() => handleInputChange("employmentType", "Self-Employed")}
              /> Self-Employed
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            className={getFieldClasses("companyName")}
            value={formData.companyName}
            onChange={e => handleInputChange("companyName", e.target.value)}
          />
        </div>
        {/* Business Type */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Business Type</label>
          <div className="flex flex-wrap gap-4">
            {["Proprietorship", "Partnership", "Private Ltd", "Public Ltd", "Government"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.businessType === opt}
                  onChange={() => handleInputChange("businessType", opt)}
                /> {opt}
              </label>
            ))}
            <input
              type="text"
              placeholder="Other (Specify)"
              className="w-full md:w-56 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400 mt-2"
              value={formData.businessTypeOther}
              onChange={e => handleInputChange("businessTypeOther", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profession</label>
          <input
            type="text"
            placeholder="Profession"
            className={getFieldClasses("profession")}
            value={formData.profession}
            onChange={e => handleInputChange("profession", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nature of Business</label>
          <input
            type="text"
            placeholder="Nature of Business"
            className={getFieldClasses("natureOfBusiness")}
            value={formData.natureOfBusiness}
            onChange={e => handleInputChange("natureOfBusiness", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years in Business</label>
          <input
            type="number"
            placeholder="Years in Business"
            className={getFieldClasses("yearsInBusiness")}
            value={formData.yearsInBusiness}
            onChange={e => handleInputChange("yearsInBusiness", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Shareholding %</label>
          <input
            type="number"
            placeholder="Shareholding %"
            className={getFieldClasses("sharePct")}
            value={formData.sharePct}
            onChange={e => handleInputChange("sharePct", e.target.value)}
          />
        </div>
        {/* Employment Status */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Employment Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.employmentStatus === "Permanent"}
                onChange={() => handleInputChange("employmentStatus", "Permanent")}
              /> Permanent
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.employmentStatus === "Contractual"}
                onChange={() => handleInputChange("employmentStatus", "Contractual")}
              /> Contractual
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input
            type="text"
            placeholder="Designation"
            className={getFieldClasses("designation")}
            value={formData.designation}
            onChange={e => handleInputChange("designation", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <input
            type="text"
            placeholder="Department"
            className={getFieldClasses("department")}
            value={formData.department}
            onChange={e => handleInputChange("department", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grade / Level</label>
          <input
            type="text"
            placeholder="Grade / Level"
            className={getFieldClasses("gradeLevel")}
            value={formData.gradeLevel}
            onChange={e => handleInputChange("gradeLevel", e.target.value)}
          />
        </div>
        {/* Employer Address */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold pt-6 pb-2">Employer Address</h3>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business (Employer Address)</label>
          <input
            type="text"
            placeholder="Business (Employer Address)"
            className={getFieldClasses("employerAddress")}
            value={formData.employerAddress}
            onChange={e => handleInputChange("employerAddress", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input
            type="text"
            placeholder="Street"
            className={getFieldClasses("street")}
            value={formData.street}
            onChange={e => handleInputChange("street", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
          <input
            type="text"
            placeholder="Tehsil / District / Area"
            className={getFieldClasses("tehsil")}
            value={formData.tehsil}
            onChange={e => handleInputChange("tehsil", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            placeholder="City"
            className={getFieldClasses("employerCity")}
            value={formData.employerCity}
            onChange={e => handleInputChange("employerCity", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            placeholder="Country"
            className={getFieldClasses("employerCountry")}
            value={formData.employerCountry}
            onChange={e => handleInputChange("employerCountry", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            className={getFieldClasses("postalCode")}
            value={formData.postalCode}
            onChange={e => handleInputChange("postalCode", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telephone No.</label>
          <input
            type="text"
            placeholder="Telephone No."
            className={getFieldClasses("employerPhone")}
            value={formData.employerPhone}
            onChange={e => handleInputChange("employerPhone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
          <input
            type="text"
            placeholder="Nearest Landmark"
            className={getFieldClasses("nearestLandmark")}
            value={formData.nearestLandmark}
            onChange={e => handleInputChange("nearestLandmark", e.target.value)}
          />
        </div>
        {/* Previous Employment */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold pt-6 pb-2">Previous Employment Details</h3>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Name</label>
          <input
            type="text"
            placeholder="Employer Name"
            className={getFieldClasses("prevEmployerName")}
            value={formData.prevEmployerName}
            onChange={e => handleInputChange("prevEmployerName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Designation at Previous Job</label>
          <input
            type="text"
            placeholder="Designation at Previous Job"
            className={getFieldClasses("prevDesignation")}
            value={formData.prevDesignation}
            onChange={e => handleInputChange("prevDesignation", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Experience (Years)</label>
          <input
            type="number"
            placeholder="Experience (Years)"
            className={getFieldClasses("prevExperience")}
            value={formData.prevExperience}
            onChange={e => handleInputChange("prevExperience", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telephone (Previous Employer)</label>
          <input
            type="text"
            placeholder="Telephone (Previous Employer)"
            className={getFieldClasses("prevPhone")}
            value={formData.prevPhone}
            onChange={e => handleInputChange("prevPhone", e.target.value)}
          />
        </div>
      </form>
    </section>
  );
};
