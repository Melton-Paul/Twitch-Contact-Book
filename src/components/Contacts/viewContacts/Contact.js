import React from "react";
import styles from "./Contact.module.css";
import Card from "../../UI/Card/Card";
import ContactForm from "../newContact/ContactForm";

export default function Contact(props) {
  const [isEditable, setIsEditable] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  console.log(props);

  function editInfo() {
    setIsEditable((prev) => !prev);
  }

  function deleteContact() {
    props.removeData(props.data.id);
  }
  function askToDelete() {
    setDeleting(true);
  }

  return (
    <>
      <Card className={styles.contact}>
        {isEditable ? (
          <>
            <span className={styles.editContact} onClick={editInfo}>
              Stop Editing
            </span>
            <ContactForm
              realName={props.data.realName}
              game={props.data.favoriteGame}
              age={props.data.age}
              twitchName={props.data.twitchName}
              role={props.data.role}
              addData={props.addData}
              id={props.data.id}
              editing={true}
              save={editInfo}
            />
          </>
        ) : (
          <>
            {deleting && (
              <div className={styles["delete-module"]}>
                <h2>Are you sure you want to delete this contact?</h2>
                <p>This action cannot be reversed</p>
                <div className={styles["button-container"]}>
                  <button onClick={deleteContact}>Yes</button>
                  <button
                    onClick={() => {
                      setDeleting(false);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            <span className={styles.editContact} onClick={editInfo}>
              Edit
            </span>
            <span className={styles.delete} onClick={askToDelete}>
              X
            </span>
            <h3>{props.data.twitchName.toUpperCase()}</h3>
            <p className={styles.role}>{props.data.role}</p>
            <div className={styles.info}>
              <p>Real Name: {props.data.realName}</p>
              <p>Favorite Game: {props.data.favoriteGame.toUpperCase()}</p>
              <p>Age: {props.data.age} years old</p>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
