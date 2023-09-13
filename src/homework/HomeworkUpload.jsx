import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileImage from "../assets/OIP.jpeg";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100px",
  height: "100px",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100px",
  height: "100px",
};

function HomeworkUpload(props) {
  const [files, setFiles] = useState([]);
  const [isSubjectSelected, setIsSubjectSelected] = useState(!props.isSubjectSelected);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "text/html": [".html", ".htm"],
      "application/msword": [".msword"],
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "text/plain": [".txt"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const fileType = file.type;
        console.log(`File name: ${file.name}, File type: ${fileType}`);
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        console.log(acceptedFiles)
      );
    },
  });

  useEffect(() => {
    if (props.selectedSubject) {
      setIsSubjectSelected(false);
    }
    else{
      setIsSubjectSelected(true);
    }
  }, [props.selectedSubject]);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      {file.type === "image/png" || file.type === "image/jpeg" ? (
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      ) : (
        <div style={thumbInner}>
          <img src={fileImage} />
        </div>
      )}
    </div>
  ));

  const handleFileSubmit = () => {
    if (files.length > 0) {
      console.log("files are submitted", files);
      setFiles([]);
    }
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: "dropzone d-flex justify-content-center p-5",
          style: { border: "2px dashed black", cursor: "pointer " },
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop Homework, or click to select Homework</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <Button onClick={handleFileSubmit} disabled={isSubjectSelected}>
        Submit
      </Button>
    </section>
  );
}

export default HomeworkUpload;
