import axios from "axios";
import { gapi } from "gapi-script";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { developement_url, endpoints } from "../../Api/Api";
import Logo from "../../assets/logo.svg";
import FormInput from "../../components/FormInput/FormInput";
import "./Authentication.styles.scss";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  surfLevel: "Beginner",
};

const LoginSignUpPage = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      //Login form submission
      const { email, password } = form;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(endpoints.LOGIN, formData);
      if (response.data.status === "True") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));

        Swal.fire(response.data.message, "", "success");
        setForm(INITIAL_STATE);
        setIsLoading(false);
        response.data.data.role === "customer"
          ? history.push("/session")
          : history.push("/admin/coupons");
      } else {
        setIsLoading(false);
        Swal.fire(response.data.message, "", "error");
      }
    } else {
      //signup form submission
      // if (form.confirmPassword !== form.password) {
      //   setIsLoading(false);
      //   Swal.fire("Passwords dont match", "", "error");
      // } else if (form.surfLevel === "") {
      //   setIsLoading(false);
      //   Swal.fire("Select SurfLevel", "", "error");
      // } else {
      const formData = new FormData();
      formData.append("fname", form.firstName);
      formData.append("lname", form.lastName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("level", form.surfLevel);
      const response = await axios.post(endpoints.SIGNUP, formData);
      if (
        response.data.message ===
        "Password must be 8 characters or less than 20 characters"
      ) {
        setIsLoading(false);
        Swal.fire(response.data.message, "", "error");
      } else if (response.data.message === "email already exist") {
        Swal.fire(response.data.message, "", "error");
        setIsLoading(false);
      } else {
        Swal.fire(response.data.message, "", "success");
        setForm(INITIAL_STATE);
        // setIsLogin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        history.push("/session");
        setIsLoading(false);
      }
    }
    // }
  };

  const handleSusccess = (response) => {
    let formData = new FormData();
    formData.append("email", response.profileObj.email);
    formData.append("name", response.profileObj.name);
    formData.append("id_token", response.tokenObj.id_token);

    axios
      .post(endpoints.GOOGLE_SIGNIN, formData)
      .then((res) => {
        if (res.data.status === "True") {
          Swal.fire(res.data.message, "", "success");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          history.push("/session");
        } else {
          Swal.fire(res.data.message, "", "error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFailure = (response) => {};

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getUserInfo = localStorage.getItem("userInfo");
    if (getToken !== null) {
      if (JSON.parse(getUserInfo).role === "customer") {
        history.push("/session");
      } else {
        history.push("/admin/coupons");
      }
    }
  }, []);

  const clientId =
    "874357151252-rv47kleoajui89khdee1fsidppr7ta62.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  return (
    <div className="auth">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{isLogin ? "LOGIN" : "SIGN UP"}</title>
        {/* <link rel="canonical" href={`${developement_url}auth`} /> */}
      </Helmet>
      <div className="auth__container">
        <div className="auth-sideImage"></div>
        <div className="auth__contents">
          <div className="auth__contents__header">
            <Link to="/">
              <div className="auth__contents__header-back">
                <MdOutlineArrowBackIosNew />
                <div>Back</div>
              </div>
            </Link>
            <div className="auth__contents__header-logo-wrapper">
              <Link to="/">
                <div className="auth__contents__header-logo">
                  <img src={Logo} alt="logo"></img>
                </div>
              </Link>
            </div>
            <div></div>
          </div>
          <div className="auth__contents__heading">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </div>
          {isLogin && (
            <div
              className="auth__contents__createAccount"
              onClick={() => setIsLogin(false)}
            >
              New? <span>Create an account</span>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className={`auth__contents__form${
              !isLogin ? " login-state-form" : ""
            }`}
          >
            {!isLogin && (
              <div className="auth__contents__form-input-flex">
                <div className="auth__contents__form-input-flex-box">
                  <FormInput
                    label="First Name"
                    value={form.firstName}
                    name="firstName"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="auth__contents__form-input-flex-box">
                  <FormInput
                    label="LastName"
                    value={form.lastName}
                    name="lastName"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            )}
            <div className="auth__contents__form-input">
              <FormInput
                label="Email"
                value={form.email}
                name="email"
                type="email"
                onChange={handleChange}
                required={true}
              />
            </div>
            {!isLogin && (
              <div className="auth__contents__form-input">
                <select
                  name="surfLevel"
                  id=""
                  onChange={handleChange}
                  className="select-input"
                >
                  <option selected value="Beginner">
                    Beginner
                  </option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>
            )}
            <div className="auth__contents__form-input">
              <FormInput
                label="Password"
                type="password"
                value={form.password}
                name="password"
                onChange={handleChange}
                required={true}
              />
            </div>
            {!isLogin && (
              <div className="auth__contents__form-input">
                {/* <FormInput
                  label="Confirm Password"
                  value={form.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  required={true}
                  type="password"
                /> */}
              </div>
            )}
            <button
              type="submit"
              className={`auth__contents__form-button${
                isLogin ? " login-state-auth" : ""
              }`}
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
                <>Let's Go</>
              )}
            </button>
            <div
              className={`auth__contents__form-button google-btn ${
                isLogin ? " login-state-auth" : ""
              }`}
            >
              <GoogleLogin
                clientId={clientId}
                buttonText="Login With Google"
                onSuccess={handleSusccess}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
                className="login-with-google-button"
              />
            </div>
            {!isLogin ? (
              <div className="auth__contents__form-login-button">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </div>
            ) : (
              <div
                className="auth__contents__form-login-button forgot-password-button"
                onClick={() => history.push("/forgotpassword")}
              >
                Forgot Password?
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
