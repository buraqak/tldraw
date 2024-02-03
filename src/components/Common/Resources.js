import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js";

const Resources = (props) => {
  var dataToBeDisplayed = "";
  const { width, height } = useWindowDimensions();

  const [numPages, setNumPages] = useState(null);

  const [source, setSource] = useState(props.src);

  const [pageNumber, setPageNumber] = useState(1);

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,

      height,
    };
  }
  if (props.type == "images") {
    var imagesData = [];
    if (props.src && props.src.length > 0) {
      imagesData = props.src.map((item) => ({
        key: item.src,
        original: item.src,
        thumbnail: item.src,
        originalAlt: item.altText,
        originalTitle: item.title,
        thumbnailAlt: item.altText,
        thumbnailTitle: item.title,
        originalAlt: item.altText,
        originalTitle: item.title,
      }));
    }
    dataToBeDisplayed = (
      <>
        <div style={{ height: "75%" }}>
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={true}
            useBrowserFullscreen={true}
            items={imagesData}
          />
        </div>
      </>
    );
  } else if (props.type == "video") {
    dataToBeDisplayed = (
      <iframe
        className="video-frame1"
        src={source}
        webkitallowfullscreen={"true"}
        mozallowfullscreen={"true"}
        allowFullScreen={true}
      ></iframe>
    );
  } else if (props.type == "pdf") {
    var pdfSource = props.src;
    dataToBeDisplayed = (
      <div>
        {width > 400 ? (
          <object
            type="application/pdf"
            width="100%"
            height="750"
            data={pdfSource}
          ></object>
        ) : (
          <div>
            <Document file={pdfSource} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}{" "}
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        )}
      </div>
    );
  }

  const playturnOff = () => {
    if (props.type == "video") {
      setSource(null);
    }
    if (props.type == "video") {
      setSource(props.src + "&random=" + Math.random().toString());
    }
  };
  var svgIconHtml = "";

  if (props.type == "video") {
    svgIconHtml = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M15.4085 11.2243L11.5877 9.02401C11.3642 8.89526 11.1109 8.8273 10.853 8.82698C10.0379 8.82583 9.37631 9.48565 9.37516 10.3007V14.6993C9.37198 15.2258 9.65319 15.7131 10.1106 15.9739C10.3354 16.1052 10.5909 16.1747 10.8512 16.1753C11.1102 16.1741 11.3644 16.1054 11.5887 15.9759L15.4085 13.7756C15.6334 13.6461 15.8202 13.4594 15.9497 13.2344C16.3553 12.5299 16.113 11.63 15.4085 11.2243ZM14.8877 12.8723L11.069 15.0726C10.9342 15.1517 10.7673 15.1517 10.6326 15.0726C10.4981 14.9966 10.4156 14.8536 10.4169 14.6993V10.3007C10.4156 10.1463 10.4981 10.0033 10.6326 9.92733C10.6999 9.88893 10.7758 9.86826 10.8533 9.86731C10.929 9.86756 11.0031 9.88829 11.0679 9.92733L14.8877 12.1276C14.9549 12.1658 15.0104 12.2213 15.0485 12.2884C15.1654 12.494 15.0934 12.7554 14.8877 12.8723ZM19.7918 4.16663H5.2085C3.48336 4.16853 2.0854 5.56649 2.0835 7.29163V17.7083C2.0854 19.4334 3.48336 20.8314 5.2085 20.8333H19.7918C21.517 20.8314 22.9149 19.4334 22.9168 17.7083V7.29163C22.9149 5.56649 21.517 4.16853 19.7918 4.16663ZM21.8752 17.7083C21.8737 18.8583 20.9418 19.7902 19.7918 19.7916H5.2085C4.05849 19.7902 3.12663 18.8583 3.12516 17.7083V7.29163C3.12663 6.14162 4.05849 5.20975 5.2085 5.20829H19.7918C20.9418 5.20975 21.8737 6.14162 21.8752 7.29163V17.7083Z"
          fill="black"
        />
      </svg>
    );
  } else if (props.type == "pdf") {
    svgIconHtml = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        height="25"
        width="25"
      >
        <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" />
      </svg>
    );
  } else if (props.type == "images") {
    svgIconHtml = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <g clipPath="url(#clip0_182_321)">
          <path
            d="M12.5029 8.59375C12.5029 9.21535 12.256 9.81149 11.8165 10.251C11.3769 10.6906 10.7808 10.9375 10.1592 10.9375C9.53758 10.9375 8.94144 10.6906 8.5019 10.251C8.06236 9.81149 7.81543 9.21535 7.81543 8.59375C7.81543 7.97215 8.06236 7.37601 8.5019 6.93647C8.94144 6.49693 9.53758 6.25 10.1592 6.25C10.7808 6.25 11.3769 6.49693 11.8165 6.93647C12.256 7.37601 12.5029 7.97215 12.5029 8.59375Z"
            fill="black"
          ></path>
          <path
            d="M18.75 0H6.25C5.4212 0 4.62634 0.32924 4.04029 0.915291C3.45424 1.50134 3.125 2.2962 3.125 3.125V21.875C3.125 22.7038 3.45424 23.4987 4.04029 24.0847C4.62634 24.6708 5.4212 25 6.25 25H18.75C19.5788 25 20.3737 24.6708 20.9597 24.0847C21.5458 23.4987 21.875 22.7038 21.875 21.875V3.125C21.875 2.2962 21.5458 1.50134 20.9597 0.915291C20.3737 0.32924 19.5788 0 18.75 0V0ZM4.6875 3.125C4.6875 2.7106 4.85212 2.31317 5.14515 2.02015C5.43817 1.72712 5.8356 1.5625 6.25 1.5625H18.75C19.1644 1.5625 19.5618 1.72712 19.8549 2.02015C20.1479 2.31317 20.3125 2.7106 20.3125 3.125V15.625L17.0578 12.3703C16.9776 12.2902 16.8809 12.2285 16.7744 12.1895C16.6679 12.1506 16.5543 12.1352 16.4413 12.1446C16.3283 12.154 16.2187 12.1878 16.1201 12.2438C16.0215 12.2998 15.9363 12.3765 15.8703 12.4688L12.5 17.1875L9.11719 15.1562C8.96762 15.0667 8.7924 15.0297 8.6194 15.0512C8.4464 15.0728 8.28557 15.1515 8.1625 15.275L4.6875 18.75V3.125Z"
            fill="black"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_182_321">
            <rect width="25" height="25" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    );
  } else if (props.type == "webpage") {
    svgIconHtml = (
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771" />
      </svg>
    );
  }

  let svg_html = null;
  if (props.parent != "Topic")
    svg_html = <span className="icon">{svgIconHtml}</span>;
  else svg_html = "";

  if (props.container == "list") {
    return (
      <li
        tabIndex="-1" //-1 becuase 0 clicks on another class (2 times click)
        className={props.parent == "Topic" ? "link" : "nav-item"}
      // onKeyDown={(e) => {
      //   var input = document.querySelector(".iconimage1").innerHTML;
      //   if (e.key === "Tab") {
      //     //var input = document.getElementsByClassName("icon");

      //     //var input = document.getElementsByClassName("res_icon")[0].innerHTML;
      //   }
      // }}
      >
        {props.type !== "webpage" ? (
          <div>
            <button
              type="button"
              className="link"
              data-bs-toggle="modal"
              data-bs-target={"#" + props.id}
            >
              {svg_html}
              {props.name}
            </button>
            {props.nameToBeAppended ? (
              <span className="fw-500">{props.nameToBeAppended}</span>
            ) : null}
          </div>
        ) : (
          <div>
            <a href={props.src} target="_blank" type="button" className="color-grey">
              {svg_html}
              {props.name}
            </a>
            {props.nameToBeAppended ? (
              <span className="fw-500">{props.nameToBeAppended}</span>
            ) : null}
          </div>
        )}

        <div
          className="modal fade"
          id={props.id}
          tabIndex="0"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop={false}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content full-popup-reader">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={playturnOff}
                >
                  <img src="./img/close-white.svg" alt="close" title="close" />
                </button>
              </div>
              <div className="modal-body">{dataToBeDisplayed}</div>
            </div>
          </div>
        </div>
      </li>
    );
  } else if (props.container == "anchor") {
    return (
      <>
        {props.type !== "webpage" ? (
          <a
            type="button"
            className="text-i display-content"
            data-bs-toggle="modal"
            data-bs-target={"#" + props.id}
          >
            {svg_html}
            {props.name}
          </a>
        ) : (
          <a href={props.src} className="text-i" target="_blank">
            {svg_html}
            {props.name}
          </a>
        )}

        <div
          className="modal fade"
          id={props.id}
          tabIndex="0"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content full-popup-reader">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={playturnOff}
                >
                  <img src="./img/close-white.svg" alt="close" title="close" />
                </button>
              </div>
              <div className="modal-body">{dataToBeDisplayed}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Resources;
