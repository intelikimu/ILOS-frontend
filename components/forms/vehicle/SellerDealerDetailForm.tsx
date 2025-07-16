// components/forms/SellerDealerDetailForm.tsx
export const SellerDealerDetailForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Seller/Dealer Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Seller/Dealer Name</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Seller/Dealer Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm">
          <option>Select</option>
          <option>Authorized Dealer</option>
          <option>Used Vehicle Seller</option>
        </select>
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
        <label className="block text-sm font-medium mb-1">Contact Person</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Contact Person"
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
    </div>
  </section>
)
