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
  const location = useLocation();
  const currentClass = location.state?.currentClass || "";
  const currentClassSubjects = location.state?.currentClassSubjects || [];

  const handleAddStudent = () => {
    setAddStudent(true);
  };

  const handleStudents = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  // useEffect(() => {
  //   console.log("in class dashboard", students);
  // }, [students]);

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    console.log("Retrieved students from localStorage:", savedStudents);
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save students to localStorage whenever the students state changes
  useEffect(() => {
    if (students.length > 0) {
      console.log("Saving students to localStorage:", students);
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  const handleDelete =(index) => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i!== index));
  }

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
      <HomeworkUpload />
      <div className="d-flex flex-row gap-4">
        {students.length === 0 ? (
          <Alert variant="danger">
            There are no students in the class. Add students!
          </Alert>
        ) : (
          students.map((student, index) => (
            <StudentCard key={index} student={student} onDelete={()=>handleDelete(index)} />
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
