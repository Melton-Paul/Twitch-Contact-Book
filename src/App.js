import React from "react";
import Navbar from "./components/NavBar/Navbar";
import NewContact from "./components/newContact/NewContact";
import ViewContacts from "./components/viewContacts/ViewContacts";

export default function App(props) {
  return (
    <div>
      <Navbar />
      <NewContact />
      <ViewContacts />
    </div>
  );
}
