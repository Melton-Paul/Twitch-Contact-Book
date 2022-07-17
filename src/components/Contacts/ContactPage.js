import React from "react";
import NewContact from "./newContact/NewContact";
import ViewContacts from "./viewContacts/ViewContacts";
import Transition from "react-transition-group/Transition";

let firstIteration = true;

export default function ContactPage(props) {
  const [contactData, setContactData] = React.useState([]);
  const [showCreateContact, setShowCreateContact] = React.useState(false);

  function addData(data) {
    if (contactData.find((item) => item.id === data.id)) {
      setContactData((prev) => {
        return prev.map((item) => {
          return item.id === data.id ? data : item;
        });
      });
    } else {
      setContactData((prev) => [...prev, data]);
    }
  }

  function removeData(id) {
    setContactData((prev) => {
      return prev.filter((contact) => contact.id !== id);
    });
  }

  React.useEffect(() => {
    if (firstIteration) {
      return;
    }

    fetch(
      "https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json",
      { method: "PUT", body: JSON.stringify(contactData) }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error: Failed to send contact data - " + error);
      });
  }, [contactData]);

  React.useEffect(() => {
    firstIteration = false;
    fetch(
      "https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json/"
    )
      .then((res) => res.json())
      .then((data) => {
        for (let entry in data) {
          setContactData((prev) => [...prev, data[entry]]);
        }
      });
  }, []);

  return (
    <div className="container">
      <button onClick={() => setShowCreateContact((prev) => !prev)}>
        Create New Contact
      </button>
      {(showCreateContact || contactData.length === 0) && (
        <NewContact addData={addData} />
      )}
      <ViewContacts
        contactData={contactData || []}
        addData={addData}
        removeData={removeData}
      />
    </div>
  );
}
