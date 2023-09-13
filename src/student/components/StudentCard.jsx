import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../../hooks/auth-hook";

const StudentCard = ({ student, onDelete }) => {
  const auth = useAuth();
  return (
    <Card className="shadow-lg rounded-3 border border-0">
      <Card.Body>
        <Card.Title>{student.studentName}</Card.Title>
        <Card.Text>Student ID: {student.studentId}</Card.Text>
        <p>Submitted: </p>
        {auth.user.isAdmin && <Button
          variant="danger"
          onClick={onDelete}
        >
          Delete
        </Button>}
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
