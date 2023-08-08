import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import { staffSignupSchema } from "./schemas";
import {useNavigate} from "react-router-dom"
const initialValues = {
  name: "",
  email: "",
  password: "",
  schoolId: 0,
};

const StaffSignupForm = (props) => {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: staffSignupSchema,
      onSubmit: (values) => {
        navigate("/staff/school")
      },
    });
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{ width: "45vw", height: "auto" }}
        className=" "
      >
        <Card.Body className="mt-2">
          <Card.Title className="mb-4">Signup</Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="staffName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    required
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.email && touched.email}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="staffEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email && touched.email}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="staffPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password && touched.password}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  {
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  }
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="schoolId">
                  <Form.Label>School ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter School Id"
                    name="schoolId"
                    required
                    value={values.schoolId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.schoolId && !errors.schoolId}
                    isInvalid={!!errors.schoolId && touched.schoolId}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  {
                    <Form.Control.Feedback type="invalid">
                      {errors.schoolId}
                    </Form.Control.Feedback>
                  }
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            variant="primary"
            type="button"
            onClick={props.onFormSwitch}
            className="mt-2"
          >
            Change to Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffSignupForm;
