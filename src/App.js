import React from "react";
import Navbar from "./components/NavBar/Navbar";
import NewContact from "./components/newContact/NewContact";

export default function App(props) {
  return (
    <div>
      <Navbar />
      <NewContact />
    </div>
  );
}
