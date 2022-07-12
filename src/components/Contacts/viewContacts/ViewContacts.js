import React from "react";
import Contact from "./Contact";
import styles from "./ViewContacts.module.css";

// <Contact data={props.contactData[contact]} key={contact} id={contact} />

export default function ViewContacts(props) {
  console.log(props);
  const dataHtml = props.contactData.map((contact) => (
    <Contact
      data={contact}
      key={contact.id}
      id={contact.id}
      addData={props.addData}
      removeData={props.removeData}
    />
  ));
  return (
    <div>
      <h2 className={styles.title}>
        {props.contactData.length > 0 ? "Contacts" : "No Contacts Yet!"}
        <span className={styles.line}></span>
      </h2>
      {dataHtml}
    </div>
  );
}
