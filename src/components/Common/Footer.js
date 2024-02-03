import React, { useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
const Footer = (props) => {
  return (
    <React.Fragment>
      <footer>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-sm-6">
              <div className="copyright">
                ©Carolina Biological Supply Company
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <ul className="d-flex justify-content-end footer-naviation pr-20">
                <li
                  className={
                    props.currentTopicIndex == 0 ? "footer-disabled" : ""
                  }
                  onClick={() => {
                    props.moveToPrevPage();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.moveToPrevPage();
                    }
                  }}
                  id="prev_button"
                >
                  <Tooltip title="Prev">
                    <img
                      src="./img/footer-left.svg"
                      tabIndex={
                        props.currentTopicIndex == 0
                          ? -1
                          : 0 || props.tabpopup == false
                          ? 0
                          : -1
                      }
                    />
                  </Tooltip>
                </li>

                <li
                  className={
                    props.currentTopicIndex == props.summarypagenumber
                      ? "footer-disabled"
                      : ""
                  }
                  onClick={() => {
                    props.moveToNextPage();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.moveToNextPage();
                    }
                    if (e.key === "Tab") {
                      document.getElementById("logo1").focus();
                    }
                  }}
                  id="next_button"
                >
                  <Tooltip title="Next">
                    <img
                      src="./img/footer-right.svg"
                      tabIndex={
                        props.currentTopicIndex == props.summarypagenumber
                          ? -1
                          : 0 || props.tabpopup == false
                          ? 0
                          : -1
                      }
                    />
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
