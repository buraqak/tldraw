import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import ttsConfigData from "../ttsConfigData";

import TextToSpeech from "../../Common/TextToSpeech";

const Topic0 = forwardRef((props, ref) => {
  const ttsRef = useRef();

  function play() {
    if (ttsRef.current) ttsRef.current.playTts();
  }

  function pause() {
    if (ttsRef.current) ttsRef.current.pauseTts();
  }
  function stop() {
    if (ttsRef.current) ttsRef.current.stopTts();
  }

  useImperativeHandle(ref, () => ({ play, pause, stop }));
  useEffect(() => {
    document.title = "OSE Features and its Tutorial";
  }, []);

  return (
    <TextToSpeech ref={ttsRef} updateTtsState={props.ttsEnd}>
      <div className="content-area" id="content_area">
        <div className="intro-page">
          <div className="intro-image">
            <img
              src="./img/OSE_Features.png"
              tabIndex={props.tabpopup == false ? 0 : -1}
            />
          </div>
          <div className="intro-text">
            <h1 tabIndex={props.tabpopup == false ? 0 : -1}>
              List of OSE Features and its Tutorial
            </h1>
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic0;
