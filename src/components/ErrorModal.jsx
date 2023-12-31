import React from "react";
import { Alert} from "react-bootstrap";

const ErrorModal = (props) => {
  const handleClose = () => {
    props.onClose(); // Clear the error
    props.onClearError(); // Reset the form
  };

  return (
    <Alert variant="danger" onClose={handleClose} dismissible>
      <Alert.Heading>{props.error}</Alert.Heading>
    </Alert>
  );
};

export default ErrorModal;
