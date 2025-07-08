// components/forms/CreditCardEmploymentIncomeForm.tsx
export const CreditCardEmploymentIncomeForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">5. Employment & Income Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Employment Status</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Salaried</option>
          <option>Self-Employed</option>
          <option>Retired</option>
          <option>Student</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Profession/Designation</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Profession/Designation"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company/Business Name</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Company/Business Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Office Address</label>
        <textarea
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          rows={2}
          placeholder="Office Address"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Office City</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Office City"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Office Landline Number</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Office Landline Number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nature of Business</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Nature of Business"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">NTN</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="NTN"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Gross Income (PKR)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Gross Income"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Net Income (PKR)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Net Income"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Other Monthly Income (PKR)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Other Monthly Income"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Source of Other Income</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Source of Other Income"
        />
      </div>
    </div>
  </section>
)
