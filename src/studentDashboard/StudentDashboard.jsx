import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useParams } from "react-router-dom";
import SubjectDisplayCard from "./SubjectDisplayCard";

const StudentDashboard = () => {
  const { studentClass, studentId } = useParams();
  const [responseData, setResponseData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/student/${studentId}`
        );
        setResponseData(fetchedData);
      } catch (err) {}
    };
    fetchData();
  }, [studentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/school/${responseData.schoolId}`
        );
        setSubjects(fetchedData.classSubjects[studentClass]);
      } catch (err) {}
    };
    fetchData();
  }, [responseData]);

  //   console.log(subjects)

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
