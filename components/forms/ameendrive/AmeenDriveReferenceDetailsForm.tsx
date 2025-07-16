export const AmeenDriveReferenceDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">9. Reference Details</h3>
    {[1, 2].map((ref) => (
      <div key={ref} className="border rounded-xl p-4 mb-8 border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        <h4 className="text-lg font-semibold mb-4">Reference {ref}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Name" />
          </div>
          <div>
            <label className="block mb-2 font-medium">CNIC</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="CNIC" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Relationship</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2"><input type="radio" name={`reference${ref}Relation`} /> Friend</label>
              <label className="flex items-center gap-2"><input type="radio" name={`reference${ref}Relation`} /> Neighbour</label>
              <label className="flex items-center gap-2"><input type="radio" name={`reference${ref}Relation`} /> Colleague</label>
              <label className="flex items-center gap-2"><input type="radio" name={`reference${ref}Relation`} /> Other</label>
            </div>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-2" placeholder="If Other, please specify" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Address" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Residence No.</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Residence No." />
          </div>
          <div>
            <label className="block mb-2 font-medium">Mobile No.</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Mobile No." />
          </div>
          <div>
            <label className="block mb-2 font-medium">E-mail</label>
            <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Email" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Business Address</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Business Address" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Office Telephone No.</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Office Telephone No." />
          </div>
        </div>
      </div>
    ))}
  </section>
);
