// components/forms/PlatinumDeclarationBankSectionForm.tsx
export const PlatinumDeclarationBankSectionForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">8. Declarations & Bank Section</h3>
    <div className=" border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
    {/* Credit Guardian Opt-in */}
    <div>
      <label className="block text-sm font-medium mb-1">Credit Guardian Opt-in</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2"><input type="radio" name="creditGuardian" /> Yes</label>
        <label className="flex items-center gap-2"><input type="radio" name="creditGuardian" /> No</label>
      </div>
    </div>
    {/* Supplementary Cardholder */}
    <div className="mt-6">
      <label className="block text-sm font-medium mb-1">Supplementary Cardholder (Full Details)</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Name" />
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Relationship" />
        <input type="number" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Limit (%)" />
      </div>
    </div>
    {/* UBL Staff Declarations */}
    <div className="mt-6">
      <label className="block text-sm font-medium mb-1">UBL Staff Declarations</label>
      <input type="file" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
    </div>
    {/* Bank Use Only */}
    <div className="mt-6">
      <label className="block text-sm font-medium mb-1">Bank Use Only</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Application Source" />
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Sales Officer" />
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Employee IDs" />
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Status" />
        <input type="text" className="rounded-xl border border-gray-300 px-4 py-2" placeholder="Approval Block" />
      </div>
    </div>
    </div>
  </section>
);
