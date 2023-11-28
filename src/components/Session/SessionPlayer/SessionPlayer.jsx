import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsDownload, BsFillPlayFill } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { api_url } from "../../../Api/Api";
import { useQuery } from "../../../utils";
import "./SessionPlayer.styles.scss";

const SessionPlayerItem = ({ title, id, selected, setSelected, videos }) => {
  const handleDownload = () => {
    const customertoken = localStorage.getItem("token");
    // var windowReference = window.open();
    axios
      .get(`${api_url}downloadfile?role=customer&id=${id}`, {
        headers: {
          Authorization: `Bearer ${customertoken}`,
        },
      })
      .then((res) => {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = res.data.data;
        a.download = res.data.data;
        a.click();
        document.body.removeChild(a);
        // windowReference.location = res.data.data;
        // windowReference.target = "blank";
        // window.open(res.data.data, "blank");
      });
  };
  return (
    // eslint-disable-next-line
    <div
      onClick={() => setSelected(id)}
      className={`sessionplayer__contents__list-item${
        id == selected ? " sessionplayer__contents__list-item-selected" : ""
      }`}
    >
      <div className="sessionplayer__contents__list-item-heading">{title}</div>
      <div className="sessionplayer__contents__list-item-icons">
        <span onClick={handleDownload}>
          <BsDownload size={19} />
        </span>
        <BsFillPlayFill
          size={25}
          className="sessionplayer__contents__list-item-icons-icon"
        />
      </div>
    </div>
  );
};

const SessionPlayer = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState(query.get("wave") || 1);
  const [videos, setVideos] = useState([]);

  const filterVideo = () => {
    return videos.filter((e) => {
      if (e.id === selected) {
        return e;
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${api_url}sessionContent?role=customer&sessionid=${query.get("wave")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setVideos(res.data.data));
  }, []);

  return (
    <div className="sessionplayer">
      <div className="sessionplayer__header-back">
        <MdOutlineArrowBackIosNew />
        <div onClick={() => history.goBack()}>Back</div>
      </div>
      <div className="sessionplayer-container">
        <div className="sessionplayer__contents">
          <div className="sessionplayer__contents__list scrollbar">
            {videos?.map((e, i) => (
              <>
                <SessionPlayerItem
                  title={`Wave ${++i}`}
                  videos={e?.video}
                  id={e.id}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ))}
          </div>
          <div className="sessionplayer__contents__player">
            <div className="sessionplayer__contents__player__heading">
              MY SESSION IN {location?.state?.location} {location?.state?.date}
            </div>
            <div className="sessionplayer__contents__player-video">
              <video
                src={filterVideo()[0]?.video}
                controls="controls"
                preload="auto"
                width="100%"
                height="100%"
                download
                playsInline
                muted
                autoPlay
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPlayer;
