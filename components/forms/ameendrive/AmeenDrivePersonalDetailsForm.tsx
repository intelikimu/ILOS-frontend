import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const AmeenDrivePersonalDetailsForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    cnic: '',
    ntn: '',
    passportNumber: '',
    numberOfChildren: '',
    numberOfDependents: '',
    education: '',
    // Address
    houseNo: '',
    street: '',
    area: '',
    nearestLandmark: '',
    city: '',
    country: '',
    postalCode: '',
    residenceStatus: '',
    monthlyRent: '',
    accommodationType: '',
    residenceNo: '',
    rentedYears: '',
    mobile: '',
    fax: '',
    email: '',
    // Permanent Address
    permHouseNo: '',
    permStreet: '',
    permArea: '',
    permNearestLandmark: '',
    permCity: '',
    permCountry: '',
    permPostalCode: '',
    existingCar: '',
    carManufacturer: '',
    carModel: '',
    carYear: '',
    carStatus: '',
  });
  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (customerData?.personalDetails) {
      const prefilled = new Set<string>();
      const newFormData = { ...formData };
      // Personal
      if (customerData.personalDetails.fullName) {
        newFormData.fullName = customerData.personalDetails.fullName;
        prefilled.add('fullName');
      }
      if (customerData.personalDetails.fatherName) {
        newFormData.fatherName = customerData.personalDetails.fatherName;
        prefilled.add('fatherName');
      }
      if (customerData.personalDetails.motherName) {
        newFormData.motherName = customerData.personalDetails.motherName;
        prefilled.add('motherName');
      }
      if (customerData.personalDetails.dateOfBirth) {
        newFormData.dateOfBirth = new Date(customerData.personalDetails.dateOfBirth).toISOString().split('T')[0];
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
      if (customerData.personalDetails.cnic) {
        newFormData.cnic = customerData.personalDetails.cnic;
        prefilled.add('cnic');
      }
      if (customerData.personalDetails.ntn) {
        newFormData.ntn = customerData.personalDetails.ntn;
        prefilled.add('ntn');
      }
      if (customerData.personalDetails.passportNumber) {
        newFormData.passportNumber = customerData.personalDetails.passportNumber;
        prefilled.add('passportNumber');
      }
      if (customerData.personalDetails.numberOfChildren) {
        newFormData.numberOfChildren = customerData.personalDetails.numberOfChildren.toString();
        prefilled.add('numberOfChildren');
      }
      if (customerData.personalDetails.numberOfDependents) {
        newFormData.numberOfDependents = customerData.personalDetails.numberOfDependents.toString();
        prefilled.add('numberOfDependents');
      }
      if (customerData.personalDetails.education) {
        newFormData.education = customerData.personalDetails.education;
        prefilled.add('education');
      }
      // Address
      if (customerData.addressDetails?.currentAddress) {
        const addr = customerData.addressDetails.currentAddress;
        if (addr.houseNo) { newFormData.houseNo = addr.houseNo; prefilled.add('houseNo'); }
        if (addr.street) { newFormData.street = addr.street; prefilled.add('street'); }
        if (addr.area) { newFormData.area = addr.area; prefilled.add('area'); }
        if (addr.nearestLandmark) { newFormData.nearestLandmark = addr.nearestLandmark; prefilled.add('nearestLandmark'); }
        if (addr.city) { newFormData.city = addr.city; prefilled.add('city'); }
        if (addr.country) { newFormData.country = addr.country; prefilled.add('country'); }
        if (addr.postalCode) { newFormData.postalCode = addr.postalCode; prefilled.add('postalCode'); }
        if (addr.residentialStatus) { newFormData.residenceStatus = addr.residentialStatus; prefilled.add('residenceStatus'); }
        if (addr.monthlyRent) { newFormData.monthlyRent = addr.monthlyRent.toString(); prefilled.add('monthlyRent'); }
        if (addr.mobile) { newFormData.mobile = addr.mobile; prefilled.add('mobile'); }
        if (addr.fax) { newFormData.fax = addr.fax; prefilled.add('fax'); }
        if (addr.email) { newFormData.email = addr.email; prefilled.add('email'); }
      }
      // Permanent Address
      if (customerData.addressDetails?.permanentAddress) {
        const perm = customerData.addressDetails.permanentAddress;
        if (perm.houseNo) { newFormData.permHouseNo = perm.houseNo; prefilled.add('permHouseNo'); }
        if (perm.street) { newFormData.permStreet = perm.street; prefilled.add('permStreet'); }
        if (perm.area) { newFormData.permArea = perm.area; prefilled.add('permArea'); }
        if (perm.nearestLandmark) { newFormData.permNearestLandmark = perm.nearestLandmark; prefilled.add('permNearestLandmark'); }
        if (perm.city) { newFormData.permCity = perm.city; prefilled.add('permCity'); }
        if (perm.country) { newFormData.permCountry = perm.country; prefilled.add('permCountry'); }
        if (perm.postalCode) { newFormData.permPostalCode = perm.postalCode; prefilled.add('permPostalCode'); }
      }
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
      <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">5. Personal Details (CBS)</h3>
      {customerData?.isETB && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        <div>
          <label className="block mb-2 font-medium">Full Name (Mr/Mrs./Ms.)</label>
          <input type="text" className={getFieldClasses('fullName')} placeholder="Full Name" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Father's/Husband's Name</label>
          <input type="text" className={getFieldClasses('fatherName')} placeholder="Father's/Husband's Name" value={formData.fatherName} onChange={e => handleInputChange('fatherName', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Mother's Maiden Name</label>
          <input type="text" className={getFieldClasses('motherName')} placeholder="Mother's Maiden Name" value={formData.motherName} onChange={e => handleInputChange('motherName', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Date of Birth</label>
          <input type="date" className={getFieldClasses('dateOfBirth')} value={formData.dateOfBirth} onChange={e => handleInputChange('dateOfBirth', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="radio" name="gender" checked={formData.gender === 'Male'} onChange={() => handleInputChange('gender', 'Male')} /> Male</label>
            <label className="flex items-center gap-2"><input type="radio" name="gender" checked={formData.gender === 'Female'} onChange={() => handleInputChange('gender', 'Female')} /> Female</label>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Marital Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" checked={formData.maritalStatus === 'Single'} onChange={() => handleInputChange('maritalStatus', 'Single')} /> Single</label>
            <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" checked={formData.maritalStatus === 'Married'} onChange={() => handleInputChange('maritalStatus', 'Married')} /> Married</label>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">CNIC</label>
          <input type="text" className={getFieldClasses('cnic')} placeholder="CNIC" value={formData.cnic} onChange={e => handleInputChange('cnic', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">National Tax No.</label>
          <input type="text" className={getFieldClasses('ntn')} placeholder="NTN" value={formData.ntn} onChange={e => handleInputChange('ntn', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Passport No. (For foreigners)</label>
          <input type="text" className={getFieldClasses('passportNumber')} placeholder="Passport No." value={formData.passportNumber} onChange={e => handleInputChange('passportNumber', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">No. of Dependent Children</label>
          <input type="number" className={getFieldClasses('numberOfChildren')} placeholder="Children" value={formData.numberOfChildren} onChange={e => handleInputChange('numberOfChildren', e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Other Dependents</label>
          <input type="number" className={getFieldClasses('numberOfDependents')} placeholder="Other Dependents" value={formData.numberOfDependents} onChange={e => handleInputChange('numberOfDependents', e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">Educational Qualification</label>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2"><input type="radio" name="eduQualification" checked={formData.education === 'Intermediate'} onChange={() => handleInputChange('education', 'Intermediate')} /> Intermediate</label>
            <label className="flex items-center gap-2"><input type="radio" name="eduQualification" checked={formData.education === 'Graduate'} onChange={() => handleInputChange('education', 'Graduate')} /> Graduate</label>
            <label className="flex items-center gap-2"><input type="radio" name="eduQualification" checked={formData.education === 'Postgraduate'} onChange={() => handleInputChange('education', 'Postgraduate')} /> Postgraduate</label>
            <label className="flex items-center gap-2"><input type="radio" name="eduQualification" checked={formData.education === 'Other'} onChange={() => handleInputChange('education', 'Other')} /> Other</label>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Current Residential Address (CBS)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50" >
          <div>
            <label className="block mb-2 font-medium">House No. / Flat No.</label>
            <input type="text" className={getFieldClasses('houseNo')} placeholder="House No. / Flat No." value={formData.houseNo} onChange={e => handleInputChange('houseNo', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Street</label>
            <input type="text" className={getFieldClasses('street')} placeholder="Street" value={formData.street} onChange={e => handleInputChange('street', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Tehsil / District / Area</label>
            <input type="text" className={getFieldClasses('area')} placeholder="Tehsil / District / Area" value={formData.area} onChange={e => handleInputChange('area', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Nearest Landmark</label>
            <input type="text" className={getFieldClasses('nearestLandmark')} placeholder="Nearest Landmark" value={formData.nearestLandmark} onChange={e => handleInputChange('nearestLandmark', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">City</label>
            <input type="text" className={getFieldClasses('city')} placeholder="City" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Country</label>
            <input type="text" className={getFieldClasses('country')} placeholder="Country" value={formData.country} onChange={e => handleInputChange('country', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Postal Code</label>
            <input type="text" className={getFieldClasses('postalCode')} placeholder="Postal Code" value={formData.postalCode} onChange={e => handleInputChange('postalCode', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Residence Status</label>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Owned'} onChange={() => handleInputChange('residenceStatus', 'Owned')} /> Owned</label>
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Rented'} onChange={() => handleInputChange('residenceStatus', 'Rented')} /> Rented</label>
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Spouse'} onChange={() => handleInputChange('residenceStatus', 'Spouse')} /> Spouse</label>
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Company'} onChange={() => handleInputChange('residenceStatus', 'Company')} /> Company</label>
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Parents'} onChange={() => handleInputChange('residenceStatus', 'Parents')} /> Parents</label>
              <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" checked={formData.residenceStatus === 'Others'} onChange={() => handleInputChange('residenceStatus', 'Others')} /> Others</label>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Monthly Rent (if applicable)</label>
            <input type="number" className={getFieldClasses('monthlyRent')} placeholder="Monthly Rent" value={formData.monthlyRent} onChange={e => handleInputChange('monthlyRent', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Type of Accommodation</label>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2"><input type="radio" name="accommodationType" checked={formData.accommodationType === 'House'} onChange={() => handleInputChange('accommodationType', 'House')} /> House</label>
              <label className="flex items-center gap-2"><input type="radio" name="accommodationType" checked={formData.accommodationType === 'Portion'} onChange={() => handleInputChange('accommodationType', 'Portion')} /> Portion</label>
              <label className="flex items-center gap-2"><input type="radio" name="accommodationType" checked={formData.accommodationType === 'Apartment'} onChange={() => handleInputChange('accommodationType', 'Apartment')} /> Apartment</label>
              <label className="flex items-center gap-2"><input type="radio" name="accommodationType" checked={formData.accommodationType === 'Room'} onChange={() => handleInputChange('accommodationType', 'Room')} /> Room</label>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Residence No.</label>
            <input type="text" className={getFieldClasses('residenceNo')} placeholder="Residence No." value={formData.residenceNo} onChange={e => handleInputChange('residenceNo', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Rented Years (No. of years)</label>
            <input type="number" className={getFieldClasses('rentedYears')} placeholder="Rented Years" value={formData.rentedYears} onChange={e => handleInputChange('rentedYears', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Mobile No.</label>
            <input type="text" className={getFieldClasses('mobile')} placeholder="Mobile No." value={formData.mobile} onChange={e => handleInputChange('mobile', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Fax No.</label>
            <input type="text" className={getFieldClasses('fax')} placeholder="Fax No." value={formData.fax} onChange={e => handleInputChange('fax', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input type="email" className={getFieldClasses('email')} placeholder="Email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
          </div>
        </div>
        <h4 className="text-lg font-semibold mt-8 mb-4">Permanent Residential Address (Verysis)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50" >
          <div>
            <label className="block mb-2 font-medium">House No. / Flat No.</label>
            <input type="text" className={getFieldClasses('permHouseNo')} placeholder="House No. / Flat No." value={formData.permHouseNo} onChange={e => handleInputChange('permHouseNo', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Street</label>
            <input type="text" className={getFieldClasses('permStreet')} placeholder="Street" value={formData.permStreet} onChange={e => handleInputChange('permStreet', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Tehsil / District / Area</label>
            <input type="text" className={getFieldClasses('permArea')} placeholder="Tehsil / District / Area" value={formData.permArea} onChange={e => handleInputChange('permArea', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Nearest Landmark</label>
            <input type="text" className={getFieldClasses('permNearestLandmark')} placeholder="Nearest Landmark" value={formData.permNearestLandmark} onChange={e => handleInputChange('permNearestLandmark', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">City</label>
            <input type="text" className={getFieldClasses('permCity')} placeholder="City" value={formData.permCity} onChange={e => handleInputChange('permCity', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Country</label>
            <input type="text" className={getFieldClasses('permCountry')} placeholder="Country" value={formData.permCountry} onChange={e => handleInputChange('permCountry', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Postal Code</label>
            <input type="text" className={getFieldClasses('permPostalCode')} placeholder="Postal Code" value={formData.permPostalCode} onChange={e => handleInputChange('permPostalCode', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Existing Car (if any)</label>
            <input type="text" className={getFieldClasses('existingCar')} placeholder="Existing Car" value={formData.existingCar} onChange={e => handleInputChange('existingCar', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Car Manufacturer</label>
            <input type="text" className={getFieldClasses('carManufacturer')} placeholder="Car Manufacturer" value={formData.carManufacturer} onChange={e => handleInputChange('carManufacturer', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Car Model</label>
            <input type="text" className={getFieldClasses('carModel')} placeholder="Car Model" value={formData.carModel} onChange={e => handleInputChange('carModel', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Car Year</label>
            <input type="number" className={getFieldClasses('carYear')} placeholder="Car Year" value={formData.carYear} onChange={e => handleInputChange('carYear', e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Car Status</label>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2"><input type="radio" name="carStatus" checked={formData.carStatus === 'Owned'} onChange={() => handleInputChange('carStatus', 'Owned')} /> Owned</label>
              <label className="flex items-center gap-2"><input type="radio" name="carStatus" checked={formData.carStatus === 'Leased'} onChange={() => handleInputChange('carStatus', 'Leased')} /> Leased</label>
              <label className="flex items-center gap-2"><input type="radio" name="carStatus" checked={formData.carStatus === 'Company'} onChange={() => handleInputChange('carStatus', 'Company')} /> Company</label>
              <label className="flex items-center gap-2"><input type="radio" name="carStatus" checked={formData.carStatus === 'Parents'} onChange={() => handleInputChange('carStatus', 'Parents')} /> Parents</label>
              <label className="flex items-center gap-2"><input type="radio" name="carStatus" checked={formData.carStatus === 'Other'} onChange={() => handleInputChange('carStatus', 'Other')} /> Other</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
