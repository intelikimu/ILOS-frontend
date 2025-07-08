// components/forms/SMEApplicantPersonalDetailForm.tsx
export const SMEApplicantPersonalDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">Applicant Personal Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Column Group */}
      <div>
        <label className="block text-sm font-medium mb-1">Applicant Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Applicant Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="CNIC" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Issuance Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Expiry Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Father / Husband Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Father / Husband Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mother Maiden Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Mother Maiden Name" />
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
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Single</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Married</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cell No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Cell No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residence Landline No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Landline No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residence Tenure (Months)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Months" />
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
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="No. of Dependents" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Education Level</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Matric</option>
          <option>Intermediate</option>
          <option>Bachelor</option>
          <option>Master</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Current Residence Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2" rows={2} placeholder="Current Address" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Permanent Residence Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2" rows={2} placeholder="Permanent Address" />
      </div>
    </div>
  </section>
)
