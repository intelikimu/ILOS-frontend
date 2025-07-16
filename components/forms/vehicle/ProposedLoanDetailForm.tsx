// components/forms/ProposedLoanDetailForm.tsx
export const ProposedLoanDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Proposed Loan Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Total Loan Amount (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Total Loan Amount"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Down Payment (%)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Down Payment (%)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Down Payment (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Down Payment (Rs.)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Installment Period (Months)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Installment Period"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Installment (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Monthly Installment"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purpose of Vehicle</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Purpose (Goods, Passenger, etc.)"
        />
      </div>
    </div>
  </section>
)
