import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useParams } from "react-router-dom";
import SubjectDisplayCard from "./SubjectDisplayCard";
import { useAuth } from "../hooks/auth-hook";
import { Spinner } from "react-bootstrap";

const StudentDashboard = () => {
  const { studentClass, studentId } = useParams();
  const [responseData, setResponseData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();

  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/student/${studentId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setResponseData(fetchedData);
    } catch (err) {}
  };

  const fetchSchoolData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/school/${
          responseData.schoolId
        }`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setSubjects(fetchedData.classSubjects[studentClass]);
      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [auth.token]);

  useEffect(() => {
    fetchSchoolData();
  }, [responseData]);

  if (isLoading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {error && <ErrorModal error={error} onClose={clearError} />}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (subjects.length > 0) {
    return (
      <div
        className="d-flex flex-row flex-wrap align-items-start gap-5"
        style={{
          marginTop: "12vh",
          marginLeft: "5vw",
          marginRight: "0",
        }}
      >
        {error && <ErrorModal error={error} onClose={clearError} />}

        {subjects.map((subject) => {
          return (
            <SubjectDisplayCard key={subject.value} subject={subject.label} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="d-flex flex-column align-items-center"
        style={{ height: "100vh", width: "100vw", marginTop: "12vh" }}
      >
        No Subjects Found
      </div>
    );
  }
};

export default StudentDashboard;
