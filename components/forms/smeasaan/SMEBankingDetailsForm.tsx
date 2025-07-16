// components/forms/SMEBankingDetailsForm.tsx
export const SMEBankingDetailsForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Banking Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Bank Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Branch" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Account No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account Type</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>--Select--</option>
          <option>Current</option>
          <option>Saving</option>
          <option>PLS</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">IBAN</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="IBAN" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2">
          <option>PKR</option>
          <option>USD</option>
          <option>EUR</option>
          <option>Other</option>
        </select>
      </div>
    </div>
  </section>
)
