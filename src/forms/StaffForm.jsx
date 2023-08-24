import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import MultiSelect from "../components/MultiSelect";
import { useLocation } from "react-router-dom";
import ClassAndSubject from "./ClassAndSubject";
import { useFormik } from "formik";
import { staffSchema } from "./schemas";

const initialValues = {
  staffName: "",
  staffEmail: "",
  staffPassword: "",
  schoolId: 0,
  staffClasses: [],
  staffSubjects: {},
};

const StaffForm = (props) => {
  const [selectedStaffClasses, setSelectedStaffClasses] = useState([]);
  const [selectedStaffSubjects, setSelectedStaffSubjects] = useState({});
  const [staff, setStaff] = useState([]);

  const location = useLocation();
  const schoolClasses = location.state?.schoolClasses || [];
  const subjectsByClass = location.state?.subjectsByClass || {};
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: staffSchema,
    onSubmit: (values) => {
      const newStaff = {
        staffName: values.staffName,
        staffEmail: values.staffEmail,
        staffClasses: values.staffClasses,
        staffSubjects: values.staffSubjects,
      };
      setStaff((prevStaff) => [...prevStaff, newStaff]);
      setSelectedStaffClasses([]);
      setSelectedStaffSubjects({});
      resetForm();
    },
  });
  const handleStaffClasses = (selectedOptions) => {
    setValues({ ...values, staffClasses: selectedOptions });
  };

  const handleStaffSubjects = (staffClass, selectedOptions) => {
    setSelectedStaffSubjects((prevSelected) => ({
      ...prevSelected,
      [staffClass]: selectedOptions,
    }));
  };

  // const handleDeleteStaff =() =>{
  //   setStaff((prevStaff) => prevStaff.filter((staff) => staff.id!== staff.id));
  // }

  const handleDeleteStaff = (index) => {
    setStaff((prevStaff) => prevStaff.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setValues({ ...values, staffSubjects: selectedStaffSubjects });
  }, [selectedStaffSubjects]);

  useEffect(() => {
    console.log(staff);
  }, [staff]);
  return (
    <div className="d-flex flex-column align-items-center ">
      <Card
        style={{ marginTop: "12vh", width: "90%" }}
        className="shadow-lg rounded-3 form-card border border-0 mb-5"
      >
        <Card.Body>
          <Card.Title>Teacher Form</Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} controlId="staffName" className="mb-4">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="staffName"
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
              <Form.Group as={Col} controlId="staffEmail" className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="staffEmail"
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
            </Row>
            <Row>
              <Form.Group as={Col} controlId="staffPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="staffPassword"
                  value={values.staffPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.staffPassword && !errors.staffPassword}
                  isInvalid={!!errors.staffPassword && touched.staffPassword}
                />
                <Form.Text className="text-muted">
                  Provide the password to the teacher for login purposes.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.staffPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="staffClasses" className="mb-4">
                <Form.Label>Staff Classes</Form.Label>
                <MultiSelect
                  defaultOptions={schoolClasses}
                  selectedValues={selectedStaffClasses}
                  setSelectedValues={handleStaffClasses}
                  name="staffClasses"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.staffClasses}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4 d-flex flex-column justify-content-center align-items-center ">
              {values.staffClasses &&
                values.staffClasses.map((staffClass, index) => {
                  const CLASS = staffClass.value;
                  return (
                    <Form.Group controlId="staffClasses" key={index}>
                      <Form.Label>{CLASS}</Form.Label>
                      <MultiSelect
                        defaultOptions={subjectsByClass[CLASS]}
                        selectedValues={selectedStaffSubjects[CLASS] || []}
                        setSelectedValues={(selectedOptions) =>
                          handleStaffSubjects(CLASS, selectedOptions)
                        }
                      />
                    </Form.Group>
                  );
                })}
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {staff.map((staff, index) => {
        return (
          <Card
            key={index}
            style={{ width: "90%" }}
            className="shadow-lg rounded-3 form-card border border-0 mb-5"
          >
            <Card.Body className="d-flex flex-row">
              <Card.Title>{staff.staffName}</Card.Title>
              <Card.Text>Email: {staff.staffEmail}</Card.Text>
              <div className="flex-grow-1"></div>
              <Button
                className="align-self-end"
                onClick={() => handleDeleteStaff(index)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default StaffForm;
