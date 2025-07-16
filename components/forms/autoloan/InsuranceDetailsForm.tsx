export const InsuranceDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl rounded-lg text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">3. Insurance Details</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Insurance Company Name</label>
        <input type="text" placeholder="Insurance Company Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Insurance Rate (%)</label>
        <input type="number" placeholder="Insurance Rate (%)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
    </form>
  </section>
);
