import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { endpoints } from "../../../Api/Api";
import Logo from "../../../assets/logo.svg";
import { updateCredits } from "../../../Redux/Credits";
import { removeDate } from "../../../Redux/FilterSlice";
import { removeData } from "../../../Redux/ShowFilterData";
import { VIEWS } from "../../../utils/session_views";
import "./Sidebar.styles.scss";

const Button = ({
  title,
  id,
  view,
  setSidebar,
  setView,
  link,
  isAuth,
  setIsAuth,
}) => {
  // eslint-disable-next-line
  const handleClick = () => {
    setTimeout(() => {
      setIsAuth(false);
      setSidebar(false);
    }, 2000);
  };
  return (
    <Link to={link}>
      <div
        className={`sidebar__nav__button${
          view === id ? " sidebar__nav__active" : ""
        }`}
      >
        {title}
      </div>
    </Link>
  );
};

const Sidebar = ({ view, setView, setSidebar, isAuth, setIsAuth }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const creditsCount = useSelector((state) => state?.credits);
  const handleCustomerLogout = () => {
    dispatch(removeDate());
    dispatch(removeData());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    history.push("/");
  };

  useEffect(() => {
    const customertoken = localStorage.getItem("token");
    axios
      .get(endpoints.GET_CREDITS, {
        headers: {
          Authorization: `Bearer ${customertoken}`,
        },
      })
      .then((response) => {
        dispatch(updateCredits(response?.data?.date));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="sidebar">
      <div onClick={() => setSidebar(false)} className="sidebar__arrow">
        <MdArrowBack size={32} />
      </div>
      <div className="sidebar-container">
        <Link to="/">
          <div className="sidebar__logo">
            <img src={Logo} alt="Logo"></img>
          </div>
        </Link>
        <div className="sidebar__counts">
          <div className="sidebar__counts-item">
            <div className="sidebar__counts-item__heading">Credits</div>
            <div className="sidebar__counts-item__value">
              {creditsCount.creditsCounts ? creditsCount.creditsCounts : "0"}
            </div>
          </div>
          <div className="sidebar__counts-item">
            <div className="sidebar__counts-item__heading">Sessions</div>
            <div className="sidebar__counts-item__value">
              {creditsCount?.sessionsCount ? creditsCount.sessionsCount : "0"}
            </div>
          </div>
        </div>
        <div className="sidebar__nav">
          {Object.entries(VIEWS).map((v) => (
            <Button
              title={v[1]}
              key={v[1]}
              id={v[1]}
              link={`/session?view=${v[0]}`}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              setSidebar={setSidebar}
              view={view}
              setView={setView}
            />
          ))}
        </div>
        <div className="sidebar__buttons">
          <div className={`sidebar__nav__button sidebar__nav__button-contact`}>
            <a href="mailto:yoursurfeye@gmail.com">Contact US</a>
          </div>
          <div
            className={`sidebar__nav__button sidebar__nav__button-logout`}
            onClick={handleCustomerLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
