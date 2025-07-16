// components/forms/SMERelationshipDetailForm.tsx
export const SMERelationshipDetailForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Relationship Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Branch Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Branch Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="City" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sales Officer Employee No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Emp. No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sales Manager Emp No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Manager Emp. No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">FR/BR Employee No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="FR/BR Employee No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Channel</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Channel" />
      </div>
    </div>
  </section>
)
