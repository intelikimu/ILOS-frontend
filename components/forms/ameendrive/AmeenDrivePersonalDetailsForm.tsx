export const AmeenDrivePersonalDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">5. Personal Details (CBS)</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2 font-medium">Full Name (Mr/Mrs./Ms.)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Full Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Father’s/Husband’s Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Father’s/Husband’s Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Mother’s Maiden Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Mother’s Maiden Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Date of Birth</label>
        <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Marital Status</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Single</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Married</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">CNIC</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="CNIC" />
      </div>
      <div>
        <label className="block mb-2 font-medium">National Tax No.</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="NTN" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Passport No. (For foreigners)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Passport No." />
      </div>
      <div>
        <label className="block mb-2 font-medium">No. of Dependent Children</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Children" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Other Dependents</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Other Dependents" />
      </div>
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Educational Qualification</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="eduQualification" /> Intermediate</label>
          <label className="flex items-center gap-2"><input type="radio" name="eduQualification" /> Graduate</label>
          <label className="flex items-center gap-2"><input type="radio" name="eduQualification" /> Postgraduate</label>
          <label className="flex items-center gap-2"><input type="radio" name="eduQualification" /> Other</label>
        </div>
      </div>
    </div>
    <div className="mt-8">
      <h4 className="text-lg font-semibold mb-4">Current Residential Address (CBS)</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">House No. / Flat No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="House No. / Flat No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Street</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Street" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Tehsil / District / Area</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Tehsil / District / Area" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nearest Landmark</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Nearest Landmark" />
        </div>
        <div>
          <label className="block mb-2 font-medium">City</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="City" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Country</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Country" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Postal Code</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Postal Code" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Residence Status</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Owned</label>
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Rented</label>
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Spouse</label>
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Company</label>
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Parents</label>
            <label className="flex items-center gap-2"><input type="radio" name="residenceStatus" /> Others</label>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Monthly Rent (if applicable)</label>
          <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Monthly Rent" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Type of Accommodation</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> House</label>
            <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Portion</label>
            <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Apartment</label>
            <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Room</label>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Residence No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Residence No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Rented Years (No. of years)</label>
          <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Rented Years" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Mobile No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Mobile No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Fax No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Fax No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Email" />
        </div>
      </div>
      <h4 className="text-lg font-semibold mt-8 mb-4">Permanent Residential Address (Verysis)</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">House No. / Flat No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="House No. / Flat No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Street</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Street" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Tehsil / District / Area</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Tehsil / District / Area" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nearest Landmark</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Nearest Landmark" />
        </div>
        <div>
          <label className="block mb-2 font-medium">City</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="City" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Country</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Country" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Postal Code</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Postal Code" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Existing Car (if any)</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Existing Car" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Car Manufacturer</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Car Manufacturer" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Car Model</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Car Model" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Car Year</label>
          <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Car Year" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Car Status</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2"><input type="radio" name="carStatus" /> Owned</label>
            <label className="flex items-center gap-2"><input type="radio" name="carStatus" /> Leased</label>
            <label className="flex items-center gap-2"><input type="radio" name="carStatus" /> Company</label>
            <label className="flex items-center gap-2"><input type="radio" name="carStatus" /> Parents</label>
            <label className="flex items-center gap-2"><input type="radio" name="carStatus" /> Other</label>
          </div>
        </div>
      </div>
    </div>
  </section>
)
