export const AmeenDriveVehicleFacilityDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">4. Vehicle Facility Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Facility Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="facilityType" /> Diminishing Musharakah
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="facilityType" /> Ijarah
          </label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Musharakah Share/Security Deposit (%)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="%" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Musharakah Share/Security Deposit (Rs)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Rs" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Auto Financing Required (%)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="%" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Auto Financing Required (Rs)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Rs" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Monthly Rental (Rs.)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Monthly Rental Rs." />
      </div>
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Monthly Rental Rs. (in words)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Monthly Rental in Words" />
      </div>
      {/* Period Options */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Period (Loan Duration)</label>
        <div className="flex flex-wrap gap-3">
          {[1,2,3,4,5,6,7].map(year => (
            <label key={year} className="flex items-center gap-2">
              <input type="radio" name="loanDuration" /> {year} Year{year > 1 && "s"}
            </label>
          ))}
        </div>
      </div>
      {/* Delivery Options */}
      <div>
        <label className="block mb-2 font-medium">Delivery of Vehicle</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="delivery" /> Immediate
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="delivery" /> Booking
          </label>
        </div>
      </div>
      {/* Agreement Statement */}
      <div>
        <label className="block mb-2 font-medium">Agreement Understanding</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="agreementUnderstanding" /> Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="agreementUnderstanding" /> No
          </label>
        </div>
      </div>
    </div>
  </section>
)
