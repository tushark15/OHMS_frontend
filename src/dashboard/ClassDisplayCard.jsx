import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';

const ClassDisplayCard = (props) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await sendRequest(
          `http://localhost:3000/api/student/${props.schoolId}/${props.schoolClass.value}`
        );
        console.log(fetchedData);
        setStudents(fetchedData);
      } catch (err) {}
    };
    fetchData();
  }, [props.schoolId]);



    const handleClick = (schoolClassLabel) => {
        navigate(`/staff/school/dashboard/${props.schoolId}/${schoolClassLabel}`, {
        });
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
            <Card.Text>{`Total Students : ${students.length}`}</Card.Text>
            <Card.Text>
              {" "}
              Subjects : {props.visibleSubjects.join(", ")}
              {props.remainingSubjects > 0 && ` ... (+${props.remainingSubjects})`}
            </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default ClassDisplayCard