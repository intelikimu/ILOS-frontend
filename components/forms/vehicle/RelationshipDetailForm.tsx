// components/forms/RelationshipDetailForm.tsx
export const RelationshipDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">Relationship Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Branch Code</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Branch Code" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="City" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sales Officer Emp. No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Emp. No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sales Manager Emp. No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Manager Emp. No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">PB/BM Employee No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Employee No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Channel</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Channel" />
      </div>
    </div>
  </section>
)
