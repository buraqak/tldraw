import React, {
  useState,
  useMemo,
  useContext,
  lazy,
  Suspense,
  useEffect,
} from "react";
const ReactQuill = lazy(() => import("react-quill"));
import { Quill } from "react-quill";
import LengthContext from "./lengthContext";
import Tooltip from "@mui/material/Tooltip";
let Inline = Quill.import("blots/inline");
class CircleBlot extends Inline {
  static blotName = "circle";
  static tagName = "SPAN";
  static className = "ql-custom-circle-sketch-highlight";
  static formats() {
    return true;
  }
}
Quill.register("formats/circle", CircleBlot);

export const QuillFlow = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  bgColor,
}) => {
  const quillRef = React.useRef();
  const [previewOpen, setPreviewOpen] = useState(true);
  const lengthOfData = useContext(LengthContext);
  const [inputText, setInputText] = useState(value);
  setTimeout(function () {
    var tabHideEls = document.querySelectorAll(".ql-toolbar .ql-picker-label");
    tabHideEls.forEach(function (item) {
      item.setAttribute("tabindex", -1);
    });
  }, 1000);

  var maxLength = 1502;
  const CustomToolbar = (id, props) => (
    <ul
      id={`toolbar-${id}`}
      key={`toolbar-${id}`}
      tabIndex="-1"
      className="d-flex justify-content-start align-items-center relative notepad-footer-actions"
    >
      <li>
        <Tooltip title="Bold Text" placement="bottom">
          <button className="ql-bold" tabIndex="-1" />
        </Tooltip>
      </li>
      <li>
        <Tooltip title="Italic Text" placement="bottom">
          <button className="ql-italic" tabIndex="-1" />
        </Tooltip>
      </li>
      <li>
        <Tooltip title="Underline Text" placement="bottom">
          <button className="ql-underline" tabIndex="-1" />
        </Tooltip>
      </li>
      <li>
        <Tooltip title="Strike Text" placement="bottom">
          <button className="ql-strike" tabIndex="-1" />
        </Tooltip>
      </li>
      {/* <li>
        <Tooltip title="Align" placement="bottom">
          <select className="ql-align" tabIndex="-1" >
            <option value=""></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </Tooltip>
      </li> */}
    </ul>
  );

  const handleChange = (val, delta, source, editor) => {
    if (quillRef && quillRef.current) {
      /* const unprivilegedEditor = quillRef.current.unprivilegedEditor;
      if (source != "api" && unprivilegedEditor.getLength() < 1502)
        onChange(name, val);
      else if (
        unprivilegedEditor.getLength() > 1502 ||
        lengthOfData + unprivilegedEditor.getLength() > 34000
      ) {
        let value1 = val.substring(0, maxLength);
        if (source != "api") onChange(name, value1);
      } */
      setInputText(val);
    }
  };

  useEffect(() => {
    onChange("text", inputText);
  }, [inputText]);

  const handleBlur = () => {
    onBlur(name, true);
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "size",
    "header",
    "list",
    "indent",
    "link",
    "color",
    "background",
    "align",
    "clean",
    "circle",
  ];
  return (
    <div className="text-editor flow-text nodrag">
      <ReactQuill
        key={id}
        /* className={id} */
        tabIndex={-1}
        placeholder={placeholder ? placeholder : "<Record your response here>"}
        preserveWhitespace={true}
        ref={quillRef}
        style={{ backgroundColor: bgColor }}
        className="width-quil"
        theme="bubble"
        value={inputText}
        onChange={(e, delta, source, editor) => {
          handleChange(e, delta, source, editor);
        }}
        onBlur={handleBlur}
        modules={{
          toolbar: [["bold", "italic", "underline", "strike"], [{ align: [] }]],
        }}
        formats={quillFormats}
      />
    </div>
  );
};
export default QuillFlow;
