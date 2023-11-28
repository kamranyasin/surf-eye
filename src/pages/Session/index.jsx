import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Session/Sidebar/Sidebar";
import { SUBVIEW, VIEWS } from "../../utils/session_views";
import "./Session.styles.scss";
// eslint-disable-next-line
import { Helmet } from "react-helmet";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import { developement_url } from "../../Api/Api";
import AuthModal from "../../components/AuthModal/AuthModal";
import BuySessions from "../../components/Session/BuySessions/BuySessions";
import Checkout from "../../components/Session/Checkout/Checkout";
import MySession from "../../components/Session/Mysession/MySession";
import Payment from "../../components/Session/Payment/Payment";
import Profile from "../../components/Session/Profile/Profile";
import {
  default as Sessionplayer,
  default as SessionPlayer,
} from "../../components/Session/SessionPlayer/SessionPlayer";
import Watch from "../../components/Session/Watch/Watch";

// import {useParams} from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Session = () => {
  const history = useHistory();
  const { search } = useLocation();
  const query = useQuery();
  const [view, setView] = useState(
    VIEWS[query.get("view")] || SUBVIEW[query.get("view")] || VIEWS.watch
  );
  const [sidebar, setSidebar] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  //  const [creditsCounter, setCreditsCounter] = useState(false);

  useEffect(() => {
    setView(
      VIEWS[query.get("view")] || SUBVIEW[query.get("view")] || VIEWS.watch
    );

    setSidebar(false);
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getUserInfo = localStorage.getItem("userInfo");
    if (getToken === null) {
      history.push("/auth");
    } else if (JSON.parse(getUserInfo).role === "superadmin") {
      history.push("/admin/coupons");
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{view.charAt(0).toUpperCase() + view.slice(1)}</title>
      </Helmet>
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className={`overlay__session__sidebar${
            sidebar ? " show" : " hidden"
          }`}
        ></div>
      )}
      <div className="session">
        <AuthModal isAuth={isAuth} setIsAuth={setIsAuth} />

        <div
          className={`session__sidebar${sidebar ? " show" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Sidebar
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            view={view}
            setView={setView}
            setSidebar={setSidebar}
          />
        </div>
        <div
          className={`sidebar__open${sidebar ? " hidden" : ""}`}
          onClick={() => setSidebar(true)}
        >
          <MdKeyboardArrowRight size={40} />
        </div>
        <div className="session-container">
          {view === VIEWS.buysession && <BuySessions />}
          {view === VIEWS.myprofile && <Profile />}
          {view === VIEWS.mysession && <MySession />}
          {view === VIEWS.watch && <Watch />}
          {view === SUBVIEW.checkout && <Checkout />}
          {view === SUBVIEW.payments && <Payment />}
          {view === SUBVIEW.player && <SessionPlayer />}
        </div>
      </div>
    </>
  );
};

export default Session;
