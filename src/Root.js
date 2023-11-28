import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "../src/Redux/store";
import ForgotPassword from "./components/ForgotPassword";
// import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Coupons from "./pages/Admin/Coupons";
import LoginSignUpPage from "./pages/Authentication";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Session from "./pages/Session";
import TermsAndConditions from "./pages/TermsAndConditions";

const Root = () => {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/auth">
            <LoginSignUpPage />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route exact path="/session">
            <Session />
          </Route>
          <Route exact path="/admin/coupons">
            <Coupons />
          </Route>
          <Route exact path="/privacypolicy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/termsandconditions">
            <TermsAndConditions />
          </Route>
        </Switch>
      </Provider>
    </>
  );
};

export default Root;
