// components/forms/ReferencesDetailForm.tsx
export const ReferencesDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">References Detail</h3>
    <div className="space-y-8">
      {[1, 2].map((ref) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={ref}>
          <div>
            <label className="block text-sm font-medium mb-1">Reference {ref} Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder={`Reference ${ref} Name`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder="CNIC No."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder="Relationship"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact No.</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder="Contact No."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder="Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Business/Profession</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
              placeholder="Business/Profession"
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)
