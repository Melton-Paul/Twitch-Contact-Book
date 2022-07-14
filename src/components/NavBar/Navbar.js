import { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";

export default function Navbar(props) {
  const context = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbar__brand}>
        <NavLink to="/">Twitch Contact Book</NavLink>
      </h1>
      <ul>
        {context.isLoggedIn ? (
          <>
            <li>
              <NavLink to="/">New Contact</NavLink>
            </li>
            <li>
              <NavLink to="/profile">View Profile</NavLink>
            </li>
            <li>
              <Button onClick={context.logoutHandler}>Log Out</Button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">
              <Button>Log In</Button>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
