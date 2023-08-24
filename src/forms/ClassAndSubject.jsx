import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import MultiSelect from "../components/MultiSelect";
import { initialValues } from "./SchoolForm";


const ClassAndSubject = ({
  selectedClasses,
  name,
  touched,
  errors,
  setValues,
  values,
  subjects
}) => {
  const [selectedSubjectsByClass, setSelectedSubjectsByClass] = useState({});

  const handleSubjects = (selectedClass, selectedOptions) => {
    setSelectedSubjectsByClass((prevSelected) => ({
      ...prevSelected,
      [selectedClass.value]: selectedOptions,
    }));
  };

  useEffect(() => {
    console.log(selectedSubjectsByClass);
    setValues({ ...values, classSubjects: selectedSubjectsByClass });
  }, [selectedSubjectsByClass]);

  return (
    <>
      <h4>Add subjects for each Class</h4>
      {selectedClasses.map((selectedClass) => (
        <Row key={selectedClass.value} className="m-4">
          <Form.Group
            as={Col}
            controlId={`subjects-${selectedClass.value}`}
            className="d-flex flex-row justify-content-start"
            style={{ gap: "40vw", marginLeft: "5vw" }}
            name={name}
          >
            <div style={{ width: "8vw" }}>
              <p>{selectedClass.label} Subjects</p>
            </div>
            <MultiSelect
              defaultOptions={subjects}
              selectedValues={
                selectedSubjectsByClass[selectedClass.value] || []
              }
              setSelectedValues={(selectedOptions) =>
                handleSubjects(selectedClass, selectedOptions)
              }
              name="subjectsByClass"
              style={{ width: "20vw" }}
              touched={touched}
              errors={errors}
            />
          </Form.Group>
        </Row>
      ))}
    </>
  );
};

export default ClassAndSubject;
