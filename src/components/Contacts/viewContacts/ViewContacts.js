import React from "react";
import Contact from "./Contact";
import styles from "./ViewContacts.module.css";

export default function ViewContacts(props) {
  const dataHtml = [];
  for (const contact in props.contactData) {
    dataHtml.push(
      <Contact
        twitch={props.contactData[contact].twitchName}
        role={props.contactData[contact].role}
        age={props.contactData[contact].age}
        name={props.contactData[contact].realName}
        game={props.contactData[contact].favoriteGame}
        key={contact}
        id={contact}
      />
    );
  }
  return (
    <div>
      <h2 className={styles.title}>
        Contacts<span className={styles.line}></span>
      </h2>
      {dataHtml}
    </div>
  );
}
