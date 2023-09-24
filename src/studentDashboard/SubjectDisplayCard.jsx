import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../subjectDashboard/subjectDashboard";


const SubjectDisplayCard = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/student/dashboard/${props.subject}`);

  }
  return (
    <Card
      style={{
        minWidth: "15em",
        maxWidth: "15em",
        maxHeight: "15em",
      }}
      className="shadow-lg rounded-3 border border-0 classCard"
      onClick={handleClick}
    >
      <Card.Body>
        <Card.Title>{capitalizeFirstLetter(props.subject)}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SubjectDisplayCard;
