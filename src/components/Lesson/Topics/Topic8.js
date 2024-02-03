import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

import TextToSpeech from "../../Common/TextToSpeech";
import TextHighlighter from "../../Common/TextHighlighter";
import TextHighlighter1 from "../../Common/TextHighlighter1";
import TextHighlighter2 from "../../Common/TextHighlighter2";
import TableContentSelection from "../../Common/TableContentSelection";

import ReadingHelp from "../../Common/ReadingHelp";
import ReadingHelpstar from "../../Common/ReadingHelpstar";
import ReadingHelpquestion from "../../Common/ReadingHelpquestion";
import ReadingHelpstrick from "../../Common/ReadingHelpstrick";

const Topic8 = forwardRef((props, ref) => {
  const [ttsState, setTTsState] = useState(null);
  const [actionChooser, setActionChooser] = useState(props.actionChooser);
  const [isShowHelp, setIsShowHelp] = useState(false);

  const ttsRef = useRef();

  function play() {
    setTTsState(true);
    if (ttsRef.current) ttsRef.current.playTts();
  }

  function pause() {
    setTTsState(false);
    if (ttsRef.current) ttsRef.current.pauseTts();
  }

  function stop() {
    setTTsState(false);
    if (ttsRef.current) ttsRef.current.stopTts();
  }

  useImperativeHandle(ref, () => ({ play, pause, stop }));
  useEffect(() => {
    document.title = "OSE Features and its Tutorial";
  }, []);

  const onBlur = () => {};
  const onChange = (name, val) => {
    if (name.includes("hlt")) {
      stop();
    }
    // console.log(name, val)
    props.updateText(name, val);
  };
  const handleChange = (e) => {
    props.updateText(e.target.name, e.target.value);
  };
  const actions = {
    name: "",
    isStreaming: "",
  };

  const updateRecord = (e) => {
    props.updateText(e.target.name, e.target.value);
  };
  const [readdingButton1, setreaddingButton1] = useState(true);
  const [readdingButton2, setreaddingButton2] = useState(false);
  const [readdingButton3, setreaddingButton3] = useState(false);
  const [readdingButton4, setreaddingButton4] = useState(false);
  const [readdingButton5, setreaddingButton5] = useState(false);

  const [activeButton, setactiveButton] = useState(true);
  const [activeButton1, setactiveButton1] = useState(false);
  const [activeButton2, setactiveButton2] = useState(false);
  const [activeButton3, setactiveButton3] = useState(false);
  const [activeButton4, setactiveButton4] = useState(false);
  const handleButtonClick = () => {
    setactiveButton(true);
    setactiveButton1(false);
    setactiveButton2(false);
    setactiveButton3(false);
    setactiveButton4(false);
  };
  const handleButtonClick1 = () => {
    setactiveButton(false);
    setactiveButton1(true);
    setactiveButton2(false);
    setactiveButton3(false);
    setactiveButton4(false);
  };
  const handleButtonClick2 = () => {
    setactiveButton(false);
    setactiveButton2(true);
    setactiveButton1(false);

    setactiveButton3(false);
    setactiveButton4(false);
  };
  const handleButtonClick3 = () => {
    setactiveButton(false);
    setactiveButton3(true);
    setactiveButton1(false);
    setactiveButton2(false);

    setactiveButton4(false);
  };
  const handleButtonClick4 = () => {
    setactiveButton(false);
    setactiveButton4(true);
    setactiveButton1(false);
    setactiveButton2(false);
    setactiveButton3(false);
  };

  const [isHighlighted, setIsHighlighted] = useState(false);

  const toggleHighlight = () => {
    setIsHighlighted(!isHighlighted);
  };
  return (
    <TextToSpeech ref={ttsRef} updateTtsState={props.ttsEnd}>
      <div className={props.leftshift ? "content-area " : "content-area"}>
        <div className="page-introduce-puzzling-phenomenon">
          <div className="icon-text-group">
            <div className="text-box">
              <div className="mb-95  border pdf-form-outer  row">
                <div className="row d-flex justify-content-center">
                  <div className="col-6 col-lg-3 ">
                    <button
                      onClick={() => {
                        setreaddingButton1(true);
                        setreaddingButton2(false);
                        setreaddingButton3(false);
                        setreaddingButton4(false);
                        setreaddingButton5(false);
                        handleButtonClick();
                      }}
                      className={
                        activeButton === true
                          ? "active mb-40 p-1 py-3 text-center  handout-selection w-100  fw-700"
                          : "mb-40 p-1 py-3 text-center  handout-selection w-100  fw-700"
                      }
                    >
                      Reading 1<br />
                      (Comment & Circle)
                    </button>
                  </div>

                  <div className="col-6 col-lg-3">
                    <button
                      onClick={() => {
                        setreaddingButton2(true);
                        setreaddingButton1(false);
                        setreaddingButton3(false);
                        setreaddingButton4(false);
                        setreaddingButton5(false);
                        handleButtonClick1();
                      }}
                      className={
                        activeButton1 === true
                          ? "active mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                          : "mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                      }
                    >
                      Reading 2<br />
                      (Star/Check Mark)
                    </button>
                  </div>
                  <div className="col-6 col-lg-3">
                    <button
                      onClick={() => {
                        setreaddingButton3(true);
                        setreaddingButton1(false);
                        setreaddingButton2(false);
                        setreaddingButton4(false);
                        setreaddingButton5(false);
                        handleButtonClick2();
                      }}
                      className={
                        activeButton2 === true
                          ? "active mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                          : "mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                      }
                    >
                      Reading 3<br />
                      (Question Mark)
                    </button>
                  </div>
                  <div className="col-6 col-lg-3">
                    <button
                      onClick={() => {
                        setreaddingButton4(true);
                        setreaddingButton1(false);
                        setreaddingButton2(false);
                        setreaddingButton3(false);
                        setreaddingButton5(false);
                        handleButtonClick3();
                      }}
                      className={
                        activeButton3 === true
                          ? "active mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                          : "mb-20 p-1 py-3 text-center  handout-selection w-100  fw-700"
                      }
                    >
                      Reading 4<br />
                      (Strikethrough)
                    </button>
                  </div>
                </div>

                {readdingButton1 ? (
                  <div className="reading-comment">
                    <p
                      className="text-center fw-700 mb-30 d-flex justify-content-center align-items-center position-relative"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      A Summary of Some Historical Investigations
                      <img
                        src="./img/CanvasInfo/help_icon_1.png"
                        className="cursor-pointer canvas-help-icon help_icon_35 position-absolute reading-help-icon mb-0"
                        title={"Help"}
                        onClick={() => setIsShowHelp(true)}
                        /* onClick={openMainPopup} */
                      />
                    </p>
                    <p
                      className="mb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter
                        id={"hlt_8_1"}
                        name={"hlt_8_1"}
                        key={"hlt_8_1"}
                        value={props.hlt_8_1}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <p
                      className="mb-20"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter
                        id={"hlt_8_2"}
                        name={"hlt_8_2"}
                        key={"hlt_8_2"}
                        value={props.hlt_8_2}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <div
                      className="mb-20 lesson-summary pl-20 pt-10 pb-10 pr-20 text-center border border-3"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter
                        id={"hlt_8_3"}
                        name={"hlt_8_3"}
                        key={"hlt_8_3"}
                        value={props.hlt_8_3}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </div>
                    <p
                      className="pb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter
                        id={"hlt_8_4"}
                        name={"hlt_8_4"}
                        key={"hlt_8_4"}
                        value={props.hlt_8_4}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <div className="mb-10 row">
                      <div className="col-12 col-md-12">
                        <p tabIndex={props.tabpopup == false ? 0 : -1}>
                          <TextHighlighter
                            id={"hlt_8_5"}
                            name={"hlt_8_5"}
                            key={"hlt_8_5"}
                            value={props.hlt_8_5}
                            onChange={onChange}
                            onBlur={onBlur}
                            updateAction={(data) => setActionChooser(data)}
                            actionChooser={actionChooser}
                            displaySpeechToText={true}
                            onDrop={(e) => e.preventDefault()}
                            stop={ttsState}
                          />
                        </p>
                      </div>
                    </div>
                    <div
                      className="lesson-summary pl-20 pt-10 pb-10 pr-20 text-center border border-3"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter
                        id={"hlt_8_6"}
                        name={"hlt_8_6"}
                        key={"hlt_8_6"}
                        value={props.hlt_8_6}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </div>
                    {isShowHelp ? (
                      <ReadingHelp
                        closePopUp={() => setIsShowHelp(false)}
                        thingsToShow={{
                          pen: true,
                          line: false,
                          pan: false,
                          zoom: false,
                          opacity: false,
                          circle: false,
                          fitToScreen: false,
                        }}
                      />
                    ) : null}
                  </div>
                ) : null}
                {readdingButton2 ? (
                  <div>
                    {isShowHelp ? (
                      <ReadingHelpstar
                        closePopUp={() => setIsShowHelp(false)}
                        thingsToShow={{
                          pen: false,
                          line: true,
                          pan: false,
                          zoom: false,
                          opacity: false,
                          circle: false,
                          fitToScreen: false,
                        }}
                      />
                    ) : null}
                    <p
                      className="pb-15 fw-600 text-center d-flex justify-content-center align-items-center position-relative"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      Music to My Ears
                      <img
                        src="./img/CanvasInfo/help_icon_1.png"
                        className="cursor-pointer canvas-help-icon help_icon_35 position-absolute reading-help-icon-star"
                        title={"Help"}
                        onClick={() => setIsShowHelp(true)}
                      />
                    </p>
                    <p
                      className="pb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter1
                        id={"hlt_15_1"}
                        name={"hlt_15_1"}
                        key={"hlt_15_1"}
                        value={props.hlt_15_1}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <div
                      className="pb-7 class-seasson-listing"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <span className="number fw-600">1.</span>
                      <span className="text">
                        <TextHighlighter1
                          id={"hlt_15_2"}
                          name={"hlt_15_2"}
                          key={"hlt_15_2"}
                          value={props.hlt_15_2}
                          onChange={onChange}
                          onBlur={onBlur}
                          updateAction={(data) => setActionChooser(data)}
                          actionChooser={actionChooser}
                          displaySpeechToText={true}
                          onDrop={(e) => e.preventDefault()}
                          stop={ttsState}
                        />
                      </span>
                    </div>

                    <p tabIndex={props.tabpopup == false ? 0 : -1}>
                      <TextHighlighter1
                        id={"hlt_15_4"}
                        name={"hlt_15_4"}
                        key={"hlt_15_4"}
                        value={props.hlt_15_4}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <p
                      className="pb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter1
                        id={"hlt_15_5"}
                        name={"hlt_15_5"}
                        key={"hlt_15_5"}
                        value={props.hlt_15_5}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <p
                      className="pb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter1
                        id={"hlt_15_6"}
                        name={"hlt_15_6"}
                        key={"hlt_15_6"}
                        value={props.hlt_15_6}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <div
                      className="pb-7 class-seasson-listing"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <span className="number fw-600">2.</span>
                      <span className="text">
                        <TextHighlighter1
                          id={"hlt_15_7"}
                          name={"hlt_15_7"}
                          key={"hlt_15_7"}
                          value={props.hlt_15_7}
                          onChange={onChange}
                          onBlur={onBlur}
                          updateAction={(data) => setActionChooser(data)}
                          actionChooser={actionChooser}
                          displaySpeechToText={true}
                          onDrop={(e) => e.preventDefault()}
                          stop={ttsState}
                        />
                      </span>
                    </div>
                    <p tabIndex={props.tabpopup == false ? 0 : -1}>
                      <TextHighlighter1
                        id={"hlt_15_8"}
                        name={"hlt_15_8"}
                        key={"hlt_15_8"}
                        value={props.hlt_15_8}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <p
                      className="pb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter1
                        id={"hlt_15_9"}
                        name={"hlt_15_9"}
                        key={"hlt_15_9"}
                        value={props.hlt_15_9}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                  </div>
                ) : null}
                {readdingButton3 ? (
                  <div>
                    {isShowHelp ? (
                      <ReadingHelpquestion
                        closePopUp={() => setIsShowHelp(false)}
                        thingsToShow={{
                          pen: false,
                          line: false,
                          pan: true,
                          zoom: false,
                          opacity: false,
                          circle: false,
                          fitToScreen: false,
                        }}
                      />
                    ) : null}
                    <div class="row">
                      <div class="col-12 col-md-12">
                        <p
                          className="text-center fw-700 mb-20 d-flex justify-content-center align-items-center position-relative"
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        >
                          How Light Warms Up Matter
                          <img
                            src="./img/CanvasInfo/help_icon_1.png"
                            className="cursor-pointer canvas-help-icon help_icon_35 position-absolute reading-help-icon-question  ml-15"
                            title={"Help"}
                            onClick={() => setIsShowHelp(true)}
                          />
                        </p>
                        <p
                          class="mb-20"
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        >
                          <TextHighlighter2
                            id={"hlt_7_1"}
                            name={"hlt_7_1"}
                            key={"hlt_7_1"}
                            value={props.hlt_7_1}
                            onChange={onChange}
                            onBlur={onBlur}
                            updateAction={(data) => setActionChooser(data)}
                            actionChooser={actionChooser}
                            displaySpeechToText={true}
                            onDrop={(e) => e.preventDefault()}
                            stop={ttsState}
                          />
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-12">
                        <p
                          class="mb-20"
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        >
                          <TextHighlighter2
                            id={"hlt_7_2"}
                            name={"hlt_7_2"}
                            key={"hlt_7_2"}
                            value={props.hlt_7_2}
                            onChange={onChange}
                            onBlur={onBlur}
                            updateAction={(data) => setActionChooser(data)}
                            actionChooser={actionChooser}
                            displaySpeechToText={true}
                            onDrop={(e) => e.preventDefault()}
                            stop={ttsState}
                          />
                        </p>
                      </div>
                      {/* <div class="col-9 col-md-3 mb-20">
                        <img
                          src="./img/6-2-15-image-7.png"
                          alt="A large sliding glass window."
                          title="A large sliding glass window."
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        />
                      </div> */}
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-12">
                        <p
                          class="mb-10"
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        >
                          <TextHighlighter2
                            id={"hlt_7_3"}
                            name={"hlt_7_3"}
                            key={"hlt_7_3"}
                            value={props.hlt_7_3}
                            onChange={onChange}
                            onBlur={onBlur}
                            updateAction={(data) => setActionChooser(data)}
                            actionChooser={actionChooser}
                            displaySpeechToText={true}
                            onDrop={(e) => e.preventDefault()}
                            stop={ttsState}
                          />
                        </p>
                        <p
                          class="mb-20"
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        >
                          <TextHighlighter2
                            id={"hlt_7_4"}
                            name={"hlt_7_4"}
                            key={"hlt_7_4"}
                            value={props.hlt_7_4}
                            onChange={onChange}
                            onBlur={onBlur}
                            updateAction={(data) => setActionChooser(data)}
                            actionChooser={actionChooser}
                            displaySpeechToText={true}
                            onDrop={(e) => e.preventDefault()}
                            stop={ttsState}
                          />
                        </p>
                      </div>
                      {/*  <div class="col-9 col-md-3 mb-20">
                        <img
                          src="./img/6-2-15-image-8.png"
                          alt="Picture of sun set over the mountains with two people laying down watching it."
                          title="Picture of sun set over the mountains with two people laying down watching it."
                          tabIndex={props.tabpopup == false ? 0 : -1}
                        />
                      </div> */}
                    </div>
                    <p
                      class="mb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter2
                        id={"hlt_7_5"}
                        name={"hlt_7_5"}
                        key={"hlt_7_5"}
                        value={props.hlt_7_5}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                    <p
                      class="mb-10"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      <TextHighlighter2
                        id={"hlt_7_6"}
                        name={"hlt_7_6"}
                        key={"hlt_7_6"}
                        value={props.hlt_7_6}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={true}
                        onDrop={(e) => e.preventDefault()}
                        stop={ttsState}
                      />
                    </p>
                  </div>
                ) : null}
                {readdingButton4 ? (
                  <div>
                    {isShowHelp ? (
                      <ReadingHelpstrick
                        closePopUp={() => setIsShowHelp(false)}
                        thingsToShow={{
                          pen: false,
                          line: false,
                          pan: false,
                          zoom: true,
                          opacity: false,
                          circle: false,
                          fitToScreen: false,
                        }}
                      />
                    ) : null}
                    <p
                      className="text-center fw-700 mb-30 d-flex justify-content-center align-items-center position-relative"
                      tabIndex={props.tabpopup == false ? 0 : -1}
                    >
                      Some Common Gases (Lesson 7.1.5)
                      <img
                        src="./img/CanvasInfo/help_icon_1.png"
                        className="cursor-pointer help_icon_35 ml-15 reading-help-icon-strick position-absolute"
                        title={"Help"}
                        onClick={() => setIsShowHelp(true)}
                      />
                    </p>
                    <div className="table-responsive">
                      <table className="table mb-0 table-bordered green-table">
                        <thead className="table-dark">
                          <tr>
                            <th
                              className="text-center align-middle"
                              colspan="5"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              All data reported is for measurements at sea level
                              elevation and at 15 ℃
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="color-light-blue text-center align-middle fw-700 text-i"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              Substance/Mixture
                            </td>
                            <td
                              className="color-light-blue text-center align-middle fw-700 text-i"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              Approximate % of this gas in the air outside
                            </td>
                            <td
                              className="color-light-blue text-center align-middle fw-700 text-i"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              Boiling point (in °C)
                            </td>
                            <td
                              className="color-light-blue text-center align-middle fw-700 text-i"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              Density (g/L) measured at 0°C
                            </td>
                            <td
                              className="color-light-blue text-center align-middle fw-700 text-i"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              Flammability{" "}
                              <p className="fw-400">
                                {" "}
                                Notes on how the gas interacts with flame
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={0}
                                active={props.selectedValues[0]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>nitrogen </strong>(substance)"
                                }
                              />
                            </td>

                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={1}
                                active={props.selectedValues[1]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"78%"}
                              />
                            </td>

                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={2}
                                active={props.selectedValues[2]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"-196%"}
                              />{" "}
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={3}
                                active={props.selectedValues[3]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"1.250"}
                              />{" "}
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={4}
                                active={props.selectedValues[4]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"Will extinguish a flame."}
                              />{" "}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={5}
                                active={props.selectedValues[5]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>oxygen </strong><br/>(substance)"
                                }
                              />
                            </td>

                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={6}
                                active={props.selectedValues[6]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={" 21%"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={7}
                                active={props.selectedValues[7]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"-183"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={8}
                                active={props.selectedValues[8]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"1.430"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={9}
                                active={props.selectedValues[9]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "Will increase a flame or cause a glowing ember to burst into flame."
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={10}
                                active={props.selectedValues[10]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>argon</strong><br/>(substance)"
                                }
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={11}
                                active={props.selectedValues[11]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"~1%"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={12}
                                active={props.selectedValues[12]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"-186"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={13}
                                active={props.selectedValues[13]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"1.780"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={14}
                                active={props.selectedValues[14]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"Will extinguish a flame."}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={15}
                                active={props.selectedValues[15]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>carbon dioxide</strong><br/>(substance)"
                                }
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={16}
                                active={props.selectedValues[16]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"~0.04%"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={17}
                                active={props.selectedValues[17]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<p>N/A</p><p>Changes straight from solid to gas with no liquid phase.</p><p>This occurs at -78.4</p>"
                                }
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={18}
                                active={props.selectedValues[18]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"1.960"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={19}
                                active={props.selectedValues[19]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"Will extinguish a flame."}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={20}
                                active={props.selectedValues[20]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>neon</strong><br/>(substance)"
                                }
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={21}
                                active={props.selectedValues[21]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"~0.0018%"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={22}
                                active={props.selectedValues[22]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"-246"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={23}
                                active={props.selectedValues[23]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"0.900"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={24}
                                active={props.selectedValues[24]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"Will extinguish a flame."}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={25}
                                active={props.selectedValues[25]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={
                                  "<strong>helium</strong><br/>(substance)"
                                }
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={26}
                                active={props.selectedValues[26]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"~0.0005%*"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={27}
                                active={props.selectedValues[27]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"-268"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={28}
                                active={props.selectedValues[28]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"0.179"}
                              />
                            </td>
                            <td
                              className="text-center align-middle"
                              tabIndex={props.tabpopup == false ? 0 : -1}
                            >
                              <TableContentSelection
                                index={29}
                                active={props.selectedValues[29]}
                                updateSelectedValues={
                                  props.updateSelectedValues
                                }
                                tabpopup={props.tabpopup}
                                displayValue={"Will extinguish a flame."}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic8;
