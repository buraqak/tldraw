import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import ttsConfigData from "../ttsConfigData";

import TextToSpeech from "../../Common/TextToSpeech";
import GraphComponent from "../../Common/GraphComponent.js";

import Modal from "react-bootstrap/Modal";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js";

const Topic4 = forwardRef((props, ref) => {
  const shadow = { background: "rgba(0, 0, 0, .65)" };
  const [resourceName, setResourceName] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [resourceType, setResourceType] = useState(null);
  const handleShow = (str, type) => {
    setResourceName(str);

    setResourceType(type);

    setShow(true);
  };
  const { width, height } = useWindowDimensions();

  const [numPages, setNumPages] = useState(null);

  const [source, setSource] = useState(props.src);

  const [pageNumber, setPageNumber] = useState(1);

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    function useWindowDimensions() {
      const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
      );

      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }, []);

      return windowDimensions;
    }

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;

      return {
        width,

        height,
      };
    }
    return {
      width,

      height,
    };
  }
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
  const video1Ref = useRef(null);

  useEffect(() => {
    document.title = "List of OSE Features and its Tutorial";
  }, []);

  function onPlay(e) {
    var players = [];

    stop(); // +++  Determine the available player IDs +++//

    for (var x = 0; x < Object.keys(videojs.players).length; x++) {
      // Assign the player name to setPlayer

      var setPlayer = Object.keys(videojs.players)[x]; // Define the ready event for the player

      var playerData = videojs.getPlayer(setPlayer);

      if (playerData != undefined) {
        players.push(playerData);
      }
    } // Determine which player the event is coming from

    var id = e.ref.id_; // Loop through the array of players

    for (var i = 0; i < players.length; i++) {
      // Get the player(s) that did not trigger the play event

      if (players[i].id() != id) {
        // Pause the other player(s)

        videojs.getPlayer(players[i].id()).pause();
      }
    }
  }

  const handlePlayerReady = (player) => {
    var playerId = player.ref;

    playerId.on("waiting", () => {
      videojs.log("player is waiting");
    });

    playerId.on("play", () => {
      onPlay(player);
    });

    playerId.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
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
    <TextToSpeech ref={ttsRef} updateTtsState={props.ttsEnd}>
      <div className={props.leftshift ? "content-area" : "content-area"}>
        <div className="page-introduce-puzzling-phenomenon">
          <div className="icon-text-group">
            <div className="text-box">
              <div className="border pdf-form-outer">
                <div className="row">
                  <div className="drawing-section ">
                    <GraphComponent
                      nextTopicIndex={props.nextTopicIndex}
                      pageid={props.pageid}
                      canvasImageFileId={props.canvasstr_4_1}
                      canvasDefaultFileId={props.canvasstr_4_1_ori}
                      currentTopicIndex={props.currentTopicIndex}
                      setcurrentTopicIndex={props.setcurrentTopicIndex}
                      gotoflag={props.gotoflag}
                      delaysec={props.delaysec}
                      addtocfns={props.addtocfns}
                      mode={props.mode}
                      getNotPadFromSCORM={props.getNotPadFromSCORM}
                      seq_nbr={1}
                      img_seq_nbr={4}
                      canvas_img_uploaded={props.canvas_4_1_img_uploaded}
                      updateUploadFlag={props.updateUploadFlag}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal-fullscreen full-popup-reader"
        show={show}
        onHide={handleClose}
        dialogClassName="modal-fullscreen"
        style={{ ...shadow }}
      >
        <Modal.Header>
          <button type="button" className="btn-close" onClick={handleClose}>
            <img src="./img/close-white.svg" alt="close" title="close" />
          </button>
        </Modal.Header>

        <Modal.Body>
          {resourceType == "video" ? (
            <iframe
              className="video-frame1"
              src={resourceName}
              webkitallowfullscreen={"true"}
              mozallowfullscreen={"true"}
              allowFullScreen={true}
            ></iframe>
          ) : (
            <div>
              {width > 400 ? (
                <object
                  type="application/pdf"
                  width="100%"
                  height="750"
                  data={resourceName}
                ></object>
              ) : (
                <div>
                  <Document
                    file={resourceName}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>

                  {show ? (
                    <p>
                      Page {pageNumber} of {numPages}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </TextToSpeech>
  );
});
export default Topic4;
