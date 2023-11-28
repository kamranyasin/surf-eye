import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { endpoints } from "../../../Api/Api";
import Location1 from "../../../assets/Locations/location-1.png";
import location5 from "../../../assets/Locations/location5.svg";
import "./Location.styles.scss";

const Locations = () => {
  const [place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current]);

  const handleLocation = async () => {
    if (!place) {
      Swal.fire("Enter Place", "", "error");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("place", place);
      const response = await axios.post(endpoints.POST_VOTING, formData);
      if (response.data.status === "True") {
        setPlace("");
        Swal.fire("Vote has been made", "", "success");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="locations" id="LocationsComponent">
      <div className="container locations-container">
        <div className="locations-heading heading-all">Locations</div>
        <div className="locations__contents">
          <div className="locations__contents-left">
            <div className="locations__contents-left-img">
              <img src={Location1} alt="Location-1" />
            </div>
            <div className="locations__contents-left-text">
              NOVA PRAIA
              <br /> COSTA DA CAPARICA
              <div className="locations__link">
                <a target="blank" href="https://goo.gl/maps/s3LKPncZSVRQiY6x8">
                  GOOGLE MAPS
                </a>
              </div>
            </div>
          </div>
          <div className="locations__contents-right">
            <div className="locations__contents-right-img">
              <img src={location5} alt="Location-2" />
            </div>
            <div className="locations__contents-right-input">
              <div className="locations__contents-right-input__title">
                More locations coming soon..
              </div>
              <div
                className="locations__contents-right-input__container"
                ref={ref}
              >
                <input
                  placeholder="Vote for the next location"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <div
                  className="locations__contents-right-input-button"
                  style={{ height: height, cursor: "pointer" }}
                  onClick={handleLocation}
                >
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="black"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="26"
                      visible={true}
                    />
                  ) : (
                    "Vote"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
