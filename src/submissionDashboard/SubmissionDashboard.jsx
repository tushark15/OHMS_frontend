import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";
import SubmissionCard from "./SubmissionCard";

const SubmissionDashboard = () => {
  const { schoolId, schoolClass, studentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const auth = useAuth();
  const { error, sendRequest, clearError } = useHttpClient();
  const fetchSubmissions = async () => {
    if (!auth.token) return;
    try {
      const response = await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/submission/${studentId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setSubmissions(response);
    } catch (err) {}
  };
  useEffect(() => {
    fetchSubmissions();
  }, [auth.token]);
  submissions.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const todaySubmissions = submissions.filter((submission) =>
    isToday(new Date(submission.uploadDate))
  );

  const oldSubmissions = submissions.filter(
    (submission) => !isToday(new Date(submission.uploadDate))
  );

  return (
    <div
      className="d-flex flex-column align-items-center gap-3"
      style={{
        marginBottom: "10vh",
        width: "100vw",
        marginTop: "12vh",
        marginLeft: "15px",
      }}
    >
      <h2>Today's Submissions</h2>
      {todaySubmissions.length === 0 ? (
        <p>No submissions made today</p>
      ) : (
        todaySubmissions.map((submission) => (
          <SubmissionCard key={submission._id} submission={submission} />
        ))
      )}

      <h2>Old Submissions</h2>
      {oldSubmissions.length === 0 ? (
        <p>No old submissions</p>
      ) : (
        oldSubmissions.map((submission) => (
          <SubmissionCard key={submission._id} submission={submission} />
        ))
      )}
    </div>
  );
};

export default SubmissionDashboard;
