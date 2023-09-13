import React, { useEffect, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
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
  const auth = useAuth();
  const [addStudent, setAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [responseData, setResponseData] = useState(undefined);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
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
        console.log(fetchedData);
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

  const handleDelete = (index) => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };
  // useEffect(()=>{
  //   console.log(selectedSubject)
  // },[selectedSubject])

  return (
    <>
      {error && (
        <ErrorModal
          error={error}
          onClose={clearError}
          onClearError={resetForm}
        />
      )}
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
          <div>
            <Form.Select
              style={{
                width: "100%",
              }}
              onChange={(e) => setSelectedSubject(e.target.value)}
              value={selectedSubject}
            >
              <option value="">Select Your subjects</option>
              {!currentStaff.isAdmin
                ? currentStaff.staffSubjects &&
                  currentStaff.staffSubjects[schoolClass] &&
                  currentStaff.staffSubjects[schoolClass].map((subject) => (
                    <option key={subject.label} value={subject.value}>
                      {subject.label}
                    </option>
                  ))
                : currentClassSubjects[schoolClass].map((subject) => (
                    <option key={subject.label} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
            </Form.Select>
          </div>
          <HomeworkUpload selectedSubject={selectedSubject} />
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
            {auth.user.isAdmin && <AddStudentCard onClick={handleAddStudent} />}
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
