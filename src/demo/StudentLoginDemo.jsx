import React from "react";
import { Card } from "react-bootstrap";

const StudentLoginDemo = () => {
  return (
    <Card
      style={{ width: "18rem", height: "auto", marginBottom: "2rem"}}
      className="shadow-lg rounded-3 form-card border border-0"
    >
      <Card.Body>
        <Card.Title>Student Login Credentials ( for demo )</Card.Title>
        <Card.Text>
          <strong>
            Student Id:{" "}
            <span style={{ fontWeight: 500 }}>222233334444</span>
          </strong>
          <br />
          <strong>
            Password:{" "}
            <span style={{ fontWeight: 500 }}>11111111</span>
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentLoginDemo;
