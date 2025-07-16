export const AmeenDriveProductProgramForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-white font-semibold mb-4 p-4 rounded-lg bg-blue-500">1. Product Program</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">City</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="City" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Auto Application ID</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Auto Application ID" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Product Type</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="productType" /> New Car</label>
          <label className="flex items-center gap-2"><input type="radio" name="productType" /> Used Car (Local)</label>
          <label className="flex items-center gap-2"><input type="radio" name="productType" /> Used Car (Imported)</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Pricing Plan</label>
        <label className="flex items-center gap-2"><input type="radio" name="pricingPlan" /> Floating Rate</label>
      </div>
      <div>
        <label className="block mb-2 font-medium">Payment Mode</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="paymentMode" /> POA (Manufacturer)</label>
          <label className="flex items-center gap-2"><input type="radio" name="paymentMode" /> POD (Dealer)</label>
          <label className="flex items-center gap-2"><input type="radio" name="paymentMode" /> POD (Used)</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Current Rate</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="KIBOR + Spread (%)" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Co-Applicant Case</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="coApplicant" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="coApplicant" /> No</label>
        </div>
      </div>
      {/* Only show if Yes is selected */}
      <div>
        <label className="block mb-2 font-medium">Co-Applicant Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Relationship (Spouse Only)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Relationship" />
      </div>
    </div>
  </section>
)
