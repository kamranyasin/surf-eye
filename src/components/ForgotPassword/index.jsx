import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { developement_url, endpoints } from "../../Api/Api";
import Logo from "../../assets/logo.svg";
import FormInput from "../FormInput/FormInput";
import "./style.css";

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [tokenCheck, setTokenCheck] = useState(false);
  const [forgetConfirmation, setForgetConfirmation] = useState(false);

  const forgetEmailSent = (e) => {
    e.preventDefault();
    if (email === "") {
      Swal.fire("Enter Email Address", " ", "error");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      axios
        .post(endpoints.FORGOT_EMAIL_SENT, formData)
        .then((res) => {
          if (res.data.status === false) {
            Swal.fire(res.data.message, " ", "error");
            setIsLoading(false);
          } else {
            setId(res.data.id);
            Swal.fire(res.data.message, " ", "success");
            setTokenCheck(true);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const forgetTokenCheck = (e) => {
    e.preventDefault();
    if (otp === "") {
      Swal.fire("Otp is incorrect", " ", "error");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("token", otp);
      axios
        .post(endpoints.FORGOT_TOKEN_CHECK, formData)
        .then((res) => {
          if (res.data.status === "False") {
            Swal.fire(res.data.message, " ", "error");
            setIsLoading(false);
          } else {
            Swal.fire(res.data.message, " ", "success");
            setTokenCheck(false);
            setForgetConfirmation(true);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password === "") {
      Swal.fire("Enter Password", " ", "error");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("adminid", id);
      formData.append("password", password);
      axios
        .post(endpoints.FORGOT_CONFIRMATION, formData)
        .then((res) => {
          if (res.data.status === "False") {
            Swal.fire(res.data.message, " ", "error");
            setIsLoading(false);
          } else {
            Swal.fire(res.data.message, " ", "success");
            setIsLoading(false);
            history.push("/auth");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const conditionalForms = () => {
    if (tokenCheck === true) {
      return (
        <>
          <FormInput
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required={true}
          />
          <button
            className="auth__contents__form-button"
            onClick={forgetTokenCheck}
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
              "Verify Otp"
            )}
          </button>
        </>
      );
    } else if (forgetConfirmation === true) {
      return (
        <>
          <FormInput
            label="Enter New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <button
            type="submit"
            className="auth__contents__form-button"
            onClick={handleResetPassword}
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
              "Reset Password"
            )}
          </button>
        </>
      );
    } else {
      return (
        <>
          <FormInput
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <button
            type="submit"
            className="auth__contents__form-button"
            onClick={forgetEmailSent}
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
              "Send Email"
            )}
          </button>
        </>
      );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
        {/* <link rel="canonical" href={`${developement_url}forgotpassword`} /> */}
      </Helmet>
      <div className="main-forgot-container-wrapper">
        <div
          onClick={() => history.push("/auth")}
          className="auth__contents__header-back"
          style={{ cursor: "pointer", marginLeft: "10px" }}
        >
          <MdOutlineArrowBackIosNew />
          <div>Back</div>
        </div>
        <Link href="/">
          <div className="auth__contents__header-logo-wrapper">
            <div className="auth__contents__header-logo">
              <img src={Logo} alt="logo"></img>
            </div>
          </div>
        </Link>
        <div className="auth__contents__form-input-flex-box forgot-wrapper">
          {conditionalForms()}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
