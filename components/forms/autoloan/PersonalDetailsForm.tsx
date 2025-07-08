"use client"
import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const PersonalDetailsForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    title: '',
    gender: '',
    firstName: '',
    middleName: '',
    lastName: '',
    cnic: '',
    ntn: '',
    dateOfBirth: '',
    passportNumber: '',
    education: '',
    motherName: '',
    fatherName: '',
    maritalStatus: '',
    numberOfChildren: '',
    numberOfDependents: '',
    dependentsSpecify: '',
    nextOfKin: '',
    nextOfKinRelation: '',
    nextOfKinCnic: '',
    nextOfKinContact: '',
    // Current Address
    currentHouseNo: '',
    currentStreet: '',
    currentArea: '',
    currentLandmark: '',
    currentCity: '',
    currentCountry: '',
    currentPostalCode: '',
    currentTelephone: '',
    currentMobile: '',
    currentEmail: '',
    yearsAtAddress: '',
    yearsInCity: '',
    residentialStatus: '',
    monthlyRent: '',
    // Permanent Address
    permanentHouseNo: '',
    permanentStreet: '',
    permanentArea: '',
    permanentCity: '',
    permanentCountry: '',
    permanentPostalCode: ''
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
        newFormData.dateOfBirth = customerData.personalDetails.dateOfBirth;
        prefilled.add('dateOfBirth');
      }
      if (customerData.personalDetails.passportNumber) {
        newFormData.passportNumber = customerData.personalDetails.passportNumber;
        prefilled.add('passportNumber');
      }
      if (customerData.personalDetails.education) {
        newFormData.education = customerData.personalDetails.education;
        prefilled.add('education');
      }
      if (customerData.personalDetails.motherName) {
        newFormData.motherName = customerData.personalDetails.motherName;
        prefilled.add('motherName');
      }
      if (customerData.personalDetails.fatherName) {
        newFormData.fatherName = customerData.personalDetails.fatherName;
        prefilled.add('fatherName');
      }
      if (customerData.personalDetails.gender) {
        newFormData.gender = customerData.personalDetails.gender;
        prefilled.add('gender');
      }
      if (customerData.personalDetails.maritalStatus) {
        newFormData.maritalStatus = customerData.personalDetails.maritalStatus;
        prefilled.add('maritalStatus');
      }
      if (customerData.personalDetails.numberOfChildren) {
        newFormData.numberOfChildren = customerData.personalDetails.numberOfChildren.toString();
        prefilled.add('numberOfChildren');
      }
      if (customerData.personalDetails.numberOfDependents) {
        newFormData.numberOfDependents = customerData.personalDetails.numberOfDependents.toString();
        prefilled.add('numberOfDependents');
      }
      if (customerData.personalDetails.mobileNumber) {
        newFormData.currentMobile = customerData.personalDetails.mobileNumber;
        prefilled.add('currentMobile');
      }
      if (customerData.personalDetails.email) {
        newFormData.currentEmail = customerData.personalDetails.email;
        prefilled.add('currentEmail');
      }
      
      // Next of Kin
      if (customerData.nextOfKin?.name) {
        newFormData.nextOfKin = customerData.nextOfKin.name;
        prefilled.add('nextOfKin');
      }
      if (customerData.nextOfKin?.relationship) {
        newFormData.nextOfKinRelation = customerData.nextOfKin.relationship;
        prefilled.add('nextOfKinRelation');
      }
      if (customerData.nextOfKin?.cnic) {
        newFormData.nextOfKinCnic = customerData.nextOfKin.cnic;
        prefilled.add('nextOfKinCnic');
      }
      if (customerData.nextOfKin?.contactNumber) {
        newFormData.nextOfKinContact = customerData.nextOfKin.contactNumber;
        prefilled.add('nextOfKinContact');
      }
      
      // Address Details
      if (customerData.addressDetails?.currentAddress) {
        const currentAddr = customerData.addressDetails.currentAddress;
        if (currentAddr.houseNo) {
          newFormData.currentHouseNo = currentAddr.houseNo;
          prefilled.add('currentHouseNo');
        }
        if (currentAddr.street) {
          newFormData.currentStreet = currentAddr.street;
          prefilled.add('currentStreet');
        }
        if (currentAddr.area) {
          newFormData.currentArea = currentAddr.area;
          prefilled.add('currentArea');
        }
        if (currentAddr.nearestLandmark) {
          newFormData.currentLandmark = currentAddr.nearestLandmark;
          prefilled.add('currentLandmark');
        }
        if (currentAddr.city) {
          newFormData.currentCity = currentAddr.city;
          prefilled.add('currentCity');
        }
        if (currentAddr.country) {
          newFormData.currentCountry = currentAddr.country;
          prefilled.add('currentCountry');
        }
        if (currentAddr.postalCode) {
          newFormData.currentPostalCode = currentAddr.postalCode;
          prefilled.add('currentPostalCode');
        }
        if (currentAddr.residentialStatus) {
          newFormData.residentialStatus = currentAddr.residentialStatus;
          prefilled.add('residentialStatus');
        }
        if (currentAddr.monthlyRent) {
          newFormData.monthlyRent = currentAddr.monthlyRent.toString();
          prefilled.add('monthlyRent');
        }
        if (currentAddr.yearsAtAddress) {
          newFormData.yearsAtAddress = currentAddr.yearsAtAddress.toString();
          prefilled.add('yearsAtAddress');
        }
        if (currentAddr.yearsInCity) {
          newFormData.yearsInCity = currentAddr.yearsInCity.toString();
          prefilled.add('yearsInCity');
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
        if (permAddr.area) {
          newFormData.permanentArea = permAddr.area;
          prefilled.add('permanentArea');
        }
        if (permAddr.city) {
          newFormData.permanentCity = permAddr.city;
          prefilled.add('permanentCity');
        }
        if (permAddr.country) {
          newFormData.permanentCountry = permAddr.country;
          prefilled.add('permanentCountry');
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
    const baseClasses = "w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
    const prefilledClasses = "bg-yellow-50 border-yellow-300";
    const normalClasses = "bg-gray-50";
    
    return `${baseClasses} ${prefilledFields.has(fieldName) ? prefilledClasses : normalClasses}`;
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">5. Personal Details</h2>
      {customerData?.customerType === 'ETB' && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}
      <form className="space-y-10">
        {/* Title, Gender, Names, CNIC, etc */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <select 
              className={getFieldClasses('title')}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select 
              className={getFieldClasses('gender')}
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input 
              type="text" 
              placeholder="First Name" 
              className={getFieldClasses('firstName')}
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Middle Name</label>
            <input 
              type="text" 
              placeholder="Middle Name" 
              className={getFieldClasses('middleName')}
              value={formData.middleName}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input 
              type="text" 
              placeholder="Last Name" 
              className={getFieldClasses('lastName')}
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input 
              type="text" 
              placeholder="CNIC No." 
              className={getFieldClasses('cnic')}
              value={formData.cnic}
              onChange={(e) => handleInputChange('cnic', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">NTN</label>
            <input 
              type="text" 
              placeholder="NTN" 
              className={getFieldClasses('ntn')}
              value={formData.ntn}
              onChange={(e) => handleInputChange('ntn', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input 
              type="date" 
              className={getFieldClasses('dateOfBirth')}
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passport No. (if applicable)</label>
            <input 
              type="text" 
              placeholder="Passport No. (if applicable)" 
              className={getFieldClasses('passportNumber')}
              value={formData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Educational Qualification</label>
            <input 
              type="text" 
              placeholder="Educational Qualification" 
              className={getFieldClasses('education')}
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mother's Maiden Name</label>
            <input 
              type="text" 
              placeholder="Mother's Maiden Name" 
              className={getFieldClasses('motherName')}
              value={formData.motherName}
              onChange={(e) => handleInputChange('motherName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Father's / Husband's Name</label>
            <input 
              type="text" 
              placeholder="Father's / Husband's Name" 
              className={getFieldClasses('fatherName')}
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
            />
          </div>
        </div>
        
        {/* Marital Status */}
        <div>
          <label className="font-semibold text-sm mb-2 block">Marital Status</label>
          <div className="flex gap-6">
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
                value="Single"
                checked={formData.maritalStatus === 'Single'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              /> 
              Single
            </label>
          </div>
        </div>
        
        {/* Dependents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">No. of Children</label>
            <input 
              type="number" 
              placeholder="No. of Children" 
              className={getFieldClasses('numberOfChildren')}
              value={formData.numberOfChildren}
              onChange={(e) => handleInputChange('numberOfChildren', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">No. of Other Dependents</label>
            <input 
              type="number" 
              placeholder="No. of Other Dependents" 
              className={getFieldClasses('numberOfDependents')}
              value={formData.numberOfDependents}
              onChange={(e) => handleInputChange('numberOfDependents', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Specify (Dependents)</label>
            <input 
              type="text" 
              placeholder="Specify (Dependents)" 
              className={getFieldClasses('dependentsSpecify')}
              value={formData.dependentsSpecify}
              onChange={(e) => handleInputChange('dependentsSpecify', e.target.value)}
            />
          </div>
        </div>
        
        {/* Next of Kin */}
        <div>
          <h3 className="text-lg font-semibold pt-6 pb-2">Next of Kin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Next of Kin</label>
              <input 
                type="text" 
                placeholder="Next of Kin" 
                className={getFieldClasses('nextOfKin')}
                value={formData.nextOfKin}
                onChange={(e) => handleInputChange('nextOfKin', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relation</label>
              <input 
                type="text" 
                placeholder="Relation" 
                className={getFieldClasses('nextOfKinRelation')}
                value={formData.nextOfKinRelation}
                onChange={(e) => handleInputChange('nextOfKinRelation', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CNIC No.</label>
              <input 
                type="text" 
                placeholder="CNIC No." 
                className={getFieldClasses('nextOfKinCnic')}
                value={formData.nextOfKinCnic}
                onChange={(e) => handleInputChange('nextOfKinCnic', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact No.</label>
              <input 
                type="text" 
                placeholder="Contact No." 
                className={getFieldClasses('nextOfKinContact')}
                value={formData.nextOfKinContact}
                onChange={(e) => handleInputChange('nextOfKinContact', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Current Residential Address */}
        <div>
          <h3 className="text-lg font-semibold pt-6 pb-2">Current Residential Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">House / Flat No.</label>
              <input 
                type="text" 
                placeholder="House / Flat No." 
                className={getFieldClasses('currentHouseNo')}
                value={formData.currentHouseNo}
                onChange={(e) => handleInputChange('currentHouseNo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street</label>
              <input 
                type="text" 
                placeholder="Street" 
                className={getFieldClasses('currentStreet')}
                value={formData.currentStreet}
                onChange={(e) => handleInputChange('currentStreet', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
              <input 
                type="text" 
                placeholder="Tehsil / District / Area" 
                className={getFieldClasses('currentArea')}
                value={formData.currentArea}
                onChange={(e) => handleInputChange('currentArea', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
              <input 
                type="text" 
                placeholder="Nearest Landmark" 
                className={getFieldClasses('currentLandmark')}
                value={formData.currentLandmark}
                onChange={(e) => handleInputChange('currentLandmark', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                type="text" 
                placeholder="City" 
                className={getFieldClasses('currentCity')}
                value={formData.currentCity}
                onChange={(e) => handleInputChange('currentCity', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input 
                type="text" 
                placeholder="Country" 
                className={getFieldClasses('currentCountry')}
                value={formData.currentCountry}
                onChange={(e) => handleInputChange('currentCountry', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input 
                type="text" 
                placeholder="Postal Code" 
                className={getFieldClasses('currentPostalCode')}
                value={formData.currentPostalCode}
                onChange={(e) => handleInputChange('currentPostalCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telephone Res.</label>
              <input 
                type="text" 
                placeholder="Telephone Res." 
                className={getFieldClasses('currentTelephone')}
                value={formData.currentTelephone}
                onChange={(e) => handleInputChange('currentTelephone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile No.</label>
              <input 
                type="text" 
                placeholder="Mobile No." 
                className={getFieldClasses('currentMobile')}
                value={formData.currentMobile}
                onChange={(e) => handleInputChange('currentMobile', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Email" 
                className={getFieldClasses('currentEmail')}
                value={formData.currentEmail}
                onChange={(e) => handleInputChange('currentEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years at current address</label>
              <input 
                type="number" 
                placeholder="Years at current address" 
                className={getFieldClasses('yearsAtAddress')}
                value={formData.yearsAtAddress}
                onChange={(e) => handleInputChange('yearsAtAddress', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years in current city</label>
              <input 
                type="number" 
                placeholder="Years in current city" 
                className={getFieldClasses('yearsInCity')}
                value={formData.yearsInCity}
                onChange={(e) => handleInputChange('yearsInCity', e.target.value)}
              />
            </div>
          </div>
          <label className="font-semibold text-sm mb-2 block mt-4">Residential Status</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="residentialStatus" 
                value="Property Owner"
                checked={formData.residentialStatus === 'Property Owner'}
                onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
              /> 
              Property Owner
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="residentialStatus" 
                value="Wife or Husband House"
                checked={formData.residentialStatus === 'Wife or Husband House'}
                onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
              /> 
              Wife or Husband House
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="residentialStatus" 
                value="Parents"
                checked={formData.residentialStatus === 'Parents'}
                onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
              /> 
              Parents
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="residentialStatus" 
                value="Privately Rented"
                checked={formData.residentialStatus === 'Privately Rented'}
                onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
              /> 
              Privately Rented
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="residentialStatus" 
                value="Company Rented"
                checked={formData.residentialStatus === 'Company Rented'}
                onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
              /> 
              Company Rented
            </label>
          </div>
          <label className="block text-sm font-medium mb-1 mt-4">Monthly Rent (Rs.)</label>
          <input 
            type="number" 
            placeholder="Monthly Rent (Rs.)" 
            className={getFieldClasses('monthlyRent')}
            value={formData.monthlyRent}
            onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
          />
        </div>
        
        {/* Permanent Residential Address */}
        <div>
          <h3 className="text-lg font-semibold pt-6 pb-2">Permanent Residential Address (Pakistan)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">House / Flat No.</label>
              <input 
                type="text" 
                placeholder="House / Flat No." 
                className={getFieldClasses('permanentHouseNo')}
                value={formData.permanentHouseNo}
                onChange={(e) => handleInputChange('permanentHouseNo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street</label>
              <input 
                type="text" 
                placeholder="Street" 
                className={getFieldClasses('permanentStreet')}
                value={formData.permanentStreet}
                onChange={(e) => handleInputChange('permanentStreet', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
              <input 
                type="text" 
                placeholder="Tehsil / District / Area" 
                className={getFieldClasses('permanentArea')}
                value={formData.permanentArea}
                onChange={(e) => handleInputChange('permanentArea', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                type="text" 
                placeholder="City" 
                className={getFieldClasses('permanentCity')}
                value={formData.permanentCity}
                onChange={(e) => handleInputChange('permanentCity', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input 
                type="text" 
                placeholder="Country" 
                className={getFieldClasses('permanentCountry')}
                value={formData.permanentCountry}
                onChange={(e) => handleInputChange('permanentCountry', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input 
                type="text" 
                placeholder="Postal Code" 
                className={getFieldClasses('permanentPostalCode')}
                value={formData.permanentPostalCode}
                onChange={(e) => handleInputChange('permanentPostalCode', e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
