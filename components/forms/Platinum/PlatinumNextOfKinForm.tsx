// components/forms/PlatinumNextOfKinForm.tsx
export const PlatinumNextOfKinForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">2. Next of Kin</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Relationship</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Relationship" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone 1</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Telephone 1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone 2</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Telephone 2" />
      </div>
    </div>
  </section>
)
