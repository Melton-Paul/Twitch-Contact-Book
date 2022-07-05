import React from "react";
import Card from "../UI/Card/Card";

export default function Contact(props) {
  return (
    <Card>
      <h3>{props.twitch.toUpperCase()}</h3>
      <p>{props.role}</p>
      <p>Real Name: {props.name}</p>
      <p>Favorite Game: {props.game.toUpperCase()}</p>
      <p>{props.age} years old</p>
    </Card>
  );
}
