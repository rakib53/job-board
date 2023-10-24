import React, { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import LOGO from "../../assets/logo/job.png";
import { logut } from "../../features/auth/authSlice";
import { getCompanyInfo } from "../../features/companySlice/companySlice";
import MessageIcon from "../SVG/MessageIcon";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const expandUserMenuRef = useRef(null);
  const expandUserWithMobileMenuRef = useRef(null);
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

  // Close and open mobile menu
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
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

  const handleMouseEnter = () => {
    setExpandMenu(true);
  };

  const handleMouseLeave = () => {
    setExpandMenu(false);
  };

  useEffect(() => {
    if (mobileMenu) {
      setExpandMenu(true);
    } else {
      setExpandMenu(false);
    }
  }, [mobileMenu]);

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandUserWithMobileMenuRef.current &&
        !expandUserWithMobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandUserWithMobileMenuRef, mobileMenu]);

  return (
    <div className={styles.ParentNavbarWrapper}>
      <div className="container">
        <div className={styles.navbarWrapper}>
          <div className={styles.logoAndMenuWrapper}>
            <div className={styles.logoWrapper}>
              <Link to={"/"}>
                <img className={styles.logo} src={LOGO} alt="" />
              </Link>
            </div>
            <ul className={styles.menus}>
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

          <span ref={expandUserWithMobileMenuRef}>
            {!mobileMenu ? (
              <HiMiniBars3BottomLeft
                className={styles.mobileMenuBar}
                onClick={handleMobileMenu}
              />
            ) : (
              <GrClose
                className={styles.mobileMenuBar}
                onClick={handleMobileMenu}
              />
            )}
          </span>

          <div
            className={`${styles.navbarMenuWrapper} ${
              mobileMenu && styles.activeMobileMenu
            }`}
          >
            {user?._id ? (
              <>
                {user?.role === "employeer" && (
                  <div className={styles.desktopExtraNavbarItem}>
                    <div className={styles.NavbarMenItem}>
                      <Link
                        to={"/employeer/dashboard"}
                        className={styles.NavbarMenuLink}
                      >
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to={"/employeer/post-job"}
                        className={styles.NavbarMenuLink}
                      >
                        <span>Post Internship/Job</span>
                      </Link>
                    </div>
                  </div>
                )}

                {user?.role === "jobSeeker" && (
                  <>
                    <div className={styles.NavbarMenItem}>
                      <Link
                        to={"/student/dashboard"}
                        className={styles.NavbarMenuLink}
                        onClick={() => handleCloseExpandMenu()}
                      >
                        <span>Dashboard</span>
                      </Link>
                    </div>
                  </>
                )}

                <span className={styles.MessageIconWrapper}>
                  <MessageIcon />
                </span>
                <div
                  className={styles.avatarWrapper}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {user?.avatar ? (
                    <img
                      className={styles.avatar}
                      src={Avatar}
                      alt=""
                      onClick={() => setExpandMenu(!expandMenu)}
                    />
                  ) : (
                    <button className={styles.headerAvatar}>
                      {user?.userName?.slice(0, 1)}
                    </button>
                  )}
                  {expandMenu && (
                    <div
                      className={`${styles.menu} ${
                        expandMenu && styles.expandMenu
                      }`}
                      ref={expandUserMenuRef}
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
                <Link to={"/sign-in"} className={styles.loginBtn}>
                  Login
                </Link>
                <span className="line"></span>
                <Link to={"/sign-up"} className="primaryBtn">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
