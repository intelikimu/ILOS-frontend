export const VehicleDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">2. Vehicle Details</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Manufacturer</label>
        <input
          type="text"
          placeholder="Manufacturer"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Model</label>
        <input
          type="text"
          placeholder="Model"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Year of Manufacture</label>
        <input
          type="number"
          placeholder="Year of Manufacture"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Vehicle Class / Engine Size</label>
        <input
          type="text"
          placeholder="Vehicle Class / Engine Size"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price / Value (Rs.)</label>
        <input
          type="number"
          placeholder="Price / Value (Rs.)"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Down Payment % / Amount</label>
        <input
          type="number"
          placeholder="Down Payment % / Amount"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Desired Loan Amount (Rs.)</label>
        <input
          type="number"
          placeholder="Desired Loan Amount (Rs.)"
          className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Installment Period</label>
        <div className="flex gap-4 flex-wrap">
          {[1,2,3,4,5,6,7].map((year) => (
            <label key={year} className="flex items-center gap-2">
              <input type="checkbox" /> {year} year(s)
            </label>
          ))}
        </div>
      </div>

      {/* Used Car Info Section */}
      <div className="col-span-2 pt-8 border-t mt-6">
        <h3 className="text-lg font-semibold mb-4">Used Car Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Seller Name</label>
            <input
              type="text"
              placeholder="Seller Name"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seller CNIC No.</label>
            <input
              type="text"
              placeholder="Seller CNIC No."
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">House / Flat No.</label>
            <input
              type="text"
              placeholder="House / Flat No."
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              placeholder="Street"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
            <input
              type="text"
              placeholder="Tehsil / District / Area"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
            <input
              type="text"
              placeholder="Nearest Landmark"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact No.</label>
            <input
              type="text"
              placeholder="Contact No."
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank</label>
            <input
              type="text"
              placeholder="Bank"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <input
              type="text"
              placeholder="Branch"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account No.</label>
            <input
              type="text"
              placeholder="Account No."
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </form>
  </section>
);
