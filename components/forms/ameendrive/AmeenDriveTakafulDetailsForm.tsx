export const AmeenDriveTakafulDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">3. Takaful Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2 font-medium">Takaful Company Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Takaful Company Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Takaful Rate (%)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Takaful Rate (%)" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Tracker Company to be arranged</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="trackerCompany" /> Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="trackerCompany" /> No
          </label>
        </div>
      </div>
    </div>
  </section>
)
