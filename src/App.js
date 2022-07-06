import React, { useCallback } from "react";
import Navbar from "./components/NavBar/Navbar";
import ContactPage from "./components/Contacts/ContactPage";

export default function App(props) {
  return (
    <div>
      <Navbar />
      <ContactPage />
    </div>
  );
}
