import React from "react";
import Contact from "./Contact";

export default function ViewContacts(props) {
  const dataHtml = [];
  for (const contact in props.contactData) {
    dataHtml.push(
      <Contact
        twitch={props.contactData[contact].twitchName}
        role={props.contactData[contact].role}
        age={props.contactData[contact].age}
        name={props.contactData[contact].realName}
        game={props.contactData[contact].favoriteGame}
        key={contact}
        id={contact}
      />
    );
  }
  return <div>{dataHtml}</div>;
}
