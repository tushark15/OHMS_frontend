import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";
import ErrorModal from "../components/ErrorModal";
import HomeworkCard from "./HomeworkCard";

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const subjectDashboard = () => {
  const { subject } = useParams();
  const auth = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const [responseData, setResponseData] = useState(undefined);
  const [currentClassSubjects, setCurrentClassSubjects] = useState([]);
  const [subjectExists, setSubjectExists] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [homework, setHomework] = useState([]);

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
      setResponseData(fetchedData);
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
      eachHomework.classSubject === subject &&
      new Date(eachHomework.uploadDate).toLocaleDateString() === today
  );

  const oldHomework = homework.filter(
    (eachHomework) =>
      eachHomework.classSubject === subject &&
      new Date(eachHomework.dueDate).toLocaleDateString() !== today &&
      new Date(eachHomework.uploadDate).toLocaleDateString() !== today
  );

  oldHomework.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  return (
    <>
      {subjectExists && (
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
            <h2>{capitalizeFirstLetter(subject)}</h2>
            {error && <ErrorModal error={error} onClose={clearError} />}
            {newHomework.length > 0 && (
              <>
                <h2>New Homework (Today)</h2>
                {newHomework.map((eachHomework) => (
                  <HomeworkCard
                    key={eachHomework._id}
                    id = {eachHomework._id}
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
                    id = {eachHomework._id}
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
      )}
    </>
  );
};

export default subjectDashboard;
