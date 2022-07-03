import React from "react";
import styles from "./ContactForm.module.css";
import Button from "../UI/Button/Button";

export default function ContactForm(props) {
  const [formData, setFormData] = React.useState({
    twitchName: "",
    nameTouched: false,
    role: "",
    roleTouched: false,
    realName: "",
    favoriteGame: "",
    age: null,
    submitted: false,
  });

  const twitchNameValid = formData.twitchName.trim().length !== 0;
  const roleValid = formData.role.trim().length !== 0;
  const formValid = twitchNameValid && roleValid ? true : false;

  function handleSubmit(e) {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      nameTouched: true,
      roleTouched: true,
      submitted: true,
    }));
    if (formData.twitchName.trim().length === 0) {
      return;
    }

    fetch(
      "https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json",
      { method: "POST", body: JSON.stringify(formData) }
    );

    setFormData({
      twitchName: "",
      nameTouched: false,
      role: "",
      roleTouched: false,
      realName: "",
      favoriteGame: "",
      age: null,
      submitted: false,
    });
  }
  function changeHandler(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function blurHandler(e) {
    const { name } = e.target;
    if (name === "twitchName") {
      setFormData((prev) => ({ ...prev, nameTouched: true }));
    } else {
      setFormData((prev) => ({ ...prev, roleTouched: true }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div className={styles["contactForm-input__group"]}>
        <label htmlFor="twitchnameInput">Twitch Name:</label>
        <input
          type="text"
          name="twitchName"
          onChange={changeHandler}
          id="twitchnameInput"
          value={formData.twitchName}
          placeholder="Twitch Name"
          onBlur={blurHandler}
        />
        {formData.nameTouched && !twitchNameValid && (
          <p className={styles.invalid}>Twitch name can not be empty.</p>
        )}
      </div>
      <div className={styles["contactForm-input__group"]}>
        <label htmlFor="roleInput">Role (Viewer, Streamer, ect.):</label>
        <input
          type="text"
          name="role"
          onChange={changeHandler}
          id="roleInput"
          value={formData.role}
          placeholder="Role"
          onBlur={blurHandler}
        />
        {formData.roleTouched && !roleValid && (
          <p className={styles.invalid}>Role can not be empty.</p>
        )}
      </div>
      <div>
        <label htmlFor="realnameInput">Real Name:</label>
        <input
          type="text"
          name="realName"
          onChange={changeHandler}
          id="realnameInput"
          value={formData.realName}
          placeholder="Real Name"
        />
      </div>
      <div>
        <label htmlFor="favoritegameInput">Favorite Game: </label>
        <input
          type="text"
          name="favoriteGame"
          onChange={changeHandler}
          id="favoritegameInput"
          value={formData.favoriteGame}
          placeholder="Game"
        />
      </div>
      <div>
        <label htmlFor="ageInput">Age: </label>
        <input
          type="number"
          name="age"
          min="13"
          max="99"
          step="1"
          onChange={changeHandler}
          id="ageInput"
          value={formData.age}
          placeholder=">13"
        />
      </div>
      <Button>Submit</Button>
      {!formValid && formData.submitted && (
        <p className="invalid">Please fix issues above.</p>
      )}
    </form>
  );
}
