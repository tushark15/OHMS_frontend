import React from "react";
import { Card } from "react-bootstrap";

const about = () => {
  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh", width: "100vw", marginTop: "12vh" }}
    >
      <Card
        style={{ width: "80%" }}
        className="d-flex flex-column align-items-center shadow-lg rounded-3 form-card border border-0 mb-5"
      >
        <Card.Title>About us</Card.Title>
        <Card.Body>
          Welcome to the Online Homework Management System (OHMS), a project
          born out of passion and dedication by a single individual, me! My name
          is Tushar, and I am thrilled to introduce you to this innovative
          platform designed to simplify the way students and educators manage
          homework in a school setting.
        </Card.Body>
        <Card.Title>Our Story</Card.Title>
        <Card.Body>
          OHMS started as a personal endeavor during my college years. I was
          determined to create a solution that would streamline the homework
          management process, making it easier for both students and teachers to
          stay organized, track assignments, and collaborate seamlessly. What
          began as a simple idea has now evolved into a fully functional and
          user-friendly online tool.
        </Card.Body>
        <Card.Title>Our Mission</Card.Title>
        <Card.Body>
          At OHMS, our mission is clear: to empower students and educators by
          providing a robust, efficient, and intuitive homework management
          system. We understand the challenges of juggling multiple assignments,
          deadlines, and coursework, and we're committed to making academic life
          more manageable.
        </Card.Body>
        <Card.Title>What Sets Us Apart</Card.Title>
        <Card.Body>
          While there are many homework management systems out there, OHMS
          stands out for several reasons:
          <ul>
            <li>
              User-Centric Design: OHMS is designed with the end-users in mind.
              It offers a clean, intuitive interface that's easy to navigate,
              even for those who may not be tech-savvy.
            </li>{" "}
            <li>
              Customization: We recognize that every student and teacher has
              unique needs. OHMS allows users to customize their profiles and
              settings to match their preferences and requirements.
            </li>{" "}
            <li>
              Efficiency: Say goodbye to lost assignments or missed deadlines.
              OHMS offers a centralized platform for students and educators to
              submit, and track assignments efficiently.
            </li>
            <li>
              Accessibility: Whether you're on a computer or mobile device, OHMS
              is accessible from anywhere with an internet connection, making it
              convenient for users on the go.
            </li>
          </ul>
        </Card.Body>
        <Card.Title>Our Vision for the Future</Card.Title>
        <Card.Body>
          As a one-person project, I am committed to continually improving OHMS.
          My vision for the future includes expanding the features and
          functionalities of the system, integrating more tools for learning,
          and ensuring OHMS remains a valuable asset for educational
          institutions of all sizes.
        </Card.Body>
      </Card>
    </div>
  );
};

export default about;
