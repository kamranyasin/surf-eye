import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import Item from "../../SessionItem/SessionItem";
import "./BuySessions.styles.scss";

const BuySessions = () => {
  const [selected, setSelected] = useState(null);
  const history = useHistory();
  const [discountcode, setDiscountCode] = useState(null);
  const location = useLocation();
  const [couponAmount, setCouponAmount] = useState("");
  const [isreferal, setIsReferal] = useState("");
  const [referalCode, setReferalCode] = useState("");

  const handleCheckout = () => {
    switch (selected) {
      case 1:
        history.push("/session?view=payments", {
          id: 0,
          title: "1 Session",
          price: conditionAmount(),
          couponAmount: couponAmount === 0 || discountcode !==null ? discountcode : "",
          referalCode: referalCode ? referalCode : "",
          previousPath: location.search,
        });
        break;
      case 2:
        history.push("/session?view=payments", {
          id: 1,
          title: "3 Sessions",
          price: conditionAmount(),
          couponAmount: couponAmount === 0 || discountcode !==null ? discountcode : "",
          referalCode: referalCode ? referalCode : "",
          previousPath: location.search,
        });
        break;
      case 3:
        history.push("/session?view=payments", {
          id: 2,
          title: "5 Sessions",
          price: conditionAmount(),
          couponAmount: couponAmount === 0 || discountcode !==null ? discountcode : "",
          referalCode: referalCode ? referalCode : "",
          previousPath: location.search,
        });
        break;
      case 4:
        history.push("/session?view=payments", {
          id: 3,
          title: "10 Sessions",
          price: conditionAmount(),
          couponAmount: couponAmount === 0 || discountcode !==null ? discountcode : "",
          referalCode: referalCode ? referalCode : "",
          previousPath: location.search,
        });
        break;
      default:
        break;
    }
  };

  const sessions = [
    {
      id: 1,
      title: "1 Session",
      price: "€ 19",
    },
    {
      id: 2,
      title: "3 Session",
      price: "€ 50",
    },
    {
      id: 3,
      title: "5 Session",
      price: "€ 70",
    },
    {
      id: 4,
      title: "10 Session",
      price: "€ 120",
    },
  ];

  function handleConditionalAmount() {
    switch (selected) {
      case 1:
        return 19;
      case 2:
        return 50;
      case 3:
        return 70;
      case 4:
        return 120;
    }
  }

  const checkCouponValid = () => {
    if (!discountcode) {
      Swal.fire("Enter Coupon Code", "", "error");
    } else if (!handleConditionalAmount()) {
      Swal.fire("Select Session", "", "error");
    } else {
      const customertoken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("coupen", discountcode);
      formData.append("amount", handleConditionalAmount());
      axios
        .post(endpoints.APPLY_COUPON, formData, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
          },
        })
        .then((res) => {
          res.data.status === "True"
            ? setCouponAmount(res?.data?.price)
            : setCouponAmount("");
          Swal.fire(
            res.data.message,
            "",
            res.data.status === "True" ? "success" : "error"
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const checkReferalValid = () => {
    if (!discountcode) {
      Swal.fire("Enter Referal Code", "", "error");
    } else if (!handleConditionalAmount()) {
      Swal.fire("Select Session", "", "error");
    } else {
      const customertoken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("referalcode", discountcode);
      axios
        .post(endpoints.REFERAL_CODE, formData, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
          },
        })
        .then((res) => {
          res.data.status === true
            ? setReferalCode(res?.data?.data)
            : setReferalCode("");
          Swal.fire(
            res.data.message,
            "",
            res.data.status === true ? "success" : "error"
          );
        })
        .catch((error) => console.log(error));
    }
  };

  function conditionAmount() {
    if (referalCode) {
      return handleConditionalAmount() - 5;
    } else if (couponAmount || couponAmount === 0) {
      return couponAmount;
    } else {
      return handleConditionalAmount();
    }
  }

  return (
    <div className="buysessions">
      <div className="buysessions-container">
        <div className="buysessions__heading">BUY SESSIONS</div>
        <div className="buysessions__items">
          {sessions.map((item) => (
            <Item
              id={item.id}
              selected={selected}
              setSelected={setSelected}
              title={item.title}
              price={item.price}
            />
          ))}
          {/* <Item id={2} selected={selected} setSelected={setSelected} title={"3 Sessions"} price="€ 50"/>
            <Item id={3} selected={selected} setSelected={setSelected} title={"5 Session"} price="€ 70"/>
            <Item id={4} selected={selected} setSelected={setSelected} title={"10 Session"} price="€ 120"/> */}
        </div>
        <div className="buysessions__desc">
          <div className="buysessions__desc-heading">Note : </div>
          <div className="buysessions__desc-item">1 Session = 2 hours</div>
          <div className="buysessions__desc-item">
            sessions can be used anytime in the future
          </div>
          <div className="buysessions__desc-item">
            Remaining sessions will be displayed in "Credits"
          </div>
        </div>
        <div className="buysessions__actions">
          <div className="discountcode_container">
            <div className="buysessions__actions-discount checkout_checkbox_container">
              <div className="buysessions__actions-discount-label">
                Discount code
              </div>
              <input
                type="text"
                placeholder="Add Code"
                className="buysessions__actions-discount-input"
                value={discountcode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <div className="checkout__contents-coachvideo-checkbox referalcode">
                <input
                  type="checkbox"
                  onChange={() => setIsReferal(!isreferal)}
                  value={isreferal}
                />
              </div>
            </div>
            <div
              className="apply-button-buy-session"
              onClick={() => {
                isreferal ? checkReferalValid() : checkCouponValid();
              }}
            >
              {isreferal ? "Referal" : "Coupon"}
            </div>
          </div>
          <div className="buysessions__actions-checkout">
            <div className="buysessions__actions-checkout-amount">
              AMOUNT €{conditionAmount()}
            </div>
            <div
              className="buysessions__actions-checkout-button"
              onClick={handleCheckout}
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySessions;
