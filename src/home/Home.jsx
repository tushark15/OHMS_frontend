import React from "react";
import Card from "react-bootstrap/Card";
import student from "../images/student.jpg";
import teacher from "../images/teacher.jpg";
const Home = () => {
  return (
    <div
      className="d-flex flex-row justify-content-center  align-items-center gap-5"
      style={{ height: "100vh" }}
    >
      <div style={{ height: "auto" }}>
        <Card
          style={{ width: "25vw", height: "auto" }}
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
      <div style={{ height: "auto", marginLeft: "10rem" }}>
        <Card
          style={{ width: "25vw", height: "auto" }}
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
