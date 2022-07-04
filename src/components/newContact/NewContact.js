import React from "react";
import ContactForm from "./ContactForm";
import Card from "../UI/Card/Card";
import styles from "./NewContact.module.css";

export default function NewContact(props) {
  return (
    <>
      <h2 className={styles.title}>
        Create Contact <span className={styles.line}></span>{" "}
      </h2>
      <Card className={styles.NewContact}>
        <ContactForm />
      </Card>
    </>
  );
}
