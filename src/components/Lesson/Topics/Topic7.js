import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import Tooltip from "../../Common/ToolTipComponent";
import ttsConfigData from "../ttsConfigData";
import TextToSpeech from "../../Common/TextToSpeech";
import TextAreaComponent from "../../Common/TextAreaComponent";
import FormikQuill from "../../Common/FormikQuill";
import { areEqual } from "../../Common/utils";
import ImagePositionValidator from "../../Common/ImagePositionValidator";
import SliderHelp from "../../Common/SliderHelp";
import Modal from "react-bootstrap/Modal";
const Topic7 = forwardRef((props, ref) => {
  useEffect(() => {
    document.title = "OSE Features and its Tutorial";
  }, []);

  const video1Ref = useRef(null);
  const [isShowHelp, setIsShowHelp] = useState(false);
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

  const [updateData, setUpdateData] = useState(null);
  const [textToBeDisplayed, setTextToBeDisplayed] = useState("");
  const [isTried, setIsTried] = useState(false);

  let validImageArray = [
    "a8776a6e1cee74b0190c7864c7047f706", //1
    "a5f1389985bd14ae7b12d33d71ccadd18", //2
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e", //3
    "a8c63f390f8544e86ab597f3630950049", //4
    "a9203c5f4c5d34f5fa6e1e47b3d86788a", //5
    "a2bfbcea9e66346a99965d08c0a866fb8", //6
    "ae5d0d1209cf1429cb88f3c5d4d13e73d", //7
    "ac26f74dea2ea47c094cef1108a74116e", //8
    "a166e6b2bda1e4723a60538afe19e2d90", //9
    "a00de91c638b447eca0d6ad94ea8dfb54", //10
    "a4045bcc54c1f45a9a63662e5b8d564ea", //11
    "ae7ca7387a27f4a22969af097411e7e7a", //12
    "a4e6af6674a7c4a4f85b24b332fda9a73", //13
    "a823a850ed2ce4d39ae21ddb319b960a4", //14
    "a0deeb406d6f4490285c32dd2932ee916", //15
  ];

  function updateImageSequence(index, id) {
    setUpdateData(id);
    props.updateImageSequence(index, id);
  }

  function validateImageAlignment() {
    var valid = areEqual(validImageArray, props.imageAlignedArray);
    return valid;
  }
  const [alignmentValid, setAlignmentValid] = useState(
    validateImageAlignment()
  );

  function validateArray() {
    setTextToBeDisplayed("Validating...");
    if (!isTried) setIsTried(true);
    var result = validateImageAlignment();
    setTimeout(() => {
      setAlignmentValid(result);
      if (result) setTextToBeDisplayed("Correct");
      else setTextToBeDisplayed("Incorrect");
    }, 1000);
  }

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

  const [actionChooser, setActionChooser] = useState(props.actionChooser);

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
        {isShowHelp ? (
          <SliderHelp
            closePopUp={() => setIsShowHelp(false)}
            thingsToShow={{
              pen: true,
            }}
          />
        ) : null}
        <div className="page-introduce-puzzling-phenomenon border pdf-form-outer">
          <p
            className="mb-15 fw-700 py-4 grey-section border-bottom-0 text-center"
            tabIndex={props.tabpopup == false ? 0 : -1}
          >
            <img
              src="./img/CanvasInfo/help_icon_1.png"
              className="cursor-pointer canvas-help-icon help_icon_35 position-absolute slider-help-icon"
              title={"Help"}
              onClick={() => setIsShowHelp(true)}
            />
            <span>Sequence Lunar Eclipse Images</span>
          </p>
          <p className="pb-10" tabIndex={props.tabpopup == false ? 0 : -1}>
            You will examine some lunar eclipse images. The 15 images you'll see
            are from 15 different moments in time, but they are out of order.
          </p>
          <p className="pb-15" tabIndex={props.tabpopup == false ? 0 : -1}>
            Use the following activity to view the images or use the{" "}
            <span className="text-i">
              Student Images of Lunar Eclipse Slideshow
            </span>{" "}
            provided by your teacher.
          </p>
          <p
            className="mb-20 fw-700 text-center pb-10 pt-10 slider box-cta-inner"
            tabIndex={props.tabpopup == false ? 0 : -1}
          >
            Student Images of Lunar Eclipse
          </p>

          <div className="icon-text-group">
            <div className="icon"></div>

            <div className="text-box">
              <ul className="pb-20 pl-30 materials-required-listings">
                <li tabIndex={props.tabpopup == false ? 0 : -1}>
                  Order the lunar eclipse images into the correct sequence, from
                  just before it began to just after it ended.
                </li>
                <li tabIndex={props.tabpopup == false ? 0 : -1}>
                  Use the arrows to move through all the eclipse images until
                  you find the one you want.
                </li>
                <li tabIndex={props.tabpopup == false ? 0 : -1}>
                  When you think you have all the images in the correct order,
                  select the submit button to check your work. You may keep
                  trying until you have ordered them all correctly.
                </li>
              </ul>
              {validImageArray &&
              validImageArray.length > 0 &&
              props.imageAlignedArray
                ? validImageArray.map((item, index) => (
                    <ImagePositionValidator
                      id={index}
                      activeSelected={props.imageAlignedArray[index]}
                      updateImageSequence={updateImageSequence}
                      isValid={alignmentValid}
                    />
                  ))
                : null}
              <div className="d-flex justify-content-center align-items-center slider-status">
                {isTried ? (
                  alignmentValid ? (
                    <div className="d-flex justify-content-center align-items-center pt-10 pb-10 pl-20 pr-20 slider-status-box">
                      <span className="mr-10">{textToBeDisplayed}</span>
                      <div className="slider-status-check active"></div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center pt-10 pb-10 pl-20 pr-20 slider-status-box ">
                      <span className="mr-20">{textToBeDisplayed}</span>
                      {textToBeDisplayed != "Validating..." ? (
                        <img
                          className="slider-status-check"
                          src="./img/Icon-Incorrect.svg"
                        ></img>
                      ) : null}
                    </div>
                  )
                ) : null}
                {alignmentValid ? null : (
                  <div className="text-center slider-btn">
                    <button
                      onClick={() => validateArray()}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic7;
