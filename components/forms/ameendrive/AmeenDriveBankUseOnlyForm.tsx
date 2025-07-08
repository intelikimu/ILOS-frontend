export const AmeenDriveBankUseOnlyForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">11. For UBL Ameen Use Only</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2 font-medium">Channel Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">PB/SO employee No.</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Program Code</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Referral ID</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Branch Code</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">SM employee No.</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Application Source</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> Branch</label>
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> Dealer</label>
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> TSF</label>
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> DSF</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Branch Name & Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Dealership Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
    </div>
  </section>
);
