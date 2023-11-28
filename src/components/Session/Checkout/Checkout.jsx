import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import { updateCredits } from "../../../Redux/Credits";
import Loading from "../../../Redux/Loading";
import { removeSelectedData } from "../../../Redux/SelectedData";
import PopupButton from "../../PopOver/PopupButton";
import SessionItem from "../../SessionItem/SessionItem";
import "./Checkout.styles.scss";

const VideoModal = ({ video, setVideo }) => {
  return (
    <div className="videomodal" onClick={() => setVideo(false)}>
      <div className="videomodal-video" onClick={(e) => e.stopPropagation()}>
        <video
          src="https://surfeye-web.s3.eu-central-1.amazonaws.com/spots/nova-praia/highlights/session-preview/SESSION+VIDEO+PREVIEW.mp4"
          preload="auto"
          width="100%"
          height="100%"
          muted
          loop
          autoPlay
          controls
        ></video>
      </div>
    </div>
  );
};

const QuestionMark = () => {
  return <div className="checkout-popup-question">?</div>;
};

const PopupData = () => {
  return (
    <div className="checkoutpop">
      <div className="checkoutpop-text">
        Surf Eye coaching is a premium service that costs €35 per session (VAT
        included). <br></br> A coaching session allows you to get feedback from
        a professional coach and includes
      </div>
      <ul className="checkoutpop-list">
        <li className="checkoutpop-list-item">
          {" "}
          <li className="checkoutpop-list-item">
            30 minutes video call with professional coach
          </li>
          <li className="checkoutpop-list-item">
            Wave by wave feedback and corrections
          </li>
          <li className="checkoutpop-list-item">
            Tips both for inland and at sea exercises to improve your surfing
          </li>
        </li>
      </ul>
      <div className="checkoutpop-text">
        After payment is completed, the videos of your session are automatically
        shared with <br></br> one of our coaches, who will contact you within 2
        business days to schedule a video call.
      </div>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const [video, setVideo] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [selected, setSelected] = useState(0);
  const [coupon, setIsCoupon] = useState(null);
  const [checked, setIsChecked] = useState(false);
  const [credits, setCredits] = useState("");
  const [couponAmount, setCouponAmount] = useState("");
  const [isreferal, setIsReferal] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const dispatch = useDispatch();
  const creditsCount = useSelector((state) => state?.credits);
  
  function handleConditionalAmount() {
    switch (selected) {
      case 0:
        return 19;
      case 1:
        return 50;
      case 2:
        return 70;
      case 3:
        return 120;
    }
  }

  function handleTitle() {
    switch (selected) {
      case 0:
        return "1 Session";
      case 1:
        return "3 Sessions";
      case 2:
        return "5 Sessions";
      case 3:
        return "10 Sessions";
    }
  }

  const handleCheckout = () => {
    if (
      creditsCount.creditsCounts === 0 &&
      (couponAmount > 0 || couponAmount === "")
    ) {
      history.push("/session?view=payments", {
        title: handleTitle(),
        price: conditionAmount(),
        previousPath: location.search,
        coupon: coupon !== null || couponAmount === 0 ? coupon : "",
        referalid: referalCode ? referalCode : "",
        checked: checked,
        selected: selected,
        data: location.state,
      });
    } else {
      const customertoken = localStorage.getItem("token");
      setIsLoadingCheckout(true);
      axios
        .post(
          endpoints.POST_CHECKOUT,
          {
            location: "Nova Praia",
            payid: "",
            packageno: selected,
            discount: couponAmount === 0 || couponAmount === "0.00" ? true : false,
            coachguidence: checked,
            coupen: coupon !== null || couponAmount === 0 ? coupon : "",
            referalid: referalCode ? referalCode : "",
            data: location.state.state,
          },
          {
            headers: {
              Authorization: `Bearer ${customertoken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "True") {
            axios
              .get(endpoints.GET_CREDITS, {
                headers: {
                  Authorization: `Bearer ${customertoken}`,
                },
              })
              .then((response) => {
                dispatch(updateCredits(response.data.date));
              });
            setIsLoadingCheckout(false);
            Swal.fire(response.data.message, "", "success");
            history.push("/session?view=mysession");
          } else {
            setIsLoadingCheckout(false);
            Swal.fire(response.data.message, "", "error");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  function useSessionCredits() {
    if (creditsCount.creditsCounts > 0) {
      setIsLoading(true);
      const customertoken = localStorage.getItem("token");
      axios
        .post(
          endpoints.POST_CHECKOUT,
          {
            location: "Nova Praia",
            payid: "",
            packageno: "",
            discount: couponAmount === "0.00" ? true : false,
            coachguidence: checked,
            coupen: coupon !== null || couponAmount === 0 ? coupon : "",
            referalid: referalCode ? referalCode : "",
            data: location.state.state,
          },
          {
            headers: {
              Authorization: `Bearer ${customertoken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "True") {
            axios
              .get(endpoints.GET_CREDITS, {
                headers: {
                  Authorization: `Bearer ${customertoken}`,
                },
              })
              .then((response) => {
                dispatch(updateCredits(response.data.date));
              });
            setIsLoading(false);
            Swal.fire("Thank you! Your session is ready", "", "success");
            history.push("/session?view=mysession");
          } else {
            Swal.fire(response.data.message, "", "error");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  const checkCouponValid = () => {
    if (!coupon) {
      Swal.fire("Enter Coupen Code", "", "error");
      setCouponAmount("");
    }
    //  else if (!handleConditionalAmount()) {
    //   Swal.fire("Select Session", "", "error");
    // }
    else {
      const customertoken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("coupen", coupon);
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
    if (!coupon) {
      Swal.fire("Enter Referal Code", "", "error");
    } 
    // else if (!handleConditionalAmount()) {
    //   Swal.fire("Select Session", "", "error");
    // } 
    else {
      const customertoken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("referalcode", coupon);
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
    if (
      checked === true &&
      couponAmount === "" &&
      referalCode === "" && 
      handleConditionalAmount() === undefined
    ) {
      return 35;
    } else {
      if (checked === true && couponAmount) {
        return couponAmount + 35;
      } else if (checked === false && (couponAmount || couponAmount === 0)) {
        return couponAmount;
      } else if (checked === true && (couponAmount === "" && referalCode === '')) {
        return handleConditionalAmount() + 35;
      } else if (checked === true && (couponAmount === "" && referalCode)){
        return handleConditionalAmount() + 30;
      } else if (checked === false && (couponAmount === "" && referalCode)){
        return handleConditionalAmount() - 5;
      }else {
        return handleConditionalAmount()
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removeSelectedData());
    };
  }, []);
  
  useEffect(() => {
    const customertoken = localStorage.getItem("token");
    axios
      .get(endpoints.GET_CREDITS, {
        headers: {
          Authorization: `Bearer ${customertoken}`,
        },
      })
      .then((response) => {
        setCredits({
          credits: response?.data?.date?.credits,
          session: response?.data?.date?.session,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="checkout">
      {video && (
        <VideoModal
          video={
            "https://surfeye-web.s3.eu-central-1.amazonaws.com/src/landing-page/LANDING+PAGE+-+SECTION+2.mp4"
          }
          setVideo={setVideo}
        />
      )}
      <div
        onClick={() => history.goBack()}
        className="checkout__header-back pointer"
      >
        <MdOutlineArrowBackIosNew />
        <div className="">Back</div>
      </div>
      <div className="checkout__heading">CHECKOUT</div>
      <div className="checkout-desc">1 SESSION = 2 HOURS</div>
      <div className="checkout-desc">
        REMAINING SESSIONS WILL BE DISPLAYED IN “CREDITS”
      </div>
      <div className="checkout__contents">
        <div className="checkout__contents__items">
          <SessionItem
            selected={selected}
            setSelected={setSelected}
            id={0}
            title="1 Session"
            price="€ 19"
          />
          <SessionItem
            selected={selected}
            setSelected={setSelected}
            id={1}
            title="3 Sessions"
            price="€ 50"
          />
          <SessionItem
            selected={selected}
            setSelected={setSelected}
            id={2}
            title="5 Sessions"
            price="€ 70"
          />
          <SessionItem
            selected={selected}
            setSelected={setSelected}
            id={3}
            title="10 Sessions"
            price="€ 120"
          />
        </div>
        <div
          className="checkout__contents-preview"
          onClick={() => setVideo(true)}
        >
          <div className="checkout__contents-preview-hide"></div>
          <div>Session video preview</div>
          <FaPlay />
        </div>
        <div className="checkout__contents-coachvideo">
          <div className="checkout__contents-coachvideo-hide"></div>

          <div className="checkout__contents-coachvideo-title">
            COACH VIDEO ANALYSIS
          </div>
          <div className="checkout__contents-coachvideo-contents">
            <div className="checkout__contents-coachvideo-extra">+ €35</div>
            <div className="checkout__contents-coachvideo-popup">
              <PopupButton target={<QuestionMark />}>
                <PopupData />
              </PopupButton>
            </div>
            <div className="checkout__contents-coachvideo-checkbox">
              <input
                type="checkbox"
                onChange={() => setIsChecked(!checked)}
                value={checked}
              />
            </div>
          </div>
        </div>
        <div className="checkout__contents-buttons">
          <div
            className="checkout__contents-buttons-credits"
            style={{
              backgroundColor: credits.credits > 0 ? "white" : "#2e3848",
              color: credits.credits > 0 ? "#2e3848" : "white",
              cursor: "pointer",
            }}
            onClick={!isLoading && useSessionCredits}
          >
            {isLoading ? (
              <div style={{ position: "relative", top: "2px" }}>
                <RotatingLines
                  strokeColor="black"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="18"
                  visible={true}
                />
              </div>
            ) : (
              `USE SESSION CREDITS ${credits?.credits ? credits?.credits : 0}`
            )}
          </div>
          <div className="checkout_checkbox_container">
            <input
              className="checkout__contents-buttons-input"
              placeholder="Discount Code"
              onChange={(e) => setIsCoupon(e.target.value)}
              value={coupon}
            />
            <div className="checkout__contents-coachvideo-checkbox referalcode_checkbox">
              <input
                type="checkbox"
                onChange={() => setIsReferal(!isreferal)}
                value={isreferal}
              />
            </div>
          </div>
          <div className="apply-button"  onClick={() => {
                isreferal ? checkReferalValid() : checkCouponValid();
              }}>
           {isreferal ? "Referal" : "Coupon"}
          </div>
        </div>
        <div className="checkout__contents-checkout">
          <div className="checkout__contents-checkout-amount">
            AMOUNT €{conditionAmount()}
          </div>
          <div
            className="checkout__contents-checkout-button"
            onClick={handleCheckout}
            style={{ cursor: "pointer" }}
          >
            {isLoadingCheckout ? (
              <div style={{ position: "relative", top: "2px" }}>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="18"
                  visible={true}
                />
              </div>
            ) : (
              "CHECKOUT"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
