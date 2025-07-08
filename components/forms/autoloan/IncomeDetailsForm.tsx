export const IncomeDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">7. Income Details</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Gross Monthly Salary</label>
        <input type="number" placeholder="Gross Monthly Salary" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Other Monthly Income</label>
        <input type="number" placeholder="Other Monthly Income" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total Gross Monthly Income</label>
        <input type="number" placeholder="Total Gross Monthly Income" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Net Monthly Income</label>
        <input type="number" placeholder="Net Monthly Income" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Other Income */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Other Income</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Rent</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Commission</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Business</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Bonus</label>
          <input type="text" placeholder="Other Income (specify)" className="w-full md:w-56 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400 mt-2"/>
        </div>
      </div>
      {/* Spouse */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Spouse Employed?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Yes</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> No</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> N/A</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Spousal Income</label>
        <input type="number" placeholder="Spousal Income" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Spouse’s Income Source</label>
        <input type="text" placeholder="Spouse’s Income Source" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      {/* Statement */}
      <div className="flex flex-col md:col-span-2">
        <label className="font-semibold text-sm mb-2">Statement to be Sent</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Home</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Office</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Mail</label>
        </div>
      </div>
    </form>
  </section>
);
