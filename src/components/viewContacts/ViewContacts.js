import React, { useCallback } from "react";
import Contact from "./Contact";

export default function ViewContacts(props) {
  const [contactData, setContactData] = React.useState({});

  const getData = useCallback(() => {
    fetch("https://contactbook-759bd-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => res.json())
      .then((data) => setContactData(data));
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  console.log(contactData);
  const dataHtml = [];
  for (const contact in contactData) {
    dataHtml.push(
      <Contact
        twitch={contactData[contact].twitchName}
        role={contactData[contact].role}
        age={contactData[contact].age}
        name={contactData[contact].realName}
      />
    );
  }
  return <div>{dataHtml}</div>;
}
