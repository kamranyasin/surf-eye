import React, { useState } from 'react'
import FormInput from '../../../components/FormInput/FormInput';

const CouponCreationForm = ({ setModalState, handleAddCoupon }) => {
    const [form, setForm] = useState({
        title: "",
        discount: "",
        expiresAt: "",
        isFlat: false,
        isSingle: false,
        isMultipleUser: false,
      });
      const handleChange = (e) =>
        setForm((prev) => ({ ...form, [e.target.name]: e.target.value }));
    return (
        <div className="coupon__form">
        <form className="coupon__form-contents">
          <div className="coupon__form-contents-input">
            <FormInput
              onChange={handleChange}
              value={form.title}
              label="Title"
              name="title"
            />
          </div>
          <div className="coupon__form-contents-input">
            <FormInput
              onChange={handleChange}
              value={form.discount}
              label="Discount"
              name="discount"
              type="number"
            />
          </div>
          <div className="coupon__form-contents-input">
            <FormInput
              onChange={handleChange}
              value={form.expiresAt}
              name="expiresAt"
              type="date"
            />
          </div>
          <div className="coupon__form-contents-input checkbox-inputs">
            <div className=" checkbox-input">
              <label htmlFor="checkbox">Flat Price</label>
              <input
                type="checkbox"
                checked={form.isFlat}
                onChange={(e) => {
                  setForm({ ...form, isFlat: e.target.checked });
                }}
              />
            </div>
            <div className=" checkbox-input">
              <label htmlFor="checkbox">Multiple User</label>
              <input
                type="checkbox"
                checked={form.isMultipleUser}
                onChange={(e) => {
                  setForm({ ...form, isMultipleUser: e.target.checked });
                }}
              />
            </div>
            <div className=" checkbox-input">
              <label htmlFor="checkbox">Single Use</label>
              <input
                type="checkbox"
                checked={form.isSingle}
                onChange={(e) => {
                  setForm({ ...form, isSingle: e.target.checked });
                }}
              />
            </div>
          </div>
          <div
            className="coupon__form-contents-button"
            onClick={() => {
              setModalState(false);
              handleAddCoupon(
                form.title,
                form.discount,
                form.expiresAt,
                form.isFlat,
                form.isMultipleUser,
                form.isSingle
              );
            }}
          >
            Create
          </div>
        </form>
      </div>
  )
}

export default CouponCreationForm

