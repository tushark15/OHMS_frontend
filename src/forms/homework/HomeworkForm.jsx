import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import HomeworkUpload from "../../homework/HomeworkUpload";
import { useFormik } from "formik";
import { homeworkSchema } from "../schemas";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";

const initialValues = {
  schoolClass: "",
  classSubject: "",
  uploadDate: "",
  dueDate: "",
  staffId: 0,
  homework: {},
  note: "",
  schoolId: 0,
};

const HomeworkForm = (props) => {
  const { schoolId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  const { error, sendRequest, clearError } = useHttpClient();

  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: homeworkSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          const responseData = await sendRequest(
            "http://localhost:3000/api/homework",
            "POST",
            JSON.stringify(values),
            {
              "Content-Type": "application/json",
            }
          );

          console.log("responseData", responseData);
        } catch (err) {}
        setFile(null)
        resetForm();
      },
    });

  values.schoolClass = props.schoolClass;
  values.staffId = props.currentStaff._id;
  values.schoolId = parseInt(schoolId);

  useEffect(() => {
    values.classSubject = selectedSubject;
    values.uploadDate = formattedDate;
  }, [selectedSubject, formattedDate]);

  useEffect(() => {
    values.homework = file;
  }, [file]);
  const recieveFile = (file) => {
    setFile(file);
  };

  const minAllowedDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return currentDate;
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <div style={{width: "90%"}}>
    <Form noValidate onSubmit={handleSubmit}>
      <HomeworkUpload
        sendFile={recieveFile}
        selectedSubject={selectedSubject}
      />
      <Row>
        <Form.Group as={Col} controlId="classSubject" className="mb-4">
          <Form.Label>Select Subject</Form.Label>
          <Form.Select
            style={{
              width: "100%",
            }}
            onChange={(e) => setSelectedSubject(e.target.value)}
            value={selectedSubject}
          >
            <option value="">Select Your subjects</option>
            {!props.currentStaff.isAdmin
              ? props.currentStaff.staffSubjects &&
                props.currentStaff.staffSubjects[props.schoolClass] &&
                props.currentStaff.staffSubjects[props.schoolClass].map(
                  (subject) => (
                    <option key={subject.label} value={subject.value}>
                      {subject.label}
                    </option>
                  )
                )
              : props.currentClassSubjects[props.schoolClass].map((subject) => (
                  <option key={subject.label} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="dueDate" className="mb-4">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Deadline"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.dueDate && !errors.dueDate}
            isInvalid={touched.dueDate && !!errors.dueDate}
            min={minAllowedDate().toISOString().split("T")[0]}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.dueDate}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="note" className="mb-4">
          <Form.Label>Student Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note"
            name="note"
            value={values.note}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.note && !errors.note}
            isInvalid={touched.note && !!errors.note}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.note}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
};

export default HomeworkForm;