import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

import Designtools from "../../Common/Designtools";
import WhiteBoard from "../../Common/designtool/WhiteBoard";

const Topic11 = forwardRef((props, ref) => {
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

  return (
    <div>
      <div class="container-fluid px-0" id="designing-board">
        <div class="row">
          {/* <Designtools /> */}
          <WhiteBoard />
        </div>
      </div>
    </div>
  );
});
export default Topic11;
