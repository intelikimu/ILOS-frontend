// components/forms/PlatinumSupplementaryCardForm.tsx
export const PlatinumSupplementaryCardForm = () => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">10. Supplementary Card Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="suppTitle" /> Mr</label>
          <label className="flex items-center gap-2"><input type="radio" name="suppTitle" /> Mrs</label>
          <label className="flex items-center gap-2"><input type="radio" name="suppTitle" /> Ms</label>
        </div>
      </div>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="First" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Middle" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Last" />
        </div>
      </div>
      {/* Name on Card */}
      <div>
        <label className="block text-sm font-medium mb-1">Name on Card</label>
        <input type="text" maxLength={19} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Max 19 characters" />
      </div>
      {/* Father's/Husband's Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Father’s / Husband’s Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Father/Husband Name" />
      </div>
      {/* Credit Limit % */}
      <div>
        <label className="block text-sm font-medium mb-1">Credit Limit %</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1"><input type="radio" name="creditLimit" /> 25%</label>
          <label className="flex items-center gap-1"><input type="radio" name="creditLimit" /> 50%</label>
          <label className="flex items-center gap-1"><input type="radio" name="creditLimit" /> 75%</label>
          <label className="flex items-center gap-1"><input type="radio" name="creditLimit" /> 100%</label>
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2 w-24" placeholder="Amount" />
        </div>
      </div>
      {/* Availability */}
      <div>
        <label className="block text-sm font-medium mb-1">Availability</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1"><input type="radio" name="availability" /> Daily</label>
          <label className="flex items-center gap-1"><input type="radio" name="availability" /> Weekly</label>
          <label className="flex items-center gap-1"><input type="radio" name="availability" /> Monthly</label>
        </div>
      </div>
      {/* Relationship to Principal */}
      <div>
        <label className="block text-sm font-medium mb-1">Relationship to Principal</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1"><input type="radio" name="relToPrincipal" /> Spouse</label>
          <label className="flex items-center gap-1"><input type="radio" name="relToPrincipal" /> Parent</label>
          <label className="flex items-center gap-1"><input type="radio" name="relToPrincipal" /> Son/Daughter</label>
          <label className="flex items-center gap-1"><input type="radio" name="relToPrincipal" /> Brother/Sister</label>
          <label className="flex items-center gap-1"><input type="radio" name="relToPrincipal" /> Friend/Cousin</label>
        </div>
      </div>
      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      {/* Gender */}
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="suppGender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="suppGender" /> Female</label>
        </div>
      </div>
      {/* NIC/Passport Number */}
      <div>
        <label className="block text-sm font-medium mb-1">NIC/Passport Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="NIC/Passport" />
      </div>
      {/* Old NIC Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Old NIC Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Old NIC" />
      </div>
      {/* Mother's Maiden Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Mother's Maiden Name</label>
        <input type="text" minLength={6} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Min 6 characters" />
      </div>
      {/* Supplementary Signature */}
      <div>
        <label className="block text-sm font-medium mb-1">Supplementary Signature</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      {/* Basic Cardholder Signature */}
      <div>
        <label className="block text-sm font-medium mb-1">Basic Cardholder Signature</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
    </div>
  </section>
);
