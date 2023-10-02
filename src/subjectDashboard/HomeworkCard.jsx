import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import downloadIcon from "../images/download.png";
import uploadIcon from "../images/upload.png";
import { capitalizeFirstLetter } from "./SubjectDashboard";
import { useAuth } from "../hooks/auth-hook";
import Submission from "../submission/Submission";

const HomeworkCard = (props) => {
  const auth = useAuth();
  const [downloadError, setDownloadError] = useState(null);
  const [submissionForm, setSubmissionForm] = useState(false);

  function formattedDate(dateObject) {
    if (dateObject === undefined) return;
    return dateObject.split("T")[0];
  }

  const handleDownload = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/homework/download/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      if (!response.ok) {
        console.error("Download failed. Response status:", response.status);
        throw new Error("Download failed.");
      }

      const fileName = props.name;

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
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
    <>
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
              onClick={() => {
                setSubmissionForm(true);
              }}
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
      {submissionForm && (
        <Submission
          show={submissionForm}
          setSubmissionForm={setSubmissionForm}
          homeworkId={props.id}
        />
      )}
    </>
  );
};

export default HomeworkCard;
