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
import ReactMicComponent from "./SST.js";
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

export const FormikQuill = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  actionChooser,
  updateAction,
  displaySpeechToText,
  placeholder,
  displayTextBarLocation,
}) => {
  const quillRef = React.useRef();
  const [previewOpen, setPreviewOpen] = useState(true);
  const [previewContent, setPreviewContent] = useState("");
  const lengthOfData = useContext(LengthContext);
  var tabHideEls = document.querySelectorAll(".ql-toolbar .ql-picker-label");
  tabHideEls.forEach(function (item) {
    item.setAttribute("tabindex", -1);
  });
  useEffect(() => {
    var tabHideEls = document.querySelectorAll(".ql-toolbar .ql-picker-label");

    tabHideEls.forEach(function (item) {
      item.setAttribute("tabindex", -1);
    });
  });
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
      <Tooltip title="Text Color" placement="bottom">
        <li tabIndex="-1">
          <select className="ql-color"></select>
        </li>
      </Tooltip>
      <Tooltip title="Text Background" placement="bottom">
        <li tabIndex="-1">
          <select className="ql-background"></select>
        </li>
      </Tooltip>

      <li tabIndex="-1">
        <Tooltip title="Clear Text" placement="bottom">
          <button className="ql-clean" tabIndex="-1"></button>
        </Tooltip>
      </li>
      <li tabIndex="-1">
        <Tooltip title="Circle Text" placement="bottom">
          <button id="ql-circle" className="ql-circle" tabIndex="-1"></button>
        </Tooltip>
      </li>

      <li className="text-specker">
        <div className="text-specker-actions d-flex">
          {displaySpeechToText &&
          window.parent &&
          window.parent.CSO_STT_API &&
          window.parent.CSO_STT_API.isAvailable() &&
          window.parent.CSO_STT_API.stopMicStream ? (
            <span className="speach-text-btn">
              <ReactMicComponent
                updateParent={(data) =>
                  onChange(name, value ? value.concat(data) : data)
                }
                disableAction={
                  `toolbar-${id}` !== actionChooser.name &&
                  actionChooser.isStreaming
                }
                updateAction={(data) =>
                  updateAction({ name: `toolbar-${id}`, isStreaming: data })
                }
              />
            </span>
          ) : null}
        </div>
      </li>
    </ul>
  );

  const handleChange = (val, delta, source, editor) => {
    if (quillRef && quillRef.current) {
      const unprivilegedEditor = quillRef.current.unprivilegedEditor;
      if (source != "api" && unprivilegedEditor.getLength() < 1502)
        onChange(name, val);
      else if (
        unprivilegedEditor.getLength() > 1502 ||
        lengthOfData + unprivilegedEditor.getLength() > 34000
      ) {
        let value = val.substring(0, maxLength);
        if (source != "api") onChange(name, value);
      }
    }
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const quillModules = useMemo(() => {
    return {
      toolbar: {
        CustomToolbar,
        container: `#toolbar-${id}`,
        handlers: {
          preview: function (value) {
            const html = this.quill.root.innerHTML;
            setPreviewContent(html);
            setPreviewOpen(!previewOpen);
          },
        },
      },
    };
  }, [id, previewOpen]);

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
    <Suspense callback={"Loading..."}>
      <div className="text-editor">
        {displayTextBarLocation == "top" || !displayTextBarLocation
          ? CustomToolbar(id)
          : ""}
        <ReactQuill
          key={id}
          tabIndex={-1}
          placeholder={
            placeholder ? placeholder : "<Record your response here>"
          }
          preserveWhitespace={true}
          ref={quillRef}
          style={{ backgroundColor: "white" }}
          theme="snow"
          value={value}
          onChange={(e, delta, source, editor) => {
            handleChange(e, delta, source, editor);
          }}
          onBlur={handleBlur}
          modules={quillModules}
          formats={quillFormats}
        />
        {displayTextBarLocation == "bottom" ? CustomToolbar(id) : ""}
      </div>
    </Suspense>
  );
};
export default FormikQuill;
