import React from "react";
import { Card } from "react-bootstrap";

const StaffLoginDemo = () => {
  return (
    <Card
      style={{ width: "18rem", height: "auto", marginBottom: "2rem", marginTop: "2rem" }}
      className="shadow-lg rounded-3 form-card border border-0"
    >
      <Card.Body>
        <Card.Title>Staff Login Credentials (for demo)</Card.Title>
        <Card.Text>
          <strong>
            Staff Email:{" "}
            <span style={{ fontWeight: 500 }}>johndoe@gmail.com</span>
          </strong>
          <br />
          <strong>
            Password:{" "}
            <span style={{ fontWeight: 500 }}>12345678</span>
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StaffLoginDemo;
