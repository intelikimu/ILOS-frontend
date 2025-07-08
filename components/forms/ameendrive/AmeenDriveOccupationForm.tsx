export const AmeenDriveOccupationForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">6. Occupation</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Employment Type */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Employment Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="employmentType" /> Salaried</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentType" /> Self-Employed</label>
        </div>
      </div>
      {/* Company's Name */}
      <div>
        <label className="block mb-2 font-medium">Company's Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Company's Name" />
      </div>
      {/* Business Type */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Business Type</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="businessType" /> Proprietorship</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessType" /> Partnership</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessType" /> Private Limited</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessType" /> Public Limited</label>
          <label className="flex items-center gap-2"><input type="radio" name="businessType" /> Government</label>
          <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Other" />
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Profession</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Profession" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Nature of Business/Job</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Nature of Business/Job" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Years in Business/Employment</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Years" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Percentage Shareholding of Customer</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Shareholding (%)" />
      </div>
      {/* Employment Status */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Employment Status</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Permanent</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Contractual</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Designation</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Designation" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Department</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Department" />
      </div>
      {/* Previous Employer / Business Details */}
      <div className="md:col-span-3">
        <h4 className="text-lg font-semibold pt-6 pb-2">Previous Employer / Business Details</h4>
      </div>
      <div>
        <label className="block mb-2 font-medium">Previous Employer / Business Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Previous Employer / Business Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Designation at Previous Employer</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Designation at Previous Employer" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Experience at Previous Employer (Years)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Experience (Years)" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Previous Employer Telephone</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Telephone" />
      </div>
    </div>
    {/* Business / Employer’s Address */}
    <div className="mt-8">
      <h4 className="text-lg font-semibold mb-4">Business / Employer’s Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">Business Address</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Business Address" />
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
          <label className="block mb-2 font-medium">Telephone No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Telephone No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Fax No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Fax No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nearest Landmark</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Nearest Landmark" />
        </div>
      </div>
    </div>
  </section>
);
