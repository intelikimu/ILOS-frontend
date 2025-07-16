"use client"
import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const CashplusPersonalInfoForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    cnic: '',
    ntn: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    dependants: '',
    education: '',
    educationOther: '',
    fatherName: '',
    motherName: '',
    employmentStatus: '',
    address: '',
    nearestLandmark: '',
    city: '',
    postalCode: '',
    residingSince: '',
    accommodationType: '',
    accommodationOther: '',
    monthlyRent: '',
    mailingAddress: '',
    // Permanent Address
    permanentHouseNo: '',
    permanentStreet: '',
    permanentCity: '',
    permanentPostalCode: '',
    // Contact Details
    telephoneCurrent: '',
    telephonePermanent: '',
    mobile: '',
    mobileType: '',
    other: '',
    // Additional fields from CIF
    occupationCode: '',
    nationality: '',
    placeOfBirth: '',
    industry: '',
    business: '',
    ublCustomer: '',
    ublAccountNumber: '',
    branchName: '',
    country: ''
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (customerData?.personalDetails) {
      const prefilled = new Set<string>();
      const newFormData = { ...formData };
      
      // Map customer data to form fields
      if (customerData.personalDetails.title) {
        newFormData.title = customerData.personalDetails.title;
        prefilled.add('title');
      }
      if (customerData.personalDetails.firstName) {
        newFormData.firstName = customerData.personalDetails.firstName;
        prefilled.add('firstName');
      }
      if (customerData.personalDetails.middleName) {
        newFormData.middleName = customerData.personalDetails.middleName;
        prefilled.add('middleName');
      }
      if (customerData.personalDetails.lastName) {
        newFormData.lastName = customerData.personalDetails.lastName;
        prefilled.add('lastName');
      }
      if (customerData.personalDetails.cnic) {
        newFormData.cnic = customerData.personalDetails.cnic;
        prefilled.add('cnic');
      }
      if (customerData.personalDetails.ntn) {
        newFormData.ntn = customerData.personalDetails.ntn;
        prefilled.add('ntn');
      }
      if (customerData.personalDetails.dateOfBirth) {
        // Format date for input field (YYYY-MM-DD)
        const formattedDate = new Date(customerData.personalDetails.dateOfBirth).toISOString().split('T')[0];
        newFormData.dateOfBirth = formattedDate;
        prefilled.add('dateOfBirth');
      }
      if (customerData.personalDetails.gender) {
        newFormData.gender = customerData.personalDetails.gender;
        prefilled.add('gender');
      }
      if (customerData.personalDetails.maritalStatus) {
        newFormData.maritalStatus = customerData.personalDetails.maritalStatus;
        prefilled.add('maritalStatus');
      }
      if (customerData.personalDetails.numberOfDependents) {
        newFormData.dependants = customerData.personalDetails.numberOfDependents.toString();
        prefilled.add('dependants');
      }
      if (customerData.personalDetails.education) {
        newFormData.education = customerData.personalDetails.education;
        prefilled.add('education');
      }
      if (customerData.personalDetails.fatherName) {
        newFormData.fatherName = customerData.personalDetails.fatherName;
        prefilled.add('fatherName');
      }
      if (customerData.personalDetails.motherName) {
        newFormData.motherName = customerData.personalDetails.motherName;
        prefilled.add('motherName');
      }
      if (customerData.personalDetails.mobileNumber) {
        newFormData.mobile = customerData.personalDetails.mobileNumber;
        prefilled.add('mobile');
      }
      if (customerData.personalDetails.occupationCode) {
        newFormData.occupationCode = customerData.personalDetails.occupationCode;
        prefilled.add('occupationCode');
      }
      if (customerData.personalDetails.nationality) {
        newFormData.nationality = customerData.personalDetails.nationality;
        prefilled.add('nationality');
      }
      if (customerData.personalDetails.placeOfBirth) {
        newFormData.placeOfBirth = customerData.personalDetails.placeOfBirth;
        prefilled.add('placeOfBirth');
      }
      
      // Employment Details
      if (customerData.employmentDetails?.employmentStatus) {
        newFormData.employmentStatus = customerData.employmentDetails.employmentStatus;
        prefilled.add('employmentStatus');
      }
      if (customerData.employmentDetails?.occupationCode) {
        newFormData.occupationCode = customerData.employmentDetails.occupationCode;
        prefilled.add('occupationCode');
      }
      if (customerData.employmentDetails?.industry) {
        newFormData.industry = customerData.employmentDetails.industry;
        prefilled.add('industry');
      }
      if (customerData.employmentDetails?.business) {
        newFormData.business = customerData.employmentDetails.business;
        prefilled.add('business');
      }
      
      // Banking Details
      if (customerData.bankingDetails?.isUBLCustomer) {
        newFormData.ublCustomer = customerData.bankingDetails.isUBLCustomer;
        prefilled.add('ublCustomer');
      }
      if (customerData.bankingDetails?.ublAccountNumber) {
        newFormData.ublAccountNumber = customerData.bankingDetails.ublAccountNumber;
        prefilled.add('ublAccountNumber');
      }
      if (customerData.bankingDetails?.branchName) {
        newFormData.branchName = customerData.bankingDetails.branchName;
        prefilled.add('branchName');
      }
      
      // Address Details
      if (customerData.addressDetails?.currentAddress) {
        const currentAddr = customerData.addressDetails.currentAddress;
        if (currentAddr.fullAddress) {
          newFormData.address = currentAddr.fullAddress;
          prefilled.add('address');
        }
        if (currentAddr.nearestLandmark) {
          newFormData.nearestLandmark = currentAddr.nearestLandmark;
          prefilled.add('nearestLandmark');
        }
        if (currentAddr.city) {
          newFormData.city = currentAddr.city;
          prefilled.add('city');
        }
        if (currentAddr.postalCode) {
          newFormData.postalCode = currentAddr.postalCode;
          prefilled.add('postalCode');
        }
        if (currentAddr.country) {
          newFormData.country = currentAddr.country;
          prefilled.add('country');
        }
        if (currentAddr.telephone) {
          newFormData.telephoneCurrent = currentAddr.telephone;
          prefilled.add('telephoneCurrent');
        }
        if (currentAddr.yearsAtAddress && currentAddr.yearsAtAddress > 0) {
          newFormData.residingSince = `${currentAddr.yearsAtAddress} years`;
          prefilled.add('residingSince');
        }
        if (currentAddr.residentialStatus) {
          newFormData.accommodationType = currentAddr.residentialStatus;
          prefilled.add('accommodationType');
        }
        if (currentAddr.monthlyRent && currentAddr.monthlyRent > 0) {
          newFormData.monthlyRent = currentAddr.monthlyRent.toString();
          prefilled.add('monthlyRent');
        }
      }
      
      if (customerData.addressDetails?.permanentAddress) {
        const permAddr = customerData.addressDetails.permanentAddress;
        if (permAddr.houseNo) {
          newFormData.permanentHouseNo = permAddr.houseNo;
          prefilled.add('permanentHouseNo');
        }
        if (permAddr.street) {
          newFormData.permanentStreet = permAddr.street;
          prefilled.add('permanentStreet');
        }
        if (permAddr.city) {
          newFormData.permanentCity = permAddr.city;
          prefilled.add('permanentCity');
        }
        if (permAddr.postalCode) {
          newFormData.permanentPostalCode = permAddr.postalCode;
          prefilled.add('permanentPostalCode');
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
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">3. Personal Information</h3>
      {customerData?.isETB && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="title" 
                value="Mr" 
                checked={formData.title === 'Mr'}
                onChange={(e) => handleInputChange('title', e.target.value)}
              /> 
              Mr.
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="title" 
                value="Mrs" 
                checked={formData.title === 'Mrs'}
                onChange={(e) => handleInputChange('title', e.target.value)}
              /> 
              Mrs.
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="title" 
                value="Ms" 
                checked={formData.title === 'Ms'}
                onChange={(e) => handleInputChange('title', e.target.value)}
              /> 
              Ms.
            </label>
          </div>
        </div>
        
        {/* First, Middle, Last Name */}
        <div>
          <label className="block mb-2 font-medium">First Name</label>
          <input 
            type="text" 
            className={getFieldClasses('firstName')}
            placeholder="First Name" 
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Middle Name</label>
          <input 
            type="text" 
            className={getFieldClasses('middleName')}
            placeholder="Middle Name" 
            value={formData.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Last Name</label>
          <input 
            type="text" 
            className={getFieldClasses('lastName')}
            placeholder="Last Name" 
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </div>
        
        {/* CNIC */}
        <div>
          <label className="block mb-2 font-medium">CNIC</label>
          <input 
            type="text" 
            maxLength={15} 
            className={getFieldClasses('cnic')}
            placeholder="CNIC (13 digits)" 
            value={formData.cnic}
            onChange={(e) => handleInputChange('cnic', e.target.value)}
          />
        </div>
        
        {/* NTN */}
        <div>
          <label className="block mb-2 font-medium">NTN (if available)</label>
          <input 
            type="text" 
            className={getFieldClasses('ntn')}
            placeholder="NTN" 
            value={formData.ntn}
            onChange={(e) => handleInputChange('ntn', e.target.value)}
          />
        </div>
        
        {/* Date of Birth */}
        <div>
          <label className="block mb-2 font-medium">Date of Birth</label>
          <input 
            type="date" 
            className={getFieldClasses('dateOfBirth')}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>
        
        {/* Gender */}
        <div>
          <label className="block mb-2 font-medium">Gender</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              /> 
              Male
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              /> 
              Female
            </label>
          </div>
        </div>
        
        {/* Marital Status */}
        <div>
          <label className="block mb-2 font-medium">Marital Status</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="maritalStatus" 
                value="Single"
                checked={formData.maritalStatus === 'Single'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              /> 
              Single
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="maritalStatus" 
                value="Married"
                checked={formData.maritalStatus === 'Married'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              /> 
              Married
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="maritalStatus" 
                value="Widowed"
                checked={formData.maritalStatus === 'Widowed'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              /> 
              Widowed
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="maritalStatus" 
                value="Divorced"
                checked={formData.maritalStatus === 'Divorced'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              /> 
              Divorced
            </label>
          </div>
        </div>
        
        {/* Dependants */}
        <div>
          <label className="block mb-2 font-medium">Dependants</label>
          <input 
            type="number" 
            className={getFieldClasses('dependants')}
            placeholder="Number of Dependants" 
            value={formData.dependants}
            onChange={(e) => handleInputChange('dependants', e.target.value)}
          />
        </div>
        
        {/* Education */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Educational Qualification</label>
          <div className="flex flex-wrap gap-3 mb-2">
            {['Below Matric', 'Matric/O\'Levels', 'Inter/A\'Levels', 'Graduate', 'Post Graduate', 'Other'].map((edu) => (
              <label key={edu} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="education" 
                  value={edu}
                  checked={formData.education === edu}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                /> 
                {edu}
              </label>
            ))}
          </div>
          {formData.education === 'Other' && (
            <input 
              type="text" 
              className="rounded-xl border border-gray-300 bg-white px-4 py-2" 
              placeholder="If Other, specify" 
              value={formData.educationOther}
              onChange={(e) => handleInputChange('educationOther', e.target.value)}
            />
          )}
        </div>
        
        {/* Father's/Husband's Name */}
        <div>
          <label className="block mb-2 font-medium">Father's / Husband's Name</label>
          <input 
            type="text" 
            className={getFieldClasses('fatherName')}
            placeholder="Father/Husband Name" 
            value={formData.fatherName}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
          />
        </div>
        
        {/* Mother's Maiden Name */}
        <div>
          <label className="block mb-2 font-medium">Mother's Maiden Name</label>
          <input 
            type="text" 
            className={getFieldClasses('motherName')}
            placeholder="Mother's Maiden Name" 
            value={formData.motherName}
            onChange={(e) => handleInputChange('motherName', e.target.value)}
          />
        </div>
        
        {/* Employment Status */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Employment Status</label>
          <div className="flex flex-wrap gap-3">
            {['Salaried', 'Govt. servant', 'Armed forces', 'Staff'].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="employmentStatus" 
                  value={status}
                  checked={formData.employmentStatus === status}
                  onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                /> 
                {status}
              </label>
            ))}
          </div>
        </div>
        
        {/* Address Group */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Address</label>
          <textarea 
            rows={2} 
            className={getFieldClasses('address')}
            placeholder="House/Apt, Street, etc." 
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
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
          <label className="block mb-2 font-medium">Residing Since</label>
          <input 
            type="text" 
            className={getFieldClasses('residingSince')}
            placeholder="Duration at Address" 
            value={formData.residingSince}
            onChange={(e) => handleInputChange('residingSince', e.target.value)}
          />
        </div>
        
        {/* Type of Accommodation */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Type of Accommodation</label>
          <div className="flex flex-wrap gap-3 mb-2">
            {[
              'Your own house', 
              'Wife\'s/Husband\'s house', 
              'Parent\'s house', 
              'Company provided house', 
              'Rented house', 
              'Mortgaged house', 
              'Other'
            ].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="accommodationType" 
                  value={type}
                  checked={formData.accommodationType === type}
                  onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                /> 
                {type}
              </label>
            ))}
          </div>
          {formData.accommodationType === 'Other' && (
            <input 
              type="text" 
              className="rounded-xl border border-gray-300 bg-white px-4 py-2" 
              placeholder="If Other, specify" 
              value={formData.accommodationOther}
              onChange={(e) => handleInputChange('accommodationOther', e.target.value)}
            />
          )}
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Monthly Rent</label>
          <input 
            type="number" 
            className={getFieldClasses('monthlyRent')}
            placeholder="Monthly Rent (if rented)" 
            value={formData.monthlyRent}
            onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
          />
        </div>
        
        {/* Preferred Mailing Address */}
        <div>
          <label className="block mb-2 font-medium">Preferred Mailing Address</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="mailingAddress" 
                value="Residence"
                checked={formData.mailingAddress === 'Residence'}
                onChange={(e) => handleInputChange('mailingAddress', e.target.value)}
              /> 
              Residence
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="mailingAddress" 
                value="Office"
                checked={formData.mailingAddress === 'Office'}
                onChange={(e) => handleInputChange('mailingAddress', e.target.value)}
              /> 
              Office
            </label>
          </div>
        </div>
        
        {/* Permanent Address */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Permanent Address (If Different from Current)</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input 
              type="text" 
              className={getFieldClasses('permanentHouseNo')}
              placeholder="House / Apt. No." 
              value={formData.permanentHouseNo}
              onChange={(e) => handleInputChange('permanentHouseNo', e.target.value)}
            />
            <input 
              type="text" 
              className={getFieldClasses('permanentStreet')}
              placeholder="Street" 
              value={formData.permanentStreet}
              onChange={(e) => handleInputChange('permanentStreet', e.target.value)}
            />
            <input 
              type="text" 
              className={getFieldClasses('permanentCity')}
              placeholder="City" 
              value={formData.permanentCity}
              onChange={(e) => handleInputChange('permanentCity', e.target.value)}
            />
            <input 
              type="text" 
              className={getFieldClasses('permanentPostalCode')}
              placeholder="Postal Code" 
              value={formData.permanentPostalCode}
              onChange={(e) => handleInputChange('permanentPostalCode', e.target.value)}
            />
          </div>
        </div>
        
        {/* Residence Contact Details */}
        <div>
          <label className="block mb-2 font-medium">Telephone (Current)</label>
          <input 
            type="text" 
            className={getFieldClasses('telephoneCurrent')}
            placeholder="Telephone (Current)" 
            value={formData.telephoneCurrent}
            onChange={(e) => handleInputChange('telephoneCurrent', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Telephone (Permanent)</label>
          <input 
            type="text" 
            className={getFieldClasses('telephonePermanent')}
            placeholder="Telephone (Permanent)" 
            value={formData.telephonePermanent}
            onChange={(e) => handleInputChange('telephonePermanent', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Mobile</label>
          <input 
            type="text" 
            className={getFieldClasses('mobile')}
            placeholder="Mobile" 
            value={formData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
          />
        </div>
        
        {/* Mobile Type */}
        <div>
          <label className="block mb-2 font-medium">Mobile Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="mobileType" 
                value="Prepaid"
                checked={formData.mobileType === 'Prepaid'}
                onChange={(e) => handleInputChange('mobileType', e.target.value)}
              /> 
              Prepaid
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="mobileType" 
                value="Postpaid"
                checked={formData.mobileType === 'Postpaid'}
                onChange={(e) => handleInputChange('mobileType', e.target.value)}
              /> 
              Postpaid
            </label>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Other (Please Specify)</label>
          <input 
            type="text" 
            className={getFieldClasses('other')}
            placeholder="Other (Please Specify)" 
            value={formData.other}
            onChange={(e) => handleInputChange('other', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
