// components/forms/CreditCardEmploymentDetailsForm.tsx
export const CreditCardEmploymentDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">7. Employment Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50" >
      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium mb-1">Occupation</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Salaried</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Self Employed</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Self Employed Business</label>
        </div>
      </div>
      {/* Sector */}
      <div>
        <label className="block text-sm font-medium mb-1">Sector</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Government</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Armed Forces</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Professional</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Private</label>
        </div>
      </div>
      {/* Employer / Company Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Employer / Company Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Employer / Company Name" />
      </div>
      {/* Department */}
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Department" />
      </div>
      {/* Employment Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Employment Type</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Permanent</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Contractual</label>
        </div>
      </div>
      {/* Employment Status (if UBL staff) */}
      <div>
        <label className="block text-sm font-medium mb-1">Employment Status (if UBL staff)</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Confirmed</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Other</label>
        </div>
      </div>
      {/* Business Nature */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Business Nature</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Sole Proprietorship</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Partnership</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Public Ltd.</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Private Ltd.</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Agricultural</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Industrial</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Commercial</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Other</label>
        </div>
      </div>
      {/* Office Address (Self Employed) */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Office Address (Self Employed)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Street" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="District" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Landmark" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="City" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Postal Code" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Phone 1" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Phone 2" />
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Fax" />
        </div>
      </div>
    </div>
  </section>
)
