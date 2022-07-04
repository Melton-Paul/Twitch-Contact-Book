import React from "react";
import Card from "../UI/Card/Card";

export default function Contact(props) {
  return (
    <Card>
      <h3>{props.twitch}</h3>
      <p>{props.role}</p>
      <p>{props.name}</p>
      <p>{props.game}</p>
      <p>{props.age}</p>
    </Card>
  );
}
