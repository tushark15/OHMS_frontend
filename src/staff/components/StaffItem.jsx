import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";

const StaffItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  const handleDeleteStaff = async (id) => {
    console.log(id);
    const responseData = await sendRequest(
      `http://localhost:3000/api/staff/${id}`,
      "DELETE"
    );
    props.onDelete(props.id);
    console.log(responseData);
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
