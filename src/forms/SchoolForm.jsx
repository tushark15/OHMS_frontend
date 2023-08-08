import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import MultiSelect from "../components/MultiSelect";
import ClassAndSubject from "./ClassAndSubject";
export const classes = [
  { value: "Nursery", label: "Nursery" },
  { value: "KG", label: "KG" },
  { value: "LKG", label: "LKG" },
  { value: "UKG", label: "UKG" },
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "VI", label: "VI" },
  { value: "VII", label: "VII" },
  { value: "VIII", label: "VIII" },
  { value: "IX", label: "IX" },
  { value: "X", label: "X" },
  { value: "XI", label: "XI" },
  { value: "XII", label: "XII" },
];



const SchoolForm = () => {
  const [selectedClasses, setSelectedClasses] = useState(new Array());

  const handleClasses = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
  };
  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh", width: "100vw", marginTop: "12vh" }}
    >
      <Card
        style={{ width: "90%" }}
        className="d-flex flex-column justify-content-center align-items-center shadow-lg rounded-3 form-card border border-0 mb-5"
      >
        <Card.Body style={{ width: "90%" }} className="mt-2">
          <Card.Title className="mb-4">Add school details</Card.Title>
          <Form>
            <Form.Group as={Col} controlId="schoolName" className="mb-4">
              <Form.Label>School Name</Form.Label>
              <Form.Control type="text" placeholder="Enter School Name" name="schoolName" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schoolAddress">
              <Form.Label>School Address</Form.Label>
              <Form.Control placeholder="Enter Address" name="schoolAddress" />
            </Form.Group>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="contactNo">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control placeholder="Enter Contact Number" name="schoolContact" />
              </Form.Group>

              <Form.Group as={Col} controlId="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control placeholder="Enter Contact Email" name="schoolEmail" />
              </Form.Group>

              <Form.Group as={Col} controlId="emailSuffix">
                <Form.Label>Email Suffix</Form.Label>
                <Form.Control placeholder="Example: @dps.in" name="schoolEmailSuffix"/>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="classes">
                <Form.Label>Classes</Form.Label>
                <MultiSelect
                  defaultOptions={classes}
                  selectedValues={selectedClasses}
                  setSelectedValues={handleClasses}
                  name="schoolClasses"
                />
                <Form.Text id="classTaught" muted>
                  Add classes taught in the school
                </Form.Text>
              </Form.Group>
            </Row>

            <ClassAndSubject selectedClasses={selectedClasses} name="classSubjects" />
            <Button variant="primary" type="submit" className="mb-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SchoolForm;
