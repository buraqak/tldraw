import React, { useState,useRef } from "react";



import { useQuill } from 'react-quilljs';


const HtmlEditor = () => {

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike',{list:'bullet'}],
    ],
  };
  
  const { quill, quillRef } = useQuill({modules});
  const [value, setValue] = useState();
  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        
        setValue(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  return(
     <div style={{ width: 500, height: 300 }}>
        <div ref={quillRef} />
    </div>
  );
}



export default HtmlEditor