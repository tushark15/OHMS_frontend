import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { staffLoginSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";

const initialValues = {
  staffEmail: "",
  staffPassword: "",
};

const StaffLoginForm = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
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
    validationSchema: staffLoginSchema,
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/staff/login",
          "POST",
          JSON.stringify(values),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.exisitingStaff, responseData.token)
        navigate(`/staff/school/dashboard/${responseData.exisitingStaff.schoolId}`);
        window.location.reload();
      } catch (err) {
        console.error(err)
      }
    },
  });

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {error && (
        <ErrorModal
          error={error}
          onClose={clearError}
          onClearError={resetForm}
        />
      )}
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
