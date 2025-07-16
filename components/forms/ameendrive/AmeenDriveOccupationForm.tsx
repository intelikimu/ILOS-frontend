import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const AmeenDriveOccupationForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    employmentType: '',
    companyName: '',
    businessType: '',
    profession: '',
    natureOfBusiness: '',
    yearsInBusiness: '',
    shareholding: '',
    employmentStatus: '',
    designation: '',
    department: '',
    businessAddress: '',
    businessStreet: '',
    businessArea: '',
    businessCity: '',
    businessCountry: '',
    businessPostalCode: '',
    businessTelephone: '',
    businessFax: '',
  });
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (customerData?.employmentDetails || customerData?.personalDetails) {
      const prefilled = new Set<string>();
      const newFormData = { ...formData };
      const emp = customerData.employmentDetails || {};
      const pers = customerData.personalDetails || {};
      // Employment Type
      if (emp.occupationCode) { newFormData.employmentType = emp.occupationCode; prefilled.add('employmentType'); }
      if (emp.companyName) { newFormData.companyName = emp.companyName; prefilled.add('companyName'); }
      if (emp.industry) { newFormData.businessType = emp.industry; prefilled.add('businessType'); }
      if (emp.profession) { newFormData.profession = emp.profession; prefilled.add('profession'); }
      if (emp.business) { newFormData.natureOfBusiness = emp.business; prefilled.add('natureOfBusiness'); }
      if (emp.yearsInBusiness) { newFormData.yearsInBusiness = emp.yearsInBusiness.toString(); prefilled.add('yearsInBusiness'); }
      if (emp.shareholding) { newFormData.shareholding = emp.shareholding.toString(); prefilled.add('shareholding'); }
      if (emp.employmentStatus) { newFormData.employmentStatus = emp.employmentStatus; prefilled.add('employmentStatus'); }
      if (emp.designation) { newFormData.designation = emp.designation; prefilled.add('designation'); }
      if (emp.department) { newFormData.department = emp.department; prefilled.add('department'); }
      // Business Address
      if (emp.businessAddress) { newFormData.businessAddress = emp.businessAddress; prefilled.add('businessAddress'); }
      if (emp.businessStreet) { newFormData.businessStreet = emp.businessStreet; prefilled.add('businessStreet'); }
      if (emp.businessArea) { newFormData.businessArea = emp.businessArea; prefilled.add('businessArea'); }
      if (emp.businessCity) { newFormData.businessCity = emp.businessCity; prefilled.add('businessCity'); }
      if (emp.businessCountry) { newFormData.businessCountry = emp.businessCountry; prefilled.add('businessCountry'); }
      if (emp.businessPostalCode) { newFormData.businessPostalCode = emp.businessPostalCode; prefilled.add('businessPostalCode'); }
      if (emp.businessTelephone) { newFormData.businessTelephone = emp.businessTelephone; prefilled.add('businessTelephone'); }
      if (emp.businessFax) { newFormData.businessFax = emp.businessFax; prefilled.add('businessFax'); }
      setFormData(newFormData);
      setPrefilledFields(prefilled);
    }
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFieldClasses = (fieldName: string) => {
    const base = 'w-full border border-gray-300 rounded-xl px-4 py-2';
    const prefilled = 'bg-yellow-50 border-yellow-300';
    const normal = 'bg-white';
    return `${base} ${prefilledFields.has(fieldName) ? prefilled : normal}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">6. Occupation</h3>
      {customerData?.isETB && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Employment Type</label>
          <input type="text" className={getFieldClasses('employmentType')} placeholder="Employment Type" value={formData.employmentType} onChange={e => handleInputChange('employmentType', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Company's Name</label>
          <input type="text" className={getFieldClasses('companyName')} placeholder="Company's Name" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Business Type</label>
          <input type="text" className={getFieldClasses('businessType')} placeholder="Business Type" value={formData.businessType} onChange={e => handleInputChange('businessType', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Profession</label>
          <input type="text" className={getFieldClasses('profession')} placeholder="Profession" value={formData.profession} onChange={e => handleInputChange('profession', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nature of Business/Job</label>
          <input type="text" className={getFieldClasses('natureOfBusiness')} placeholder="Nature of Business/Job" value={formData.natureOfBusiness} onChange={e => handleInputChange('natureOfBusiness', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Years in Business/Employment</label>
          <input type="number" className={getFieldClasses('yearsInBusiness')} placeholder="Years" value={formData.yearsInBusiness} onChange={e => handleInputChange('yearsInBusiness', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Percentage Shareholding of Customer</label>
          <input type="number" className={getFieldClasses('shareholding')} placeholder="Shareholding (%)" value={formData.shareholding} onChange={e => handleInputChange('shareholding', e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Employment Status</label>
          <input type="text" className={getFieldClasses('employmentStatus')} placeholder="Employment Status" value={formData.employmentStatus} onChange={e => handleInputChange('employmentStatus', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Designation</label>
          <input type="text" className={getFieldClasses('designation')} placeholder="Designation" value={formData.designation} onChange={e => handleInputChange('designation', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Department</label>
          <input type="text" className={getFieldClasses('department')} placeholder="Department" value={formData.department} onChange={e => handleInputChange('department', e.target.value)} />
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Business / Employer's Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
          <div>
            <label className="block mb-2 font-medium">Business Address</label>
            <input type="text" className={getFieldClasses('businessAddress')} placeholder="Business Address" value={formData.businessAddress} onChange={e => handleInputChange('businessAddress', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Street</label>
            <input type="text" className={getFieldClasses('businessStreet')} placeholder="Street" value={formData.businessStreet} onChange={e => handleInputChange('businessStreet', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Tehsil / District / Area</label>
            <input type="text" className={getFieldClasses('businessArea')} placeholder="Tehsil / District / Area" value={formData.businessArea} onChange={e => handleInputChange('businessArea', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">City</label>
            <input type="text" className={getFieldClasses('businessCity')} placeholder="City" value={formData.businessCity} onChange={e => handleInputChange('businessCity', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Country</label>
            <input type="text" className={getFieldClasses('businessCountry')} placeholder="Country" value={formData.businessCountry} onChange={e => handleInputChange('businessCountry', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Postal Code</label>
            <input type="text" className={getFieldClasses('businessPostalCode')} placeholder="Postal Code" value={formData.businessPostalCode} onChange={e => handleInputChange('businessPostalCode', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Telephone No.</label>
            <input type="text" className={getFieldClasses('businessTelephone')} placeholder="Telephone No." value={formData.businessTelephone} onChange={e => handleInputChange('businessTelephone', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Fax No.</label>
            <input type="text" className={getFieldClasses('businessFax')} placeholder="Fax No." value={formData.businessFax} onChange={e => handleInputChange('businessFax', e.target.value)} />
          </div>
        </div>
      </div>
    </section>
  );
};
