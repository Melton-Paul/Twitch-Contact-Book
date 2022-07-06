import React from "react";
import styles from "./Contact.module.css";
import Card from "../../UI/Card/Card";

export default function Contact(props) {
  return (
    <Card className={styles.contact}>
      <span className={styles.delete}>X</span>
      <h3>{props.twitch.toUpperCase()}</h3>
      <p className={styles.role}>{props.role}</p>
      <div className={styles.info}>
        <p>Real Name: {props.name}</p>
        <p>Favorite Game: {props.game.toUpperCase()}</p>
        <p>Age: {props.age} years old</p>
      </div>
    </Card>
  );
}
