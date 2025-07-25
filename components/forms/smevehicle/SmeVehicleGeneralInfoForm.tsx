// components/forms/GeneralInfoForm.tsx
export const GeneralInfoForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">General Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50" >
      <div>
        <label className="block text-sm font-medium mb-1">Application No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Application No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Request</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" />
      </div>
    </div>
  </section>
)
