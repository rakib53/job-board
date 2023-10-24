import React from "react";
import { FaDribbble, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { PiInstagramLogo } from "react-icons/pi";
import LOGO from "../../assets/logo/job.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerSection}>
      <div className="container">
        <div className={styles.footerWrapper}>
          <div className={styles.logoAndDesc}>
            <img className={styles.logo} src={LOGO} alt="" />
            <p className={styles.aboutCompany}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              quae. Rerum ab ipsa saepe repellat id mollitia!
            </p>
          </div>
          <div>
            <h3 className={styles.footerListTitle}>About</h3>
            <ul className={styles.footerList}>
              <li>
                <a className={styles.linkItem} href="">
                  Companies
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Price
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Terms
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Advice
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.footerListTitle}>Resource</h3>
            <ul className={styles.footerList}>
              <li>
                <a className={styles.linkItem} href="">
                  Help Docs
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Guide
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  update
                </a>
              </li>
              <li>
                <a className={styles.linkItem} href="">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.footerListTitle}>Get Job Notification</h3>
            <p className={styles.aboutCompany}>
              The latest job new, article sent in to your inbox
            </p>
            <div className={styles.EmailSubscribtion}>
              <input
                className={styles.subScribtionEmailInput}
                type="text"
                placeholder="Email address"
              />
              <button className="primaryBtn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.copyRightTextWrapper}>
          <p className={styles.copyrightText}>
            2023 &copy; JobHunty. All right reserved.
          </p>
          <div className={styles.socialMediaLink}>
            <ImFacebook className={styles.socialMediaIcon} />
            <PiInstagramLogo className={styles.socialMediaIcon} />
            <FaDribbble className={styles.socialMediaIcon} />
            <FaLinkedinIn className={styles.socialMediaIcon} />
            <FaTwitter className={styles.socialMediaIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
