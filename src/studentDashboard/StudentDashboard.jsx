import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useParams } from "react-router-dom";
import SubjectDisplayCard from "./SubjectDisplayCard";
import { useAuth } from "../hooks/auth-hook";

const StudentDashboard = () => {
  const { studentClass, studentId } = useParams();
  const [responseData, setResponseData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();

  const fetchData = async () => {
    if (!auth.token) return;
    try {
      console.log(auth.token);
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/student/${studentId}`,
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
        `http://localhost:3000/api/school/${responseData.schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setSubjects(fetchedData.classSubjects[studentClass]);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [auth.token]);

  useEffect(() => {
    fetchSchoolData();
  }, [responseData]);

  {
    if (subjects.length > 0) {
      return (
        <div
          className="d-flex flex-row flex-wrap align-items-start gap-5    "
          style={{
            marginTop: "12vh",
            marginLeft: "5vw",
            marginRight: "0",
          }}
        >
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
  }
};

export default StudentDashboard;
