"use client";
import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const ReferencesForm = () => {
  const { customerData } = useCustomer();

  // Support references on both main and cifData
  const referenceContacts =
    customerData?.referenceContacts && Array.isArray(customerData.referenceContacts) && customerData.referenceContacts.length
      ? customerData.referenceContacts
      : (customerData?.cifData?.referenceContacts && Array.isArray(customerData.cifData.referenceContacts))
        ? customerData.cifData.referenceContacts
        : [];

  const [formData, setFormData] = useState({
    reference1: {
      name: '',
      cnic: '',
      relationship: '',
      relationshipOther: '',
      houseNo: '',
      street: '',
      tehsil: '',
      city: '',
      country: '',
      postalCode: '',
      telephoneRes: '',
      telephoneOffice: '',
      mobile: '',
      email: ''
    },
    reference2: {
      name: '',
      cnic: '',
      relationship: '',
      relationshipOther: '',
      houseNo: '',
      street: '',
      tehsil: '',
      city: '',
      country: '',
      postalCode: '',
      telephoneRes: '',
      telephoneOffice: '',
      mobile: '',
      email: ''
    }
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

useEffect(() => {
  // First: try using referenceContacts as usual
  if (referenceContacts?.length) {
    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    referenceContacts.forEach((ref: any, index: number) => {
      if (index >= 2) return;
      const refKey = index === 0 ? 'reference1' : 'reference2';
      if (ref.name) { newFormData[refKey].name = ref.name; prefilled.add(`${refKey}.name`); }
      if (ref.cnic) { newFormData[refKey].cnic = ref.cnic; prefilled.add(`${refKey}.cnic`); }
      if (ref.relationship) { newFormData[refKey].relationship = ref.relationship; prefilled.add(`${refKey}.relationship`); }
      if (ref.relationshipOther) { newFormData[refKey].relationshipOther = ref.relationshipOther; prefilled.add(`${refKey}.relationshipOther`); }
      if (ref.address) {
        if (ref.address.houseNo) { newFormData[refKey].houseNo = ref.address.houseNo; prefilled.add(`${refKey}.houseNo`); }
        if (ref.address.street) { newFormData[refKey].street = ref.address.street; prefilled.add(`${refKey}.street`); }
        if (ref.address.tehsil) { newFormData[refKey].tehsil = ref.address.tehsil; prefilled.add(`${refKey}.tehsil`); }
        if (ref.address.city) { newFormData[refKey].city = ref.address.city; prefilled.add(`${refKey}.city`); }
        if (ref.address.country) { newFormData[refKey].country = ref.address.country; prefilled.add(`${refKey}.country`); }
        if (ref.address.postalCode) { newFormData[refKey].postalCode = ref.address.postalCode; prefilled.add(`${refKey}.postalCode`); }
      }
      if (ref.telephoneRes) { newFormData[refKey].telephoneRes = ref.telephoneRes; prefilled.add(`${refKey}.telephoneRes`); }
      if (ref.telephoneOffice) { newFormData[refKey].telephoneOffice = ref.telephoneOffice; prefilled.add(`${refKey}.telephoneOffice`); }
      if (ref.mobile) { newFormData[refKey].mobile = ref.mobile; prefilled.add(`${refKey}.mobile`); }
      if (ref.email) { newFormData[refKey].email = ref.email; prefilled.add(`${refKey}.email`); }
    });

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    return; // <-- stop here if you had references
  }

  // Fallback: use `relationship` if present
  if (customerData?.cifData?.relationship) {
    const rel = customerData.cifData.relationship;
    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    // Mapping to reference1 fields
    newFormData.reference1.name = rel.relate_customer_name || "";
    if (rel.relate_customer_name) prefilled.add("reference1.name");

    // We don't have CNIC in relationship object, leave blank or use related_customer_id
    newFormData.reference1.cnic = rel.related_customer_id || "";
    if (rel.related_customer_id) prefilled.add("reference1.cnic");

    newFormData.reference1.relationship = rel.relationship_type || "";
    if (rel.relationship_type) prefilled.add("reference1.relationship");

    // You could also fill relationshipOther if needed
    // newFormData.reference1.relationshipOther = "";

    // Other fields (address, phones, etc.) will remain empty unless you have more data

    setFormData(newFormData);
    setPrefilledFields(prefilled);
    return;
  }

  // Else, nothing to prefill

}, [customerData]);


  const handleInputChange = (refIndex: number, field: string, value: string) => {
    const refKey = refIndex === 0 ? 'reference1' : 'reference2';
    setFormData(prev => ({
      ...prev,
      [refKey]: {
        ...prev[refKey],
        [field]: value
      }
    }));
  };

  const getFieldClasses = (fieldName: string) => {
    const baseClasses = "w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
    const prefilledClasses = "bg-yellow-50 border-yellow-300";
    const normalClasses = "bg-gray-50";
    return `${baseClasses} ${prefilledFields.has(fieldName) ? prefilledClasses : normalClasses}`;
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">10. References</h2>

      {prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}

      <form className="space-y-10">
        {[0, 1].map((refIndex) => {
          const refKey = refIndex === 0 ? 'reference1' : 'reference2';
          const refData = formData[refKey];
          return (
            <div key={refIndex} className="border-b pb-8 mb-6">
              <h3 className="text-lg font-semibold mb-4">Reference {refIndex + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className={getFieldClasses(`${refKey}.name`)}
                    value={refData.name}
                    onChange={e => handleInputChange(refIndex, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CNIC No.</label>
                  <input
                    type="text"
                    placeholder="CNIC No."
                    className={getFieldClasses(`${refKey}.cnic`)}
                    value={refData.cnic}
                    onChange={e => handleInputChange(refIndex, 'cnic', e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <div className="flex gap-4 flex-wrap">
                  {["Friend","Spouse", "Neighbour", "Colleague", "Relative", "Other"].map(opt => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`relationship${refIndex}`}
                        value={opt}
                        checked={refData.relationship === opt}
                        onChange={e => handleInputChange(refIndex, 'relationship', e.target.value)}
                        className={prefilledFields.has(`${refKey}.relationship`) ? "bg-yellow-50 border-yellow-300" : ""}
                      />
                      {opt}
                    </label>
                  ))}
                  <input
                    type="text"
                    placeholder="Other (Specify)"
                    className="w-48 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
                    value={refData.relationshipOther}
                    onChange={e => handleInputChange(refIndex, 'relationshipOther', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">House / Flat No.</label>
                  <input
                    type="text"
                    placeholder="House / Flat No."
                    className={getFieldClasses(`${refKey}.houseNo`)}
                    value={refData.houseNo}
                    onChange={e => handleInputChange(refIndex, 'houseNo', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street</label>
                  <input
                    type="text"
                    placeholder="Street"
                    className={getFieldClasses(`${refKey}.street`)}
                    value={refData.street}
                    onChange={e => handleInputChange(refIndex, 'street', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
                  <input
                    type="text"
                    placeholder="Tehsil / District / Area"
                    className={getFieldClasses(`${refKey}.tehsil`)}
                    value={refData.tehsil}
                    onChange={e => handleInputChange(refIndex, 'tehsil', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className={getFieldClasses(`${refKey}.city`)}
                    value={refData.city}
                    onChange={e => handleInputChange(refIndex, 'city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    className={getFieldClasses(`${refKey}.country`)}
                    value={refData.country}
                    onChange={e => handleInputChange(refIndex, 'country', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className={getFieldClasses(`${refKey}.postalCode`)}
                    value={refData.postalCode}
                    onChange={e => handleInputChange(refIndex, 'postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telephone Res.</label>
                  <input
                    type="text"
                    placeholder="Telephone Res."
                    className={getFieldClasses(`${refKey}.telephoneRes`)}
                    value={refData.telephoneRes}
                    onChange={e => handleInputChange(refIndex, 'telephoneRes', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telephone Office</label>
                  <input
                    type="text"
                    placeholder="Telephone Office"
                    className={getFieldClasses(`${refKey}.telephoneOffice`)}
                    value={refData.telephoneOffice}
                    onChange={e => handleInputChange(refIndex, 'telephoneOffice', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile No.</label>
                  <input
                    type="text"
                    placeholder="Mobile No."
                    className={getFieldClasses(`${refKey}.mobile`)}
                    value={refData.mobile}
                    onChange={e => handleInputChange(refIndex, 'mobile', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    className={getFieldClasses(`${refKey}.email`)}
                    value={refData.email}
                    onChange={e => handleInputChange(refIndex, 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </section>
  );
};
