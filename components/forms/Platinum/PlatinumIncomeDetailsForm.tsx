// components/forms/PlatinumIncomeDetailsForm.tsx
export const PlatinumIncomeDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">5. Income Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Gross Monthly Income</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Gross Monthly Income" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Other Income Source</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Other Income Source" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total Income</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Total Income" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Spouse Employed</label>
        <div className="flex flex-wrap gap-4 mt-2">
          <label className="flex items-center gap-2"><input type="checkbox" /> Yes</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> No</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> N/A</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Spouse Income</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Spouse Income" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Spouse Income Source</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Spouse Income Source" />
      </div>
      {/* Card Destination */}
      <div>
        <label className="block text-sm font-medium mb-1">Card Destination</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Home</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Office</label>
        </div>
      </div>
      {/* Statement Delivery */}
      <div>
        <label className="block text-sm font-medium mb-1">Statement Delivery</label>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2"><input type="checkbox" /> Email Statement</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Physical</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email (for Statement)</label>
        <input type="email" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Email (for Statement)" />
      </div>
    </div>
  </section>
)
