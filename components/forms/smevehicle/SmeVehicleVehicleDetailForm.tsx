// components/forms/VehicleDetailForm.tsx
export const VehicleDetailForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Vehicle Detail</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Vehicle Type</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm">
          <option>Select</option>
          <option>Truck</option>
          <option>Bus</option>
          <option>Pickup</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Make</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Make" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Model</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Model" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Year of Manufacture</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Year" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Engine Capacity (cc)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Engine Capacity" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Chassis No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Chassis No." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">No. of Vehicles</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="No. of Vehicles" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price per Vehicle (Rs.)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Price per Vehicle" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total Price (Rs.)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm" placeholder="Total Price" />
      </div>
    </div>
  </section>
)
