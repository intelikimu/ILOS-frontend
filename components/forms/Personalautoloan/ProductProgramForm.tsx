export const ProductProgramForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">1. Product Program</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Auto Application ID</label>
        <input type="text" placeholder="Auto Application ID" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Product Type */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Product Type</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" /> New Car</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Used Car</label>
        </div>
      </div>
      {/* Payment Mode */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Payment Mode</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" /> PO Manufacturer</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> PO Dealer</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> PO Seller</label>
        </div>
      </div>
      {/* Pricing Plan */}
      <div className="col-span-2 flex flex-col gap-3">
        <label className="block text-sm font-medium mb-1">Pricing Plan</label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2"><input type="checkbox" /> Fixed Rate</label>
          <input type="number" placeholder="Fixed Rate (%)" className="w-32 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2"><input type="checkbox" /> Floating KIBOR + Margin</label>
          <input type="number" placeholder="KIBOR (%)" className="w-32 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          <input type="number" placeholder="Margin (%)" className="w-32 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
        </div>
      </div>
    </form>
  </section>
);
