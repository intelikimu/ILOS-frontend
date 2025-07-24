export const BankUseOnlyForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">13. For Banks Use Only</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col col-span-2">
        <label className="font-semibold mb-2">Application Source</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Branch</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Dealer</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> TSF</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> DSF</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Channel Code</label>
        <input type="number" placeholder="Channel Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Program Code</label>
        <input type="number" placeholder="Program Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Code</label>
        <input type="number" placeholder="Branch Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* SO Employee */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold pt-4">SO Employee (Contractual)</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SO Employee No.</label>
        <input type="number" placeholder="SO Employee No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* PB/BM Employee */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold pt-4">PB/BM Employee (Permanent)</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">PB/BM Employee No.</label>
        <input type="number" placeholder="PB/BM Employee No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* SM Employee */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold pt-4">SM Employee (Permanent)</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SM Employee No.</label>
        <input type="number" placeholder="SM Employee No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dealership Name</label>
        <input type="text" placeholder="Dealership Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch Name & Code</label>
        <input type="text" placeholder="Branch Name & Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div className="col-span-2">
        <label className="block mb-1">Branch Sign & Stamp</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition"/>
      </div>
    </form>
  </section>
);
