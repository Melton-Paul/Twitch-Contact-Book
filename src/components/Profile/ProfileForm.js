import styles from "./ProfileForm.module.css";
import UseInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const ProfileForm = (props) => {
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

  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    changeHandler: passwordConfirmChangeHandler,
    blurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmReset,
  } = UseInput((value) => value === passwordValue);

  function submitHandler(e) {
    e.preventDefault();
    if (!passwordIsValid || !passwordConfirmIsValid) {
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
        passwordConfirmReset();
        setstatusMessage("Password Successfully Changed");
      })
      .catch((err) => {
        setstatusMessage(err);
      });
  }

  return (
    <div className={styles["profile-module"]}>
      <Card className={styles.card}>
        <button
          className={styles.delete}
          onClick={() => props.setChangePassword(false)}
        >
          X
        </button>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <div className={styles["input-group"]}>
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
            <div>
              <label htmlFor="confirm-new-password">Confirm New Password</label>
              <input
                type="password"
                id="confirm-new-password"
                value={passwordConfirmValue}
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmBlurHandler}
                minLength="7"
              />
              {passwordConfirmHasError && <p>Passwords must match.</p>}
            </div>
          </div>
          <div className={styles.action}>
            <Button>Change Password</Button>
          </div>
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
