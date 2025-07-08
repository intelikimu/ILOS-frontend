"use client"
import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const CashplusEmploymentInfoForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    companyTypeOther: '',
    department: '',
    designation: '',
    grade: '',
    currentExperience: '',
    previousEmployer: '',
    previousExperience: '',
    officeHouseNo: '',
    officeStreet: '',
    tehsil: '',
    nearestLandmark: '',
    city: '',
    postalCode: '',
    fax: '',
    telephone1: '',
    telephone2: '',
    extension: ''
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (customerData?.employmentDetails) {
      const prefilled = new Set<string>();
      const newFormData = { ...formData };
      
      if (customerData.employmentDetails.companyName) {
        newFormData.companyName = customerData.employmentDetails.companyName;
        prefilled.add('companyName');
      }
      if (customerData.employmentDetails.companyType) {
        newFormData.companyType = customerData.employmentDetails.companyType;
        prefilled.add('companyType');
      }
      if (customerData.employmentDetails.department) {
        newFormData.department = customerData.employmentDetails.department;
        prefilled.add('department');
      }
      if (customerData.employmentDetails.designation) {
        newFormData.designation = customerData.employmentDetails.designation;
        prefilled.add('designation');
      }
      if (customerData.employmentDetails.grade) {
        newFormData.grade = customerData.employmentDetails.grade;
        prefilled.add('grade');
      }
      if (customerData.employmentDetails.currentExperience) {
        newFormData.currentExperience = customerData.employmentDetails.currentExperience.toString();
        prefilled.add('currentExperience');
      }
      if (customerData.employmentDetails.previousEmployer) {
        newFormData.previousEmployer = customerData.employmentDetails.previousEmployer;
        prefilled.add('previousEmployer');
      }
      if (customerData.employmentDetails.previousExperience) {
        newFormData.previousExperience = customerData.employmentDetails.previousExperience.toString();
        prefilled.add('previousExperience');
      }
      
      // Office address
      if (customerData.employmentDetails.officeAddress) {
        const officeAddr = customerData.employmentDetails.officeAddress;
        if (officeAddr.houseNo) {
          newFormData.officeHouseNo = officeAddr.houseNo;
          prefilled.add('officeHouseNo');
        }
        if (officeAddr.street) {
          newFormData.officeStreet = officeAddr.street;
          prefilled.add('officeStreet');
        }
        if (officeAddr.tehsil) {
          newFormData.tehsil = officeAddr.tehsil;
          prefilled.add('tehsil');
        }
        if (officeAddr.nearestLandmark) {
          newFormData.nearestLandmark = officeAddr.nearestLandmark;
          prefilled.add('nearestLandmark');
        }
        if (officeAddr.city) {
          newFormData.city = officeAddr.city;
          prefilled.add('city');
        }
        if (officeAddr.postalCode) {
          newFormData.postalCode = officeAddr.postalCode;
          prefilled.add('postalCode');
        }
        if (officeAddr.fax) {
          newFormData.fax = officeAddr.fax;
          prefilled.add('fax');
        }
        if (officeAddr.telephone1) {
          newFormData.telephone1 = officeAddr.telephone1;
          prefilled.add('telephone1');
        }
        if (officeAddr.telephone2) {
          newFormData.telephone2 = officeAddr.telephone2;
          prefilled.add('telephone2');
        }
        if (officeAddr.extension) {
          newFormData.extension = officeAddr.extension;
          prefilled.add('extension');
        }
      }
      
      setFormData(newFormData);
      setPrefilledFields(prefilled);
    }
  }, [customerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFieldClasses = (fieldName: string) => {
    const baseClasses = "w-full border border-gray-300 rounded-xl px-4 py-2";
    const prefilledClasses = "bg-yellow-50 border-yellow-300";
    const normalClasses = "bg-white";
    
    return `${baseClasses} ${prefilledFields.has(fieldName) ? prefilledClasses : normalClasses}`;
  };

  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold mb-4">4. Employment / Occupational Details</h3>
      {customerData?.customerType === 'ETB' && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company's Name */}
        <div>
          <label className="block mb-2 font-medium">Company's Name</label>
          <input 
            type="text" 
            className={getFieldClasses('companyName')}
            placeholder="Company's Name" 
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
        </div>
        
        {/* Company Type */}
        <div>
          <label className="block mb-2 font-medium">Company Type</label>
          <div className="flex flex-wrap gap-3 mb-2">
            {['Private Limited', 'Public Limited', 'Government', 'Other'].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="companyType" 
                  value={type}
                  checked={formData.companyType === type}
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
                />
                {type}
              </label>
            ))}
          </div>
          {formData.companyType === 'Other' && (
            <input 
              type="text" 
              className="rounded-xl border border-gray-300 bg-white px-4 py-2" 
              placeholder="If Other, specify" 
              value={formData.companyTypeOther}
              onChange={(e) => handleInputChange('companyTypeOther', e.target.value)}
            />
          )}
        </div>
        
        {/* Department */}
        <div>
          <label className="block mb-2 font-medium">Department</label>
          <input 
            type="text" 
            className={getFieldClasses('department')}
            placeholder="Department" 
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
          />
        </div>
        
        {/* Designation */}
        <div>
          <label className="block mb-2 font-medium">Designation</label>
          <input 
            type="text" 
            className={getFieldClasses('designation')}
            placeholder="Designation" 
            value={formData.designation}
            onChange={(e) => handleInputChange('designation', e.target.value)}
          />
        </div>
        
        {/* Grade / Level */}
        <div>
          <label className="block mb-2 font-medium">Grade / Level</label>
          <input 
            type="text" 
            className={getFieldClasses('grade')}
            placeholder="Grade / Level" 
            value={formData.grade}
            onChange={(e) => handleInputChange('grade', e.target.value)}
          />
        </div>
        
        {/* Experience (Current) */}
        <div>
          <label className="block mb-2 font-medium">Experience (Current) (Years)</label>
          <input 
            type="number" 
            className={getFieldClasses('currentExperience')}
            placeholder="Current Experience (Years)" 
            value={formData.currentExperience}
            onChange={(e) => handleInputChange('currentExperience', e.target.value)}
          />
        </div>
        
        {/* Previous Employer Name */}
        <div>
          <label className="block mb-2 font-medium">Previous Employer Name</label>
          <input 
            type="text" 
            className={getFieldClasses('previousEmployer')}
            placeholder="Previous Employer Name" 
            value={formData.previousEmployer}
            onChange={(e) => handleInputChange('previousEmployer', e.target.value)}
          />
        </div>
        
        {/* Experience (Previous) */}
        <div>
          <label className="block mb-2 font-medium">Experience (Previous) (Years)</label>
          <input 
            type="number" 
            className={getFieldClasses('previousExperience')}
            placeholder="Previous Experience (Years)" 
            value={formData.previousExperience}
            onChange={(e) => handleInputChange('previousExperience', e.target.value)}
          />
        </div>
        
        {/* Office Address (broken down) */}
        <div>
          <label className="block mb-2 font-medium">Office Address: House / Apt. No.</label>
          <input 
            type="text" 
            className={getFieldClasses('officeHouseNo')}
            placeholder="House / Apt. No." 
            value={formData.officeHouseNo}
            onChange={(e) => handleInputChange('officeHouseNo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Office Address: Street</label>
          <input 
            type="text" 
            className={getFieldClasses('officeStreet')}
            placeholder="Street" 
            value={formData.officeStreet}
            onChange={(e) => handleInputChange('officeStreet', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Tehsil / District / Area</label>
          <input 
            type="text" 
            className={getFieldClasses('tehsil')}
            placeholder="Tehsil / District / Area" 
            value={formData.tehsil}
            onChange={(e) => handleInputChange('tehsil', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Nearest Landmark</label>
          <input 
            type="text" 
            className={getFieldClasses('nearestLandmark')}
            placeholder="Nearest Landmark" 
            value={formData.nearestLandmark}
            onChange={(e) => handleInputChange('nearestLandmark', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">City</label>
          <input 
            type="text" 
            className={getFieldClasses('city')}
            placeholder="City" 
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Postal Code</label>
          <input 
            type="text" 
            className={getFieldClasses('postalCode')}
            placeholder="Postal Code" 
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Fax</label>
          <input 
            type="text" 
            className={getFieldClasses('fax')}
            placeholder="Fax" 
            value={formData.fax}
            onChange={(e) => handleInputChange('fax', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Telephone 1</label>
          <input 
            type="text" 
            className={getFieldClasses('telephone1')}
            placeholder="Telephone 1" 
            value={formData.telephone1}
            onChange={(e) => handleInputChange('telephone1', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Telephone 2</label>
          <input 
            type="text" 
            className={getFieldClasses('telephone2')}
            placeholder="Telephone 2" 
            value={formData.telephone2}
            onChange={(e) => handleInputChange('telephone2', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Extension</label>
          <input 
            type="text" 
            className={getFieldClasses('extension')}
            placeholder="Extension" 
            value={formData.extension}
            onChange={(e) => handleInputChange('extension', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
