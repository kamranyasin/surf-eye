import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import logostripe from "../../../assets/logostripe.png";
import { updateCredits } from "../../../Redux/Credits";
import "./Payment.styles.scss";

const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onToken = (token) => {
    const customertoken = localStorage.getItem("token");
    const formdata = new FormData();
    setIsLoading(true);
    // CHECKOUT CODE
    if (location.state.previousPath === "?view=checkout") {
      axios
        .post(
          endpoints.POST_CHECKOUT,
          {
            location: "Nova Praia",
            payid: token.id,
            packageno: location.state.selected,
            coachguidence: location.state.checked,
            coupen: location.state.coupon,
            referalid: location.state.referalid,
            data: location.state.data.state,
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
            Swal.fire(response.data.message, "", "success");
            history.push("/session?view=mysession");
          } else {
            Swal.fire(response.data.message, "", "error");
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
      //BUYSESSION CODE
    } else if (location.state.previousPath === "?view=buysession") {
      formdata.append("packageno", location?.state?.id);
      formdata.append("payid", token.id);
      formdata.append("coupen", location.state.couponAmount);
      formdata.append("referalid", location.state.referalCode);
      axios
        .post(endpoints.POST_PAYMENT, formdata, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
          },
        })
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
            Swal.fire(response.data.message, "", "success");
            history.push("/session?view=watch");
          } else {
            Swal.fire(response.data.message, "", "error");
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      formdata.append("id", location?.state?.id);
      formdata.append("payid", token.id);
      axios
        .post(endpoints.GET_COUCHING, formdata, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
          },
        })
        .then((response) => {
          if (response.data.status === "True") {
            setIsLoading(false);
            Swal.fire(response.data.message, "", "success");
            history.push("/session?view=mysession");
          } else {
            Swal.fire(response.data.message, "", "error");
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="payment">
      <div className="payment__header-back pointer">
        <MdOutlineArrowBackIosNew />
        <div onClick={() => history.goBack()}>Back</div>
      </div>
      <div className="payment__heading">Payment</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "40px",
        }}
      >
        {isLoading ? (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="26"
            visible={true}
          />
        ) : (
          <StripeCheckout
            name={location?.state?.title}
            email={JSON.parse(localStorage.getItem("userInfo")).email}
            panelLabel="Pay"
            ComponentClass="div"
            image={logostripe}
            amount={location?.state?.price * 100}
            currency="EUR"
            token={onToken}
            stripeKey="pk_live_51KubOmK98oosaZ4NPytuJUos3HSHkzx0uTq6GO6CzcG1WtV9WBtzEob4apFyXBOxbD5OqGmEpzYot4CWoeKCoA8P007mlfs5Qc"
            // stripeKey="pk_test_hWK9CCVSwmaNFT7tlIbxHo5s00GntIdMdu"
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
