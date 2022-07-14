import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import styles from "./AuthForm.module.css";
import UseInput from "../../Hooks/use-input";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = UseInput((value) => value.includes("@") && value.includes(".com"));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = UseInput((value) => value.trim().length > 6);

  const formValid = emailIsValid && passwordIsValid;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function getErrorMessage() {
    if (error.includes("EMAIL_EXISTS")) {
      return "Email is already in use.";
    } else if (error.includes("WEAK_PASSOWRD")) {
      return "Password to weak, length needs to be greater than 6.";
    } else {
      return "Authentication Failed";
    }
  }

  function submitHandler(e) {
    if (!formValid) {
      return;
    }
    setError("");
    setLoading(true);
    e.preventDefault();

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqe4Ws1HFdIXTVS8UyBFE5WaUobzM8Q3M";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqe4Ws1HFdIXTVS8UyBFE5WaUobzM8Q3M";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        context.loginHandler(data.idToken, expirationTime.toISOString());
        passwordReset();
        emailReset();
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
            required
          />
          {emailHasError && (
            <p className={styles.invalid}>Please enter a valid email</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            id="password"
            required
          />
          {passwordHasError && (
            <p className={styles.invalid}>Please enter a valid password</p>
          )}
        </div>
        <div className={styles.actions}>
          {error && <p className={styles.invalid}>{getErrorMessage()}</p>}
          {!loading ? (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          ) : (
            <img
              className={styles.loading}
              src="loading1.gif"
              alt="loading icon"
            />
          )}
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
