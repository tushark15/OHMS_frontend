import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import FileUpload from "../../homework/FileUpload";
import { useAuth } from "../../hooks/auth-hook";
import { useFormik } from "formik";
import { submissionSchema } from "../schemas";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";

const initialValues = {
  schoolClass: "",
  classSubject: "",
  uploadDate: "",
  studentId: 0,
  submission: null,
  note: "",
  schoolId: 0,
  homeworkId: "",
};

const SubmissionForm = (props) => {
  const [file, setFile] = useState(null);
  const { subject } = useParams();
  const auth = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  const formData = new FormData();

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
    validationSchema: submissionSchema,
    onSubmit: async (values) => {
      console.log(values);
      formData.append("submission", values.submission);
      formData.append("schoolClass", values.schoolClass);
      formData.append("classSubject", values.classSubject);
      formData.append("uploadDate", values.uploadDate);
      formData.append("studentId", values.studentId);
      formData.append("homeworkId", values.homeworkId);
      formData.append("note", values.note);
      formData.append("schoolId", values.schoolId);
      if (!auth.token) return;
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/submission`,
          "POST",
          formData,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setFile(null);
        resetForm();
        props.onHide();
      } catch (err) {
        console.log(err);
      }
    },
  });

  values.homeworkId = props.homeworkid;
  values.schoolClass = auth.user.studentClass;
  values.studentId = auth.user.studentId;
  values.schoolId = auth.user.schoolId;
  values.classSubject = subject;
  values.uploadDate = formattedDate;

  useEffect(() => {
    values.submission = file;
  }, [file]);
  const recieveFile = (file) => {
    setFile(file);
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
        <Modal.Title id="submission_form">Submit response</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <ErrorModal
            error={error}
            onClose={clearError}
            onClearError={resetForm}
          />
        )}
        <Form noValidate onSubmit={handleSubmit}>
          <FileUpload sendFile={recieveFile} for="Response" />

          <Row>
            <Form.Group as={Col} controlId="note" className="mb-4">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Note"
                as="textarea"
                name="note"
                value={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.note && !errors.note}
                isInvalid={touched.note && !!errors.note}
              />
              <Form.Control.Feedback type="invalid">
                {errors.note}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SubmissionForm;
