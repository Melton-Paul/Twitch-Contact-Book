import React from "react";
import ContactForm from "./ContactForm";
import Card from "../UI/Card/Card";
import styles from "./NewContact.module.css";

export default function NewContact(props) {
  return (
    <Card className={styles.NewContact}>
      <ContactForm />
    </Card>
  );
}
