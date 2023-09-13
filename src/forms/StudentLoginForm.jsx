import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { studentLoginSchema } from "./schemas";

const initialValues = {
  studentId: 0,
  password: "",
};

const StaffLoginForm = (props) => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: studentLoginSchema,
      onSubmit: (values) => {
        console.log(values);
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
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="number"
                name="studentId"
                placeholder="Enter Student ID"
                required
                value={values.studentId}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentId && !errors.studentId}
                isInvalid={!!errors.studentId && touched.studentId}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentId}
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffLoginForm;
