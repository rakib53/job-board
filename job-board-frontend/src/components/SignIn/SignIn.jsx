import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Password_Eye_Off from "../../assets/icons/eye-off.svg";
import Password_Eye from "../../assets/icons/eye.svg";
import buttonLoading from "../../assets/loading/buttonLoading.svg";
import logo from "../../assets/logo/Logo.png";
import QuatationImage from "../../assets/signin_images/quatation.png";
import { useSignInMutation } from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import styles from "../SignUp/SignUp.module.css";

export default function SignIn() {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState({
    email: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    password: "",
    error: false,
    errorMessage: "",
  });
  const [signInError, setSignInError] = useState({
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

    const userInfo = {
      email: email.email,
      password: password.password,
    };

    if (email.email.length < 10) {
      setEmail({ ...email, error: true, errorMessage: "Email isn't valid!" });
      return;
    }

    if (password.password.length < 8) {
      setPassword({
        ...password,
        error: true,
        errorMessage: "Password isn't valid!",
      });
      return;
    }

    if (userInfo?.email && userInfo?.password) {
      signIn(userInfo);
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
      setSignInError({
        isError: true,
        errorMessage: error?.data?.error,
      });
    }
  }, [signInResponse, isLoading, dispatch]);

  return (
    <div className={styles.signUpPageWapper}>
      <div className={styles.signUpPageContent}>
        <div className={styles.signUpLeft}>
          <div className={styles.signUpInner}>
            <img
              src={QuatationImage}
              className={styles.QuatationImage}
              alt=""
            />
            <h1 className={styles.findYourJobTitle}>
              Find the job made for you
            </h1>
            <p className={styles.browseJobText}>
              Browse over 130k jobs at top companies and fast-growing startups.
            </p>
            <img className={styles.leftLogo} src={logo} alt="" />
          </div>
        </div>
        <div className={styles.signUpRightContent}>
          <div className={styles.signUpformWrapper}>
            <h2 className={styles.signUpText}>Create Account</h2>
            <p className={styles.signUpSologan}>
              Find your next opportunity
            </p>{" "}
            <div className={styles.formWrapper}>
              <form className={styles.form} onSubmit={handleSubmitData}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="name">Email*</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    value={email.email}
                    onChange={(e) =>
                      setEmail({
                        ...email,
                        email: e.target.value,
                        error: false,
                      })
                    }
                    placeholder="Enter your email"
                    required
                  />
                  {email.error && (
                    <span className={styles.error}>{email.errorMessage}</span>
                  )}
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="name">Password*</label>
                  <div className={styles.passwordFiled}>
                    <input
                      className={`${styles.input} ${
                        password.password.length > 0 &&
                        password.password.length < 8 &&
                        styles.errorInputBorder
                      } ${styles.password}`}
                      type={eye ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password.password}
                      onChange={(e) =>
                        setPassword({ ...password, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      required
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
                  {password.password.length > 0 &&
                    password.password.length < 8 && (
                      <span
                        className={`${styles.passwordMustBe8} ${styles.passwordError}`}
                      >
                        Must be at least 8 characters.
                      </span>
                    )}

                  {signInError.isError && (
                    <p className={`${signInError.isError && styles.error}`}>
                      {signInError.errorMessage}
                    </p>
                  )}
                </div>

                <div className={styles.cerateAccountBtnWrapper}>
                  <button
                    type="submit"
                    className="primaryBtn"
                    disabled={isLoading}
                  >
                    <span>Sign in</span>
                    {isLoading && (
                      <img
                        className={styles.buttonLoading}
                        src={buttonLoading}
                        alt=""
                      />
                    )}
                  </button>
                </div>
              </form>

              <div className={styles.orWrapper}>
                <div className={styles.leftLine}></div>
                <span className={styles.orText}>or</span>
                <div className={styles.rightLine}></div>
              </div>

              <div className={styles.socilSignIn}>
                <p className={styles.alreadyHaveAnAccount}>
                  Don't have an account?{" "}
                  <Link className={styles.signUpLink} to={"/sign-up"}>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
