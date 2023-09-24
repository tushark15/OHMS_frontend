import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";

const ClassDisplayCard = (props) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();

  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/student/${props.schoolId}/${props.schoolClass.value}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setStudents(fetchedData);
      setIsLoading(false); 
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [auth.token]);

  const handleClick = (schoolClassLabel) => {
    navigate(`/staff/school/dashboard/${props.schoolId}/${schoolClassLabel}`);
  };

  return (
    <Card
      key={props.schoolClass.value}
      style={{
        minWidth: "15em",
        maxWidth: "15em",
        maxHeight: "15em",
      }}
      className="shadow-lg rounded-3 border border-0 classCard"
      onClick={() => handleClick(props.schoolClass.label)}
    >
      <Card.Body>
        <Card.Title>{props.schoolClass.label}</Card.Title>
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <Card.Text>{`Total Students : ${students.length}`}</Card.Text>
        )}
        <Card.Text>
          Subjects : {props.visibleSubjects.join(", ")}
          {props.remainingSubjects > 0 && ` ... (+${props.remainingSubjects})`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ClassDisplayCard;
