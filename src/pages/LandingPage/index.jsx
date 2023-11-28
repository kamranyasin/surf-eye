import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { developement_url } from "../../Api/Api";
import Footer from "../../components/Footer/Footer";
import ImproveFaster from "../../components/LandingPage/ImproveFaster/ImproveFaster";
import Locations from "../../components/LandingPage/Locations/Locations";
import Testimonials from "../../components/LandingPage/Testimonials/Testimonials";
import Videography from "../../components/LandingPage/Videography/Videography";
import VideoView from "../../components/LandingPage/VideoView/VideoView";
import WhyVideos from "../../components/LandingPage/WhyVideos/WhyVideos";
import Working from "../../components/LandingPage/Working/Working";
import Navbar from "../../components/Navbar/Navbar";
const LandingPage = () => {
  const history = useHistory();
  useEffect(() => {
    const component = window.location.href.split("#")[1];
    if (component) {
      document
        .getElementById(component)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Surf Eye</title>
        {/* <link rel="canonical" href={`${developement_url}`} /> */}
      </Helmet>
      <Navbar isHome={true} />
      <VideoView />
      <Videography />
      <Locations />
      <Working />
      <ImproveFaster />
      {/* <Testimonials /> */}
      <WhyVideos />
      <Footer />
    </>
  );
};

export default LandingPage;
