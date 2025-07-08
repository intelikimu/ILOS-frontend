// components/forms/CashplusEmploymentInfoForm.tsx
export const CashplusEmploymentInfoForm = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold mb-4">4. Employment / Occupational Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Company’s Name */}
      <div>
        <label className="block mb-2 font-medium">Company’s Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Company’s Name" />
      </div>
      {/* Company Type */}
      <div>
        <label className="block mb-2 font-medium">Company Type</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="companyType" /> Private Limited</label>
          <label className="flex items-center gap-2"><input type="radio" name="companyType" /> Public Limited</label>
          <label className="flex items-center gap-2"><input type="radio" name="companyType" /> Government</label>
          <label className="flex items-center gap-2"><input type="radio" name="companyType" /> Other</label>
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="If Other, specify" />
        </div>
      </div>
      {/* Department */}
      <div>
        <label className="block mb-2 font-medium">Department</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Department" />
      </div>
      {/* Designation */}
      <div>
        <label className="block mb-2 font-medium">Designation</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Designation" />
      </div>
      {/* Grade / Level */}
      <div>
        <label className="block mb-2 font-medium">Grade / Level</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Grade / Level" />
      </div>
      {/* Experience (Current) */}
      <div>
        <label className="block mb-2 font-medium">Experience (Current) (Years)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Current Experience (Years)" />
      </div>
      {/* Previous Employer Name */}
      <div>
        <label className="block mb-2 font-medium">Previous Employer Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Previous Employer Name" />
      </div>
      {/* Experience (Previous) */}
      <div>
        <label className="block mb-2 font-medium">Experience (Previous) (Years)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Previous Experience (Years)" />
      </div>
      {/* Office Address (broken down) */}
      <div>
        <label className="block mb-2 font-medium">Office Address: House / Apt. No.</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="House / Apt. No." />
      </div>
      <div>
        <label className="block mb-2 font-medium">Office Address: Street</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Street" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Tehsil / District / Area</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Tehsil / District / Area" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Nearest Landmark</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Nearest Landmark" />
      </div>
      <div>
        <label className="block mb-2 font-medium">City</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="City" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Postal Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Postal Code" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Fax</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Fax" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Telephone 1</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone 1" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Telephone 2</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone 2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Extension</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Extension" />
      </div>
    </div>
  </section>
)
