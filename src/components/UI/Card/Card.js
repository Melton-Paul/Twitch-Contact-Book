import React from "react";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={props.className + " " + styles.card}>{props.children}</div>
  );
}
