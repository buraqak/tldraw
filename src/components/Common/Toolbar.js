import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Resources from "./Resources";
import ResourcesData from "../Lesson/ResourcesData";
import Draggable from "react-draggable";
import Topic0 from "../Lesson/Topics/Topic0";
import { propTypes } from "react-bootstrap/esm/Image";
import FormikQuill from "../Common/FormikQuill";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";
import Tooltip from "@mui/material/Tooltip";
import { ModalBody } from "react-bootstrap";

const Toolbar = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [currentFontDelta, setcurrentFontDelta] = useState(0);
  const [isDragDisabled, setisDragDisabled] = useState(false);
  const [nopadActive, setnopadActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textBarRef = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const [TTSstatus, setTTSstatus] = useState(false);
  const onBlur = () => {};
  const onChange = (name, val) => {
    props.updateText(name, val);
  };
  const handleChange = (e) => {
    props.updateText(e.target.name, e.target.value);
  };
  const actions = {
    name: "",
    isStreaming: "",
  };
  useEffect(() => {
    if (window.parent && window.parent.CSO_TTS_API) {
      if (window.parent.CSO_TTS_API.isAvailable().value == false) {
        setTTSstatus(true);
      }
    }
  }, []);
  function ttsEnd() {
    setisPlaying(false);
    setisPaused(false);
  }

  useImperativeHandle(ref, () => ({
    ttsEnd,
  }));

  const popup = () => {
    props.setTabPopup(true);
  };

  function stopOtherMedia() {
    var players = [];
    let _videoJs = window.videojs;
    if (_videoJs) {
      // +++  Determine the available player IDs +++//
      for (var x = 0; x < Object.keys(_videoJs.players).length; x++) {
        // Assign the player name to setPlayer
        var setPlayer = Object.keys(_videoJs.players)[x];
        // Define the ready event for the player
        var playerData = _videoJs.getPlayer(setPlayer);
        if (playerData != undefined) {
          players.push(playerData);
        }
      }
      // Determine which player the event is coming from
      // Loop through the array of players
      for (var i = 0; i < players.length; i++) {
        // Get the player(s) that did not trigger the play event
        if (!undefined) {
          if (players[i].id()) {
            // Pause the other player(s)
            _videoJs.getPlayer(players[i].id()).pause();
          }
        }
      }
    }
  }

  function triggerToGA() {
    var gaData = window.parent.dataLayer;
    if (gaData && gaData.length > 1)
      gaData.push({
        event: "add_note",
        resource_type: "HTML5",
        digital_resource: "Unit 8.4",
        product_line: "OSE",
        product: "Unit 8.4 Student Lesson 15",
        lesson: "Lesson 15",
        investigation:
          "How did the solar system get to be the way it is today?",
        media_type: "HTML5",
        role: "student",
        event_type: "in_resource",
      });
  }

  function ttsga() {
    var gaData = window.parent.dataLayer;
    if (gaData && gaData.length > 1)
      gaData.push({
        event: "External_TTS_Start",
        digital_resource: "Unit 8.4",
        product_line: "OSE",
        product: "Unit 8.4 Student Lesson 15",
        lesson: "Lesson 15",
      });
  }

  const closeModal = () => {
    /*     let myModal = document.getElementById("offcanvasNavbarLight");
        var modal = bootstrap.Modal.getInstance(myModal);
        modal.hide(); */
    props.setTabPopup(false);
    //document.getElementsByClassName("offcanvas-backdrop fade show").style.display = "none";
    //element.classList.remove("offcanvas-backdrop fade show");
    document.getElementById("logo1").focus();
  };

  const openModal = () => {
    let myModal = new bootstrap.Modal(
      document.getElementById("offcanvasNavbarLight"),
      {}
    );
    myModal.show();
    popup();
  };

  const [actionChooser, setActionChooser] = useState(actions);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const rightHidebar = () => {
    setIsActive((isActive) => !isActive);
    props.setLeftshift(isActive);
  };

  const notePadText = () => {
    setnopadActive((nopadActive) => !nopadActive);
  };

  const gaEventTracker = (data) => useAnalyticsEventTracker(data);

  var min = 25;
  var max = 29;

  var min = props.currentTopicIndex == 0 ? 25 : 16;

  var max = props.currentTopicIndex == 0 ? 29 : 20;
  var countFontSize = 0;

  const increaseFontSize = () => {
    if (currentFontDelta >= 4) return false;
    setcurrentFontDelta(currentFontDelta + 2);

    var p = document.querySelectorAll(".content-area *");
    for (let i = 0; i < p.length; i++) {
      if (p[i].style.fontSize) {
        var s = parseInt(p[i].style.fontSize.replace("px", ""));
      } else {
        var s = props.currentTopicIndex == 0 ? 25 : 16;
      }
      if (s != max) {
        s += 2;
      }
      p[i].style.fontSize = s + "px";
    }
  };

  function setTextZoom() {
    var p = document.querySelectorAll(".content-area *");
    for (let i = 0; i < p.length; i++) {
      if (p[i].style.fontSize) {
        var s = parseInt(p[i].style.fontSize.replace("px", ""));
      } else {
        var s = props.currentTopicIndex == 0 ? 25 : 16;
      }
      if (s != max) {
        var source = props.currentTopicIndex == 0 ? 25 : 16;
        s = source + currentFontDelta;
      }
      p[i].style.fontSize = s + "px";
    }
  }

  useEffect(() => {
    if (currentFontDelta) setTextZoom();
    setnopadActive(false);
    if (isPlaying || isPaused) {
      setisPlaying(false);
      setisPaused(false);
      props.onStop ? props.onStop() : null;
    }
  }, [props.currentTopicIndex]);

  useEffect(() => {
    if (window.parent && window.parent.CSO_TTS_API) {
      if (window.parent.CSO_TTS_API.isAvailable().value == false) {
        setTTSstatus(true);
      }
    }
  }, []);

  const decreaseFontSize = () => {
    if (currentFontDelta <= 0) return false;

    setcurrentFontDelta(currentFontDelta - 2);

    var p = document.querySelectorAll(".content-area *");
    for (let i = 0; i < p.length; i++) {
      if (p[i].style.fontSize) {
        var s = parseInt(p[i].style.fontSize.replace("px", ""));
      } else {
        var s = props.currentTopicIndex == 0 ? 25 : 16;
      }
      if (s != min) {
        s -= 2;
      }
      if (s == 16) {
        p[i].style.fontSize = "";
        if (p[i].style.length == 0) {
          p[i].removeAttribute("style");
        }
      } else p[i].style.fontSize = s + "px";
    }
  };

  const updateNPadText = (e) => {
    props.updateText(e.target.name, e.target.value);
  };

  const toggleDraggable = () =>
    this.setState((prevState) => ({ disabled: !this.state.disabled }));

  function dragAndStop(data) {
    var h = window.innerHeight;
    if (data.y > h * 0.6) {
      return false;
    }
  }

  return (
    <React.Fragment>
      <Draggable
        handle=".handle"
        nodeRef={textBarRef}
        key={props.currentTopicIndex}
        bounds="#root"
        onDrag={(e) => dragAndStop(e)}
      >
        {props.currentTopicIndex >= 1 &&
        props.currentTopicIndex < props.summarypagenumber ? (
          <div
            className={
              nopadActive
                ? "light-box-notepad notepadBlock"
                : "light-box-notepad"
            }
            user-select="none"
            ref={textBarRef}
          >
            <div className="text-to-speech-section text-to-speech-section-full">
              <div className="text-to-speech-box">
                <div className="text-to-speech-section-box left border-0">
                  <div className="text-to-speech-box-content p-0">
                    <div
                      className="d-flex justify-content-between notepad-header handle"
                      id="handle"
                    >
                      {props.getCurrentGroupName() !=
                      props.getCurrentTopic() ? (
                        <>
                          <div>
                            <span className="fw-600">{"Notes: "}</span>
                            {props.LessonToolbar +
                              ", " +
                              props.getCurrentGroupName()}
                          </div>
                        </>
                      ) : (
                        <div>
                          <>
                            <span className="fw-600">{"Notes: "} </span>{" "}
                            {props.LessonToolbar}{" "}
                          </>
                        </div>
                      )}
                      <div
                        className="d-flex close notepadCursor "
                        onClick={() => {
                          notePadText();
                          gaEventTracker("Notepad");
                        }}
                        onBlur={() => {
                          triggerToGA();
                        }}
                      >
                        <Tooltip title="Close" placement="top">
                          <img
                            src="./img/notepad-close.svg"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                notePadText();
                              }
                            }}
                            tabIndex="0"
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <div
                      className="notepad-content"
                      id="notepadNone"
                      tabIndex="0"
                    >
                      <h5 className="pt-15">{props.getCurrentTopic()}</h5>

                      <FormikQuill
                        id={props.currentTopicIndex}
                        name={"nptxt" + props.currentTopicIndex.toString()}
                        value={props.nptxt}
                        onChange={onChange}
                        onBlur={onBlur}
                        updateAction={(data) => setActionChooser(data)}
                        actionChooser={actionChooser}
                        displaySpeechToText={false}
                        displayTextBarLocation={"bottom"}
                        placeholder={"<Record additional notes here>"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Draggable>

      <div className="right-actions ">
        {/* <div
          className="right-action-switch"
          onClick={rightHidebar}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              rightHidebar();
            }
          }}
        >
          <Tooltip title={isActive ? "Show" : "Hide"} placement="left">
            <img
              id="arrow"
              src={
                isActive
                  ? "./img/arrow-left-white.svg"
                  : "./img/arrow-right-white.svg"
              }
              tabIndex={props.tabpopup == false ? 0 : -1}
            />
          </Tooltip>
        </div>
        <div className="right-action-listings">
          <ul>
            <li>
              <ul className="font-size">
                <Tooltip title="Increase Font " placement="left">
                  <li
                    id="btn-increase"
                    className={currentFontDelta >= 4 ? "notepadDisbled" : ""}
                    onClick={() => {
                      increaseFontSize();
                      gaEventTracker("Increase Font Size");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        increaseFontSize();
                        gaEventTracker("Increase Font Size");
                      }
                    }}
                    tabIndex={
                      isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                    }
                  >
                    <img src="./img/font-increase.svg" />
                  </li>
                </Tooltip>
                <li id="btn-orig" style={{ cursor: "default" }}>
                  <img src="./img/font.svg" />
                </li>
                <Tooltip title="Decrease Font" placement="left">
                  <li
                    id="btn-decrease"
                    className={currentFontDelta <= 0 ? "notepadDisbled" : ""}
                    onClick={() => {
                      decreaseFontSize();
                      gaEventTracker("Decrease Font Size");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        decreaseFontSize();
                        gaEventTracker("Decrease Font Size");
                      }
                    }}
                    tabIndex={
                      isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                    }
                  >
                    <img src="./img/font-decrease.svg" />
                  </li>
                </Tooltip>
              </ul>
            </li>
            <Tooltip title="Add Note" placement="left">
              <li
                className={
                  props.currentTopicIndex >= 1 &&
                  props.currentTopicIndex < props.summarypagenumber
                    ? "notepadCursor"
                    : "notepadDisbled"
                }
                onClick={() => {
                  notePadText();
                  gaEventTracker("Notepad");
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    notePadText();
                    gaEventTracker("Notepad");
                  }
                }}
                tabIndex={isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1}
              >
                <img src="./img/add_note.png" />
              </li>
            </Tooltip>
            {!isPlaying || isPaused ? (
              <Tooltip title="Read Text" placement="left">
                <li
                  tabIndex={
                    isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                  }
                  className={
                    props.currentTopicIndex == props.summarypagenumber ||
                    (props.actionChooser && props.actionChooser.isStreaming) ||
                    TTSstatus
                      ? "notepadDisbled"
                      : "notepadCursor"
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && props.onPlay) {
                      setisPlaying(true);
                      stopOtherMedia();
                      setisPaused(false);
                      ttsga();
                      props.onPlay();
                    }
                  }}
                >
                  <img
                    src="./img/speech.png"
                    onClick={
                      props.actionChooser &&
                      !props.actionChooser.isStreaming &&
                      props.onPlay
                        ? () => {
                            stopOtherMedia();
                            setisPlaying(true),
                              setisPaused(false),
                              ttsga(),
                              props.onPlay();
                          }
                        : null
                    }
                  />
                </li>
              </Tooltip>
            ) : null}
            {isPlaying ? (
              <Tooltip title="Pause playback" placement="left">
                <li
                  tabIndex={
                    isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && props.onPause) {
                      setisPaused(true);
                      setisPlaying(false);
                      props.onPause();
                    }
                  }}
                >
                  <img
                    className="notepadCursor"
                    src="./img/pauseSpeech.svg"
                    onClick={
                      props.onPause
                        ? () => {
                            setisPaused(true),
                              setisPlaying(false),
                              props.onPause();
                          }
                        : null
                    }
                  />
                </li>
              </Tooltip>
            ) : null}

            {props.actionChooser &&
            (!props.actionChooser.name ||
              props.actionChooser.name == "tts" ||
              !props.actionChooser.isStreaming) &&
            (isPlaying || isPaused) ? (
              <Tooltip title="Stop playback" placement="left">
                <li
                  tabIndex={
                    isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && props.onStop) {
                      setisPlaying(false);
                      setisPaused(false);
                      props.onStop();
                    }
                  }}
                >
                  <img
                    className="notepadCursor"
                    src="./img/stopSpeech.svg"
                    onClick={
                      props.onStop
                        ? () => {
                            setisPlaying(false),
                              setisPaused(false),
                              props.onStop();
                          }
                        : null
                    }
                  />
                </li>
              </Tooltip>
            ) : null}
            <li>
              <nav className="navbar" aria-label="Light offcanvas navbar">
                <Tooltip title="Resources" placement="left">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbarLight"
                    aria-controls="offcanvasNavbarLight"
                    tabIndex={
                      isActive ? -1 : 0 || props.tabpopup == false ? 0 : -1
                    }
                    onClick={() => {
                      props.setTabPopup(true);
                      if (isPlaying) {
                        setisPlaying(false), setisPaused(true);
                        props.onPause ? props.onPause() : null;
                      }
                      stopOtherMedia();
                    }}
                  >
                    <span className="navbar-toggler-icon">
                      <img src="./img/resources.png" />
                    </span>
                  </button>
                </Tooltip>
                <div
                  className="offcanvas offcanvas-end canvas-resources"
                  id="offcanvasNavbarLight"
                  aria-labelledby="offcanvasNavbarLightLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="offcanvasNavbarLightLabel"
                    >
                      Resources
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      onClick={() => {
                        closeModal();
                      }}
                      aria-label="Close"
                      tabIndex="0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          closeModal();
                        }
                      }}
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-start flex-grow-1 w-100 canvas-resources-listings">
                      {ResourcesData.map((r) => {
                        return (
                          <Resources
                            id={r.id}
                            key={r.id}
                            type={r.type}
                            name={r.name}
                            svg={r.svg}
                            src={r.src}
                            parent={"Toolbar"}
                            container={"list"}
                            tabpopup={props.tabpopup}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </nav>
            </li>
          </ul>
        </div> */}
      </div>
    </React.Fragment>
  );
});

export default Toolbar;
