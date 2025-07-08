export const PersonalDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">5. Personal Details</h2>
    <form className="space-y-10">
      {/* Title, Gender, Names, CNIC, etc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <select className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition">
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input type="text" placeholder="First Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Middle Name</label>
          <input type="text" placeholder="Middle Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input type="text" placeholder="Last Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC No.</label>
          <input type="text" placeholder="CNIC No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NTN</label>
          <input type="text" placeholder="NTN" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passport No. (if applicable)</label>
          <input type="text" placeholder="Passport No. (if applicable)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Educational Qualification</label>
          <input type="text" placeholder="Educational Qualification" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mother’s Maiden Name</label>
          <input type="text" placeholder="Mother’s Maiden Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Father’s / Husband’s Name</label>
          <input type="text" placeholder="Father’s / Husband’s Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
      </div>
      {/* Marital Status */}
      <div>
        <label className="font-semibold text-sm mb-2 block">Marital Status</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" /> Married</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Single</label>
        </div>
      </div>
      {/* Dependents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">No. of Children</label>
          <input type="number" placeholder="No. of Children" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">No. of Other Dependents</label>
          <input type="number" placeholder="No. of Other Dependents" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Specify (Dependents)</label>
          <input type="text" placeholder="Specify (Dependents)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
        </div>
      </div>
      {/* Next of Kin */}
      <div>
        <h3 className="text-lg font-semibold pt-6 pb-2">Next of Kin</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Next of Kin</label>
            <input type="text" placeholder="Next of Kin" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Relation</label>
            <input type="text" placeholder="Relation" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input type="text" placeholder="CNIC No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact No.</label>
            <input type="text" placeholder="Contact No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
        </div>
      </div>
      {/* Current Residential Address */}
      <div>
        <h3 className="text-lg font-semibold pt-6 pb-2">Current Residential Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">House / Flat No.</label>
            <input type="text" placeholder="House / Flat No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input type="text" placeholder="Street" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
            <input type="text" placeholder="Tehsil / District / Area" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nearest Landmark</label>
            <input type="text" placeholder="Nearest Landmark" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input type="text" placeholder="Country" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input type="text" placeholder="Postal Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telephone Res.</label>
            <input type="text" placeholder="Telephone Res." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mobile No.</label>
            <input type="text" placeholder="Mobile No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="text" placeholder="Email" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Years at current address</label>
            <input type="number" placeholder="Years at current address" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Years in current city</label>
            <input type="number" placeholder="Years in current city" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
        </div>
        <label className="font-semibold text-sm mb-2 block mt-4">Residential Status</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Property Owner</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Wife or Husband House</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Parents</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Privately Rented</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Company Rented</label>
        </div>
        <label className="block text-sm font-medium mb-1 mt-4">Monthly Rent (Rs.)</label>
        <input type="number" placeholder="Monthly Rent (Rs.)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
      </div>
      {/* Permanent Residential Address */}
      <div>
        <h3 className="text-lg font-semibold pt-6 pb-2">Permanent Residential Address (Pakistan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">House / Flat No.</label>
            <input type="text" placeholder="House / Flat No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input type="text" placeholder="Street" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tehsil / District / Area</label>
            <input type="text" placeholder="Tehsil / District / Area" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input type="text" placeholder="Country" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input type="text" placeholder="Postal Code" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telephone Res.</label>
            <input type="text" placeholder="Telephone Res." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
        </div>
      </div>
      {/* Co-Borrower */}
      <div>
        <h3 className="text-lg font-semibold pt-6 pb-2">Co-Borrower (if applicable)</h3>
        <label className="font-semibold text-sm mb-2 block">Co-Borrower Case?</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="radio" name="coBorrower" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="coBorrower" /> No</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <input type="text" placeholder="Relationship" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input type="text" placeholder="CNIC No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400" />
          </div>
        </div>
      </div>
    </form>
  </section>
);
