import axios from "axios";
import { m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaUserAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { api_url, developement_url, endpoints } from "../../../Api/Api";
import Logo from "../../../assets/logo.svg";
import CouponMenu from "../../../components/Coupons/Menu/Menu";
import Hamburger from "../../../components/Hamburger/Hamburger";
import Modal from "../../../components/Modal/Modal";
import CouponCreationForm from "./CouponCreationForm";
import CouponItem from "./CouponItem";
import "./Coupons.styles.scss";
import UpdateCouponItem from "./UpdateCouponItem";

const NavbarItem = ({ title, onClick, link }) => {
  return (
    <div className="coupons__header__nav-links-link">
      <a href={link || "#"}>{title}</a>
    </div>
  );
};

const Coupons = () => {
  const [modalState, setModalState] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [votes, setVotes] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [refersh, setReferesh] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateCouponData, setUpdateCouponData] = useState({
    id: "",
    title: "",
    discount: "",
    expiresAt: "",
    status: "",
    coupentype: "",
  });

  const handleAddCoupon = async (
    title,
    discount,
    expiresAt,
    isFlat,
    isMultipleUser,
    isSingle
  ) => {
    if (title === "" || discount === "" || expiresAt === "") {
      Swal.fire("Fields Cannot be Empty   ", "", "error");
    } else {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", title);
      formData.append("discount", discount);
      formData.append("expire_at", expiresAt);
      formData.append("flatprice", isFlat ? 1 : 0);
      if (isMultipleUser === false && isSingle === true) {
        formData.append("type", 1);
      } else if (isMultipleUser === false && isSingle === false) {
        formData.append("type", 2);
      } else if (isMultipleUser === true && isSingle === false) {
        formData.append("type", 3);
      } else if (isMultipleUser === true && isSingle === true) {
        formData.append("type", 4);
      }
      const response = await axios.post(endpoints.POST_COUPONS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "True") {
        Swal.fire(response.data.message, "", "success");
        getCoupouns();
      }
    }
  };

  const handleRemoveCoupon = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${api_url}admincoupens?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "True") {
      Swal.fire(response.data.message, "", "success");
      getCoupouns();
    }
  };

  const handleUpdateCoupon = (
    id,
    name,
    discount,
    expire_at,
    status,
    coupentype
  ) => {
    setOpen(true);
    setUpdateCouponData({
      id: id,
      title: name,
      discount: discount,
      expiresAt: expire_at,
      status: status,
      coupentype: coupentype,
    });
  };

  const getCoupouns = () => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.GET_COUPONS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCoupons(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleInactivate = async (
    id,
    name,
    discount,
    expire_at,
    coupentype,
    status
  ) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("discount", discount);
    formData.append("expire_at", expire_at);
    formData.append("status", "False");
    formData.append("type", coupentype);
    const response = await axios.put(endpoints.PUT_COUPONS, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "True") {
      Swal.fire(response.data.message, "", "success");
      getCoupouns();
    }
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getUserInfo = localStorage.getItem("userInfo");
    if (getToken === null || getUserInfo.role === "customer") {
      history.push("/auth");
    } else {
      axios
        .get(endpoints.GET_VOTING, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => setVotes(res?.data?.data))
        .catch((err) => console.log(err));

      getCoupouns();
    }
  }, []);

  useEffect(() => {
    getCoupouns();
  }, [refersh]);

  return (
    <div className="coupons">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{showVote ? "Votes" : "Coupons"}</title>
        {/* <link rel="canonical" href={`${developement_url}admin/coupons`} /> */}
      </Helmet>
      <div className="coupons__header">
        <Link to="/">
          <div className="coupons__header__logo">
            <img src={Logo} alt="" />
          </div>
        </Link>
        <div className="coupons__header__nav">
          <div className="coupons__header__nav__ham">
            <div
              onClick={() => setShowVote(true)}
              style={{ marginLeft: "20px" }}
            >
              <NavbarItem title="Votes" />
            </div>
            <div
              onClick={handleAdminLogout}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <NavbarItem title="Logout" />
            </div>
            <Hamburger
              color="#1f2735"
              links={[
                { title: "Coupons", href: "/admin/coupons" },
                // { title: "Votes", href: "/admin/votes" },
                // { title: "Logout", href: "/admin/logout" },
                { title: "👤 Admin", href: "/admin/coupo  ns" },
              ]}
            />
          </div>
          <div className="coupons__header__nav-links">
            <div onClick={() => setShowVote(false)}>
              <NavbarItem title="Coupons" />
            </div>
            <div
              onClick={() => setShowVote(true)}
              style={{ marginLeft: "20px" }}
            >
              <NavbarItem title="Votes" />
            </div>
            <div onClick={handleAdminLogout} style={{ marginLeft: "20px" }}>
              <NavbarItem title="Logout" />
            </div>
          </div>
          <div className="coupons__header__nav__user">
            <FaUserAlt />
            <div className="">
              <Link to="/admin/coupons">Admin</Link>
            </div>
          </div>
        </div>
      </div>
      {showVote ? (
        <div className="coupons-container">
          <div className="coupons__contents">
            <div className="coupons__contents__items">
              <div
                className="coupons__contents__items-headings"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="coupons__contents__items-headings-heading">
                  Place
                </div>
                <div className="coupons__contents__items-headings-heading">
                  Created-At
                </div>
              </div>
              <div className="coupons__contents__items-items">
                {votes.map((c) => (
                  <>
                    <div className="votes-table-container">
                      <p>{c.place}</p>
                      <p>{c.created_at.slice(0, 10)}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="coupons-container">
          <div className="coupons__heading">
            <div className="coupons__heading-text">Coupons</div>
            <Modal
              title="Create Coupon"
              modalState={modalState}
              setModalState={setModalState}
              target={<div className="coupons__heading-button">+ Create</div>}
            >
              <CouponCreationForm
                handleAddCoupon={handleAddCoupon}
                setModalState={setModalState}
              />
            </Modal>
          </div>

          <div className="coupons__contents">
            <div className="coupons__contents__items">
              <div className="coupons__contents__items-headings">
                <div className="coupons__contents__items-headings-heading">
                  Name
                </div>
                <div className="coupons__contents__items-headings-heading">
                  Discount
                </div>
                <div className="coupons__contents__items-headings-heading">
                  Created-At
                </div>
                <div className="coupons__contents__items-headings-heading">
                  Expires-At
                </div>
                <div className="coupons__contents__items-headings-heading">
                  Status
                </div>
                <div className="coupons__contents__items-headings-heading">
                  CoupenType
                </div>
              </div>
              <div className="coupons__contents__items-items">
                {coupons.map((c, idx) => (
                  // <>
                  <CouponMenu
                    color="#1f2735"
                    key={idx}
                    title={c.name}
                    handleDelete={() => handleRemoveCoupon(c.id)}
                    handleUpdate={() =>
                      handleUpdateCoupon(
                        c.id,
                        c.name,
                        c.discount,
                        c.expire_at,
                        c.status,
                        c.coupentype
                      )
                    }
                    handleActivate={() =>
                      handleInactivate(
                        c.id,
                        c.name,
                        c.discount,
                        c.expire_at,
                        c.coupentype,
                        c.status
                      )
                    }
                    target={
                      <CouponItem
                        title={c.name}
                        expiresAt={c.expire_at}
                        created_at={c.created_at}
                        discount={c.discount}
                        status={c.status}
                        coupentype={c.coupentype}
                        use={c.use}
                      />
                    }
                  />
                  // </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {open === true && (
        <UpdateCouponItem
          open={open}
          handleClose={handleClose}
          updateCouponData={updateCouponData}
          setReferesh={setReferesh}
        />
      )}
    </div>
  );
};

export default Coupons;
