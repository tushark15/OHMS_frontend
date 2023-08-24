import React from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import AddStaffCard from "../staff/components/AddStaffCard";

const MAX_SUBJECTS = 3;

const Dashboard = () => {
  const location = useLocation();
  const schoolClasses = location.state?.schoolClasses || [];
  const subjectsByClass = location.state?.subjectsByClass || [];
  const navigate = useNavigate();

  const handleClick = (schoolClass) => {
    navigate(`/staff/school/${schoolClass}`, {
      state: {
        currentClass: schoolClass,
        currentClassSubjects: subjectsByClass[schoolClass],
      },
    });
  };
  {
    if (schoolClasses.length > 0) {
      return (
        <div>
          <div className="d-flex flex-column align-items-center">
            <AddStaffCard schoolClasses={schoolClasses} subjectsByClass={subjectsByClass} />
          </div>
          <div
            className="d-flex flex-row flex-wrap align-items-start gap-5    "
            style={{
              height: "100vh",
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
                <Card
                  key={schoolClass.value}
                  style={{
                    minWidth: "15em",
                    maxWidth: "15em",
                    maxHeight: "15em",
                  }}
                  className="shadow-lg rounded-3 border border-0 classCard"
                  onClick={() => handleClick(schoolClass.label)}
                >
                  <Card.Body>
                    <Card.Title>{schoolClass.label}</Card.Title>
                    <Card.Text>{`Total Students : 0`}</Card.Text>
                    <Card.Text>{`Class Teachers : John`}</Card.Text>
                    <Card.Text>
                      {" "}
                      Subjects : {visibleSubjects.join(", ")}
                      {remainingSubjects > 0 && ` ... (+${remainingSubjects})`}
                    </Card.Text>
                  </Card.Body>
                </Card>
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
