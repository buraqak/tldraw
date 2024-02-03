import TextAreaComponent from "./TextAreaComponent";
import React from "react";
export default function TableRowComponent({
  index,
  updateValue,
  tabpopup,
  removeIndex,
  identifyValue,
  interpretValue,
  createNew,
  length,
  isPrint,
}) {
  function identifyValueChanged(e) {
    updateValue(index, "identify", e.target.value);
  }

  function interpretValueChanged(e) {
    updateValue(index, "interpret", e.target.value);
  }
  return (
    <React.Fragment>
      <div className="row mx-0 ">
        <div className="col-5 timeline border pb-10 pt-10 px-1 px-lg-3">
          {isPrint ? (
            <p className="table-break-line">{identifyValue}</p>
          ) : (
            <TextAreaComponent
              type="text"
              id={"textbox_identify" + index}
              value={identifyValue}
              name={"textbox_4_3" + index}
              className=" form-control table-break-line"
              rows="3"
              onChange={identifyValueChanged}
              placeholder="<Record your response here>"
            ></TextAreaComponent>
          )}
        </div>
        <div className="col-5 timeline border pb-10 pt-10 px-1 px-lg-3">
          {isPrint ? (
            <p className="table-break-line">{interpretValue}</p>
          ) : (
            <TextAreaComponent
              type="text"
              id={"textbox_interpret" + index}
              value={interpretValue}
              name={"textbox_4_4" + index}
              className=" form-control table-break-line"
              rows="3"
              onChange={interpretValueChanged}
              placeholder="<Record your response here>"
            ></TextAreaComponent>
          )}
        </div>
        {!isPrint ? (
          <div className="col-1 px-0 position-button">
            <div>
              {length > 1 ? (
                <button
                  tabIndex={-1}
                  onClick={() => removeIndex(index)}
                  className="btn border-0 p-0 cursor-pointer shadow-none"
                >
                  <img src="./img/variation-remove.svg" />
                </button>
              ) : null}
            </div>
            {length - 1 === index ? (
              <div className="position-button-add ">
                <button
                  tabIndex={-1}
                  onClick={() => createNew()}
                  className="btn border-0 p-0 cursor-pointer shadow-none"
                >
                  <img src="./img/variation-add.svg" />
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}
