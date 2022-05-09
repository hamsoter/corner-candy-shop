import { Icon } from "antd";
import Axios from "axios";
import React, { useCallback, useState } from "react";
import styles from "./FileUpload.module.css";
import { useFormik } from "formik";

import { useDropzone } from "react-dropzone";

function FileUpload({ refreshFunction }) {
  const [imageSrc, setImageSrc] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    let formData = new FormData();

    // Backend로 보내는 req 정보
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", acceptedFiles[0]);

    Axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        setImageSrc(res.data.filePath);
        refreshFunction(res.data.filePath);
      } else {
        alert("파일을 올리는데 실패했습니다.");
      }
    });
    setIsHovering(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteImg = () => {
    setImageSrc("");
    refreshFunction("");
  };

  return (
    <article className={styles.FileUpload}>
      <div className={styles.innerContents}>
        {/* 이미지 링크 없을시 */}
        {!imageSrc ? (
          <>
            <input name="thumbnail" {...getInputProps()} />
            <div className={styles.firstDragZone} {...getRootProps()}>
              {isDragActive ? (
                <p>이미지는 여기로 주세요!</p>
              ) : (
                <>
                  <Icon type="plus" className={styles.icon}></Icon>
                  <span>표지를 등록하세요!</span>
                </>
              )}
            </div>

            <div className={styles.btns}></div>
          </>
        ) : (
          // 이미지 링크가 있을 시
          <>
            <div
              className={styles.imgDragZone}
              onMouseEnter={() => {
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
              }}
            >
              <img
                className={styles.thumbnailImg}
                style={{}}
                src={`http://localhost:5000/${imageSrc}`}
                {...getRootProps()}
              ></img>

              {/* 파일을 드래그 했을시 */}
              {isDragActive ? (
                <>
                  <div
                    className={`${styles.overlay} ${styles.reDrag}`}
                    {...getRootProps()}
                  >
                    <p style={{ color: "white" }}>이미지는 여기로 주세요!</p>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* 이미지가 있고, 호버했을 시 */}
              {isHovering ? (
                <>
                  <div className={styles.hoverContainer} {...getRootProps()}>
                    <input name="thumbnail" {...getInputProps()} />
                    <div id="tlqkf" className={styles.overlay}></div>
                    {isDragActive ? (
                      <p>이미지는 여기로 주세요!</p>
                    ) : (
                      <div className={styles.hoverBox}>
                        <div className={styles.innerBtn}>
                          <Icon type="plus" className={styles.icon}></Icon>
                          <span>표지를 등록하세요!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.btns}>
              <button
                onClick={() => deleteImg()}
                className={styles.btn}
                style={{ display: "flex" }}
              >
                삭제
              </button>
              <button
                {...getRootProps()}
                className={styles.btn}
                style={{ display: "flex" }}
              >
                변경
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default FileUpload;
