// components/forms/PlatinumBankUseOnlyForm.tsx
export const PlatinumBankUseOnlyForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Bank's Use Only (Back Office Fields)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Application Reference Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Application Reference Number" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Channel Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Channel Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Program Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Program Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Branch Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SO Employee # (Contractual)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="SO Employee #" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">PB/BM Employee # (Permanent)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="PB/BM Employee #" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SM Employee # (Permanent)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="SM Employee #" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sales Officer Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Sales Officer Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Branch Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Region Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Region Name" />
      </div>
      {/* Customer Contact Confirmation (Radio) */}
      <div>
        <label className="block text-sm font-medium mb-1">Customer Contact Confirmation</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="customerContacted" /> Contacted</label>
          <label className="flex items-center gap-2"><input type="radio" name="customerContacted" /> Not Contacted</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Manager Recommendation</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Recommendation" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Manager Signature / Stamp</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Application Status</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="appStatus" /> Approved</label>
          <label className="flex items-center gap-2"><input type="radio" name="appStatus" /> Pending</label>
          <label className="flex items-center gap-2"><input type="radio" name="appStatus" /> Rejected</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Reason Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Reason Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Analyst Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Analyst Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Analyst Signature</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
    </div>
  </section>
);
