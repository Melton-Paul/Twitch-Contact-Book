import React from "react";
import styles from "./Contact.module.css";
import Card from "../../UI/Card/Card";
import ContactForm from "../newContact/ContactForm";

export default function Contact(props) {
  const [isEditable, setIsEditable] = React.useState(false);

  console.log(props);

  function editInfo() {
    setIsEditable((prev) => !prev);
  }

  function deleteContact() {
    props.removeData(props.data.id);
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
            <span className={styles.editContact} onClick={editInfo}>
              Edit
            </span>
            <span className={styles.delete} onClick={deleteContact}>
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
