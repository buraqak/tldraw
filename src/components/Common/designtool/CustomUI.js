import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect } from "react";
import "./custom-ui.css";

const CustomUi = track(({ setData, selectedImage }) => {
  const editor = useEditor();
  setData(editor);

  return (
    <div className="custom-layout">
      {/*  {selectedImage && (
        <img
          className="uploaded-image"
          src={URL.createObjectURL(selectedImage)}
          alt="Uploaded"
        />
      )} */}
    </div>
  );
});

export default CustomUi;
