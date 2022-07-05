import React, { useCallback } from "react";
import Navbar from "./components/NavBar/Navbar";
import NewContact from "./components/newContact/NewContact";
import ViewContacts from "./components/viewContacts/ViewContacts";

export default function App(props) {
  const [contactData, setContactData] = React.useState([]);

  const getData = useCallback(() => {
    console.log("getData ran");
    fetch("https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => res.json())
      .then((data) => setContactData(data));
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Navbar />
      <NewContact getData={getData} />
      <ViewContacts contactData={contactData} />
    </div>
  );
}
