import React, { useState, useRef } from "react";

import { useQuill } from "react-quilljs";

const SpeechEditor = (props) => {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike", { list: "bullet" }]],
  };

  const { quill, quillRef } = useQuill({ modules });
  const [value, setValue] = useState();

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
        props.setText1(value);
      });
    }
  }, [quill]);

  const handleSave = () => {
    const text = quill.getText();
    setValue(text);
  };

  return (
    <div style={{ width: "100%", height: 200 }}>
      <div
        onChange={handleSave}
        ref={quillRef}
        id="speectText_1"
        placeholder="<Record your response here>"
      />
    </div>
  );
};

export default SpeechEditor;
