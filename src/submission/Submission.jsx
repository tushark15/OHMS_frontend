import React, { useState } from "react";
import SubmissionForm from "../forms/submission/SubmissionForm";

const Submission = (props) => {

  const handleSubmission = () => {};
  return (
    <SubmissionForm
      show={props.show}
      onHide={() => props.setSubmissionForm(false)}
      onSubmit={handleSubmission}
      homeworkid={props.homeworkId}
    />
  );
};

export default Submission;
