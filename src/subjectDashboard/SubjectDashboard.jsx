import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";
import ErrorModal from "../components/ErrorModal";
import HomeworkCard from "./HomeworkCard";
import { Alert, Spinner } from "react-bootstrap";

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SubjectDashboard = () => {
  const { subject } = useParams();
  const formattedSubject = subject.replace(/ /g, '_');
  const auth = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const [currentClassSubjects, setCurrentClassSubjects] = useState([]);
  const [subjectExists, setSubjectExists] = useState(false);
  const [homework, setHomework] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const currentClass = auth.user.studentClass;

  const fetchSchoolData = async () => {
    if (!auth.token) return;

    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/school/${auth.user.schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setCurrentClassSubjects(fetchedData.classSubjects[currentClass]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHomework = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/homework/${auth.user.schoolId}/${currentClass}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setHomework(fetchedData);
      setIsLoading(false); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
    fetchHomework();
  }, [auth.token]);

  useEffect(() => {
    setSubjectExists(
      currentClassSubjects.some((eachSubject) => eachSubject.label === subject)
    );
  }, [currentClassSubjects]);

  const today = new Date().toLocaleDateString();
  const newHomework = homework.filter(
    (eachHomework) =>
      eachHomework.classSubject === formattedSubject &&
      new Date(eachHomework.uploadDate).toLocaleDateString() === today
  );

  newHomework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));


  const oldHomework = homework.filter(
    (eachHomework) =>
      eachHomework.classSubject === formattedSubject &&
      new Date(eachHomework.dueDate).toLocaleDateString() !== today &&
      new Date(eachHomework.uploadDate).toLocaleDateString() !== today
  );

  oldHomework.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            marginTop: "12vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        subjectExists && (
          <>
            <div
              className="d-flex flex-column align-items-center gap-3"
              style={{
                marginBottom: "10vh",
                width: "100vw",
                marginTop: "12vh",
                marginLeft: "15px",
              }}
            >
              <h2>{capitalizeFirstLetter(formattedSubject)}</h2>
              {error && <ErrorModal error={error} onClose={clearError} />}
              {newHomework.length > 0 && (
                <>
                  <h2>New Homework (Today)</h2>
                  {newHomework.map((eachHomework) => (
                    <HomeworkCard
                      key={eachHomework._id}
                      name={eachHomework.homework}
                      id={eachHomework._id}
                      subject={eachHomework.classSubject}
                      dueDate={eachHomework.dueDate}
                      note={eachHomework.note}
                      uploadDate={eachHomework.uploadDate}
                    />
                  ))}
                </>
              )}
              {oldHomework.length > 0 && (
                <>
                  <h2>Old Homework (Not Due Today)</h2>
                  {oldHomework.map((eachHomework) => (
                    <HomeworkCard
                      key={eachHomework._id}
                      id={eachHomework._id}
                      subject={eachHomework.classSubject}
                      dueDate={eachHomework.dueDate}
                      note={eachHomework.note}
                      uploadDate={eachHomework.uploadDate}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )
      )}
      {!subjectExists &&
        !isLoading &&
        !newHomework.length &&
        !oldHomework.length && (
          <div
            className="d-flex flex-row align-items-start justify-content-center gap-5"
            style={{
              height: "100vh",
              width: "100vw",
              marginTop: "12vh",
              marginLeft: "15px",
            }}
          >
            <Alert variant="danger">This subject doesn't exist</Alert>
          </div>
        )}
    </>
  );
};

export default SubjectDashboard;
