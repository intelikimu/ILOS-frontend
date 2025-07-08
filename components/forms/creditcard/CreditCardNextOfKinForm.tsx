// components/forms/CreditCardNextOfKinForm.tsx
export const CreditCardNextOfKinForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl font-bold text-primary mb-6">6. Next of Kin (CBS)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Relationship</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Relationship" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone 1</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Telephone 1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone 2</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Telephone 2" />
      </div>
    </div>
  </section>
)
