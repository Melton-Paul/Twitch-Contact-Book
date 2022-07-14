import classes from "./ProfileForm.module.css";
import UseInput from "../../Hooks/use-input";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";

const ProfileForm = () => {
  const context = useContext(AuthContext);
  const [statusMessage, setstatusMessage] = useState("");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = UseInput((value) => value.trim().length > 6);

  function submitHandler(e) {
    e.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqe4Ws1HFdIXTVS8UyBFE5WaUobzM8Q3M",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: context.token,
          password: passwordValue,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        passwordReset();
        setstatusMessage("Password Successfully Changed");
      })
      .catch((err) => {
        setstatusMessage(err);
      });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          minLength="7"
        />
        {passwordHasError && <p>Please enter a valid password</p>}
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default ProfileForm;
