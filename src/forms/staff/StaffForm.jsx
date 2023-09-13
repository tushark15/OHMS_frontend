import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import MultiSelect from "../../components/MultiSelect";
import { useLocation, useParams } from "react-router-dom";
import ClassAndSubject from "../formComponents/ClassAndSubject";
import { useFormik } from "formik";
import { staffSchema } from "../schemas";
import { useHttpClient } from "../../hooks/http-hook";
import StaffList from "../../staff/components/StaffList";
import ErrorModal from "../../components/ErrorModal";

const initialValues = {
  staffName: "",
  staffEmail: "",
  staffPassword: "",
  schoolId: 0,
  staffClasses: [],
  staffSubjects: {},
  isAdmin: false,
};

const StaffForm = (props) => {
  const [selectedStaffClasses, setSelectedStaffClasses] = useState([]);
  const [selectedStaffSubjects, setSelectedStaffSubjects] = useState({});
  const [staff, setStaff] = useState([]);
  const [responseData, setResponseData] = useState(undefined);

  const { error, sendRequest, clearError } = useHttpClient();
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});
  const { schoolId } = useParams();

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
    onSubmit: async (values) => {
      const newStaff = {
        staffName: values.staffName,
        staffEmail: values.staffEmail,
        staffClasses: values.staffClasses,
        staffSubjects: values.staffSubjects,
        schoolId: schoolId,
        isAdmin: values.isAdmin,
      };
      const modifiedValues = {
        ...values,
        schoolId: schoolId,
      };
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/staff/addStaff",
          "POST",
          JSON.stringify(modifiedValues),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
      setStaff((prevStaff) => [...prevStaff, newStaff]);
      setSelectedStaffClasses([]);
      setSelectedStaffSubjects({});
      resetForm();
      console.log({ values });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/school/${schoolId}`
        );
        setResponseData(fetchedData);
        setSchoolClasses(fetchedData.schoolClasses);
        setSubjectsByClass(fetchedData.classSubjects);
      } catch (err) {
        // Handle errors if necessary
      }
    };
    fetchData();
  }, [schoolId]);

  const handleStaffClasses = (selectedOptions) => {
    setValues({ ...values, staffClasses: selectedOptions });
  };

  const handleStaffSubjects = (staffClass, selectedOptions) => {
    setSelectedStaffSubjects((prevSelected) => ({
      ...prevSelected,
      [staffClass]: selectedOptions,
    }));
  };

  const handleDeleteStaff = (deleteStaffId) => {
    console.log(staff);
    setStaff((prevStaff) =>
      prevStaff.filter((staff) => staff.id !== deleteStaffId)
    );
  };

  useEffect(() => {
    setValues({ ...values, staffSubjects: selectedStaffSubjects });
  }, [selectedStaffSubjects]);

  return (
    <div className="d-flex flex-column align-items-center ">
      <Card
        style={{ marginTop: "12vh", width: "90%" }}
        className="shadow-lg rounded-3 form-card border border-0 mb-5"
      >
        {error && (
          <ErrorModal
            error={error}
            onClose={clearError}
            onClearError={resetForm}
          />
        )}
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
                  selectedValues={values.staffClasses}
                  setSelectedValues={handleStaffClasses}
                  name="staffClasses"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.staffClasses}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="Is Admin?"
                value={values.isAdmin}
                onChange={handleChange}
              />
            </Form.Group>
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
      <StaffList
        staff={staff}
        onDelete={handleDeleteStaff}
        schoolId={schoolId}
      />
    </div>
  );
};

export default StaffForm;
