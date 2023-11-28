import React from "react";
// import Focus from "../../../assets/videography/Focus.svg";
// import Wearable from "../../../assets/videography/nowearables.svg";
import Switch from "../../../assets/videography/Switch.svg";
import Group from "../../../assets/whyvideos/Group.svg";
import Group106 from "../../../assets/whyvideos/Group106.svg";
import Group112 from "../../../assets/whyvideos/Group112.svg";

import "../../../assets/styles/_variables.module.scss";
// import Video from "../../../assets/vidloop.mp4";
// import vidloop2 from "../../../assets/vidloop2.mp4";

import "./Videography.styles.scss";

const GridItem = ({ img, text, className }) => {
  return (
    <div className="vid__contents__grid__item">
      <div
        className={`vid__contents__grid__item__img${
          className ? className : ""
        }`}
      >
        <img src={img} alt="" />
      </div>
      <div className="vid__contents__grid__item__text">{text}</div>
    </div>
  );
};

const Videography = () => {
  return (
    <div className="vid" id="VideosComponent">
      <div className="vid-container container">
        <div className="vid__heading heading-all">RECORD YOUR SESSIONS.</div>
        <div className="vid__heading-2">ANY DAY. AT ANY TIME.</div>
        <div className="vid__contents">
          <div className="vid__contents__grid">
            <GridItem
              img={Group106}
              text={
                <span>
                  ALWAYS ON. <br /> NO NEED TO BOOK
                </span>
              }
            />
            <GridItem
              img={Switch}
              text={
                <span>
                  SURF FIRST <br /> BUY LATER
                </span>
              }
            />
            <GridItem
              className=" wearable-icon"
              img={Group112}
              text={
                <span>
                  {" "}
                  DOWNLOAD <br /> WAVE BY WAVE
                </span>
              }
            />
            <GridItem
              img={Group}
              text={
                <span>
                  COACH VIDEO
                  <br />
                  ANALYSIS
                  <br />
                  <span style={{ color: "#84D6EB", fontSize: "14px" }}>
                    Premium
                  </span>
                </span>
              }
            />
          </div>
          <div className="vid__contents__video">
            <div className="vid__contents__video-container">
              <video
                className="landingpagevideo"
                width="100%"
                height="100%"
                muted
                loop
                autoPlay
                playsInline
                autoplay="autoplay"
                id="websites"
              >
                <source
                  src="https://surfeye-web.s3.eu-central-1.amazonaws.com/src/landing-page/LANDING+PAGE+SECTION+2+-+LOWER+RESOLUTION.mp4"
                  // src="https://surfeye-web.s3.eu-central-1.amazonaws.com/src/landing-page/LANDING+PAGE+-+SECTION+2.mp4"

                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videography;
