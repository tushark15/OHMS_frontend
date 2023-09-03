import React from "react";

import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddStaffCard = (props) => {
  const navigate = useNavigate();

  const handleAddStaff = () => {
    navigate(`/staff/school/dashboard/${props.schoolId}/addStaff`, {
      state: {
        schoolClasses: props.schoolClasses,
        subjectsByClass: props.subjectsByClass,
        schoolId: props.schoolId,
      },
    });
  };
  return (
    <>
    
      <Card
        style={{ marginTop: "12vh", width: "90%" }}
        className="d-flex flex-row shadow-lg rounded-3 form-card border border-0 gap-5"
      >
        <Card.Body className="d-flex flex-row">
          <Card.Title>Add Staff</Card.Title>
          <div className="flex-grow-1"></div>
          <Button className="align-self-end" onClick={handleAddStaff}>
            Add staff
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddStaffCard;
