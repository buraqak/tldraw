import React, { useEffect, useState } from "react";
import * as conf from "../../../src/config";
import Tooltip from "@mui/material/Tooltip";

function ReactMicComponent({ updateParent, updateAction, disableAction }) {
  const [micStream, setMicStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [transcriptionResults, setTranscriptionResults] = useState("");
  var isSttGoingOn = false;

  function stopMicStream() {
    setRecording(false);
    updateAction(false);
    if (window.parent && window.parent.CSO_STT_API)
      window.parent.CSO_STT_API.stopMicStream();
  }

  useEffect(() => {
    updateParent(transcriptionResults);
  }, [transcriptionResults]);

  useEffect(() => {
    return () => {
      if (window.parent && window.parent.CSO_STT_API)
        window.parent.CSO_STT_API.stopMicStream();
    }
  }, []);

  async function startMicStream() {
    setRecording(true);
    updateAction(true);
    if (window.parent && window.parent.CSO_STT_API) {
      window.parent.CSO_STT_API.startMicStream().then(result => {
        result.subscribe(response => {
          setTranscriptionResults(transcriptionResults + " " + response);
        });
      }).catch((error) => {
        console.log("Error getting user media: ", error);
      });
    }
  }
  var _className = "audioClick  cursor-pointer";

  if (disableAction) {
    _className = "audioClick  canvas-cursor disabled";
  }

  return (
    <div>
      {recording ? (
        <Tooltip title="Speech to Text">
          <img
            id="speech_1"
            onClick={!disableAction ? stopMicStream : null}
            className={_className}
            src="./img/specker-note.svg"
            disabled={disableAction}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Speech to Text">
          <img
            id="speech_1"
            onClick={!disableAction ? startMicStream : null}
            className={_className}
            disabled={disableAction}
            src="./img/microphone.svg"
          />
        </Tooltip>
      )}
    </div>
  );
}

export default ReactMicComponent;
