import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import avatarImage from "../../../public/profile.jpg";
import LOGO from "../../assets/logo/Logo.svg";
import { logut } from "../../features/auth/authSlice";
import { getCompanyInfo } from "../../features/companySlice/companySlice";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const expandUserMenuRef = useRef(null);
  const location = useLocation();
  // User Data
  const { user, token } = useSelector((state) => state.authSlice);
  const { _id, userName, email, role, accountCompeletation } = user || {};
  const dispatch = useDispatch();

  const handleLogOut = () => {
    setExpandMenu(false);
    dispatch(logut());
    dispatch(getCompanyInfo({}));
    return <Navigate to="/" replace={true} />;
  };

  // close Expand menu when clicking menu list
  const handleCloseExpandMenu = () => {
    setExpandMenu(false);
  };

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandUserMenuRef.current &&
        !expandUserMenuRef.current.contains(event.target)
      ) {
        setExpandMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandUserMenuRef, expandMenu]);

  return (
    <div className={styles.ParentNavbarWrapper}>
      <div className="container">
        <div className={styles.navbarWrapper}>
          <div className={styles.logoAndMenuWrapper}>
            <span
              className={styles.mobileMenuIcon}
              onClick={(e) => setMobileMenu(true)}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 32 32"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z"></path>
              </svg>
            </span>
            <div className={styles.logoWrapper}>
              <Link
                to={`${
                  user?._id
                    ? user?.role === "employeer"
                      ? "/employeer/dashboard"
                      : "/student/dashboard"
                    : "/"
                }`}
              >
                <img className={styles.logo} src={LOGO} alt="" />
              </Link>
            </div>
            <div
              className={`${styles.navbarOverley} ${
                mobileMenu && styles.activeNavbarOverley
              }`}
              onClick={(e) => setMobileMenu(false)}
            ></div>
            <ul
              className={`${styles.navbarMenu} ${
                mobileMenu && styles.activeMobileMenu
              }`}
            >
              <li className={styles.menuList}>
                <Link to={"/"} className={styles.navLink}>
                  Finds Job
                </Link>
              </li>
              <li className={styles.menuList}>
                <a className={styles.navLink} href="">
                  Browse Company
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.navbarMenuWrapper}>
            {user?._id ? (
              <>
                {user?.role === "employeer" && (
                  <button
                    className={`${styles.postAJob} ${styles.monileContentOff}`}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.1016 9.16671H11.1016V4.16671C11.1016 3.70587 10.7282 3.33337 10.2682 3.33337C9.80823 3.33337 9.4349 3.70587 9.4349 4.16671V9.16671H4.4349C3.9749 9.16671 3.60156 9.53921 3.60156 10C3.60156 10.4609 3.9749 10.8334 4.4349 10.8334H9.4349V15.8334C9.4349 16.2942 9.80823 16.6667 10.2682 16.6667C10.7282 16.6667 11.1016 16.2942 11.1016 15.8334V10.8334H16.1016C16.5616 10.8334 16.9349 10.4609 16.9349 10C16.9349 9.53921 16.5616 9.16671 16.1016 9.16671Z"
                          fill="#0BAB7C"
                        />
                      </svg>
                    </span>
                    <span className={styles.postAJobBtnText}>Post Job</span>
                  </button>
                )}

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.78291 16L6.96291 14.818C7.34091 14.44 7.54891 13.938 7.54891 13.404V8.72696C7.54891 7.36996 8.13891 6.07296 9.16891 5.17096C10.2069 4.26096 11.5289 3.86096 12.9059 4.04196C15.2329 4.35096 16.9879 6.45496 16.9879 8.93695V13.404C16.9879 13.938 17.1959 14.44 17.5729 14.817L18.7539 16H5.78291ZM14.2679 18.341C14.2679 19.24 13.3519 20 12.2679 20C11.1839 20 10.2679 19.24 10.2679 18.341V18H14.2679V18.341ZM20.7889 15.208L18.9879 13.404V8.93696C18.9879 5.45596 16.4859 2.49896 13.1679 2.05996C11.2459 1.80396 9.30591 2.39096 7.85091 3.66696C6.38691 4.94896 5.54891 6.79296 5.54891 8.72696L5.54791 13.404L3.74691 15.208C3.27791 15.678 3.13891 16.377 3.39291 16.99C3.64791 17.604 4.24091 18 4.90491 18H8.26791V18.341C8.26791 20.359 10.0619 22 12.2679 22C14.4739 22 16.2679 20.359 16.2679 18.341V18H19.6309C20.2949 18 20.8869 17.604 21.1409 16.991C21.3959 16.377 21.2579 15.677 20.7889 15.208Z"
                      fill="#92929D"
                    />
                  </svg>
                </span>

                <span className={styles.mobileContentOff}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.2676 18H5.26758C4.71658 18 4.26758 17.552 4.26758 17V7.25L11.6676 12.8C11.8456 12.934 12.0566 13 12.2676 13C12.4786 13 12.6896 12.934 12.8676 12.8L20.2676 7.25V17C20.2676 17.552 19.8186 18 19.2676 18ZM18.6006 6L12.2676 10.75L5.93458 6H18.6006ZM19.2676 4H5.26758C3.61358 4 2.26758 5.346 2.26758 7V17C2.26758 18.654 3.61358 20 5.26758 20H19.2676C20.9216 20 22.2676 18.654 22.2676 17V7C22.2676 5.346 20.9216 4 19.2676 4Z"
                      fill="#92929D"
                    />
                  </svg>
                </span>

                <div
                  className={styles.avatarWrapper}
                  onClick={(e) => setExpandMenu(true)}
                  ref={expandUserMenuRef}
                >
                  {user?.avatar ? (
                    <div className={styles.ImageWrapper}>
                      <img className={styles.avatar} src={avatarImage} alt="" />
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M1.76758 1.75L6.26758 6.25L10.7676 1.75"
                            stroke="#808191"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <div className={styles.ImageWrapper}>
                      <button className={styles.headerAvatar}>
                        {user?.userName?.slice(0, 1)}
                      </button>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M1.76758 1.75L6.26758 6.25L10.7676 1.75"
                            stroke="#808191"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                  {expandMenu && (
                    <div
                      className={`${styles.menu} ${
                        expandMenu && styles.expandMenu
                      }`}
                    >
                      <div className={styles.profileInfo}>
                        <div className={styles.avatarText}>
                          {user?.userName?.slice(0, 1)}
                        </div>
                        <div>
                          <p className={styles.name}>
                            {user?.userName?.length > 13
                              ? user?.userName?.slice(0, 13) + "."
                              : user?.userName}
                          </p>

                          <p className={styles.gmail}>
                            {user?.email?.length > 16
                              ? user?.email?.slice(0, 16) + "..."
                              : user?.email}
                          </p>
                        </div>
                      </div>

                      <div className={styles.menuItemWrapper}>
                        {user?.role === "jobSeeker" && (
                          <>
                            <div className={styles.menuItem}>
                              <Link
                                to={"/my-applciation"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>My applications</span>
                              </Link>
                            </div>

                            <div className={styles.menuItem}>
                              <Link
                                to={"/saved-job"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Saved jobs</span>
                              </Link>
                            </div>
                            <div className={styles.menuItem}>
                              <Link
                                to={"/student/resume"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Edit Resume</span>
                              </Link>
                            </div>
                            <div className={styles.menuItem}>
                              <Link
                                to={"/preference"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Edit Preference</span>
                              </Link>
                            </div>
                          </>
                        )}

                        {user?.role === "employeer" && (
                          <>
                            <div className={styles.menuItem}>
                              <Link
                                to={"/employeer/dashboard"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Dashboard</span>
                              </Link>
                            </div>
                            <div className={styles.menuItem}>
                              <Link
                                to={"/employeer/company-profile"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Company profile</span>
                              </Link>
                            </div>

                            <div className={styles.menuItem}>
                              <Link
                                to={"/employeer/my-joblist"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Job listing</span>
                              </Link>
                            </div>

                            <div className={styles.menuItem}>
                              <Link
                                to={"/employeer/all-applications"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>All applications</span>
                              </Link>
                            </div>
                          </>
                        )}

                        <div className={styles.menuItem}>
                          <div
                            className={styles.menuLink}
                            onClick={() => handleLogOut()}
                          >
                            {/* <LogoutIcon /> */}
                            <span>Logut</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : location.pathname.includes("sign-up") ||
              location.pathname.includes("sign-in") ? (
              <></>
            ) : (
              <>
                {/* <Link to={"/sign-in"} className={styles.loginBtn}>
                  Login
                </Link> */}
                {/* <span className="line"></span> */}
                <Link to={"/sign-up"} className={styles.singUpBtn}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom menu  */}
      <div className={styles.mobileBottomNavbar}>
        <ul className={styles.mobileBottomNavbarItems}>
          <li className={styles.mobileBottomNavbarItem}>
            <Link className={styles.mobileBottomNavbarLink}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="22px"
                  height="22px"
                >
                  <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z" />
                </svg>
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link className={styles.mobileBottomNavbarLink}>
              <span>
                <svg
                  stroke="currentColor"
                  fill="#000"
                  stroke-width="0"
                  t="1551322312294"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  height="22px"
                  width="22px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                  <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                </svg>
              </span>
              <span>Post a job</span>
            </Link>
          </li>
          <li>
            <Link className={styles.mobileBottomNavbarLink}>
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="22px"
                  width="22px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
                </svg>
              </span>
              <span>Message</span>
            </Link>
          </li>
          <li>
            <Link className={styles.mobileBottomNavbarLink}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 18.01C20 18.561 19.551 19.01 19 19.01H17V9.01001H19C19.551 9.01001 20 9.45901 20 10.01V18.01ZM4 18.01V10.01C4 9.45901 4.449 9.01001 5 9.01001H7V19.01H5C4.449 19.01 4 18.561 4 18.01ZM10 5.51001C10 5.23401 10.224 5.01001 10.5 5.01001H13.5C13.776 5.01001 14 5.23401 14 5.51001V7.01001H10V5.51001ZM9 19.01H15V9.01001H9V19.01ZM19 7.01001H16V5.51001C16 4.13201 14.878 3.01001 13.5 3.01001H10.5C9.122 3.01001 8 4.13201 8 5.51001V7.01001H5C3.346 7.01001 2 8.35601 2 10.01V18.01C2 19.664 3.346 21.01 5 21.01H19C20.654 21.01 22 19.664 22 18.01V10.01C22 8.35601 20.654 7.01001 19 7.01001Z"
                    fill="#000"
                  />
                </svg>
              </span>
              <span>All jobs</span>
            </Link>
          </li>
          <li>
            <Link className={styles.mobileBottomNavbarLink}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 25"
                  fill="#000"
                >
                  <path
                    d="M23.184 9.42978L20.916 8.67378L21.984 6.53778C22.0923 6.31421 22.1285 6.06254 22.0876 5.81751C22.0468 5.57248 21.9309 5.34616 21.756 5.16978L19.2 2.61378C19.0227 2.43629 18.7942 2.31883 18.5467 2.27794C18.2991 2.23704 18.045 2.27476 17.82 2.38578L15.684 3.45378L14.928 1.18579C14.8482 0.949376 14.6966 0.743736 14.4944 0.597483C14.2923 0.45123 14.0495 0.371639 13.8 0.369785H10.2C9.94843 0.369136 9.70301 0.447568 9.49845 0.593996C9.29388 0.740423 9.1405 0.94744 9.06 1.18579L8.304 3.45378L6.168 2.38578C5.94443 2.27752 5.69276 2.24131 5.44773 2.28215C5.2027 2.32299 4.97638 2.43886 4.8 2.61378L2.244 5.16978C2.06651 5.3471 1.94905 5.57559 1.90815 5.82313C1.86726 6.07067 1.90497 6.3248 2.016 6.54978L3.084 8.68578L0.816004 9.44178C0.579595 9.52163 0.373955 9.67318 0.227702 9.87535C0.0814485 10.0775 0.00185721 10.3203 4.00024e-06 10.5698V14.1698C-0.000645394 14.4214 0.0777867 14.6668 0.224214 14.8713C0.370642 15.0759 0.577659 15.2293 0.816004 15.3098L3.084 16.0658L2.016 18.2018C1.90774 18.4254 1.87153 18.677 1.91237 18.9221C1.9532 19.1671 2.06908 19.3934 2.244 19.5698L4.8 22.1258C4.97732 22.3033 5.20581 22.4207 5.45335 22.4616C5.70089 22.5025 5.95501 22.4648 6.18 22.3538L8.316 21.2858L9.072 23.5538C9.1525 23.7921 9.30588 23.9991 9.51045 24.1456C9.71501 24.292 9.96043 24.3704 10.212 24.3698H13.812C14.0636 24.3704 14.309 24.292 14.5136 24.1456C14.7181 23.9991 14.8715 23.7921 14.952 23.5538L15.708 21.2858L17.844 22.3538C18.0661 22.4593 18.3154 22.494 18.5579 22.4533C18.8004 22.4125 19.0246 22.2982 19.2 22.1258L21.756 19.5698C21.9335 19.3925 22.0509 19.164 22.0918 18.9164C22.1327 18.6689 22.095 18.4148 21.984 18.1898L20.916 16.0538L23.184 15.2978C23.4204 15.2179 23.626 15.0664 23.7723 14.8642C23.9186 14.662 23.9981 14.4193 24 14.1698V10.5698C24.0006 10.3182 23.9222 10.0728 23.7758 9.86823C23.6294 9.66366 23.4223 9.51029 23.184 9.42978ZM21.6 13.3058L20.16 13.7858C19.8289 13.8932 19.5251 14.0714 19.2697 14.3079C19.0143 14.5445 18.8134 14.8337 18.681 15.1557C18.5485 15.4776 18.4877 15.8245 18.5027 16.1723C18.5178 16.5201 18.6083 16.8605 18.768 17.1698L19.452 18.5378L18.132 19.8578L16.8 19.1378C16.4923 18.9845 16.1552 18.8991 15.8116 18.8873C15.468 18.8756 15.1258 18.9379 14.8084 19.0699C14.4909 19.2018 14.2055 19.4005 13.9715 19.6524C13.7375 19.9043 13.5603 20.2035 13.452 20.5298L12.972 21.9698H11.064L10.584 20.5298C10.4766 20.1986 10.2984 19.8948 10.0619 19.6394C9.82533 19.384 9.53605 19.1832 9.21411 19.0507C8.89216 18.9183 8.54526 18.8575 8.19747 18.8725C7.84968 18.8876 7.50932 18.9781 7.2 19.1378L5.832 19.8218L4.512 18.5018L5.232 17.1698C5.39172 16.8605 5.48223 16.5201 5.49726 16.1723C5.51229 15.8245 5.45148 15.4776 5.31905 15.1557C5.18662 14.8337 4.98574 14.5445 4.73034 14.3079C4.47494 14.0714 4.17113 13.8932 3.84 13.7858L2.4 13.3058V11.4338L3.84 10.9538C4.17113 10.8464 4.47494 10.6682 4.73034 10.4317C4.98574 10.1951 5.18662 9.90583 5.31905 9.58389C5.45148 9.26194 5.51229 8.91504 5.49726 8.56725C5.48223 8.21946 5.39172 7.8791 5.232 7.56978L4.548 6.23778L5.868 4.91778L7.2 5.60178C7.50932 5.7615 7.84968 5.85201 8.19747 5.86704C8.54526 5.88207 8.89216 5.82126 9.21411 5.68883C9.53605 5.5564 9.82533 5.35552 10.0619 5.10012C10.2984 4.84472 10.4766 4.54092 10.584 4.20978L11.064 2.76978H12.936L13.416 4.20978C13.5234 4.54092 13.7016 4.84472 13.9381 5.10012C14.1747 5.35552 14.464 5.5564 14.7859 5.68883C15.1078 5.82126 15.4547 5.88207 15.8025 5.86704C16.1503 5.85201 16.4907 5.7615 16.8 5.60178L18.168 4.91778L19.488 6.23778L18.768 7.56978C18.6147 7.87752 18.5293 8.2146 18.5176 8.55821C18.5058 8.90182 18.5681 9.24394 18.7001 9.5614C18.8321 9.87887 19.0307 10.1643 19.2826 10.3983C19.5345 10.6323 19.8337 10.8095 20.16 10.9178L21.6 11.3978V13.3058ZM12 7.56978C11.0506 7.56978 10.1226 7.8513 9.33326 8.37873C8.54391 8.90616 7.92868 9.65582 7.56538 10.5329C7.20208 11.41 7.10702 12.3751 7.29223 13.3062C7.47744 14.2373 7.9346 15.0926 8.60589 15.7639C9.27718 16.4352 10.1325 16.8923 11.0636 17.0775C11.9947 17.2628 12.9598 17.1677 13.8369 16.8044C14.714 16.4411 15.4636 15.8259 15.9911 15.0365C16.5185 14.2472 16.8 13.3191 16.8 12.3698C16.8 11.0967 16.2943 9.87584 15.3941 8.97567C14.4939 8.0755 13.273 7.56978 12 7.56978ZM12 14.7698C11.5253 14.7698 11.0613 14.629 10.6666 14.3653C10.272 14.1016 9.96434 13.7268 9.78269 13.2882C9.60104 12.8497 9.55351 12.3671 9.64612 11.9016C9.73872 11.436 9.9673 11.0084 10.3029 10.6727C10.6386 10.3371 11.0662 10.1085 11.5318 10.0159C11.9973 9.92329 12.4799 9.97082 12.9184 10.1525C13.357 10.3341 13.7318 10.6417 13.9955 11.0364C14.2592 11.4311 14.4 11.8951 14.4 12.3698C14.4 13.0063 14.1471 13.6167 13.6971 14.0668C13.247 14.5169 12.6365 14.7698 12 14.7698Z"
                    fill="#A4B4CB"
                  />
                </svg>
              </span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
