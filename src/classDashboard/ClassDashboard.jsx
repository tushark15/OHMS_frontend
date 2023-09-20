import React, { useEffect, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import StudentForm from "../forms/student/StudentForm";
import AddStudentCard from "../student/components/AddStudentCard";
import StudentCard from "../student/components/StudentCard";
import HomeworkUpload from "../homework/HomeworkUpload";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import { classes } from "../forms/school/SchoolForm";
import { useAuth } from "../hooks/auth-hook";
import HomeworkForm from "../forms/homework/HomeworkForm";

const ClassDashboard = () => {
  const { schoolId, schoolClass } = useParams();
  const auth = useAuth();
  const [addStudent, setAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [responseData, setResponseData] = useState(undefined);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [currentClassSubjects, setCurrentClassSubjects] = useState({});
  const [classExists, setClassExists] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({});

  const { error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/school/${schoolId}`
        );
        setResponseData(fetchedData);
        setSchoolClasses(fetchedData.schoolClasses);
        setCurrentClassSubjects(fetchedData.classSubjects);
      } catch (err) {}
    };
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/student/${schoolId}/${schoolClass}`
        );
        setStudents(fetchedData);
      } catch (err) {}
    };
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    const staff = localStorage.getItem("currentUser");
    if (staff) {
      setCurrentStaff(JSON.parse(staff));
    }
  }, []);

  useEffect(() => {
    if (currentStaff.staffSubjects && currentStaff.staffSubjects[schoolClass]) {
      console.log(currentStaff.staffSubjects[schoolClass]);
    }
  }, [currentStaff, schoolClass]);

  const handleAddStudent = () => {
    setAddStudent(true);
  };

  const handleStudents = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  useEffect(() => {
    setClassExists(
      schoolClasses.some((eachClass) => eachClass.label === schoolClass)
    );
  }, [schoolClasses]);

  const handleDelete = async (index, id) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/student/${id}`,
        "DELETE"
      );
    } catch (err) {}
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };

  return (
    <>
      {classExists && (
        <>
        <div
          className="d-flex flex-column align-items-center gap-5"
          style={{
            marginBottom: "10vh",
            width: "100vw",
            marginTop: "12vh",
            marginLeft: "15px",
          }}
        >
          {error && <ErrorModal error={error} onClose={clearError} />}
          <HomeworkForm
            currentStaff={currentStaff}
            schoolClass={schoolClass}
            currentClassSubjects={currentClassSubjects}
          />
          </div>
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
                  onDelete={() => handleDelete(index, student._id)}
                />
              ))
            )}
            {auth.user.isAdmin && <AddStudentCard onClick={handleAddStudent} />}
            <StudentForm
              show={addStudent}
              onHide={() => setAddStudent(false)}
              onStudentAdd={handleStudents}
              schoolclass={schoolClass}
              schoolId={schoolId}
            />
          </div>
        
        </>
      )}
      {!classExists && (
        <div
          className="d-flex flex-row align-items-start justify-content-center gap-5"
          style={{
            height: "100vh",
            width: "100vw",
            marginTop: "12vh",
            marginLeft: "15px",
          }}
        >
          <Alert variant="danger">This class doesn't Exists</Alert>
        </div>
      )}
    </>
  );
};

export default ClassDashboard;
