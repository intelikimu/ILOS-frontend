// components/forms/SMEExistingLoanDetailsForm.tsx
export const SMEExistingLoanDetailsForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">Existing Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Bank Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type of Facility</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Type of Facility"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Outstanding Amount (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Outstanding Amount"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Installment (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Monthly Installment"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tenure Remaining (Months)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Tenure Remaining"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purpose of Loan</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Purpose of Loan"
        />
      </div>
    </div>
  </section>
)
