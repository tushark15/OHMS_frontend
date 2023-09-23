import React, { useEffect, useState } from "react";
import StaffItem from "./StaffItem";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";

const StaffList = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [responseData, setResponseData] = useState([]);
  const auth = useAuth();
  const fetchData = async () => {
    if (!auth.token) return;
    try {
      const fetchedData = await sendRequest(
        `http://localhost:3000/api/staff/${props.schoolId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setResponseData(fetchedData);
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, [props.staff, auth.token]);
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
