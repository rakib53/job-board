import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Password_Eye_Off from "../../assets/icons/eye-off.svg";
import Password_Eye from "../../assets/icons/eye.svg";
import buttonLoading from "../../assets/loading/buttonLoading.svg";
import logo from "../../assets/logo/Logo.png";
import QuatationImage from "../../assets/signin_images/quatation.png";
import { useRegistrationMutation } from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [eye, setEye] = useState(false);
  const [userName, setUsername] = useState({
    userName: "",
    error: false,
    errorMessage: "",
  });
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
  const [accountType, setAccountType] = useState({
    accountType: "",
    error: false,
    errorMessage: "",
  });
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

    const newUser = {
      userName: userName?.userName,
      email: email.email,
      password: password.password,
      accountType: accountType.accountType,
    };

    if (userName.userName.length < 4) {
      setUsername({
        ...userName,
        error: true,
        errorMessage: "Provide a name!",
      });
      return;
    }

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

    if (!accountType.accountType) {
      setAccountType({
        ...accountType,
        error: true,
        errorMessage: "Select an account type!",
      });
      return;
    }

    if (newUser?.userName && newUser?.email && accountType) {
      registration(newUser);
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
        navigate("/employeer/organization");
      }
    }
    if (!isLoading && isError) {
      setEmail({
        ...email,
        error: true,
        errorMessage: error?.data?.message,
      });
    }
  }, [
    registrationResponse?.token,
    registrationResponse?.user,
    isError,
    isLoading,
    registrationResponse?.user?.role,
    navigate,
  ]);

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
        {/* sign up form and content  */}
        <div className={styles.signUpRightContent}>
          <div className={styles.signUpformWrapper}>
            <h2 className={styles.signUpText}>Create Account</h2>
            <p className={styles.signUpSologan}>Find your next opportunity</p>
            <div className={styles.formWrapper}>
              <form className={styles.form} onSubmit={handleSubmitData}>
                <div className={styles.inputWrapper}>
                  <div className={styles.labelAndErrorWrapper}>
                    <label htmlFor="name">Name*</label>
                    {userName.error && (
                      <span className={styles.error}>
                        {userName.errorMessage}
                      </span>
                    )}
                  </div>

                  <input
                    className={styles.input}
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName.userName}
                    onChange={(e) =>
                      setUsername({
                        ...userName,
                        userName: e.target.value,
                        error: false,
                      })
                    }
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.labelAndErrorWrapper}>
                    <label htmlFor="name">Email*</label>
                    {email.error && (
                      <span className={styles.error}>{email.errorMessage}</span>
                    )}
                  </div>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    value={email.email}
                    onChange={(e) => {
                      setEmail({
                        ...email,
                        email: e.target.value,
                        error: false,
                      });
                    }}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.labelAndErrorWrapper}>
                    <label htmlFor="name">Password*</label>
                  </div>
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
                      value={password.password}
                      onChange={(e) =>
                        setPassword({ ...password, password: e.target.value })
                      }
                      placeholder="Create a password"
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

                  <span
                    className={`${styles.passwordMustBe8} ${
                      password.password.length > 0 &&
                      password.password.length < 8 &&
                      styles.passwordError
                    }`}
                  >
                    Must be at least 8 characters.
                  </span>
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.labelAndErrorWrapper}>
                    <label htmlFor="accountType">Account type*</label>
                    {accountType.error && (
                      <span className={styles.error}>
                        {accountType.errorMessage}
                      </span>
                    )}
                  </div>

                  <div className={styles.accountTypeWrapper}>
                    <div>
                      <input
                        type="radio"
                        name="accountType"
                        id="jobSeeker"
                        className="secondary-custom-checkbox"
                        value={"jobSeeker"}
                        onChange={() =>
                          setAccountType({
                            ...accountType,
                            accountType: "jobSeeker",
                            error: false,
                          })
                        }
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
                        onChange={() =>
                          setAccountType({
                            ...accountType,
                            accountType: "employeer",
                            error: false,
                          })
                        }
                      />
                      <label htmlFor="employeer">Emplopyeer</label>
                    </div>
                  </div>
                </div>

                <div className={styles.cerateAccountBtnWrapper}>
                  <button
                    type="submit"
                    className="primaryBtn"
                    disabled={isLoading}
                  >
                    <span>Create account</span>
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
                  Already have an account?{" "}
                  <span
                    onClick={() => handleRedirectSignIn()}
                    className={styles.signUpLink}
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
