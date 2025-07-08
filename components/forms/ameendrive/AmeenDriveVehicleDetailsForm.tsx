export const AmeenDriveVehicleDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">2. Vehicle Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2 font-medium">Manufacturer</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Manufacturer" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Model</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Model" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Year of Manufacture</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Year" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Vehicle Class / Engine Size</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Class / Engine Size" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Price / Value (Rs.)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Price / Value" />
      </div>
    </div>
    <div className="border-t mt-8 pt-6">
      <h4 className="text-lg font-semibold mb-4">Used Car Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">Seller Name</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Seller Name" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Seller CNIC No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="CNIC" />
        </div>
        <div>
          <label className="block mb-2 font-medium">House / Flat No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="House / Flat No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Street</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Street" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Tehsil / District / Area</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Tehsil / District / Area" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nearest Landmark</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Nearest Landmark" />
        </div>
        <div>
          <label className="block mb-2 font-medium">City</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="City" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Country</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Country" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Postal Code</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Postal Code" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Contact No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Contact No." />
        </div>
        <div>
          <label className="block mb-2 font-medium">Bank</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Bank" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Branch</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Branch" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Account No.</label>
          <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Account No." />
        </div>
      </div>
    </div>
  </section>
)
