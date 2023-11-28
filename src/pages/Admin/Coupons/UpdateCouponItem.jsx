import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import FormInput from "../../../components/FormInput/FormInput";

const UpdateCouponItem = ({
  open,
  handleClose,
  updateCouponData,
  setReferesh,
}) => {
  const [form, setForm] = useState({
    title: updateCouponData.title,
    discount: updateCouponData.discount,
    expiresAt: updateCouponData.expiresAt,
    isSingle: false,
    isMultipleUser: false,
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...form, [e.target.name]: e.target.value }));

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const { title, discount, expiresAt, isSingle, isMultipleUser } = form;
    if (title === "" || discount === "" || expiresAt === "") {
      Swal.fire("Fields Cannot be Empty   ", "", "error");
    } else {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("id", updateCouponData.id);
      formData.append("name", title);
      formData.append("discount", discount);
      formData.append("expire_at", expiresAt);
      formData.append(
        "status",
        updateCouponData.status === true ? "True" : "False"
      );
      if (isMultipleUser === false && isSingle === true) {
        formData.append("type", 1);
      } else if (isMultipleUser === false && isSingle === false) {
        formData.append("type", 2);
      } else if (isMultipleUser === true && isSingle === false) {
        formData.append("type", 3);
      } else if (isMultipleUser === true && isSingle === true) {
        formData.append("type", 4);
      }
      const response = await axios.put(endpoints.PUT_COUPONS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "True") {
        Swal.fire(response.data.message, "", "success");
        handleClose();
        setReferesh(true);
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "red",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="coupon__form">
            <form className="coupon__form-contents">
              <div className="modal__header">
                <div className="modal__title">Update Coupon</div>
                <div className="modal__close" onClick={handleClose}>
                  <AiOutlineClose />
                </div>
              </div>
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
                  //   label="Discount"
                  name="discount"
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
                onClick={handleUpdateCoupon}
              >
                Create
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateCouponItem;
