import "./Controller.styles.scss";

import { FiChevronDown } from "react-icons/fi";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { api_url } from "../../Api/Api";
import { isLoading } from "../../Redux/Loading";
import { removeSelectedData } from "../../Redux/SelectedData";
import { showData } from "../../Redux/ShowFilterData";
import DropDown from "../Hamburger/DropDown";

const ControllerItem = ({ title, links, type, ipType, isTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const isDate = useSelector((state) => state?.filter);

  function handleDateFormat() {
    let year = isDate?.slice(0, 4);
    let month = isDate?.slice(5, 7);
    let day = isDate?.slice(8, 10);
    let time = isDate?.slice(11);
    return `${day}-${month}-${year}   ${time}`;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(false);
  };
  return (
    <div
      ref={ref}
      onClick={isOpen ? handleClose : handleClick}
      className="controller-item"
    >
      <div>
        {type === "surfspot"
          ? isSelected === true || isTitle === true
            ? links[0]?.title
            : title
          : type === "dateIp"
          ? isDate === null
            ? title
            : handleDateFormat()
          : ""}
      </div>
      <div onClick={() => (type === "surfspot" ? setIsSelected(true) : "")}>
        <DropDown
          open={open}
          ipType={ipType}
          width={ref.current && ref.current.clientWidth}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          links={links}
          type={type}
        />
      </div>
      <FiChevronDown />
    </div>
  );
};
const Controller = ({ isMysession, isTitle }) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.filter);
  const [newArray, setNewArray] = useState([]);

  const handleFilter = () => {
    if (date === null) {
      Swal.fire("Select Date-Time", "", "error");
    } else {
      dispatch(isLoading(true));
      axios
        .get(`${api_url}uploaddata?query=${date}`)
        .then((res) => {
          if (res.data.data.length > 0) {
            dispatch(removeSelectedData());
            dispatch(isLoading(false));
            dispatch(showData(res.data.data));
          } else {
            dispatch(isLoading(false));
            dispatch(showData("No Data"));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="controller">
      <ControllerItem
        isTitle={isTitle}
        title={"SURF SPOT"}
        type="surfspot"
        links={[{ title: "NOVA PRAIA  COSTA DA CAPARICA" }]}
      />
      <ControllerItem
        ipType={isMysession ? "date" : ""}
        type="dateIp"
        title={`DATE ${isMysession ? "" : "& Time"}`}
        links={[]}
      />
      <div className="controller-item">
        <div onClick={handleFilter} style={{ cursor: "pointer" }}>
          Watch
        </div>
      </div>
    </div>
  );
};

export default Controller;
