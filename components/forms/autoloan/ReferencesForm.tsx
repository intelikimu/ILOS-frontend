export const ReferencesForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">10. References</h2>
    <form className="space-y-10">
      {[1, 2].map((ref) => (
        <div key={ref} className="border-b pb-8 mb-6">
          <h3 className="text-lg font-semibold mb-4">Reference {ref}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CNIC No.</label>
              <input type="text" placeholder="CNIC No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-2"><input type="checkbox" /> Friend</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Neighbour</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Colleague</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Relative</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Other</label>
              <input type="text" placeholder="Other (Specify)" className="w-48 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">House / Flat No.</label>
              <input type="text" placeholder="House / Flat No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street</label>
              <input type="text" placeholder="Street" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            {/* Repeat for the rest */}
            <div>
              <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
              <input type="text" placeholder="Tehsil / District / Area" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input type="text" placeholder="Country" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input type="text" placeholder="Postal Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telephone Res.</label>
              <input type="text" placeholder="Telephone Res." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telephone Office</label>
              <input type="text" placeholder="Telephone Office" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile No.</label>
              <input type="text" placeholder="Mobile No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="text" placeholder="Email" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
            </div>
          </div>
        </div>
      ))}
    </form>
  </section>
);
