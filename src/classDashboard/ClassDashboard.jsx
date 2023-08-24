import React, { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import StudentForm from "../forms/StudentForm";
import AddStudentCard from "../student/components/AddStudentCard";
import StudentCard from "../student/components/StudentCard";
import HomeworkUpload from "../homework/HomeworkUpload";

const ClassDashboard = () => {
  const { schoolClass } = useParams();
  const [addStudent, setAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);
  const location = useLocation();
  const currentClass = location.state?.currentClass || "";
  const currentClassSubjects = location.state?.currentClassSubjects || [];

  const handleAddStudent = () => {
    console.log(currentClass);
    setAddStudent(true);
  };

  const handleStudents = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setStudent(newStudent);
  };

  useEffect(() => {
    console.log("in class dashboard", students);
  }, [students]);

  return (
    <div
      className="d-flex flex-column align-items-start gap-5"
      style={{
        height: "100vh",
        width: "100vw",
        marginTop: "12vh",
        marginLeft: "15px",
      }}
    >
      <HomeworkUpload/>
      <div className="d-flex flex-row gap-4">
        {students.length === 0 ? (
          <Alert variant="danger">
            There are no students in the class. Add students
          </Alert>
        ) : (
          students.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))
        )}
        <AddStudentCard onClick={handleAddStudent} />
        <StudentForm
          show={addStudent}
          onHide={() => setAddStudent(false)}
          onStudentAdd={handleStudents}
          schoolclass={schoolClass}
        />
      </div>
    </div>
  );
};

export default ClassDashboard;
