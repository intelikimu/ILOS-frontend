export const OccupationForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">6. Occupation</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Employment Type */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Employment Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Salaried</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Self-Employed</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input type="text" placeholder="Company Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Business Type */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Business Type</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Proprietorship</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Partnership</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Private Ltd</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Public Ltd</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Government</label>
          <input type="text" placeholder="Other (Specify)" className="w-full md:w-56 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400 mt-2"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Profession</label>
        <input type="text" placeholder="Profession" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nature of Business</label>
        <input type="text" placeholder="Nature of Business" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Years in Business</label>
        <input type="number" placeholder="Years in Business" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Shareholding %</label>
        <input type="number" placeholder="Shareholding %" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Employment Status */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Employment Status</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Permanent</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Contractual</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Designation</label>
        <input type="text" placeholder="Designation" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input type="text" placeholder="Department" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Grade / Level</label>
        <input type="text" placeholder="Grade / Level" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Employer Address */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold pt-6 pb-2">Employer Address</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Business (Employer Address)</label>
        <input type="text" placeholder="Business (Employer Address)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Street</label>
        <input type="text" placeholder="Street" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
        <input type="text" placeholder="Tehsil / District / Area" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <input type="text" placeholder="Country" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Postal Code</label>
        <input type="text" placeholder="Postal Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone No.</label>
        <input type="text" placeholder="Telephone No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
        <input type="text" placeholder="Nearest Landmark" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Previous Employment */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold pt-6 pb-2">Previous Employment Details</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Employer Name</label>
        <input type="text" placeholder="Employer Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Designation at Previous Job</label>
        <input type="text" placeholder="Designation at Previous Job" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Experience (Years)</label>
        <input type="number" placeholder="Experience (Years)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone (Previous Employer)</label>
        <input type="text" placeholder="Telephone (Previous Employer)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
    </form>
  </section>
);
