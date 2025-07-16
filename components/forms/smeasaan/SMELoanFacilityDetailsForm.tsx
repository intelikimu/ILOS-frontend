// components/forms/SMELoanFacilityDetailsForm.tsx
export const SMELoanFacilityDetailsForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Loan/Facility Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Type of Facility</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Running Finance</option>
          <option>Term Finance</option>
          <option>Letter of Credit</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purpose of Loan/Facility</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Purpose" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Requested Amount (Rs.)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Requested Amount" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tenure (Months)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Tenure (Months)" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Repayment Frequency</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Annually</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Installment Amount (Rs.)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Installment Amount" />
      </div>
    </div>
  </section>
)
