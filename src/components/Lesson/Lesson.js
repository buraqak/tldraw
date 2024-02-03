import React, { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Tooltip from "./../Common/ToolTipComponent";

import TextToSpeech from "../Common/TextToSpeech";
import dateFormat, { masks } from "dateformat";

import { Helmet } from "react-helmet";

import lessonData from "./LessonData";
import Topic0 from "./Topics/Topic0";
import Topic1 from "./Topics/Topic1";
import Topic2 from "./Topics/Topic2";
import Topic3 from "./Topics/Topic3";
import Topic4 from "./Topics/Topic4";
import Topic5 from "./Topics/Topic5";
import Topic6 from "./Topics/Topic6";
import Topic7 from "./Topics/Topic7";
import Topic8 from "./Topics/Topic8";
import Topic9 from "./Topics/Topic9";
import Topic10 from "./Topics/Topic10";
import Topic11 from "./Topics/Topic11";
import Topic12 from "./Topics/Topic12";

import Toolbar from "../Common/Toolbar";
import leftNavData from "../Lesson/LeftNavData";

import { CSSProperties } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Lesson = (props) => {
  const TITLE = "List of OSE Features and its Tutorial";
  const topicRef = useRef(null);
  const updateTtsRef = useRef(null);
  const [lesson_Data, setlesson_Data] = useState(lessonData);

  const [pageinit, setpageinit] = useState(false);

  const [saveflag, setsaveFlag] = useState(false);

  const [t1_1cfns, sett1_1cfns] = useState([]);
  const [t2_1cfns, sett2_1cfns] = useState([]);
  const [t3_1cfns, sett3_1cfns] = useState([]);
  const [t4_1cfns, sett4_1cfns] = useState([]);

  const [actionChooserParent, setActionChooserParent] = useState({
    name: "",

    isStreaming: "",
  });
  var today_date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  var saveExitTeacher = window.parent.document.getElementById("close-btn");

  if (saveExitTeacher != null) {
    saveExitTeacher.addEventListener(
      "click",
      function () {
        props.uploadToSCORM(
          JSON.stringify({
            ...lesson_Data,
            lastvisited: props.currentTopicIndex.toString(),
            ["visit_" + props.currentTopicIndex.toString()]: true,
          })
        );

        const synth = window.speechSynthesis;
        if (synth) synth.cancel();
      },
      false
    );
  }
  var save_exit =
    parent.document.querySelector(".picture-button") ||
    parent.document.querySelector(".resource-button");

  if (save_exit != null) {
    save_exit.addEventListener(
      "click",
      function (e) {
        setTimeout(function () {
          props.scormquit();
        }, 100);
        props.setnextTopicIndex(props.exitloadernumber);
        const synth = window.speechSynthesis;
        if (synth) synth.cancel();
      },

      false
    );
  }
  if (window.parent.location.href.includes("lti")) {
    var ltiExit = parent.document.querySelector(".common-button");
    if (ltiExit != null) {
      ltiExit.addEventListener(
        "click",
        function (e) {
          setTimeout(function () {
            props.scormquit();
          }, 100);
          props.setnextTopicIndex(props.exitloadernumber);
          const synth = window.speechSynthesis;
          if (synth) synth.cancel();
        },
        false
      );
    }
  }
  function delay(ms) {
    var start = +new Date();
    var flag = false;
    while (+new Date() - start < ms) {
      if (!flag) {
        props.uploadToSCORM(
          JSON.stringify({
            ...lesson_Data,
            lastvisited: props.currentTopicIndex.toString(),
            ["visit_" + props.currentTopicIndex.toString()]: true,
          })
        );
      }
      flag = true;
    }
    window.parent.unloadIframeAndSaveCurrentWork();
  }

  function exitDelay(ms) {
    var start = +new Date();
    var flag = false;
    while (+new Date() - start < ms) {
      if (!flag) {
        props.uploadToSCORM(
          JSON.stringify({
            ...lesson_Data,
            lastvisited: props.currentTopicIndex.toString(),
            ["visit_" + props.currentTopicIndex.toString()]: true,
          })
        );
      }
      flag = true;
    }
    props.scormquit();
  }
  const handleShow = () => {
    props.uploadToSCORM(
      JSON.stringify({
        ...lesson_Data,

        lastvisited: props.currentTopicIndex.toString(),

        ["visit_" + props.currentTopicIndex.toString()]: true,
      })
    );

    setShow(true);
  };
  function updateContraintValue(id, value) {
    var constraintMarks = lesson_Data["constraintMarks"];
    constraintMarks[id] = value;
    setlesson_Data({ ...lesson_Data, constraintMarks });
  }
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  var today = new Date();
  var today_date = dateFormat(today, "mmmm d, yyyy");

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const shadow = { background: "rgba(0, 0, 0, .65)" };
  const componentRef = useRef();
  const handleBeforeUnload = (event) => {
    exitDelay(1000);
  };

  useEffect(() => {
    if (window.parent.location.href.includes("student")) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const teacherHandleBeforeUnload = (event) => {
    delay(250);
  };

  useEffect(() => {
    if (window.parent.location.href.includes("teacher")) {
      window.parent.addEventListener("beforeunload", teacherHandleBeforeUnload);
      return () => {
        window.parent.removeEventListener(
          "beforeunload",
          teacherHandleBeforeUnload
        );
      };
    }
  }, [teacherHandleBeforeUnload]);
  function updateNodeData(name, data) {
    let nodeList = lesson_Data["nodeDetails"];
    nodeList[name] = data;
    updateText("nodeDetails", nodeList);
  }
  const uploadCanvassAndGotoNextPage = () => {
    let prms = [];
    t1_1cfns.forEach((f) => {
      prms.push(
        new Promise(function (resolve, reject) {
          resolve(f());
        })
      );
    });
    t2_1cfns.forEach((f) => {
      prms.push(
        new Promise(function (resolve, reject) {
          resolve(f());
        })
      );
    });
    t3_1cfns.forEach((f) => {
      prms.push(
        new Promise(function (resolve, reject) {
          resolve(f());
        })
      );
    });
    t4_1cfns.forEach((f) => {
      prms.push(
        new Promise(function (resolve, reject) {
          resolve(f());
        })
      );
    });

    Promise.all(prms).then((results) => {
      props.setcurrentTopicIndex(props.nextTopicIndex);
    });
  };

  const addtocfns = (page_nbr, seq_nbr, fn) => {
    let x = [];

    x.push(fn);

    page_nbr == 1 && seq_nbr == 1 && sett1_1cfns(x);
    page_nbr == 2 && seq_nbr == 1 && sett2_1cfns(x);
    page_nbr == 3 && seq_nbr == 1 && sett3_1cfns(x);
    page_nbr == 4 && seq_nbr == 1 && sett4_1cfns(x);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "OSE_Unit8.4_Lesson15_Summary",
  });

  useEffect(() => {
    if (props.currentTopicIndex != props.nextTopicIndex) {
      setpageinit(false);

      if (props.currentTopicIndex) {
        props.uploadToSCORM(
          JSON.stringify({
            ...lesson_Data,
            lastvisited: props.currentTopicIndex.toString(),
            ["visit_" + props.currentTopicIndex.toString()]: true,
          })
        );
      }
      if (
        props.currentTopicIndex == 1 ||
        props.currentTopicIndex == 2 ||
        props.currentTopicIndex == 3 ||
        props.currentTopicIndex == 4 ||
        props.currentTopicIndex == props.summarypagenumber
      ) {
        uploadCanvassAndGotoNextPage();
      } else {
        props.setcurrentTopicIndex(props.nextTopicIndex);
      }
      setActionChooserParent({ name: "", isStreaming: "" });
    } else {
      if (
        props.currentTopicIndex != props.printloadernumber &&
        props.currentTopicIndex != props.bookmarkloadernumber &&
        props.currentTopicIndex != props.exitloadernumber
      ) {
        setlesson_Data({
          ...lesson_Data,
          lastvisited: props.currentTopicIndex.toString(),
          ["visit_" + props.currentTopicIndex.toString()]: true,
        });
        props.uploadToSCORM(
          JSON.stringify({
            ...lesson_Data,
            lastvisited: props.currentTopicIndex.toString(),
            ["visit_" + props.currentTopicIndex.toString()]: true,
          })
        );
      }
    }
    if (!pageinit) {
      let str = props.getFromScormStore();
      if (str != null && str != "" && str.length > 0) {
        let LessonData = JSON.parse(str);
        setlesson_Data(LessonData);
        setpageinit(true);
        if (
          props.currentTopicIndex == props.bookmarkloadernumber &&
          props.nextTopicIndex == props.bookmarkloadernumber
        ) {
          setTimeout(function () {
            props.LoadPage(LessonData["lastvisited"]);
          }, 1000);
        }
      } else {
        setTimeout(function () {
          props.LoadPage(0);
        }, 1000);
      }
    }
    if (
      props.currentTopicIndex == props.printloadernumber &&
      props.nextTopicIndex == props.summarypagenumber
    ) {
      setTimeout(function () {
        props.setPrintRefresh(true);
        props.setcurrentTopicIndex(props.summarypagenumber);
      }, 1000);
    }
    if (props.currentTopicIndex == props.printloadernumber) {
      setTimeout(function () {
        props.setnextTopicIndex(props.summarypagenumber);
      }, 1000);
    }
    if (
      props.currentTopicIndex == props.summarypagenumber &&
      props.nextTopicIndex == props.summarypagenumber &&
      props.printRefresh
    ) {
      props.setPrintRefresh(false);
      handlePrint();
    }
  }, [props]);
  function newSummary() {
    var newThing = {
      interpret: "",
      identify: "",
    };
    var summaryDetails = lesson_Data.responseData;
    summaryDetails.push(newThing);
    setlesson_Data({ ...lesson_Data, ["responseData"]: summaryDetails });
  }

  function updateSummary(index, column, value) {
    var summaryDetails = lesson_Data.responseData;
    summaryDetails[index][column] = value;
    setlesson_Data({ ...lesson_Data, ["responseData"]: summaryDetails });
  }

  function removeSummary(index) {
    var summaryDetails = lesson_Data.responseData;
    summaryDetails.splice(index, 1);
    setlesson_Data({ ...lesson_Data, ["responseData"]: summaryDetails });
  }
  function updateSelected(id, value) {
    var selectedValues = lesson_Data["selectedValues"];
    selectedValues[id] = value;
    setlesson_Data({ ...lesson_Data, selectedValues });
  }
  const updateText = (source, t) => {
    source == "cattleTraits" &&
      setlesson_Data({ ...lesson_Data, ["cattleTraits"]: t });
    source == "tulipTraits" &&
      setlesson_Data({ ...lesson_Data, ["tulipTraits"]: t });
    source == "appleTraits" &&
      setlesson_Data({ ...lesson_Data, ["appleTraits"]: t });
    /* source == "stt_1a" && setlesson_Data({ ...lesson_Data, ["stt_1a"]: t });

    source == "stt_3a" && setlesson_Data({ ...lesson_Data, ["stt_3a"]: t });

    source == "textbox_5_1" &&
      setlesson_Data({ ...lesson_Data, ["textbox_5_1"]: t });
    source == "textbox_5_2" &&
      setlesson_Data({ ...lesson_Data, ["textbox_5_2"]: t });
    source == "textbox_5_3" &&
      setlesson_Data({ ...lesson_Data, ["textbox_5_3"]: t });
 */
    /*  source == "cb_7_1" && setlesson_Data({ ...lesson_Data, ["cb_7_1"]: t });
    source == "cb_7_2" && setlesson_Data({ ...lesson_Data, ["cb_7_2"]: t });
    source == "cb_7_3" && setlesson_Data({ ...lesson_Data, ["cb_7_3"]: t });
    source == "cb_7_4" && setlesson_Data({ ...lesson_Data, ["cb_7_4"]: t });
    source == "cb_7_5" && setlesson_Data({ ...lesson_Data, ["cb_7_5"]: t });
    source == "cb_7_6" && setlesson_Data({ ...lesson_Data, ["cb_7_6"]: t });
    source == "cb_7_7" && setlesson_Data({ ...lesson_Data, ["cb_7_7"]: t });
    source == "cb_7_8" && setlesson_Data({ ...lesson_Data, ["cb_7_8"]: t }); */

    source == "graphAnnotation1" &&
      setlesson_Data({ ...lesson_Data, ["graphAnnotation1"]: t });

    source == "canvas_1_1_img_uploaded" &&
      setlesson_Data({ ...lesson_Data, ["canvas_1_1_img_uploaded"]: t });
    source == "canvas_2_1_img_uploaded" &&
      setlesson_Data({ ...lesson_Data, ["canvas_2_1_img_uploaded"]: t });
    source == "canvas_3_1_img_uploaded" &&
      setlesson_Data({ ...lesson_Data, ["canvas_3_1_img_uploaded"]: t });
    source == "canvas_4_1_img_uploaded" &&
      setlesson_Data({ ...lesson_Data, ["canvas_4_1_img_uploaded"]: t });

    source == "hlt_8_1" && setlesson_Data({ ...lesson_Data, ["hlt_8_1"]: t });
    source == "hlt_8_2" && setlesson_Data({ ...lesson_Data, ["hlt_8_2"]: t });
    source == "hlt_8_3" && setlesson_Data({ ...lesson_Data, ["hlt_8_3"]: t });
    source == "hlt_8_4" && setlesson_Data({ ...lesson_Data, ["hlt_8_4"]: t });
    source == "hlt_8_5" && setlesson_Data({ ...lesson_Data, ["hlt_8_5"]: t });
    source == "hlt_8_6" && setlesson_Data({ ...lesson_Data, ["hlt_8_6"]: t });

    source == "hlt_15_1" && setlesson_Data({ ...lesson_Data, ["hlt_15_1"]: t });
    source == "hlt_15_2" && setlesson_Data({ ...lesson_Data, ["hlt_15_2"]: t });
    source == "hlt_15_3" && setlesson_Data({ ...lesson_Data, ["hlt_15_3"]: t });
    source == "hlt_15_4" && setlesson_Data({ ...lesson_Data, ["hlt_15_4"]: t });
    source == "hlt_15_5" && setlesson_Data({ ...lesson_Data, ["hlt_15_5"]: t });
    source == "hlt_15_6" && setlesson_Data({ ...lesson_Data, ["hlt_15_6"]: t });
    source == "hlt_15_7" && setlesson_Data({ ...lesson_Data, ["hlt_15_7"]: t });
    source == "hlt_15_8" && setlesson_Data({ ...lesson_Data, ["hlt_15_8"]: t });
    source == "hlt_15_9" && setlesson_Data({ ...lesson_Data, ["hlt_15_9"]: t });

    source == "hlt_7_1" && setlesson_Data({ ...lesson_Data, ["hlt_7_1"]: t });
    source == "hlt_7_2" && setlesson_Data({ ...lesson_Data, ["hlt_7_2"]: t });
    source == "hlt_7_3" && setlesson_Data({ ...lesson_Data, ["hlt_7_3"]: t });
    source == "hlt_7_4" && setlesson_Data({ ...lesson_Data, ["hlt_7_4"]: t });
    source == "hlt_7_5" && setlesson_Data({ ...lesson_Data, ["hlt_7_5"]: t });
    source == "hlt_7_6" && setlesson_Data({ ...lesson_Data, ["hlt_7_6"]: t });
    source == "hlt_7_7" && setlesson_Data({ ...lesson_Data, ["hlt_7_7"]: t });
    source == "hlt_7_8" && setlesson_Data({ ...lesson_Data, ["hlt_7_8"]: t });
    source == "hlt_7_9" && setlesson_Data({ ...lesson_Data, ["hlt_7_9"]: t });
    source == "hlt_7_10" && setlesson_Data({ ...lesson_Data, ["hlt_7_10"]: t });
  };

  const updateUploadFlag = (pageid, seq_nbr, flag) => {
    updateText("canvas_" + pageid + "_" + seq_nbr + "_img_uploaded", flag);
  };
  const updateImageSequence = (index, id) => {
    var imageAlignedArray = { ...lesson_Data.imageAlignedArray };
    imageAlignedArray[index] = id;
    setlesson_Data({ ...lesson_Data, imageAlignedArray });
  };
  if (props.currentTopicIndex == 0) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic0
          leftshift={props.leftshift}
          updateText={updateText}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 1) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          nptxt={lesson_Data["nptxt1"]}
          summarypagenumber={props.summarypagenumber}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic1
          leftshift={props.leftshift}
          updateText={updateText}
          pageid={1}
          setcurrentTopicIndex={props.setcurrentTopicIndex}
          nextTopicIndex={props.nextTopicIndex}
          currentTopicIndex={props.currentTopicIndex}
          addtocfns={addtocfns}
          mode={props.mode}
          canvasstr_1_1={lesson_Data["canvasstr_1_1"]}
          canvasstr_1_1_ori={lesson_Data["canvasstr_1_1_ori"]}
          updateUploadFlag={updateUploadFlag}
          canvas_1_1_img_uploaded={lesson_Data["canvas_1_1_img_uploaded"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 2) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt2"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic2
          leftshift={props.leftshift}
          updateText={updateText}
          pageid={2}
          setcurrentTopicIndex={props.setcurrentTopicIndex}
          nextTopicIndex={props.nextTopicIndex}
          currentTopicIndex={props.currentTopicIndex}
          addtocfns={addtocfns}
          mode={props.mode}
          canvasstr_2_1={lesson_Data["canvasstr_2_1"]}
          canvasstr_2_1_ori={lesson_Data["canvasstr_2_1_ori"]}
          updateUploadFlag={updateUploadFlag}
          canvas_2_1_img_uploaded={lesson_Data["canvas_2_1_img_uploaded"]}
          actionChooser={actionChooserParent}
          updateActionChooser={setActionChooserParent}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 3) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          summarypagenumber={props.summarypagenumber}
          updateText={updateText}
          nptxt={lesson_Data["nptxt3"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic3
          leftshift={props.leftshift}
          updateText={updateText}
          pageid={3}
          setcurrentTopicIndex={props.setcurrentTopicIndex}
          nextTopicIndex={props.nextTopicIndex}
          currentTopicIndex={props.currentTopicIndex}
          addtocfns={addtocfns}
          mode={props.mode}
          canvasstr_3_1={lesson_Data["canvasstr_3_1"]}
          canvasstr_3_1_ori={lesson_Data["canvasstr_3_1_ori"]}
          updateUploadFlag={updateUploadFlag}
          canvas_3_1_img_uploaded={lesson_Data["canvas_3_1_img_uploaded"]}
          actionChooser={actionChooserParent}
          updateActionChooser={setActionChooserParent}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 4) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          summarypagenumber={props.summarypagenumber}
          updateText={updateText}
          nptxt={lesson_Data["nptxt4"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic4
          leftshift={props.leftshift}
          updateText={updateText}
          pageid={4}
          setcurrentTopicIndex={props.setcurrentTopicIndex}
          nextTopicIndex={props.nextTopicIndex}
          currentTopicIndex={props.currentTopicIndex}
          addtocfns={addtocfns}
          mode={props.mode}
          canvasstr_4_1={lesson_Data["canvasstr_4_1"]}
          canvasstr_4_1_ori={lesson_Data["canvasstr_4_1_ori"]}
          updateUploadFlag={updateUploadFlag}
          canvas_4_1_img_uploaded={lesson_Data["canvas_4_1_img_uploaded"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 5) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          summarypagenumber={props.summarypagenumber}
          updateText={updateText}
          LessonToolbar={leftNavData.LessonToolbar}
          nptxt={lesson_Data["nptxt5"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic5
          leftshift={props.leftshift}
          updateText={updateText}
          nodeList={lesson_Data.nodeDetails?.nodes}
          edgesList={lesson_Data.nodeDetails?.edges}
          updateNodesOfList={updateNodeData}
          nptxt5={lesson_Data["nptxt5"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 6) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt6"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic6
          leftshift={props.leftshift}
          updateText={updateText}
          cattleTraits={lesson_Data["cattleTraits"]}
          tulipTraits={lesson_Data["tulipTraits"]}
          appleTraits={lesson_Data["appleTraits"]}
          setcurrentTopicIndex={props.setcurrentTopicIndex}
          nextTopicIndex={props.nextTopicIndex}
          currentTopicIndex={props.currentTopicIndex}
          addtocfns={addtocfns}
          mode={props.mode}
          updateUploadFlag={updateUploadFlag}
          nptxt6={lesson_Data["nptxt6"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 7) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt7"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic7
          leftshift={props.leftshift}
          updateText={updateText}
          updateImageSequence={updateImageSequence}
          imageAlignedArray={lesson_Data["imageAlignedArray"]}
          nptxt9={lesson_Data["nptxt9"]}
          actionChooser={actionChooserParent}
          updateActionChooser={setActionChooserParent}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 8) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt8"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic8
          leftshift={props.leftshift}
          updateText={updateText}
          hlt_8_1={lesson_Data["hlt_8_1"]}
          hlt_8_2={lesson_Data["hlt_8_2"]}
          hlt_8_3={lesson_Data["hlt_8_3"]}
          hlt_8_4={lesson_Data["hlt_8_4"]}
          hlt_8_5={lesson_Data["hlt_8_5"]}
          hlt_8_6={lesson_Data["hlt_8_6"]}
          hlt_15_1={lesson_Data["hlt_15_1"]}
          hlt_15_2={lesson_Data["hlt_15_2"]}
          hlt_15_3={lesson_Data["hlt_15_3"]}
          hlt_15_4={lesson_Data["hlt_15_4"]}
          hlt_15_5={lesson_Data["hlt_15_5"]}
          hlt_15_6={lesson_Data["hlt_15_6"]}
          hlt_15_7={lesson_Data["hlt_15_7"]}
          hlt_15_8={lesson_Data["hlt_15_8"]}
          hlt_15_9={lesson_Data["hlt_15_9"]}
          hlt_7_1={lesson_Data["hlt_7_1"]}
          hlt_7_2={lesson_Data["hlt_7_2"]}
          hlt_7_3={lesson_Data["hlt_7_3"]}
          hlt_7_4={lesson_Data["hlt_7_4"]}
          hlt_7_5={lesson_Data["hlt_7_5"]}
          hlt_7_6={lesson_Data["hlt_7_6"]}
          hlt_7_7={lesson_Data["hlt_7_7"]}
          hlt_7_8={lesson_Data["hlt_7_8"]}
          hlt_7_9={lesson_Data["hlt_7_9"]}
          hlt_7_10={lesson_Data["hlt_7_10"]}
          nptxt8={lesson_Data["nptxt8"]}
          selectedValues={lesson_Data["selectedValues"]}
          updateSelectedValues={updateSelected}
          actionChooser={actionChooserParent}
          updateActionChooser={setActionChooserParent}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 9) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt9"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic9
          leftshift={props.leftshift}
          updateText={updateText}
          graphAnnotation1={lesson_Data["graphAnnotation1"]}
          nptxt7={lesson_Data["nptxt7"]}
          actionChooser={actionChooserParent}
          updateActionChooser={setActionChooserParent}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 10) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          nptxt={lesson_Data["nptxt10"]}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic10
          leftshift={props.leftshift}
          updateText={updateText}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 11) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic11
          leftshift={props.leftshift}
          updateText={updateText}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  } else if (props.currentTopicIndex == 12) {
    return (
      <>
        <Toolbar
          setLeftshift={props.setLeftshift}
          getCurrentTopic={props.getCurrentTopic}
          currentTopicIndex={props.currentTopicIndex}
          getCurrentGroupName={props.getCurrentGroupName}
          LessonToolbar={leftNavData.LessonToolbar}
          updateText={updateText}
          summarypagenumber={props.summarypagenumber}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          actionChooser={actionChooserParent}
          onPlay={topicRef.current ? topicRef.current.play : null}
          onPause={topicRef.current ? topicRef.current.pause : null}
          onStop={topicRef.current ? topicRef.current.stop : null}
          ref={updateTtsRef}
        />
        <Topic12
          leftshift={props.leftshift}
          updateText={updateText}
          setTabPopup={props.setTabPopup}
          tabpopup={props.tabpopup}
          ref={topicRef}
          ttsEnd={updateTtsRef.current ? updateTtsRef.current.ttsEnd : null}
        />
      </>
    );
  }
  <Modal
    show={show}
    onHide={handleClose}
    className="name-modal"
    aria-labelledby="contained-modal-title-vcenter"
    data-backdrop="static"
    centered
    style={{ ...shadow }}
  >
    <Modal.Header>
      <Modal.Title id="student_name">Enter Full Name</Modal.Title>
    </Modal.Header>
    <Modal.Body className="pdf-download-modal">
      <textarea
        name="studentfname"
        onChange={(e) => {
          setFname(e.target.value);
        }}
        value={fname}
        className="form-control"
        rows="1"
        placeholder="First Name"
      ></textarea>
      <br />
      <textarea
        name="studentlname"
        onChange={(e) => {
          setLname(e.target.value);
        }}
        value={lname}
        className="form-control"
        rows="1"
        placeholder="Last Name"
      ></textarea>
      <br />
      <div className="text-end submit">
        <Button
          variant="primary"
          disabled={fname.length < 1}
          onClick={() => {
            props.setnextTopicIndex(props.printloadernumber);
            handleClose();
          }}
        >
          Go
        </Button>
      </div>
    </Modal.Body>
  </Modal>;
  if (props.currentTopicIndex == props.bookmarkloadernumber) {
    return (
      <div className="spinners-loader">
        <FadeLoader
          color={"#2a7411"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{
            display: "block",
            margin: "0 auto",
            position: "absolute",
            top: "266px",
            left: "0",
            right: "0",
          }}
        />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Setting up the lesson...
        </p>
      </div>
    );
  } else if (props.currentTopicIndex == props.exitloadernumber) {
    setsaveFlag(true);

    return (
      <div className="spinners-loader">
        <FadeLoader
          color={"#2a7411"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{
            display: "block",
            margin: "0 auto",
            position: "absolute",
            top: "266px",
            left: "0",
            right: "0",
          }}
        />
      </div>
    );
  }
};
export default Lesson;
