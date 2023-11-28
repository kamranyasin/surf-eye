import React, { useEffect, useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import LandingPageMobileView from "../../../assets/landingpagemobileview.png";
import LandingPageWebView from "../../../assets/landingpagewebview.png";
import "./VideoView.styles.scss";

import { useState } from "react";
import { useSelector } from "react-redux";
import AuthModal from "../../AuthModal/AuthModal";
import DropDown from "../../Hamburger/DropDown";

const ControllerItem = ({ isPhone, title, links, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isDate = useSelector((state) => state?.filter);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const ref = useRef();
  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(false);
  };

  function handleDateFormat() {
    let year = isDate?.slice(0, 4);
    let month = isDate?.slice(5, 7);
    let day = isDate?.slice(8, 10);
    let time = isDate?.slice(11);
    return `${day}-${month}-${year}   ${time}`;
  }
  return (
    <div
      ref={ref}
      onClick={isOpen ? handleClose : handleClick}
      className={
        isPhone ? "phone-controller-item" : "videoview__controller-item"
      }
    >
      {type === "surfspot"
        ? isSelected === true
          ? links[0]?.title
          : title
        : type === "dateIp"
        ? isDate === null
          ? title
          : handleDateFormat()
        : ""}
      <div onClick={() => (type === "surfspot" ? setIsSelected(true) : "")}>
        <DropDown
          open={open}
          width={ref.current && ref.current.clientWidth}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          links={links}
          type={type}
        />
      </div>
      {isPhone ? <FiChevronDown size={23} /> : <FiChevronDown />}
    </div>
  );
};

const PhoneController = ({ isAuth, setIsAuth }) => {
  return (
    <div className="phone-controller">
      <ControllerItem
        isPhone={true}
        links={[{ href: "/", title: "NOVA PRAIA  COSTA DA CAPARICA" }]}
        title={"SURF SPOT"}
      />
      <ControllerItem
        isPhone={true}
        title={"DATE & TIME"}
        type="dateIp"
        links={[]}
      />
      <div
        className="phone-controller-item watch-item-controller"
        onClick={() => setIsAuth(false)}
      >
        <div>WATCH</div>
        <BsFillPlayFill size={22} />
      </div>
    </div>
  );
};

const Controller = ({ isAuth, setIsAuth }) => {
  return (
    <div className="videoview__controller">
      <ControllerItem
        title="SURF SPOT"
        type="surfspot"
        links={[{ title: "NOVA PRAIA  COSTA DA CAPARICA" }]}
      />
      <ControllerItem title="DATE & TIME" type="dateIp" />

      <div
        onClick={() => {
          setIsAuth(false);
        }}
        className="videoview__controller-item watchkey"
      >
        <div style={{ cursor: "pointer" }}>WATCH</div>
        <BsFillPlayFill />
      </div>
    </div>
  );
};

const VideoView = () => {
  const isDate = useSelector((state) => state?.filter);
  const [isAuth, setIsAuth] = useState(true);

  return (
    <>
      <AuthModal isAuth={isAuth} setIsAuth={setIsAuth} date={isDate} />

      <div className="videoview">
        <div className="videoview-container">
          <video
            className="landingpagevideo"
            // poster={
            //   window.innerWidth > 600
            //     ? LandingPageWebView
            //     : LandingPageMobileView
            // }
            width="100%"
            height="100%"
            muted
            loop
            autoPlay
            playsInline
            autoplay="autoplay"
          >
            <source
              src="https://surfeye-web.s3.eu-central-1.amazonaws.com/src/landing-page/LANDING+PAGE+VIDEO+LOWER+RESOLUTION.mp4"
              // src=" https://surfeye-web.s3.eu-central-1.amazonaws.com/src/landing-page/LANDING+PAGE+VIDEO.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="">
          {/* <PhoneController isAuth={isAuth} setIsAuth={setIsAuth} /> */}
          <Controller isAuth={isAuth} setIsAuth={setIsAuth} />
        </div>
        <div className="videoview__title">Every wave. on video.</div>
      </div>
    </>
  );
};

export default VideoView;
