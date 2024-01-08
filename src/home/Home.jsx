import React from "react";
import Card from "react-bootstrap/Card";
import student from "../images/student.jpg";
import teacher from "../images/teacher.jpg";
import "./Home.css";
const Home = () => {
  return (
    <div
      className="mainContainer gap-4"
    >
      <div className="cardDiv">
        <Card
          className="shadow-lg rounded-3 border border-0"
        >
          <Card.Body>
            <a
              className="text-decoration-none d-flex flex-column justify-content-center align-items-center"
              href="/student/login"
            >
              <Card.Img variant="top" src={student} />
              <h1 style={{ color: "black" }}>Student</h1>
            </a>
          </Card.Body>
        </Card>
      </div>
      <div className="cardDiv">
        <Card
          className="shadow-lg rounded-3 border border-0"
        >
          <Card.Body>
            <a
              className="text-decoration-none d-flex flex-column justify-content-center align-items-center"
              href="/staff/login"
            >
              <Card.Img variant="top" src={teacher} />
              <h1 style={{ color: "black" }}>Staff</h1>
            </a>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
