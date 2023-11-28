import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.styles.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-container">
        <div className="footer__contents">
          <div className="footer__contents__contact">
            <div className="footer__contents__contact-heading">
              Contact us :
            </div>
            <div className="footer__contents__contact-item">
              Phone : +351 913539167
            </div>
            <div className="footer__contents__contact-item">
              email : yoursurfeye@gmail.com
            </div>
          </div>
          <div className="footer__contents__social">
            <div className="footer__contents__social-heading">Follow us</div>
            <div className="footer__contents__social-links">
              {" "}
              <div className="footer__contents__social-links-link">
                <a
                  href="https://www.instagram.com/surfeye.video/"
                  target="blank"
                >
                  <FaInstagram />
                </a>
              </div>{" "}
              <div className="footer__contents__social-links-link">
                <a
                  href="https://www.youtube.com/channel/UC0O_3FymeiaTthft-7j8qVA"
                  target="blank"
                >
                  <FaYoutube />
                </a>
              </div>
              <div className="footer__contents__social-links-link">
                <a href="https://vm.tiktok.com/ZMFFJEYGw/" target="blank">
                  {" "}
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div className="temp"></div>
          <div className="footer-links__link">
            <Link to="/termsandconditions">Terms and conditions</Link>
          </div>
          <div className="footer-links__link">
            <Link to="privacypolicy">Privacy Policy</Link>
          </div>
          <div className="footer-links__link">ⓒ 2022 Surf Eye</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
