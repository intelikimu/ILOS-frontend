"use client";
import React, { useEffect, useState } from "react";
import { useCustomer } from "@/contexts/CustomerContext";

// Utility to parse YYYY-MM-DD from ISO or fallback
const toInputDate = (date?: string) =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

export const ApplicantPersonalDetailForm = () => {
  const { customerData } = useCustomer();

  // Grab all sources for personal details
  const individualInfo = customerData?.cifData.individualInfo || customerData?.cifData?.individualInfo || {};
  const dirDetails = customerData?.cifData.dirDetails || customerData?.cifData?.dirDetails || {};
  const customerIdType = customerData?.cifData.customerIdType || customerData?.cifData?.customerIdType || {};
  const postal = customerData?.cifData.postal || customerData?.cifData?.postal || {};
  const phone = customerData?.cifData.phone || customerData?.cifData?.phone || {};
  const email = customerData?.cifData.email || customerData?.cifData?.email || {};

  const [formData, setFormData] = useState({
    applicantName: "",
    cnic: "",
    cnicIssuanceDate: "",
    cnicExpiryDate: "",
    dob: "",
    fatherHusbandName: "",
    motherMaidenName: "",
    gender: "",
    maritalStatus: "",
    residenceLandline: "",
    cellNo: "",
    residenceTenure: "",
    residenceType: "",
    numDependents: "",
    education: "",
    currentAddress: "",
    permanentAddress: "",
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    // Mapping logic
    // Name
    if (individualInfo.given_name1) {
      newFormData.applicantName = individualInfo.given_name1;
      prefilled.add("applicantName");
    } else if (customerData?.cifData.fullname) {
      newFormData.applicantName = customerData.cifData.fullname;
      prefilled.add("applicantName");
    }

    // CNIC
    if (customerIdType.id_no) {
      newFormData.cnic = customerIdType.id_no;
      prefilled.add("cnic");
    } else if (customerData?.cnic) {
      newFormData.cnic = customerData.cnic;
      prefilled.add("cnic");
    }

    // CNIC Dates
    if (customerIdType.issue_date) {
      newFormData.cnicIssuanceDate = toInputDate(customerIdType.issue_date);
      prefilled.add("cnicIssuanceDate");
    }
    if (customerIdType.expiry_date) {
      newFormData.cnicExpiryDate = toInputDate(customerIdType.expiry_date);
      prefilled.add("cnicExpiryDate");
    }

    // DOB
    if (individualInfo.date_of_birth) {
      newFormData.dob = toInputDate(individualInfo.date_of_birth);
      prefilled.add("dob");
    }

    // Father/Husband Name
    if (dirDetails.father_name) {
      newFormData.fatherHusbandName = dirDetails.father_name;
      prefilled.add("fatherHusbandName");
    } else if (individualInfo.father_husband_name) {
      newFormData.fatherHusbandName = individualInfo.father_husband_name;
      prefilled.add("fatherHusbandName");
    }

    // Mother Maiden Name
    if (individualInfo.maiden_name) {
      newFormData.motherMaidenName = individualInfo.maiden_name;
      prefilled.add("motherMaidenName");
    }

    // Gender
    if (individualInfo.sex) {
      newFormData.gender =
        individualInfo.sex === "M"
          ? "Male"
          : individualInfo.sex === "F"
          ? "Female"
          : "";
      prefilled.add("gender");
    }

    // Marital Status
    if (individualInfo.maritial_status) {
      newFormData.maritalStatus =
        individualInfo.maritial_status === "M"
          ? "Married"
          : individualInfo.maritial_status === "S"
          ? "Single"
          : "";
      prefilled.add("maritalStatus");
    }

    // Landline/Cell
    if (phone.phone_no) {
      newFormData.cellNo = phone.phone_no;
      prefilled.add("cellNo");
    }
    // You could also set residenceLandline from a different source if needed

    // Residence Tenure/Type: (not in backend, keep empty unless backend adds it)
    // Num of dependents: (not in backend, keep empty unless backend adds it)

    // Education
    // Not in backend, keep empty

    // Address
    if (postal.address) {
      newFormData.currentAddress = postal.address;
      prefilled.add("currentAddress");
    }
    if (postal.address) {
      newFormData.permanentAddress = postal.address;
      prefilled.add("permanentAddress");
    }

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    // eslint-disable-next-line
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getFieldClasses = (fieldName: string) => {
    const base =
      "w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm";
    const prefilled = "bg-yellow-50 border-yellow-300";
    const normal = "bg-white";
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-primary mb-6">
        Applicant Personal Detail
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Applicant Name
          </label>
          <input
            type="text"
            className={getFieldClasses("applicantName")}
            placeholder="Applicant Name"
            value={formData.applicantName}
            onChange={(e) =>
              handleInputChange("applicantName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC</label>
          <input
            type="text"
            className={getFieldClasses("cnic")}
            placeholder="CNIC"
            value={formData.cnic}
            onChange={(e) => handleInputChange("cnic", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            CNIC Issuance Date
          </label>
          <input
            type="date"
            className={getFieldClasses("cnicIssuanceDate")}
            value={formData.cnicIssuanceDate}
            onChange={(e) =>
              handleInputChange("cnicIssuanceDate", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            CNIC Expiry Date
          </label>
          <input
            type="date"
            className={getFieldClasses("cnicExpiryDate")}
            value={formData.cnicExpiryDate}
            onChange={(e) =>
              handleInputChange("cnicExpiryDate", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            className={getFieldClasses("dob")}
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Father / Husband Name
          </label>
          <input
            type="text"
            className={getFieldClasses("fatherHusbandName")}
            placeholder="Father / Husband Name"
            value={formData.fatherHusbandName}
            onChange={(e) =>
              handleInputChange("fatherHusbandName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Mother Maiden Name
          </label>
          <input
            type="text"
            className={getFieldClasses("motherMaidenName")}
            placeholder="Mother Maiden Name"
            value={formData.motherMaidenName}
            onChange={(e) =>
              handleInputChange("motherMaidenName", e.target.value)
            }
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
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={formData.gender === "Female"}
                onChange={() => handleInputChange("gender", "Female")}
                className={prefilledFields.has("gender") ? "bg-yellow-50 border-yellow-300" : ""}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Marital Status
          </label>
          <select
            className={getFieldClasses("maritalStatus")}
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Residence Landline No.
          </label>
          <input
            type="text"
            className={getFieldClasses("residenceLandline")}
            placeholder="Landline No."
            value={formData.residenceLandline}
            onChange={(e) =>
              handleInputChange("residenceLandline", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cell No.</label>
          <input
            type="text"
            className={getFieldClasses("cellNo")}
            placeholder="Cell No."
            value={formData.cellNo}
            onChange={(e) => handleInputChange("cellNo", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Residence Tenure (Months)
          </label>
          <input
            type="number"
            className={getFieldClasses("residenceTenure")}
            placeholder="Months"
            value={formData.residenceTenure}
            onChange={(e) =>
              handleInputChange("residenceTenure", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Residence Type
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="residenceType"
                checked={formData.residenceType === "Own"}
                onChange={() => handleInputChange("residenceType", "Own")}
                className={prefilledFields.has("residenceType") ? "bg-yellow-50 border-yellow-300" : ""}
              />
              Own
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="residenceType"
                checked={formData.residenceType === "Rented"}
                onChange={() => handleInputChange("residenceType", "Rented")}
                className={prefilledFields.has("residenceType") ? "bg-yellow-50 border-yellow-300" : ""}
              />
              Rented
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            No. of Dependents
          </label>
          <input
            type="number"
            className={getFieldClasses("numDependents")}
            placeholder="No. of Dependents"
            value={formData.numDependents}
            onChange={(e) =>
              handleInputChange("numDependents", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Education Level
          </label>
          <input
            type="text"
            className={getFieldClasses("education")}
            placeholder="Education Level"
            value={formData.education}
            onChange={(e) =>
              handleInputChange("education", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Current Address
          </label>
          <textarea
            className={getFieldClasses("currentAddress")}
            placeholder="Current Address"
            rows={2}
            value={formData.currentAddress}
            onChange={(e) =>
              handleInputChange("currentAddress", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Permanent Address
          </label>
          <textarea
            className={getFieldClasses("permanentAddress")}
            placeholder="Permanent Address"
            rows={2}
            value={formData.permanentAddress}
            onChange={(e) =>
              handleInputChange("permanentAddress", e.target.value)
            }
          />
        </div>
      </div>
    </section>
  );
};
