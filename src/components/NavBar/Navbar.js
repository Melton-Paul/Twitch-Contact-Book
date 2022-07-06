import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbar__brand}>Twitch Contact Book</h1>
      <ul>
        <li>
          <a href="/">New Contact</a>
        </li>
        <li>
          <a href="/">View Contacts</a>
        </li>
        <li>
          <a href="/">Log In</a>
        </li>
      </ul>
    </div>
  );
}
