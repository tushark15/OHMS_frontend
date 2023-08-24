import React, { useState } from "react";
import { Card, Image } from "react-bootstrap";
import AddIcon from "../../images/add.png";

const AddStudentCard = ({onClick}) => {
  return (
    <Card
      style={{ minWidth: "20vw", minHeight: "15vh" }}
      className="d-flex align-items-center justify-content-center shadow-lg rounded-3 border border-0"
      onClick={onClick}
    >
      <Card.Body>
        <Image
          src={AddIcon}
          rounded
          style={{ width: "4em", height: "4em", marginTop: "20%" }}
        />
      </Card.Body>
    </Card>
  );
};

export default AddStudentCard;
