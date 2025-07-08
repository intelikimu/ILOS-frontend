// components/forms/PlatinumLienMarkedForm.tsx
export const PlatinumLienMarkedForm = () => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">11. For Lien Marked Credit Cards</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Collateral Type</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Collateral Type" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bank (if deposit)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Bank" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Branch" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">A/C No</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Account No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">A/C Type</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="A/C Type" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Lien Amount</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Lien Amount" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Currency" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">A/C Title</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="A/C Title" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Maturity Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
    </div>
  </section>
);
