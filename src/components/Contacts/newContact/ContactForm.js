import React from "react";
import styles from "./ContactForm.module.css";
import Button from "../../UI/Button/Button";
import { v4 as uuidv4 } from "uuid";

export default function ContactForm(props) {
  const [formData, setFormData] = React.useState({
    twitchName: props.twitchName || "",
    nameTouched: false,
    role: props.role || "Viewer",
    roleTouched: false,
    realName: props.realName || "",
    favoriteGame: props.game || "",
    age: props.age || 13,
    submitted: false,
    id: props.id || uuidv4(),
  });

  const twitchNameValid = formData.twitchName.trim().length !== 0;
  const formValid = twitchNameValid ? true : false;

  function handleSubmit() {
    setFormData((prev) => ({
      ...prev,
      nameTouched: true,
      roleTouched: true,
      submitted: true,
    }));
    if (!formValid) {
      return;
    }

    props.addData(formData);

    if (!props.editing) {
      setFormData({
        twitchName: "",
        nameTouched: false,
        role: "Viewer",
        roleTouched: false,
        realName: "",
        favoriteGame: "",
        age: 13,
        submitted: false,
        id: uuidv4(),
      });
    }
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

  function save() {
    handleSubmit();
    props.save();
  }

  return (
    <>
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
          <select
            name="role"
            id="roleInput"
            onChange={changeHandler}
            onBlur={blurHandler}
            value={formData.role}
          >
            <option value="Viewer">Viewer</option>
            <option value="Streamer">Streamer</option>
          </select>
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
        {!formValid && formData.submitted && (
          <p className="invalid">Please fix issues above.</p>
        )}
      </form>
      {props.editing ? (
        <Button onClick={save}>Save</Button>
      ) : (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
    </>
  );
}
