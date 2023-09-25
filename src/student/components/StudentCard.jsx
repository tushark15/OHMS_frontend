import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../../hooks/auth-hook";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student, onDelete }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleStudentClick = () => {
    navigate(`${student.studentId}`)
  }
  return (
    <Card className="shadow-lg rounded-3 border border-0" onClick={handleStudentClick}>
      <Card.Body>
        <Card.Title>{student.studentName}</Card.Title>
        <Card.Text>Student ID: {student.studentId}</Card.Text>
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
