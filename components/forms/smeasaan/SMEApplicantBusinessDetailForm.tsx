export const SMEApplicantBusinessDetailForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl font-bold text-primary mb-6">Applicant Business Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Company Name" />
      </div>
      {/* Company Legal Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Company Legal Status</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Proprietorship</option>
          <option>Partnership</option>
          <option>Private Ltd</option>
          <option>Public Ltd</option>
        </select>
      </div>
      {/* Group Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Group Name (if any)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Group Name" />
      </div>
      {/* Experience */}
      <div>
        <label className="block text-sm font-medium mb-1">Experience (No. of years/months)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Years / Months" />
      </div>
      {/* Landline No. */}
      <div>
        <label className="block text-sm font-medium mb-1">Landline No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Landline No." />
      </div>
      {/* Cell No. */}
      <div>
        <label className="block text-sm font-medium mb-1">Cell No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Cell No." />
      </div>
      {/* Sector (Checkboxes) */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Sector</label>
        <div className="flex flex-wrap gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="checkbox" /> SE</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> ME</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Manufacturing</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Traders - Distributors</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Wholesaler / Retailer</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Services</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Individuals</label>
        </div>
      </div>
      {/* National Tax No. */}
      <div>
        <label className="block text-sm font-medium mb-1">National Tax No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="NTN" />
      </div>
      {/* Tax Payer */}
      <div>
        <label className="block text-sm font-medium mb-1">Tax Payer</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="taxPayer" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="taxPayer" /> No</label>
        </div>
      </div>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Email" />
      </div>
      {/* Nearest Landmark */}
      <div>
        <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Nearest Landmark" />
      </div>
      {/* No. of Employees */}
      <div>
        <label className="block text-sm font-medium mb-1">No. of Employees (incl. contractual)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="No. of Employees" />
      </div>
      {/* Annual Sales */}
      <div>
        <label className="block text-sm font-medium mb-1">Annual Sales in PKR</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Annual Sales" />
      </div>
      {/* Business Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Business Address</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2" rows={2} placeholder="Business Address" />
      </div>
      {/* Political Affiliation */}
      <div>
        <label className="block text-sm font-medium mb-1">Political Affiliation (if any)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Political Affiliation" />
      </div>
      {/* UBL Bank A/C No. */}
      <div>
        <label className="block text-sm font-medium mb-1">UBL Bank A/C No. (if any)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="UBL Bank A/C No." />
      </div>
      {/* UBL Bank Title of A/C */}
      <div>
        <label className="block text-sm font-medium mb-1">UBL Bank Title of A/C (if any)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="UBL Bank Title of A/C" />
      </div>
      {/* Fax No. */}
      <div>
        <label className="block text-sm font-medium mb-1">Fax No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Fax No." />
      </div>
      {/* Date of company / business est. */}
      <div>
        <label className="block text-sm font-medium mb-1">Date of company/business est.</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
      {/* Business premises */}
      <div>
        <label className="block text-sm font-medium mb-1">Business Premises</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="checkbox" /> Owned</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Rented</label>
        </div>
      </div>
      {/* Registration No. */}
      <div>
        <label className="block text-sm font-medium mb-1">Registration No. (if applicable)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Registration No." />
      </div>
      {/* Main Business Account - Bank Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Main Business Account - Bank Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Bank Name" />
      </div>
      {/* A/C No. */}
      <div>
        <label className="block text-sm font-medium mb-1">A/C No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Account No." />
      </div>
      {/* A/C Opening Date */}
      <div>
        <label className="block text-sm font-medium mb-1">A/C Opening Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
    </div>
  </section>
)
