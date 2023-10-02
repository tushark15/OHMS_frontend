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

function FileUpload(props) {
  const [file, setFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(false);

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
        if (selectedFile.size > 5 * 1024 * 1024) {
          // 5MB limit
          setFileSizeError(true);
        } else {
          setFileSizeError(false);
          setFile(
            Object.assign(selectedFile, {
              preview: URL.createObjectURL(selectedFile),
            })
          );
          props.sendFile(selectedFile);
        }
      }
    },
  });

  useEffect(() => {
    if (file) {
      return () => URL.revokeObjectURL(file.preview);
    }
  }, [file]);

  return (
    <section className="container" style={{ width: "90%" }}>
      <div
        {...getRootProps({
          className: "dropzone d-flex justify-content-center p-5",
          style: { border: "2px dashed black", cursor: "pointer " },
        })}
      >
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop ${props.for}, or click to select ${props.for}`}</p>
      </div>
      {fileSizeError && (
        <div style={{
          color: "red",
        }}>
          File size exceeds the maximum allowed size (5MB).
        </div>
      )}
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

export default FileUpload;
