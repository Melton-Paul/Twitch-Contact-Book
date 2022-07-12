import React from "react";
import styles from "./Contact.module.css";
import Card from "../../UI/Card/Card";
import ContactForm from "../newContact/ContactForm";

export default function Contact(props) {
  const [contactData, setContactData] = React.useState({ ...props.data });
  const [isEditable, setIsEditable] = React.useState(false);

  function editInfo() {
    setIsEditable((prev) => !prev);
  }

  function deleteContact() {
    props.removeData(contactData.id);
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
              realName={contactData.realName}
              game={contactData.favoriteGame}
              age={contactData.age}
              twitchName={contactData.twitchName}
              role={contactData.role}
              addData={props.addData}
              id={contactData.id}
              editing={true}
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
            <h3>{contactData.twitchName.toUpperCase()}</h3>
            <p className={styles.role}>{contactData.role}</p>
            <div className={styles.info}>
              <p>Real Name: {contactData.realName}</p>
              <p>Favorite Game: {contactData.favoriteGame.toUpperCase()}</p>
              <p>Age: {contactData.age} years old</p>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
