// components/forms/SMEReferencesForm.tsx
export const SMEReferencesForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">References</h3>
    <div className="space-y-8">
      {[1, 2].map((ref) => (
        <div  key={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
          <div>
            <label className="block text-sm font-medium mb-1">Reference {ref} Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder={`Reference ${ref} Name`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="CNIC No."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Relationship"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact No.</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Contact No."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profession/Business</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
              placeholder="Profession/Business"
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)
