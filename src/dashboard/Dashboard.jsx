import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dashboard.css";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import ClassDisplayCard from "./ClassDisplayCard";
import { useAuth } from "../hooks/auth-hook";

const MAX_SUBJECTS = 3;

const Dashboard = () => {
  const [currentStaff, setCurrentStaff] = useState({});
  const [responseData, setResponseData] = useState(undefined);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});

  const { schoolId } = useParams();

  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();
  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/school/${schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setResponseData(fetchedData);
      setSchoolClasses(fetchedData.schoolClasses);
      setSubjectsByClass(fetchedData.classSubjects);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [ auth.user]);

  useEffect(() => {
    const staff = localStorage.getItem("currentUser");
    if (staff) {
      setCurrentStaff(JSON.parse(staff));
    }
  }, []);

  {
    if (schoolClasses.length > 0) {
      return (
        <div style={{ marginTop: "12vh" }}>
          {error && <ErrorModal error={error} onClose={clearError} />}
          <div
            className="d-flex flex-row flex-wrap align-items-start gap-5    "
            style={{
              marginTop: "12vh",
              marginLeft: "5vw",
              marginRight: "0",
            }}
          >
            {schoolClasses.map((schoolClass) => {
              const classSubjects = subjectsByClass[schoolClass.value].map(
                (subject) => subject.label
              );
              const visibleSubjects = classSubjects.slice(0, MAX_SUBJECTS);
              const remainingSubjects = classSubjects.length - MAX_SUBJECTS;

              return (
                <ClassDisplayCard
                  key={schoolClass.value}
                  schoolClass={schoolClass}
                  visibleSubjects={visibleSubjects}
                  remainingSubjects={remainingSubjects}
                  schoolId={schoolId}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="d-flex flex-column align-items-center"
          style={{ height: "100vh", width: "100vw", marginTop: "12vh" }}
        >
          No Classes Found
        </div>
      );
    }
  }
};

export default Dashboard;
