import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import ttsConfigData from "../ttsConfigData";

import TextToSpeech from "../../Common/TextToSpeech";
import AnnotationComponent from "../../Common/AnnotationComponent";
import ImageannotationHelp from "../../Common/ImageannotationHelp";

const Topic9 = forwardRef((props, ref) => {
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
  function setAnnotationsData(id, data) {
    props.updateText(id, data);
  }
  useImperativeHandle(ref, () => ({ play, pause, stop }));
  useEffect(() => {
    document.title = "List of OSE Features and its Tutorial";
  }, []);

  const onBlur = () => {};
  const onChange = (name, val) => {
    props.updateText(name, val);
  };

  const handleChange = (e) => {
    props.updateText(e.target.name, e.target.value);
  };

  const updateRecord = (e) => {
    props.updateText(e.target.name, e.target.value);
  };

  const actions = {
    name: "",
    isStreaming: "",
  };

  const [actionChooser, setActionChooser] = useState(actions);
  useEffect(() => {
    props.updateActionChooser(actionChooser);
  }, [actionChooser]);
  return (
    <TextToSpeech
      ref={ttsRef}
      updateTtsState={props.ttsEnd}
      updateAction={(data) => setActionChooser(data)}
      actionChooser={actionChooser}
    >
      <div className={props.leftshift ? "content-area" : "content-area"}>
        <div className="page-introduce-puzzling-phenomenon">
          <div className="icon-text-group border pdf-form-outer">
            <AnnotationComponent
              id={"graphAnnotation1"}
              updateAnnotation={setAnnotationsData}
              source="./img/7_6_2_boston_graph1.jpg"
              altText="A graph of total annual precipitation trends from 1895 through 2020 for Suffolk County, Massachusetts. The overall trend line shows a steady increase in precipitation, from about 42 inches average annually in 1895 to about 48 inches in 2020, a rise of approximately 0.53 inches per decade."
              marks={props.graphAnnotation1}
            />
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic9;
