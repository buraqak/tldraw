import React, { useCallback, useState, useRef } from "react";
// import DrawingBoard from "./DrawingBoard";
import { DefaultColorThemePalette, Tldraw, Editor } from "@tldraw/tldraw";

import { useEffect } from "react";
import CustomUi from "./CustomUI";
import Tools from "./Tools";
/* DefaultColorThemePalette.lightMode.black.solid = "red";
 */
function WhiteBoard() {
  const [data, setData] = useState();
  //image upload
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  //image upload end
  // State to hold the editor instance
  const [editor, setEditor] = useState(null);

  // Callback to set the editor instance to the state
  const setAppToState = useCallback((editor) => {
    setEditor(editor);
  }, []);

  // State to store events for display
  const [storeEvents, setStoreEvents] = useState([]);

  // Effect to listen to changes in the editor and update storeEvents
  useEffect(() => {
    if (!editor) return;

    // Function to log change events in a readable format
    function logChangeEvent(eventName) {
      setStoreEvents((events) => [eventName, ...events]);
    }

    // Event handler for changes in the editor
    const handleChangeEvent = (change) => {
      // Added
      for (const record of Object.values(change.changes.added)) {
        if (record.typeName === "shape") {
          logChangeEvent(`created shape (${record.type})`);
        }
      }

      // Updated
      for (const [from, to] of Object.values(change.changes.updated)) {
        if (
          from.typeName === "instance" &&
          to.typeName === "instance" &&
          from.currentPageId !== to.currentPageId
        ) {
          logChangeEvent(
            `changed page (${from.currentPageId}, ${to.currentPageId})`
          );
        }
      }

      // Removed
      for (const record of Object.values(change.changes.removed)) {
        if (record.typeName === "shape") {
          logChangeEvent(`deleted shape (${record.type})`);
        }
      }
    };

    // Subscribe to store events and get a cleanup function
    const cleanupFunction = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "all",
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      cleanupFunction();
    };
  }, [editor]);

  //undo redo
  /* const handleUndo = () => {
    if (editor) {
      editor.undo();
    }
  };

  const handleRedo = () => {
    if (editor) {
      editor.redo();
    }
  }; */
  return (
    <div className="d-flex">
      <Tools
        data={data}
        handleImageChange={handleImageChange}
        handleImageClick={handleImageClick}
        fileInputRef={fileInputRef}
        /*  handleUndo={handleUndo}
        handleRedo={handleRedo} */
      />
      <div className="design-board-section ps-0">
        <div className="design-board-area-box">
          <div className="design-board-area">
            <Tldraw
              acceptedImageMimeTypes={["image/jpeg"]}
              maxImageDimension={Infinity}
              onMount={setAppToState}
              //onUiEvent={handleUiEvent}
            >
              <CustomUi setData={setData} /* selectedImage={selectedImage} */ />
            </Tldraw>

            {/*  <div
              style={{
                width: "40%",
                height: "100vh",
                padding: 8,
                background: "#eee",
                border: "none",
                fontFamily: "monospace",
                fontSize: 12,
                borderLeft: "solid 2px #333",
                display: "flex",
                flexDirection: "column-reverse",
                overflow: "auto",
              }}
            >
               Display store events in reverse order 
              {storeEvents.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div> */}
            {/*  <input type="file" onChange={handleImageChange} /> */}
          </div>
          <div className="footer-area">
            <button className="footer-button">Word Wall</button>
            <button className="footer-button">Initial Ideas</button>
            <button className="footer-button ">Data Sheets</button>
            <button className="footer-button footer-plus-button ">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteBoard;
