// components/forms/ApplicantPersonalDetailForm.tsx
export const ApplicantPersonalDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">Applicant Personal Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Applicant Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Applicant Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="CNIC" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Issuance Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Expiry Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Father / Husband Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Father / Husband Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mother Maiden Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Mother Maiden Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Marital Status</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm">
          <option>Single</option>
          <option>Married</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residence Landline No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Landline No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cell No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Cell No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residence Tenure (Months)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Months" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residence Type</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="residenceType" /> Own</label>
          <label className="flex items-center gap-2"><input type="radio" name="residenceType" /> Rented</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">No. of Dependents</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="No. of Dependents" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Education Level</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Education Level" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Current Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Current Address" rows={2} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Permanent Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Permanent Address" rows={2} />
      </div>
    </div>
  </section>
)
