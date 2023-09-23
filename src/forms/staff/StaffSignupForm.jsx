import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import { staffSignupSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";

const initialValues = {
  staffName: "",
  staffEmail: "",
  staffPassword: "",
  schoolId: 0,
  isAdmin: false,
};

const StaffSignupForm = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { error, sendRequest, clearError } = useHttpClient();
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: staffSignupSchema,
    onSubmit: async (values) => {
      const modifiedValues = {
        ...values,
        isAdmin: true,
      };
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/staff/signup",
          "POST",
          JSON.stringify(modifiedValues),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.createdStaffAdmin, responseData.token)
        navigate("/staff/school");
      } catch (err) {}
    },
  });
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {error && <ErrorModal error={error} onClose={clearError} onClearError={resetForm} />}
      <Card style={{ width: "45vw", height: "auto" }} className=" ">
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
                    name="staffName"
                    required
                    value={values.staffName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.staffName && !errors.staffName}
                    isInvalid={!!errors.staffName && touched.staffName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.staffName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="staffEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="staffEmail"
                    placeholder="Enter email"
                    required
                    value={values.staffEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.staffEmail && !errors.staffEmail}
                    isInvalid={!!errors.staffEmail && touched.staffEmail}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.staffEmail}
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
                    name="staffPassword"
                    placeholder="Password"
                    required
                    value={values.staffPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.staffPassword && !errors.staffPassword}
                    isInvalid={!!errors.staffPassword && touched.staffPassword}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  {
                    <Form.Control.Feedback type="invalid">
                      {errors.staffPassword}
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
