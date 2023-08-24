import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../../assets/Abstract.jpg";
import Password_Eye_Off from "../../assets/icons/eye-off.svg";
import Password_Eye from "../../assets/icons/eye.svg";
import GoogleIcon from "../../assets/icons/goole.svg";
import { useSignInMutation } from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import styles from "../SignUp/SignUp.module.css";

export default function SignIn() {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState({
    isError: false,
    errorMessage: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // RegistrationMutation
  const [signIn, { data: signInResponse, isLoading, isError, error }] =
    useSignInMutation();
  const dispatch = useDispatch();

  const handleSubmitData = (event) => {
    event.preventDefault();
    if (password.length >= 8) {
      const newUser = {
        email,
        password,
      };

      if (newUser?.email && newUser?.password) {
        signIn(newUser);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && signInResponse?.token) {
      dispatch(setToken(signInResponse.token));
      dispatch(getUserInfo(signInResponse?.user));
      if (signInResponse?.user?.role === "jobSeeker") {
        navigate("/student/dashboard", { replace: true, state: location });
      }
      if (signInResponse?.user?.role === "employeer") {
        navigate("/employeer/dashboard");
      }
    }
    if (!isLoading && isError) {
      setRegistrationError({
        isError: true,
        errorMessage: error?.data?.message,
      });
    }
  }, [signInResponse, isLoading, dispatch]);

  return (
    <div className={styles.signUpPageWapper}>
      <div className={styles.signUpPageContent}>
        <div className={styles.signUpLeft}>
          <img className={styles.leftImage} src={bgImage} alt="" />
        </div>
        <div className={styles.signUpRightContent}>
          <h2 className={styles.signUpText}>Welcome back</h2>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmitData}>
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

              <div className={styles.cerateAccountBtnWrapper}>
                <button type="submit" className="primaryBtn">
                  Sign in
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
                New to here? Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
