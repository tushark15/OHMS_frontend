import React from "react";
import { Card } from "react-bootstrap";

const StudentCard = ({ student }) => {
  return (
    <Card className="shadow-lg rounded-3 border border-0">
      <Card.Body>
        <Card.Title>{student.studentName}</Card.Title>
        <Card.Text>Student ID: {student.studentId}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
