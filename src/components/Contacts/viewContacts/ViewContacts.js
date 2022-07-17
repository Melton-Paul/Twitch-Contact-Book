import React from "react";
import Contact from "./Contact";
import styles from "./ViewContacts.module.css";

export default function ViewContacts(props) {
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
        {props.contactData.length > 0 && (
          <>
            <h2>Contacts</h2>
            <span className={styles.line}></span>
          </>
        )}
      </h2>
      {dataHtml}
    </div>
  );
}
