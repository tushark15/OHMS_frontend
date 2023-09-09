import React, { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import StudentForm from "../forms/StudentForm";
import AddStudentCard from "../student/components/AddStudentCard";
import StudentCard from "../student/components/StudentCard";
import HomeworkUpload from "../homework/HomeworkUpload";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import { classes } from "../forms/SchoolForm";
import { useAuth } from "../hooks/auth-hook";

const ClassDashboard = () => {
  const { schoolId, schoolClass } = useParams();
  const { isAdmin } = useAuth();
  const [addStudent, setAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [responseData, setResponseData] = useState(undefined);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [classExists, setClassExists] = useState(false);

  const { error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  const currentClass = location.state?.currentClass || "";
  const currentClassSubjects = location.state?.currentClassSubjects || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/school/${schoolId}`
        );
        setResponseData(fetchedData);
        setSchoolClasses(fetchedData.schoolClasses);
      } catch (err) {
        // Handle errors if necessary
      }
    };
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/student/${schoolId}/${schoolClass}`
        );
        console.log(fetchedData);
        setStudents(fetchedData);
      } catch (err) {
        // Handle errors if necessary
      }
    };
    fetchData();
  }, [schoolId]);

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
    setClassExists(
      schoolClasses.some((eachClass) => eachClass.label === schoolClass)
    );
  }, [schoolClasses]);

  // console.log("Class exists: ", classExists);
  // useEffect(() => {
  //   const savedStudents = localStorage.getItem("students");
  //   // console.log("Retrieved students from localStorage:", savedStudents);
  //   if (savedStudents) {
  //     setStudents(JSON.parse(savedStudents));
  //   }
  // }, []);

  // Save students to localStorage whenever the students state changes
  // useEffect(() => {
  //   if (students.length > 0) {
  //     // console.log("Saving students to localStorage:", students);
  //     localStorage.setItem("students", JSON.stringify(students));
  //   }
  // }, [students]);

  const handleDelete = (index) => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };

  return (
    <>
      {classExists && (
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
                <StudentCard
                  key={index}
                  student={student}
                  onDelete={() => handleDelete(index)}
                />
              ))
            )}
            {isAdmin && <AddStudentCard onClick={handleAddStudent} />}
            <StudentForm
              show={addStudent}
              onHide={() => setAddStudent(false)}
              onStudentAdd={handleStudents}
              schoolclass={schoolClass}
              schoolId={schoolId}
            />
          </div>
        </div>
      )}
      {!classExists && (
        <div
          className="d-flex flex-column align-items-start gap-5"
          style={{
            height: "100vh",
            width: "100vw",
            marginTop: "12vh",
            marginLeft: "15px",
          }}
        >
          <h1>This class doesn't Exists</h1>
        </div>
      )}
    </>
  );
};

export default ClassDashboard;
