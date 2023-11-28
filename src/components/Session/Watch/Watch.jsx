import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import { removeDate } from "../../../Redux/FilterSlice";
import { selectData } from "../../../Redux/SelectedData";
import { removeData } from "../../../Redux/ShowFilterData";
import Controller from "../../Controller/Controller";
import "./Watch.styles.scss";

const WatchItem = ({ img, setSelected, id, onChange, site }) => {
  return (
    <label
      className="watch__items-item"
      style={{ background: `url(${img}) center center/cover` }}
    >
      <div className="watch__items-item-checkbox">
        <input onChange={onChange} type="checkbox" id={id} value={site} />
      </div>
    </label>
  );
};

const Watch = () => {
  const showFilteredData = useSelector((state) => state?.showfilterdata);
  const isLoading = useSelector((state) => state?.Loading);
  const history = useHistory();
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isTitle, setIsTitle] = useState(
    location?.state?.state?.date ? true : false
  );
  const selectedData = useSelector((state) => state.selectData);

  const handleChange = (e) => {
    let tempArray = [...selectedImages];

    if (!selectedImages.length) {
      tempArray.push({
        id: e.target.id,
        site: e.target.value,
      });
    } else {
      let isPresent = tempArray.map((item) => item.id).includes(e.target.id);
      if (isPresent) {
        let index = tempArray.map((item) => item.id).indexOf(e.target.id);
        tempArray = tempArray.filter((item, tempIndex) => tempIndex != index);
      } else {
        tempArray.push({
          id: e.target.id,
          site: e.target.value,
        });
      }
    }
    dispatch(selectData(tempArray));
    setSelectedImages(tempArray);
  };

  const handleDone = () => {
    if (selectedData === 0 || selectedData.length === 0) {
      Swal.fire("Select at least one video", "", "error");
    } else {
      history.push("/session?view=checkout", { state: selectedData });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(removeDate());
      dispatch(removeData());
    };
  }, []);

  return (
    <div className="watch">
      <div className="watch-container">
        <div className="watch__controller">
          <Controller isTitle={isTitle} />
        </div>
        <div className="watch__desc watch__desc-1">
          SELECT ALL THE GIFS WHERE YOU APPEAR
        </div>
        <div className="watch__desc">1 GIF = 1 WAVE</div>
        <div className="watch__message">
          YOU CAN SELECT ALL YOUR WAVES WITHIN A 2 HOURS RANGE. VIDEOS ARE
          DELETED AFTER 7 DAYS.
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "40px",
            }}
          >
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="26"
              visible={true}
            />
          </div>
        ) : showFilteredData === 0 || showFilteredData.length === 0 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              marginTop: "100px",
              marginBottom: "100px",
              fontSize: "22px",
            }}
          >
            SELECT THE START TIME OF YOUR SESSION AND CLICK WATCH
          </div>
        ) : showFilteredData !== "No Data" ? (
          <div className="watch__items">
            {showFilteredData?.map((e, i) =>
              e?.videos?.map((item) => (
                <WatchItem
                  onChange={handleChange}
                  img={item?.gif}
                  id={item?.id}
                  site={item?.site}
                />
              ))
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              marginTop: "100px",
              marginBottom: "100px",
              fontSize: "22px",
            }}
          >
            No videos available for this date and time. If your session was
            today, videos might not be ready yet
          </div>
        )}

        <div className="watch__action">
          <div className="watch__action-selection">
            <span>{selectedData === 0 ? 0 : selectedData.length}</span> Waves
            Selected
          </div>
          <div className="watch__action-done" onClick={handleDone}>
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
