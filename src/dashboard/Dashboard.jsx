import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dashboard.css";
import AddStaffCard from "../staff/components/AddStaffCard";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import ClassDisplayCard from "./ClassDisplayCard";
import { useAuth } from "../hooks/auth-hook";

const MAX_SUBJECTS = 3;

const Dashboard = () => {
  const [currentStaff, setCurrentStaff] = useState({});
  const [responseData, setResponseData] = useState(undefined);
  const [classesToDisplay, setClassesToDisplay] = useState([]);
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});

  const { schoolId } = useParams();

  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/school/${schoolId}`
        );
        setResponseData(fetchedData);
        setSchoolClasses(fetchedData.schoolClasses);
        setSubjectsByClass(fetchedData.classSubjects);
      } catch (err) {
        // Handle errors if necessary
      }
    };
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    const staff = localStorage.getItem("currentUser");
    if (staff) {
      setCurrentStaff(JSON.parse(staff));
    }
  }, []);

  const isAdmin = currentStaff.isAdmin;

  // useEffect(() => {
  //   if (isAdmin) {
  //     // If admin, show all school classes
  //     setClassesToDisplay(schoolClasses);
  //   } else {
  //     // If not admin, filter classes for the current staff
  //     const staffClasses = schoolClasses.filter((schoolClass) => {
  //       // console.log(...currentStaff.staffClasses.map((staffClass) =>{
  //       //   return staffClass.value === schoolClass.value
  //       // }))
  //       return currentStaff.staffClasses.map((staffClass) =>{
  //         return staffClass.value === schoolClass.value
  //       });
  //     });
  //     console.log(staffClasses)
  //     setClassesToDisplay(staffClasses);
  //   }
  // }, [schoolClasses, currentStaff, isAdmin])

  {
    if (schoolClasses.length > 0) {
      return (
        <div>
          {error && (
            <ErrorModal
              error={error}
              onClose={clearError}
              onClearError={resetForm}
            />
          )}

          <div className="d-flex flex-column align-items-center">
            {auth.user.isAdmin && (
              <AddStaffCard
                schoolClasses={schoolClasses}
                subjectsByClass={subjectsByClass}
                schoolId={schoolId}
              />
            )}
          </div>
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
