import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileImage from "../assets/OIP.jpeg";

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
  const [file, setFile] = useState(null);
  const [isSubjectSelected, setIsSubjectSelected] = useState(
    !props.isSubjectSelected
  );

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
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        const fileType = selectedFile.type;
        console.log(`File name: ${selectedFile.name}, File type: ${fileType}`);
        setFile(
          Object.assign(selectedFile, {
            preview: URL.createObjectURL(selectedFile),
          })
        );
        props.sendFile(selectedFile)
      }
    },
  });
  console.log(file)

  useEffect(() => {
    if (props.selectedSubject) {
      setIsSubjectSelected(false);
    } else {
      setIsSubjectSelected(true);
    }
  }, [props.selectedSubject]);

  const handleFileSubmit = () => {
    if (file) {
      console.log("File is submitted", file);
      setFile(null);
    }
  };

  useEffect(() => {
    if (file) {
      return () => URL.revokeObjectURL(file.preview);
    }
  }, [file]);





  return (
    <section className="container" style={{width:"90%"}}>
      <div
        {...getRootProps({
          className: "dropzone d-flex justify-content-center p-5",
          style: { border: "2px dashed black", cursor: "pointer " },
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop Homework, or click to select Homework</p>
      </div>
      {file && (
        <div style={thumb}>
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
              <img src={fileImage} alt="File" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default HomeworkUpload;
