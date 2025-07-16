// components/forms/PlatinumReferenceForm.tsx
export const PlatinumReferenceForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">7. Reference Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Reference Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Reference Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Relationship</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Relationship" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">NIC</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="NIC" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address (Street, Area, City)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Street, Area, City" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phones</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Phones" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">NTN</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="NTN" />
      </div>
    </div>
  </section>
);
