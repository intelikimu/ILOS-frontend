// components/forms/SMEGeneralInfoForm.tsx
export const SMEGeneralInfoForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">General Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Application No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Application No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Request</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">LCV</label>
        <input type="checkbox" className="mr-2" /> <span className="text-sm">Check if applicable</span>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">PMKJ – YES</label>
        <input type="checkbox" className="mr-2" /> <span className="text-sm">Check if applicable</span>
      </div>
    </div>
  </section>
)
