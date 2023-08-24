import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../../assets/Abstract.jpg";
import Password_Eye_Off from "../../assets/icons/eye-off.svg";
import Password_Eye from "../../assets/icons/eye.svg";
import GoogleIcon from "../../assets/icons/goole.svg";
import { useRegistrationMutation } from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [eye, setEye] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [registrationError, setRegistrationError] = useState({
    isError: false,
    errorMessage: "",
  });
  // react dom hook
  const navigate = useNavigate();
  const location = useLocation();

  // RegistrationMutation
  const [
    registration,
    { data: registrationResponse, isLoading, isError, error },
  ] = useRegistrationMutation();
  const dispatch = useDispatch();

  const handleSubmitData = (event) => {
    event.preventDefault();
    if (password.length >= 8) {
      const newUser = {
        userName,
        email,
        password,
        accountType,
      };

      if (newUser?.userName && newUser?.email && accountType) {
        registration(newUser);
      }
    }
  };

  // Going to the signin page
  const handleRedirectSignIn = () => {
    return navigate("/sign-in", { replace: true, state: location?.state });
  };

  useEffect(() => {
    if (!isLoading && registrationResponse?.token) {
      dispatch(setToken(registrationResponse.token));
      dispatch(getUserInfo(registrationResponse?.user));

      if (registrationResponse?.user?.role === "jobSeeker") {
        navigate("/personal-info", { replace: true, state: location });
      }
      if (registrationResponse?.user?.role === "employeer") {
        navigate("/organization");
      }
    }
    if (!isLoading && isError) {
      setRegistrationError({
        isError: true,
        errorMessage: error?.data?.message,
      });
    }
  }, [registrationResponse?.token, registrationResponse?.user, isLoading]);

  return (
    <div className={styles.signUpPageWapper}>
      <div className={styles.signUpPageContent}>
        <div className={styles.signUpLeft}>
          <img className={styles.leftImage} src={bgImage} alt="" />
        </div>
        <div className={styles.signUpRightContent}>
          <h2 className={styles.signUpText}>
            Sign-up and apply
            <span className={styles.forFreeText}> for free</span>
          </h2>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmitData}>
              <div className={styles.inputWrapper}>
                <label htmlFor="name">Name*</label>
                <input
                  className={styles.input}
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="name">Email*</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {registrationError.isError && (
                  <span className={styles.errorMessage}>
                    {registrationError.errorMessage}
                  </span>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="name">Password*</label>
                <div className={styles.passwordFiled}>
                  <input
                    className={`${styles.input} ${
                      password.length > 0 &&
                      password.length < 8 &&
                      styles.errorInputBorder
                    } ${styles.password}`}
                    type={eye ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                  />
                  {eye ? (
                    <img
                      className={styles.password_Eye_Off}
                      src={Password_Eye_Off}
                      alt=""
                      onClick={() => setEye(!eye)}
                    />
                  ) : (
                    <img
                      className={styles.password_Eye}
                      src={Password_Eye}
                      alt=""
                      onClick={() => setEye(!eye)}
                    />
                  )}
                </div>

                <span
                  className={`${styles.passwordMustBe8} ${
                    password.length > 0 &&
                    password.length < 8 &&
                    styles.passwordError
                  }`}
                >
                  Must be at least 8 characters.
                </span>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="accountType">Account type*</label>

                <div className={styles.accountTypeWrapper}>
                  <div>
                    <input
                      type="radio"
                      name="accountType"
                      id="jobSeeker"
                      className="secondary-custom-checkbox"
                      value={"jobSeeker"}
                      onChange={() => setAccountType("jobSeeker")}
                    />
                    <label htmlFor="jobSeeker">Job Seeker</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="accountType"
                      id="employeer"
                      className="secondary-custom-checkbox"
                      value={"employeer"}
                      onChange={() => setAccountType("employeer")}
                    />
                    <label htmlFor="employeer">Emplopyeer</label>
                  </div>
                </div>
              </div>

              <div className={styles.cerateAccountBtnWrapper}>
                <button type="submit" className="primaryBtn">
                  Create account
                </button>
              </div>
            </form>

            <div className={styles.orWrapper}>
              <div className={styles.leftLine}></div>
              <span className={styles.orText}>or</span>
              <div className={styles.rightLine}></div>
            </div>

            <div className={styles.socilSignIn}>
              <button className={styles.social}>
                <img src={GoogleIcon} alt="" />
                <span>Signin with google</span>
              </button>

              <p className={styles.alreadyHaveAnAccount}>
                Already have an account?{" "}
                <span onClick={() => handleRedirectSignIn()}>Sign in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
