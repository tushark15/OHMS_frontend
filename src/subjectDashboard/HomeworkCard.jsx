import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import downloadIcon from "../images/download.png";
import uploadIcon from "../images/upload.png";
import { capitalizeFirstLetter } from "./subjectDashboard";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";

const HomeworkCard = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();
  const [downloadError, setDownloadError] = useState(null); // Track download errors

  function formattedDate(dateObject) {
    if (dateObject === undefined) return;
    return dateObject.split("T")[0];
  }

  const handleDownload = async (id) => {
    try {
      const fetchedHomework = await sendRequest(
        `http://localhost:3000/api/homework/download/${id}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(fetchedHomework);
    } catch (err) {
      console.log(err);
      setDownloadError(err.message || "An error occurred during download.");
    }
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

  // Get the due date as a Date object
  const dueDate = new Date(props.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  // Calculate whether the due date has passed
  const dueDatePassed = dueDate < currentDate;

  // Calculate the class name based on the due date
  const getCardClassName = () => {
    if (dueDate < currentDate) {
      return "card-past-due"; // Due date has passed
    } else if (dueDate.getTime() === currentDate.getTime()) {
      return "card-today"; // Due date is today
    } else {
      return ""; // Due date is in the future
    }
  };

  const cardClassName = getCardClassName();

  return (
    <Card
      className={`shadow-lg rounded-3 classCard ${cardClassName}`}
      style={{
        width: "90%",
        padding: "10px",
        height: "auto",
        border:
          cardClassName === "card-past-due"
            ? "5px solid red"
            : cardClassName === "card-today"
            ? "5px solid yellow"
            : "",
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-5">
          <Card.Text
            style={{
              fontSize: "1.2rem",
            }}
          >
            Due: {formattedDate(props.dueDate)} | Uploaded:{" "}
            {formattedDate(props.uploadDate)}
          </Card.Text>
        </div>
        <div>
          <Button
            variant="success"
            style={{
              width: "50px",
              height: "45px",
              marginRight: "10px",
            }}
            onClick={() => {
              handleDownload(props.id); // Pass the homework's unique ID
            }}
          >
            <img
              src={downloadIcon}
              alt="Download Icon"
              style={{ width: "100%", height: "100%" }}
            />
          </Button>
          <Button
            variant="primary"
            style={{
              width: "50px",
              height: "45px",
            }}
            disabled={dueDatePassed}
          >
            <img
              src={uploadIcon}
              alt="Upload Icon"
              style={{ width: "100%", height: "100%" }}
            />
          </Button>
        </div>
      </Card.Body>
      <Card.Footer style={{ marginTop: "10px" }}>
        <Card.Text>{capitalizeFirstLetter(props.note)}</Card.Text>
      </Card.Footer>
      {downloadError && <p style={{ color: "red" }}>{downloadError}</p>}
    </Card>
  );
};

export default HomeworkCard;
