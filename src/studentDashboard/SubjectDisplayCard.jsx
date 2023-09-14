import React from "react";
import { Card } from "react-bootstrap";

const SubjectDisplayCard = (props) => {
  return (
    <Card
      style={{
        minWidth: "15em",
        maxWidth: "15em",
        maxHeight: "15em",
      }}
      className="shadow-lg rounded-3 border border-0 classCard"
    >
      <Card.Body>
        <Card.Title>{props.subject}</Card.Title>
        <Card.Text>{`Homework Available: `}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SubjectDisplayCard;
