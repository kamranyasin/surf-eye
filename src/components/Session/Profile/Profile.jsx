import axios from "axios";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../Api/Api";
import "./Profile.styles.scss";

const ProfileInput = ({ label, ...props }) => {
  return (
    <div className="profileInput">
      <div className="profileInput__label">{label}</div>
      <input type="text" {...props} />
    </div>
  );
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    spot: "",
    level: "",
    code: "",
    email: "",
  });
  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setProfileData({ ...profileData, [key]: value });
  };
  useEffect(() => {
    const customertoken = localStorage.getItem("token");
    axios
      .get(endpoints.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${customertoken}`,
        },
      })
      .then((res) => {
        setProfileData({
          name: `${res.data.data.fname} ${res.data.data.lname} `,
          spot: res.data.data.favouritespot,
          email: res.data.data.email,
          level: res.data.data.level,
          code: res.data.data.referalcode,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="profile">
      <div className="profile__heading">HI, {profileData.name}</div>
      <div className="profile__contents">
        <ProfileInput
          label="Email"
          placeholder="User Email"
          value={profileData.email}
          onChange={handleChange}
          name="email"
          disabled={true}
        />
        <ProfileInput
          label="Favourite surf spot"
          placeholder="Input favourite surf spot"
          value={profileData.spot}
          onChange={handleChange}
          name="spot"
        />
        <ProfileInput
          label="Surf level"
          placeholder="choose surf level"
          value={profileData.level}
          onChange={handleChange}
          name="level"
        />
        <ProfileInput
          label="Your surf eye refferal code"
          placeholder="xxx"
          disabled={true}
          value={profileData.code}
          onChange={handleChange}
          name="code"
        />
      </div>
      <div className="profile__desc">Every 3 friends who use your code </div>
      <div className="profile__desc bold">You get a free session</div>
      <div className="profile__desc">
        And they get €5 off the first purchase
      </div>
    </div>
  );
};

export default Profile;
