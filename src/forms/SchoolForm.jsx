import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import MultiSelect from "../components/MultiSelect";
import ClassAndSubject from "./ClassAndSubject";
import { useFormik } from "formik";
import { schoolSchema } from "./schemas";
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

const initialValues = {
  schoolName: "",
  schoolAddress: "",
  schoolContact: 0,
  schoolEmail: "",
  schoolEmailSuffix: "",
  schoolClasses: [],
  classSubjects: [],
};

const SchoolForm = () => {
  const [selectedClasses, setSelectedClasses] = useState(new Array());
  const [areClassesSelected, setAreClassesSelected] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schoolSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const handleClasses = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
    setAreClassesSelected(true);
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
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="schoolName" className="mb-4">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter School Name"
                name="schoolName"
                value={values.schoolName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.schoolName && !errors.schoolName}
                isInvalid={!!errors.schoolName && touched.schoolName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.schoolName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="schoolAddress">
              <Form.Label>School Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Address"
                name="schoolAddress"
                value={values.schoolAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.schoolAddress && !errors.schoolAddress}
                isInvalid={!!errors.schoolAddress && touched.schoolAddress}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.schoolAddress}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="contactNo">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  placeholder="Enter Contact Number"
                  name="schoolContact"
                  value={values.schoolContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.schoolContact && !errors.schoolContact}
                  isInvalid={!!errors.schoolContact && touched.schoolContact}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.schoolContact}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  placeholder="Enter Contact Email"
                  name="schoolEmail"
                  value={values.schoolEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.schoolEmail && !errors.schoolEmail}
                  isInvalid={!!errors.schoolEmail && touched.schoolEmail}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.schoolEmail}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="emailSuffix">
                <Form.Label>Email Suffix</Form.Label>
                <Form.Control
                  placeholder="Example: @dps.in"
                  name="schoolEmailSuffix"
                  value={values.schoolEmailSuffix}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.schoolEmailSuffix && !errors.schoolEmailSuffix
                  }
                  isInvalid={
                    !!errors.schoolEmailSuffix && touched.schoolEmailSuffix
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.schoolEmailSuffix}
                </Form.Control.Feedback>
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
                  touched={touched.schoolClasses}
                  errors={errors.schoolClasses}
                />
                <Form.Text id="classTaught" muted>
                  Add classes taught in the school
                </Form.Text>
                {touched.schoolClasses && errors.schoolClasses && (
                  <div className="text-danger">{errors.schoolClasses}</div>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-4 d-flex flex-column justify-content-center align-items-center ">
              {areClassesSelected && selectedClasses.length != 0 && (
                <ClassAndSubject
                  selectedClasses={selectedClasses}
                  name="classSubjects"
                />
              )}
            </Row>
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
