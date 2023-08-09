import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import MultiSelect from "../components/MultiSelect";

export const subjects = [
  { value: "mathematics", label: "mathematics" },
  { value: "science", label: "science" },
  { value: "english", label: "english" },
  { value: "history", label: "history" },
  { value: "geography", label: "geography" },
  { value: "computer_science", label: "computer science" },
  { value: "physical_education", label: "physical education" },
  { value: "music", label: "music" },
  { value: "art", label: "art" },
  { value: "languages", label: "languages" },
];

const ClassAndSubject = ({ selectedClasses, name }) => {
  const [selectedSubjectsByClass, setSelectedSubjectsByClass] = useState({});

  const handleSubjects = (selectedClass, selectedOptions) => {
    setSelectedSubjectsByClass((prevSelected) => ({
      ...prevSelected,
      [selectedClass.value]: selectedOptions,
    }));
  };

  useEffect(() => {
    console.log(selectedSubjectsByClass);
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
              name={name}
              style={{ width: "20vw" }}
            />
          </Form.Group>
        </Row>
      ))}
    </>
  );
};

export default ClassAndSubject;
