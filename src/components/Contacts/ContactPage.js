import React from "react";
import NewContact from "./newContact/NewContact";
import ViewContacts from "./viewContacts/ViewContacts";

export default function ContactPage(props) {
  const [contactData, setContactData] = React.useState([]);

  const getData = () => {
    console.log("getData ran");
    fetch("https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => res.json())
      .then((data) => setContactData(data));
  };

  function addNewContact(data) {
    setContactData((prev) => ({ ...prev, data }));
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <NewContact addNewContact={addNewContact} getData={getData} />
      <ViewContacts contactData={contactData} />
      <button onClick={getData}>GET DATA</button>
    </div>
  );
}
