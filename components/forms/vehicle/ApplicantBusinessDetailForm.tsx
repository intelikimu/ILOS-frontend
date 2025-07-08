// components/forms/ApplicantBusinessDetailForm.tsx
export const ApplicantBusinessDetailForm = () => (

<>
  <section className="mb-10">
    <h3 className="text-2xl font-bold text-primary mb-6">Applicant Business Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Company Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Group Name (if any)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Group Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company Legal Status</label>
        <div className="flex gap-6 mt-2 flex-wrap">
          <label className="flex items-center gap-2"><input type="radio" name="legalStatus" /> Proprietorship</label>
          <label className="flex items-center gap-2"><input type="radio" name="legalStatus" /> Partnership</label>
          <label className="flex items-center gap-2"><input type="radio" name="legalStatus" /> Private Ltd</label>
          <label className="flex items-center gap-2"><input type="radio" name="legalStatus" /> Public Ltd</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type of Business</label>
        <div className="flex gap-6 mt-2 flex-wrap">
          <label className="flex items-center gap-2"><input type="checkbox" /> Trading/Retail</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Services</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Manufacturing</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Experience (Years/Months)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="e.g. 5 Years, 6 Months" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nature of Business</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Nature of Business" rows={2} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Landline No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Landline No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cell No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Cell No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Business NTN</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="NTN" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Business Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Business Address" rows={2} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Establishment</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" />
      </div>
    </div>
  </section>


  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">Business Details (Continued)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Ownership %</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Ownership Percentage" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Shareholder/Partner Names</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Shareholder/Partner Names" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">NTN of Partner/Shareholder</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="NTN of Partner/Shareholder" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Other Business Ownership (%)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Other Business Ownership %" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Business Status</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sector</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Sector" />
      </div>
    </div>
  </section>
</>

)
