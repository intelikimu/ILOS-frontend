// components/forms/CreditCardBankingDetailsForm.tsx
export const CreditCardBankingDetailsForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">11. Banking Details</h3>
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
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Branch"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="Account Number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">IBAN</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
          placeholder="IBAN"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account Type</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Current</option>
          <option>Savings</option>
          <option>PLS</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account Opening Date</label>
        <input
          type="date"
          className="w-full rounded-xl border border-gray-300 px-4 py-2"
        />
      </div>
    </div>
  </section>
)
