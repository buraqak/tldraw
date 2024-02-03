import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import FormikQuill from "../../Common/FormikQuill";
import Resources from "../../Common/Resources";
import Tooltip from "../../Common/ToolTipComponent";
import ttsConfigData from "../ttsConfigData";
import TextToSpeech from "../../Common/TextToSpeech";
import FlowDiagram from "../../Common/FlowDiagram";

const Topic5 = forwardRef((props, ref) => {
  useEffect(() => {
    document.title = "List of OSE Features and its Tutorial";
  }, []);

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

  return (
    <TextToSpeech ref={ttsRef} updateTtsState={props.ttsEnd}>
      <div className={props.leftshift ? "content-area " : "content-area"}>
        <div className="page-introduce-puzzling-phenomenon">
          <div className="border pdf-form-outer ">
            <FlowDiagram
              listOfNodes={props.nodeList}
              listOfEdges={props.edgesList}
              updateNodeList={props.updateNodesOfList}
              updateEdgesList={props.updateNodesOfList}
            />
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic5;
