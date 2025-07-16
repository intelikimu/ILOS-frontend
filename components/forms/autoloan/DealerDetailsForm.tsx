export const DealerDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl rounded-lg text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">4. Dealer Details</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Dealer Name</label>
        <input type="text" placeholder="Dealer Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-col">
        <label className="mb-2 text-sm font-medium">Dealer Stamp</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition"/>
      </div>
    </form>
  </section>
);
