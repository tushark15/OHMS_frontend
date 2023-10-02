import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { capitalizeFirstLetter } from "../subjectDashboard/subjectDashboard";
import downloadIcon from "../images/download.png";
import { useAuth } from "../hooks/auth-hook";

const SubmissionCard = (props) => {
  const [downloadError, setDownloadError] = useState(null);
  const auth = useAuth();

  function formattedDate(dateObject) {
    if (dateObject === undefined) return;
    return dateObject.split("T")[0];
  }

  const handleSubmissionDownload = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/submission/download/${id}`,
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

      const fileName = props.submission.submission;

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
  return (
    <Card
      className="shadow-lg rounded-3 form-card border border-0 mb-2"
      style={{
        width: "90%",
        padding: "20px",
        height: "auto",
      }}
    >
      <Card.Title>
        {capitalizeFirstLetter(props.submission.classSubject)}
      </Card.Title>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-5">
          <Card.Text
            style={{
              fontSize: "1.2rem",
            }}
          >
            {formattedDate(props.submission.uploadDate)}
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
              handleSubmissionDownload(props.submission._id);
            }}
          >
            <img
              src={downloadIcon}
              alt="Download Icon"
              style={{ width: "100%", height: "100%" }}
            />
          </Button>
        </div>
      </Card.Body>
      <Card.Footer>{props.submission.note}</Card.Footer>
    </Card>
  );
};

export default SubmissionCard;
