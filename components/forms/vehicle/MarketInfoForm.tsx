// components/forms/MarketInfoForm.tsx
export const MarketInfoForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Market Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Business/Industry Trend</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" rows={2} placeholder="Describe current business/industry trend" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Competitor Names</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Competitor Names" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Major Customers</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Major Customers" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Any Other Relevant Information</label>
        <textarea className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" rows={2} placeholder="Other info" />
      </div>
    </div>
  </section>
)
