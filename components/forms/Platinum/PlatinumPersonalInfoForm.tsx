"use client";
import React, { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

// Helper to format ISO date string to yyyy-mm-dd for date inputs
const toInputDate = (date: string | number | Date | undefined) => date ? new Date(date).toISOString().slice(0, 10) : "";

// Helper to split address string by comma
const splitAddress = (address = "") => {
  const parts = address.split(",").map(x => x.trim());
  return {
    house: parts[0] || "",
    street: parts[1] || "",
    area: parts[2] || "",
    city: parts[3] || "",
    postal: ""
  };
};

export const PlatinumPersonalInfoForm = () => {
  const { customerData } = useCustomer();
  const cif = customerData?.cifData || {};
  const ind = cif?.individualInfo || {};
  const cnicType = cif?.customerIdType || {};
  const dir = cif?.dirDetails || {};
  const email = cif?.email?.address || customerData?.cifData.email?.address || "";
  const phone = cif?.phone?.phone_no || customerData?.cifData.phone?.phone_no || "";
  const postal = cif?.postal || {};

  // Name split: We assume fullname in "First Middle Last" form
  const fullname = cif?.fullname || ind?.given_name1 || "";
  const nameParts = fullname.split(" ");
  const firstName = nameParts[0] || "";
  const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  // Address split
  const currAddrObj = splitAddress(postal.address || "");

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    nameOnCard: "",
    cnic: "",
    passport: "",
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
    currHouse: "",
    currStreet: "",
    currTehsil: "",
    currLandmark: "",
    currCity: "",
    currPostal: "",
    resPhone: "",
    mobile: "",
    ntn: "",
    accommodation: "",
    residenceNature: "",
    residingSince: "",
    email: "",
    permanentAddr: "",
    vehicleInfo: ""
  });

  const [prefilledFields, setPrefilledFields] = useState(new Set());

  useEffect(() => {
    const prefilled = new Set();
    const newFormData = { ...formData };

    // Title
    if (ind.title) { newFormData.title = ind.title; prefilled.add("title"); }

    // Name fields
    if (firstName) { newFormData.firstName = firstName; prefilled.add("firstName"); }
    if (middleName) { newFormData.middleName = middleName; prefilled.add("middleName"); }
    if (lastName) { newFormData.lastName = lastName; prefilled.add("lastName"); }

    // Name on Card
    if (cif.shortName) { newFormData.nameOnCard = cif.shortName; prefilled.add("nameOnCard"); }

    // CNIC/Passport
    if (customerData?.cnic) { newFormData.cnic = customerData.cnic; prefilled.add("cnic"); }
    if (cnicType?.id_no && cnicType?.id_type === "PASSPORT") {
      newFormData.passport = cnicType.id_no; prefilled.add("passport");
    }
    if (cnicType?.expiry_date) { newFormData.cnicExpiry = toInputDate(cnicType.expiry_date); prefilled.add("cnicExpiry"); }
    if (cnicType?.created_at) { newFormData.cnicIssue = toInputDate(cnicType.created_at); prefilled.add("cnicIssue"); }

    // Old NIC (not provided in sample, leave blank unless present)
    // Father/Husband
    if (dir?.father_name) { newFormData.fatherHusband = dir.father_name; prefilled.add("fatherHusband"); }

    // DOB
    if (ind?.date_of_birth) { newFormData.dob = toInputDate(ind.date_of_birth); prefilled.add("dob"); }

    // Gender
    if (ind?.sex) { newFormData.gender = ind.sex === "M" ? "Male" : ind.sex === "F" ? "Female" : ""; prefilled.add("gender"); }

    // Mother’s Maiden Name
    if (ind?.maiden_name) { newFormData.motherMaiden = ind.maiden_name; prefilled.add("motherMaiden"); }

    // Marital Status
    if (ind?.maritial_status) {
      const m = ind.maritial_status;
      newFormData.marital =
        m === "M" ? "Married"
        : m === "S" ? "Single"
        : m === "D" ? "Divorced"
        : m === "W" ? "Widowed"
        : "";
      prefilled.add("marital");
    }

    // Dependents/Education (not present in sample data, but could map if available)

    // Address fields
    if (currAddrObj.house) { newFormData.currHouse = currAddrObj.house; prefilled.add("currHouse"); }
    if (currAddrObj.street) { newFormData.currStreet = currAddrObj.street; prefilled.add("currStreet"); }
    if (currAddrObj.area) { newFormData.currTehsil = currAddrObj.area; prefilled.add("currTehsil"); }
    if (currAddrObj.city) { newFormData.currCity = currAddrObj.city; prefilled.add("currCity"); }
    if (postal?.postal_code) { newFormData.currPostal = postal.postal_code; prefilled.add("currPostal"); }

    // Phones
    if (phone) { newFormData.resPhone = phone; prefilled.add("resPhone"); }
    if (customerData?.cifData.phone?.phone_no) { newFormData.mobile = customerData.cifData.phone.phone_no; prefilled.add("mobile"); }
  console.log("Mobile agyua hai ==>:", customerData?.cifData.phone?.phone_no);
    // Email
    if (email) { newFormData.email = email; prefilled.add("email"); }

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    // eslint-disable-next-line
  }, [customerData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const getFieldClasses = (field: string) => {
    const base = "rounded-xl border border-gray-300 bg-white px-4 py-2";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(field) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold mb-4">1. Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <div className="flex gap-4">
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
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              className={getFieldClasses("firstName")}
              placeholder="First"
              value={formData.firstName}
              onChange={e => handleInputChange("firstName", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("middleName")}
              placeholder="Middle"
              value={formData.middleName}
              onChange={e => handleInputChange("middleName", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("lastName")}
              placeholder="Last"
              value={formData.lastName}
              onChange={e => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>
        {/* Name on Card */}
        <div>
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            maxLength={19}
            className={getFieldClasses("nameOnCard")}
            placeholder="Max 19 characters"
            value={formData.nameOnCard}
            onChange={e => handleInputChange("nameOnCard", e.target.value)}
          />
        </div>
        {/* CNIC/Passport */}
        <div>
          <label className="block text-sm font-medium mb-1">Computerized NIC</label>
          <input
            type="text"
            className={getFieldClasses("cnic")}
            placeholder="CNIC"
            value={formData.cnic}
            onChange={e => handleInputChange("cnic", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passport Number</label>
          <input
            type="text"
            className={getFieldClasses("passport")}
            placeholder="Passport (for Foreign Nationals)"
            value={formData.passport}
            onChange={e => handleInputChange("passport", e.target.value)}
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
            placeholder=" OLD CNIC"
            value={formData.cnic}
            onChange={e => handleInputChange("cnic", e.target.value)}
          />
          {/* <input
            type="text"
            className={getFieldClasses("oldNic")}
            placeholder="Old NIC"
            value={formData.oldNic}
            onChange={e => handleInputChange("oldNic", e.target.value)}
          /> */}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Father’s / Husband’s Name</label>
          <input
            type="text"
            className={getFieldClasses("fatherHusband")}
            placeholder="Father/Husband Name"
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
          <div className="flex gap-4">
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
            minLength={6}
            className={getFieldClasses("motherMaiden")}
            placeholder="Min 6 characters"
            value={formData.motherMaiden}
            onChange={e => handleInputChange("motherMaiden", e.target.value)}
          />
        </div>
        {/* Marital Status */}
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
          <label className="block text-sm font-medium mb-1">Dependents</label>
          <input
            type="number"
            className={getFieldClasses("dependents")}
            value={formData.dependents}
            onChange={e => handleInputChange("dependents", e.target.value)}
          />
        </div>
        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1">Education</label>
          <div className="flex flex-wrap gap-2">
            {["Matric/O’Levels", "Inter/A’Levels", "Bachelors", "Masters"].map(opt => (
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
        {/* Current Address */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1">Current Address</label>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            <input
              type="text"
              className={getFieldClasses("currHouse")}
              placeholder="House"
              value={formData.currHouse}
              onChange={e => handleInputChange("currHouse", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("currStreet")}
              placeholder="Street"
              value={formData.currStreet}
              onChange={e => handleInputChange("currStreet", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("currTehsil")}
              placeholder="Tehsil"
              value={formData.currTehsil}
              onChange={e => handleInputChange("currTehsil", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("currLandmark")}
              placeholder="Landmark"
              value={formData.currLandmark}
              onChange={e => handleInputChange("currLandmark", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("currCity")}
              placeholder="City"
              value={formData.currCity}
              onChange={e => handleInputChange("currCity", e.target.value)}
            />
            <input
              type="text"
              className={getFieldClasses("currPostal")}
              placeholder="Postal Code"
              value={formData.currPostal}
              onChange={e => handleInputChange("currPostal", e.target.value)}
            />
          </div>
        </div>
        {/* Phones */}
        <div>
          <label className="block text-sm font-medium mb-1">Residential Phone</label>
          <input
            type="text"
            className={getFieldClasses("resPhone")}
            placeholder="Residential Phone"
            value={formData.resPhone}
            onChange={e => handleInputChange("resPhone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            type="text"
            className={getFieldClasses("mobile")}
            placeholder="Mobile"
            value={formData.mobile}
            onChange={e => handleInputChange("mobile", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NTN</label>
          <input
            type="text"
            className={getFieldClasses("ntn")}
            placeholder="NTN"
            value={formData.ntn}
            onChange={e => handleInputChange("ntn", e.target.value)}
          />
        </div>
        {/* Type of Accommodation */}
        <div>
          <label className="block text-sm font-medium mb-1">Type of Accommodation</label>
          <div className="flex gap-4">
            {["House", "Apartment"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accommodation"
                  checked={formData.accommodation === opt}
                  onChange={() => handleInputChange("accommodation", opt)}
                  className={prefilledFields.has("accommodation") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
        {/* Nature of Residence */}
        <div>
          <label className="block text-sm font-medium mb-1">Nature of Residence</label>
          <div className="flex flex-wrap gap-2">
            {["Owned", "Rented", "Parents", "Mortgage", "Company Provided"].map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="residenceNature"
                  checked={formData.residenceNature === opt}
                  onChange={() => handleInputChange("residenceNature", opt)}
                  className={prefilledFields.has("residenceNature") ? "bg-yellow-50 border-yellow-300" : ""}
                />{opt}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residing Since</label>
          <input
            type="text"
            className={getFieldClasses("residingSince")}
            placeholder="Residing Since"
            value={formData.residingSince}
            onChange={e => handleInputChange("residingSince", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className={getFieldClasses("email")}
            placeholder="Email"
            value={formData.email}
            onChange={e => handleInputChange("email", e.target.value)}
          />
        </div>
        {/* Permanent Address (if different) */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1">Permanent Address (if different)</label>
          <input
            type="text"
            className={getFieldClasses("permanentAddr")}
            placeholder="Permanent Address"
            value={formData.permanentAddr}
            onChange={e => handleInputChange("permanentAddr", e.target.value)}
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1">Vehicle Info</label>
          <input
            type="text"
            className={getFieldClasses("vehicleInfo")}
            placeholder="Vehicle Info"
            value={formData.vehicleInfo}
            onChange={e => handleInputChange("vehicleInfo", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
