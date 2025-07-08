// components/forms/CreditCardAddressForm.tsx
export const CreditCardAddressForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl font-bold text-primary mb-6">4. Address Details (CBS)</h3>
    {/* A. Current Residential Address */}
    <div>
      <h4 className="text-2xl font-bold text-primary mb-6">A. Current Residential Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">House/Apt</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="House/Apt" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Street" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tehsil / District</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Tehsil / District" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Nearest Landmark" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="City" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Postal Code" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telephone (Res)</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Telephone (Res)" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Mobile" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NTN</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="NTN" />
        </div>
        {/* Type of Residence */}
        <div>
          <label className="block text-sm font-medium mb-1">Type of Residence</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" /> House</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Apartment</label>
          </div>
        </div>
        {/* Nature of Residence */}
        <div>
          <label className="block text-sm font-medium mb-1">Nature of Residence</label>
          <div className="flex flex-wrap gap-4 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" /> Owned</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Rented</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Parents</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Mortgaged</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Company Property</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residing Since</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Residing Since" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Email" />
        </div>
      </div>
    </div>

    {/* B. Permanent Address */}
    <div className="mt-10">
      <h4 className="text-2xl font-bold text-primary mb-6">B. Permanent Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Street" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tehsil / District</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Tehsil / District" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Nearest Landmark" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="City" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Postal Code" />
        </div>
      </div>
    </div>

    {/* Car Details */}
    <div className="mt-10">
      <h4 className="text-base font-semibold mb-2">Car Details (If Applicable)</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Car Year</label>
          <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Year" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Model" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Registration #</label>
          <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Registration #" />
        </div>
        {/* Ownership */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1">Ownership</label>
          <div className="flex flex-wrap gap-4 mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" /> Owned</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Leased</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Company</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> N/A</label>
          </div>
        </div>
      </div>
    </div>
  </section>
);
