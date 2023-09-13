import { useFormik } from "formik";
import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { studentSchema } from "../schemas";
import { useHttpClient } from "../../hooks/http-hook";
import { useAuth } from "../../hooks/auth-hook";

const initialValues = {
  studentName: "",
  studentId: 0,
  studentEmail: "",
  studentContact: 0,
  studentAddress: "",
  studentDOB: "",
  studentClass: "",
  schoolId: 0,
};

const studentForm = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();
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
    validationSchema: studentSchema,
    onSubmit: async (values) => {
      console.log(values.studentDOB);
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/student",
          "POST",
          JSON.stringify(values),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
      props.onStudentAdd(values);
      props.onHide();
      resetForm();
    },
  });

  values.studentClass = props.schoolclass;
  values.schoolId = props.schoolId;

  const maxAllowedDOB = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 3);
    return currentDate;
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="student_form"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="student_form">Student Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="studentName" className="mb-4">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student Name"
                name="studentName"
                value={values.studentName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentName && !errors.studentName}
                isInvalid={touched.studentName && !!errors.studentName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="studentId" className="mb-4">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Student ID"
                name="studentId"
                value={values.studentId}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentId && !errors.studentId}
                isInvalid={touched.studentId && !!errors.studentId}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="studentEmail" className="mb-4">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student Email"
                name="studentEmail"
                value={values.studentEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentEmail && !errors.studentEmail}
                isInvalid={touched.studentEmail && !!errors.studentEmail}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentEmail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="studentDOB" className="mb-4">
              <Form.Label>Student BirthDate</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Student BirthDate"
                name="studentDOB"
                value={values.studentDOB}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentDOB && !errors.studentDOB}
                isInvalid={touched.studentDOB && !!errors.studentDOB}
                max={maxAllowedDOB().toISOString().split("T")[0]}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentDOB}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="studentContact" className="mb-4">
              <Form.Label>Student Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Student Contact No."
                name="studentContact"
                value={values.studentContact}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentContact && !errors.studentContact}
                isInvalid={touched.studentContact && !!errors.studentContact}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentContact}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="studentAddress" className="mb-4">
              <Form.Label>Student Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student Address"
                as="textarea"
                name="studentAddress"
                value={values.studentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.studentAddress && !errors.studentAddress}
                isInvalid={touched.studentAddress && !!errors.studentAddress}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.studentAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Add Student</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default studentForm;
