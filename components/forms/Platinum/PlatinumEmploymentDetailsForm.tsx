// components/forms/PlatinumEmploymentDetailsForm.tsx
export const PlatinumEmploymentDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">3. Employment Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium mb-1">Occupation</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="radio" name="occupation" /> Salaried</label>
          <label className="flex items-center gap-2"><input type="radio" name="occupation" /> Self Employed</label>
          <label className="flex items-center gap-2"><input type="radio" name="occupation" /> Self Employed Business</label>
        </div>
      </div>
      {/* Sector */}
      <div>
        <label className="block text-sm font-medium mb-1">Sector</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="radio" name="sector" /> Government</label>
          <label className="flex items-center gap-2"><input type="radio" name="sector" /> Armed Forces</label>
          <label className="flex items-center gap-2"><input type="radio" name="sector" /> Professional</label>
          <label className="flex items-center gap-2"><input type="radio" name="sector" /> Private</label>
        </div>
      </div>
      {/* Employer / Company Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Employer / Company Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Employer / Company Name" />
      </div>
      {/* Department */}
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Department" />
      </div>
      {/* Employment Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Employment Type</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="radio" name="employmentType" /> Permanent</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentType" /> Contractual</label>
        </div>
      </div>
      {/* Business Nature */}
      <div>
        <label className="block text-sm font-medium mb-1">Business Nature</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Sole Proprietorship</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Partnership</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Public Ltd.</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Private Ltd.</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Agricultural</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Industrial</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Commercial</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessNature" /> Other</label>
        </div>
      </div>
      {/* Office Address */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Office Address (If Self Employed)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Street" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="District" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Landmark" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="City" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Postal Code" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Phone 1" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Phone 2" />
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Fax" />
        </div>
      </div>
    </div>

    {/* Previous Employment Details */}
    <section className="mb-10">
      <h3 className="text-lg font-semibold mb-4">4. Previous Employment Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Previous Employer / Business</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Previous Employer / Business" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Designation at Previous Employer</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Designation" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Experience at Previous Employer (Years)</label>
          <input type="number" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Experience (Years)" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telephone (Previous Employer)</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Telephone" />
        </div>
      </div>
    </section>
  </section>
);
