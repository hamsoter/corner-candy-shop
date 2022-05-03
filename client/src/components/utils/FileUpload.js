import { Icon } from "antd";
import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

function FileUpload() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{ display: "flex", justifyContent: "space-beetwen" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div
        style={{
          width: "300px",
          height: "240px",
          border: "1px solid lightgray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDragActive ? (
          <p>이미지는 여기로 주세요!</p>
        ) : (
          <>
            <Icon type="plus" style={{ fontSize: "3rem" }}></Icon>
            <span>표지를 등록하세요!</span>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
