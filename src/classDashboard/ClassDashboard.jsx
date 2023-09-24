import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StudentForm from "../forms/student/StudentForm";
import AddStudentCard from "../student/components/AddStudentCard";
import StudentCard from "../student/components/StudentCard";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import { useAuth } from "../hooks/auth-hook";
import HomeworkForm from "../forms/homework/HomeworkForm";

const ClassDashboard = () => {
  const { schoolId, schoolClass } = useParams();
  const auth = useAuth();
  const [addStudent, setAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [currentClassSubjects, setCurrentClassSubjects] = useState({});
  const [classExists, setClassExists] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const { error, sendRequest, clearError } = useHttpClient();

  const fetchSchoolData = async () => {
    if (!auth.token) return;

    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/school/${schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setSchoolClasses(fetchedData.schoolClasses);
      setCurrentClassSubjects(fetchedData.classSubjects);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/student/${schoolId}/${schoolClass}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setStudents(fetchedData);
      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    fetchSchoolData();
    fetchData();
  }, [auth.token]);

  useEffect(() => {
    const staff = localStorage.getItem("currentUser");
    if (staff) {
      setCurrentStaff(JSON.parse(staff));
    }
  }, []);

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
    if (!auth.token) return;
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/student/${id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (err) {}
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h3>Loading...</h3>
      </div>
    );
  }

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
          <Alert variant="danger">This class doesn't exist</Alert>
        </div>
      )}
    </>
  );
};

export default ClassDashboard;
