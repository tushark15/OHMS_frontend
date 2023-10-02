import React, { useEffect, useState } from "react";
import StaffItem from "./StaffItem";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";
import { Spinner } from "react-bootstrap";

const StaffList = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/staff/${props.schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setResponseData(fetchedData);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [props.staff, auth.token]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (responseData.length === 0) {
    return (
      <div>
        <h3>No Staff found. Maybe Create one?</h3>
      </div>
    );
  }
  return (
    <div style={{ marginleft: "12vh", width: "90%" }}>
      {error && <ErrorModal error={error} onClose={clearError} />}
      {responseData.map((staff) => (
        <StaffItem
          key={staff._id}
          id={staff._id}
          staffName={staff.staffName}
          staffEmail={staff.staffEmail}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
};

export default StaffList;
