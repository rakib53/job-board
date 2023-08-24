import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import LOGO from "../../assets/logo/job.png";
import { logut } from "../../features/auth/authSlice";
import MessageIcon from "../SVG/MessageIcon";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  const expandUserMenuRef = useRef(null);
  const location = useLocation();
  // User Data
  const { user } = useSelector((state) => state.authSlice);
  const { _id, userName, email, role, accountCompeletation } = user;
  const dispatch = useDispatch();

  const handleLogOut = () => {
    setExpandMenu(false);
    dispatch(logut());
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
            <div className={styles.logoWrapper}>
              <Link to={"/"}>
                <img className={styles.logo} src={LOGO} alt="" />
              </Link>
            </div>
            <ul className={styles.menus}>
              <li className={styles.menuList}>
                <a className={styles.navLink} href="">
                  Finds Job
                </a>
              </li>
              <li className={styles.menuList}>
                <a className={styles.navLink} href="">
                  Browse Company
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.navbarBtnWrapper}>
            {_id ? (
              <>
                {user?.role === "employeer" && (
                  <>
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
                  </>
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

                <MessageIcon />
                <div className={styles.avatarWrapper}>
                  {user?.avatar ? (
                    <img
                      className={styles.avatar}
                      src={Avatar}
                      alt=""
                      onClick={() => setExpandMenu(!expandMenu)}
                    />
                  ) : (
                    <button
                      className={styles.headerAvatar}
                      onClick={() => setExpandMenu(!expandMenu)}
                    >
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
                                to={"/student/dashboard"}
                                className={styles.menuLink}
                                onClick={() => handleCloseExpandMenu()}
                              >
                                {/* <SupportIcon /> */}
                                <span>Profile</span>
                              </Link>
                            </div>

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
