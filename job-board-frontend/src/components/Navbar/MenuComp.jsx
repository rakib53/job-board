import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageIcon from "../SVG/MessageIcon";

export default function MenuComp({
  setExpandMenu,
  handleCloseExpandMenu,
  handleLogOut,
}) {
  const { user } = useSelector((state) => state.authSlice);

  return (
    <>
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
                className={`${styles.menu} ${expandMenu && styles.expandMenu}`}
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
    </>
  );
}
