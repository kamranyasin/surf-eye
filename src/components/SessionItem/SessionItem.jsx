import React from "react";
import "./SessionItem.styles.scss";

const SessionItem = ({ title, price, id, setSelected, selected }) => {
  return (
    <div
      className={`sessionItem${
        id === selected ? " selected-session-price" : ""
      }`}
    >
      <div className={"sessionItem-title"}>{title}</div>
      <div className="sessionItem-amount">{price}</div>
      <div onClick={() => setSelected(id)} className="sessionItem-button">
        Select
      </div>
    </div>
  );
};

export default SessionItem;
