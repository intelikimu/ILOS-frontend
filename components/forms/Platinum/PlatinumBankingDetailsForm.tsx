// components/forms/PlatinumBankingDetailsForm.tsx
export const PlatinumBankingDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">5. Banking Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Existing UBL Customer */}
      <div>
        <label className="block text-sm font-medium mb-1">Existing UBL Customer?</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="existingUbl" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="existingUbl" /> No</label>
        </div>
      </div>
      {/* UBL Account Number */}
      <div>
        <label className="block text-sm font-medium mb-1">UBL Account Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white" placeholder="UBL Account Number" />
      </div>
      {/* UBL Branch */}
      <div>
        <label className="block text-sm font-medium mb-1">UBL Branch</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white" placeholder="UBL Branch" />
      </div>
    </div>
    {/* Other Banks Table */}
    <div className="mt-6 overflow-x-auto">
      <label className="block text-sm font-medium mb-1">Other Banks</label>
      <table className="min-w-full border mb-4 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Bank Name</th>
            <th className="px-2 py-1 border">Branch</th>
            <th className="px-2 py-1 border">Account Number</th>
          </tr>
        </thead>
        <tbody>
          {[1,2].map((i) => (
            <tr key={i}>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Bank Name" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Branch" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Account No." /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Other Credit Cards Table */}
    <div className="mt-6 overflow-x-auto">
      <label className="block text-sm font-medium mb-1">Other Credit Cards</label>
      <table className="min-w-full border mb-4 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Bank</th>
            <th className="px-2 py-1 border">Card</th>
            <th className="px-2 py-1 border">Card No</th>
            <th className="px-2 py-1 border">Limit</th>
          </tr>
        </thead>
        <tbody>
          {[1,2].map((i) => (
            <tr key={i}>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Bank" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Card" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Card No." /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Limit" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Loan Facilities */}
    <div className="mt-6">
      <label className="block text-sm font-medium mb-1">Loan Facilities?</label>
      <div className="flex gap-6 mt-2">
        <label className="flex items-center gap-2"><input type="radio" name="loanFacilities" /> Yes</label>
        <label className="flex items-center gap-2"><input type="radio" name="loanFacilities" /> No</label>
      </div>
    </div>
    {/* Loan Details Table */}
    <div className="mt-6 overflow-x-auto">
      <label className="block text-sm font-medium mb-1">Loan Details</label>
      <table className="min-w-full border mb-4 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Bank</th>
            <th className="px-2 py-1 border">Type</th>
            <th className="px-2 py-1 border">Outstanding</th>
            <th className="px-2 py-1 border">Monthly Installment</th>
          </tr>
        </thead>
        <tbody>
          {[1,2].map((i) => (
            <tr key={i}>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Bank" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Type" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Outstanding" /></td>
              <td><input className="w-full border px-2 py-1 bg-white" placeholder="Installment" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
