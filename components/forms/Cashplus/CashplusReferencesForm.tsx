// components/forms/CashplusReferencesForm.tsx
export const CashplusReferencesForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">7. References</h3>
    {[1, 2].map(refNum => (
      <div key={refNum} className="border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        <h4 className="text-lg font-semibold mb-4">
          Reference {refNum} (Relative or Friend not living with you)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Name (Reference)</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Name" />
          </div>
          <div>
            <label className="block mb-2 font-medium">CNIC</label>
            <input type="text" maxLength={13} className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="CNIC (13-digit)" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Relationship</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Relationship" />
          </div>
          <div>
            <label className="block mb-2 font-medium">House No.</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="House No." />
          </div>
          <div>
            <label className="block mb-2 font-medium">Street</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Street" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Tehsil / District</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Tehsil / District" />
          </div>
          <div>
            <label className="block mb-2 font-medium">City</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="City" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Postal Code</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Postal Code" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Telephone (Residence)</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone (Residence)" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Telephone (Office)</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone (Office)" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Mobile</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Mobile" />
          </div>
          {/* Only for Reference 2 */}
          {refNum === 2 && (
            <>
              <div>
                <label className="block mb-2 font-medium">Fax</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Fax" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Email" />
              </div>
            </>
          )}
        </div>
      </div>
    ))}
  </section>
);
