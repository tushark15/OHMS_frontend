import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { staffLoginSchema } from "./schemas";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  isAdmin: false,
};

const StaffLoginForm = (props) => {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: staffLoginSchema,
      onSubmit: (values) => {
        navigate("/staff/school");
      },
    });

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{ width: "45vw", height: "auto" }}
        className="shadow-lg rounded-3 form-card border border-0"
      >
        <Card.Body className="mt-2">
          <Card.Title className="mb-4">Login</Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="Is Admin?"
                value={values.isAdmin}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            variant="primary"
            type="button"
            className="mt-2"
            onClick={props.onFormSwitch}
          >
            Change to Signup
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffLoginForm;
