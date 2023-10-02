import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";

const StaffItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth();

  const handleDeleteStaff = async (id) => {
    if (!auth.token) return;
    const responseData = await sendRequest(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/staff/${id}`,
      "DELETE",
      null,
      { Authorization: "Bearer " + auth.token }
    );
    props.onDelete(props.id);
  };
  return (
    <>
      {error && (
        <ErrorModal
          error={error}
          onClose={clearError}
          onClearError={resetForm}
        />
      )}
      <Card className="shadow-lg rounded-3 form-card border border-0 mb-5">
        <Card.Body className="d-flex flex-row gap-3">
          <Card.Title>{props.staffName}</Card.Title>
          <Card.Text>Email: {props.staffEmail}</Card.Text>
          <div className="flex-grow-1"></div>
          <Button
            className="align-self-end"
            onClick={() => handleDeleteStaff(props.id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default StaffItem;
