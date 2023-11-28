import React from "react";
import ImproveSVG from "../../../assets/improvecoach.png";
import "./ImproveFaster.styles.scss";
const ImproveFaster = () => {
  return (
    <div className="improve">
      <div className="container improve__container">
        <div className="improve__heading heading-all">GET A COACH</div>
        <div className="improve__contents">
          <div className="improve__contents__img">
            <img src={ImproveSVG} alt="" />
          </div>
          <div className="improve__contents__texts">
            <div className="improve__contents__text">IMPROVE EVEN FASTER</div>
            <div className="improve__contents__desc">
              VIDEO ANALYSIS WITHIN 48H
            </div>
            <div className="improve__contents__price">
              FOR <span>€35</span>/SESSION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImproveFaster;
