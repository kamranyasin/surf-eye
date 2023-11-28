import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { endpoints } from "../../../Api/Api";
import Controller from "../../Controller/Controller";
import "./MySession.styles.scss";

const SessionItem = ({
  index,
  // video,
  date,
  location,
  id,
  user_id,
  coachguidence,
  gif,
}) => {
  const history = useHistory();
  function handleDateFormat() {
    let x = date.slice(0, 10);
    let year = x.slice(0, 4);
    let month = x.slice(5, 7);
    let day = x.slice(8, 10);
    return `${day}-${month}-${year}`;
  }
  return (
    <div className="mysession__contents-item">
      <div className="mysession__contents-item-date">
        Date : {handleDateFormat()}
      </div>
      <div className="mysession__contents-item-location">{`Location : ${location}`}</div>
      {/* <Link to={`/session?view=player&wave=${id}`}> */}
      <div
        className="mysession__contents-item-video"
        onClick={() =>
          history.push(`/session?view=player&wave=${id}`, {
            date: handleDateFormat(),
            location: location,
          })
        }
      >
        {gif ? (
          <img src={gif} alt="" width="100%" height="100%" />
        ) : (
          <BsPlayCircle />
        )}
      </div>
      {/* </Link> */}
      <div className="mysession__contents-item-session-title">{`Session # ${index}`}</div>
      <div className="mysession__contents-item-buttons">
        <button
          className="mysession__contents-item-buttons-button"
          onClick={() =>
            history.push(`/session?view=player&wave=${id}`, {
              date: handleDateFormat(),
              location: location,
            })
          }
        >
          Download
        </button>
        <button
          className="mysession__contents-item-buttons-button"
          // style={{ cursor: coachguidence === true ? "no-drop" : "pointer" }}
          onClick={() =>
            // coachguidence === false &&
            history.push(`/session?view=payments`, {
              id: id,
              price: 35,
              title: "1 coaching session",
            })
          }
        >
          Get coaching
        </button>
      </div>
    </div>
  );
};

const MySession = () => {
  const [mySession, setMySession] = useState([]);
  const token = localStorage.getItem("token");
  const filterDate = useSelector((state) => state.filter);

  useEffect(() => {
    axios
      .get(endpoints.MY_SESSIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMySession(res?.data?.data));
  }, []);


  return (
    <div className="mysession">
      <div className="mysession-container">
        <div className="mysession-controller">
          <Controller isMysession={true} />
        </div>
        <div className="mysession__contents scrollbar">
          {mySession?.length === 0 || mySession === undefined ? (
            <div style={{ fontSize: "30px", marginTop: "24px" }}>
              No Sessions To Watch
            </div>
          ) : (
            mySession
              .filter((item) => {
                if (item?.date?.slice(0, 16) === filterDate) {
                  return item;
                } else if (filterDate === null) {
                  return item;
                }
              })
              .map((e, i) => (
                <>
                  <div key={i}>
                    <SessionItem
                      index={++i}
                      date={e.date}
                      coachguidence={e.coachguidence}
                      id={e.id}
                      location={e.location}
                      user_id={e.user_id}
                      gif={e.gif}
                    />
                  </div>
                </>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MySession;
