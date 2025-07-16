export const AmeenDriveStampsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Dealer and Branch Stamps</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">Dealer Stamp</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Branch Stamp</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
    </div>
  </section>
);
export default AmeenDriveStampsForm;