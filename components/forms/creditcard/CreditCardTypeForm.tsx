// components/forms/CreditCardTypeForm.tsx
import { useState } from "react";

export const CreditCardTypeForm = () => {
  // Optional: State to control selection (not required for pure UI)
  // const [cardType, setCardType] = useState("");
  // const [cardCategory, setCardCategory] = useState("");
  // const [specialOption, setSpecialOption] = useState("");
  // const [photoMethod, setPhotoMethod] = useState("");

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-primary mb-6">1. Choose Your Card Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Card Type</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="cardType" /> Gold
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="cardType" /> Classic
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Card Category</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="cardCategory" /> Standard Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="cardCategory" /> Non-Photo
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="cardCategory" /> Photo
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Special Card Option</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="specialCardOption" /> UBL PSO Auto Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="specialCardOption" /> Galleria Card
            </label>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Photo Submission Method (Galleria Only)</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="photoMethod" /> Website Upload
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="photoMethod" /> Favorite Picture
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="photoMethod" /> Physically Attach
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Markup</label>
          <div className="py-2 text-base font-semibold">3.3325% (display only)</div>
        </div>
      </div>
    </section>
  );
};
