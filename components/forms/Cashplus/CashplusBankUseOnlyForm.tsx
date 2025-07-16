// components/forms/CashplusBankUseOnlyForm.tsx
export const CashplusBankUseOnlyForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">For Bank's Use Only</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">Application Source</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> Branch</label>
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> DSF</label>
          <label className="flex items-center gap-2"><input type="radio" name="applicationSource" /> TSF</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Channel Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Channel Code" />
      </div>
      <div>
        <label className="block mb-2 font-medium">SO Employee No. (Contractual)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="SO Employee No." />
      </div>
      <div>
        <label className="block mb-2 font-medium">Program Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Program Code" />
      </div>
      <div>
        <label className="block mb-2 font-medium">PB/BM Employee No. (Permanent)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="PB/BM Employee No." />
      </div>
      <div>
        <label className="block mb-2 font-medium">Branch Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Branch Code" />
      </div>
      <div>
        <label className="block mb-2 font-medium">SM Employee No. (Permanent)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="SM Employee No." />
      </div>
      <div>
        <label className="block mb-2 font-medium">BM Signature & Stamp</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" />
      </div>
    </div>
  </section>
);
