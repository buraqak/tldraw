import { useState, useEffect, lazy, Suspense } from "react";
import Layout from "./components/Common/Layout";
import leftNavData from "./components/Lesson/LeftNavData";
import SpinnerLoader from "./components/Common/Spinner-Loader";
import { SCORM } from "pipwerks-scorm-api-wrapper";
SCORM.init();
import axios from "axios";
const Header = lazy(() => import("./components/Common/Header"));
const NavSection = lazy(() => import("./components/Common/NavSection"));
const Footer = lazy(() => import("./components/Common/Footer"));
const MobileHeader = lazy(() => import("./components/Common/MobileHeader"));
import Lesson from "./components/Lesson/Lesson";
import FadeLoader from "react-spinners/FadeLoader";
import lessonData from "./components/Lesson/LessonData";
import LengthContext from "./components/Common/lengthContext";
import { useBeforeunload } from "react-beforeunload";
import graph_canvas from "./graphAsBase64";
import graph_canvas1 from "./graphAsBase641";

const App = () => {
  const [lengthOfContent, setLengthOfContent] = useState(0);
  const [tabpopup, setTabPopup] = useState(false);

  const emty_canvas_base64str =
    "data:image/png;base64,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";

  const [printRefresh, setPrintRefresh] = useState(false);

  const [summarypagenumber, setSummarypagenumber] = useState(12);
  const [printloadernumber, setPrintloadernumber] = useState(13);
  const [bookmarkloadernumber, setBookmarkloadernumber] = useState(14);
  const [exitloadernumber, setExitloadernumber] = useState(15);

  const [currentTopicIndex, setcurrentTopicIndex] =
    useState(bookmarkloadernumber);
  const [nextTopicIndex, setnextTopicIndex] = useState(bookmarkloadernumber);

  const [currentGroupName, setcurrentGroupName] = useState("");
  const [currentTopic, setcurrentTopic] = useState("");
  const [leftshift, setLeftshift] = useState(true);
  const [currentlyExpandedGroup, setCurrentlyExpandedGroup] = useState("");
  const [SDready, setSDready] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [visitDataReady, setVisitDataReady] = useState(false);

  const [visitFlagArr, setvisitFlagArr] = useState([]);

  const loadVisitFlagData = () => {
    let prms = [];

    prms.push(
      new Promise(function (resolve, reject) {
        let mode = getMode();

        let fetch_data = null;

        if (mode == "local") {
          fetch_data = localStorage.getItem("lesson_data");
          if (
            fetch_data != undefined &&
            fetch_data != null &&
            fetch_data != "" &&
            fetch_data.length > 0
          ) {
            let rec = JSON.parse(fetch_data);

            let temp = [];

            for (let i = 0; i <= summarypagenumber; i++) {
              temp.push(rec["visit_" + i.toString()]);
            }

            setvisitFlagArr(temp);

            resolve(true);
          } else {
            let temp = [];

            for (let i = 0; i <= summarypagenumber; i++) {
              temp.push(false);
            }

            setvisitFlagArr(temp);

            resolve(true);
          }
        } else if (mode == "stage" || mode == "prod" || mode == "prod_new") {
          fetch_data = SCORM.get("cmi.suspend_data");

          if (
            fetch_data != undefined &&
            fetch_data != null &&
            fetch_data != "" &&
            fetch_data.length > 0
          ) {
            let rec = JSON.parse(fetch_data);

            let temp = [];

            for (let i = 0; i <= summarypagenumber; i++) {
              temp.push(rec["visit_" + i.toString()]);
            }

            setvisitFlagArr(temp);

            resolve(true);
          } else {
            let temp = [];

            for (let i = 0; i <= summarypagenumber; i++) {
              temp.push(false);
            }

            setvisitFlagArr(temp);

            resolve(true);
          }
        }
      })
    );

    Promise.all(prms).then((results) => {
      setVisitDataReady(true);
    });
  };

  const updateVisitFlag = (id) => {
    let temp = visitFlagArr;

    temp[id] = true;

    setvisitFlagArr(temp);
  };
  const addOrremoveToCurrentlyExpandedGroups = (g) => {
    currentlyExpandedGroup == g
      ? setCurrentlyExpandedGroup("")
      : setCurrentlyExpandedGroup(g);
  };

  const checkForExpand = (id) => {
    return currentlyExpandedGroup == id;
  };

  const getMode = () => {
    //return "local";
    if (sessionStorage.getItem("mode") !== null) {
      return sessionStorage.getItem("mode");
    } else {
      if (window.location.href.includes("http://localhost")) {
        sessionStorage.setItem("mode", "local");
        return "local";
      } else if (
        window.location.href.includes(
          "https://stage.carolinascienceonline.com/"
        )
      ) {
        sessionStorage.setItem("mode", "stage");
        return "stage";
      } else if (
        window.location.href.includes("https://carolinascienceonline.com/")
      ) {
        sessionStorage.setItem("mode", "prod");
        return "prod";
      } else if (
        window.location.href.includes("https://prod.carolinascienceonline.com/")
      ) {
        sessionStorage.setItem("mode", "prod_new");
        return "prod_new";
      }
    }
  };

  const getCurrentTopic = () => {
    return currentTopic;
  };
  const getCurrentGroupName = () => {
    return currentGroupName;
  };

  function getSuspendedDataLength() {
    var fetchData;
    let mode = getMode();
    if (mode == "local") fetchData = localStorage.getItem("lesson_data");
    else if (mode == "stage" || mode == "prod" || mode == "prod_new") {
      fetchData = SCORM.get("cmi.suspend_data");
    }
    if (fetchData) setLengthOfContent(fetchData.length);
  }

  const getVisitedFlag = (id) => {
    return visitFlagArr[id];
  };

  if (window.parent.location.href.includes("teacher")) {
    useBeforeunload(() => saveSessionTime());
  }

  const saveSessionTime = () => {
    SCORM.quit();
  };

  const getFromScormStore = () => {
    let fetch_data = null;

    let mode = getMode();

    if (mode == "local") {
      fetch_data = localStorage.getItem("lesson_data");

      if (
        fetch_data != undefined &&
        fetch_data != null &&
        fetch_data != "" &&
        fetch_data.length > 0
      ) {
        return fetch_data;
      } else return "";
    } else if (mode == "stage" || mode == "prod" || mode == "prod_new") {
      fetch_data = SCORM.get("cmi.suspend_data");

      if (
        fetch_data != undefined &&
        fetch_data != null &&
        fetch_data != "" &&
        fetch_data.length > 0
      ) {
        return fetch_data;
      } else return "";
    } else return "";
  };

  const uploadToSCORM = (s) => {
    let mode = getMode();

    if (mode == "local") localStorage.setItem("lesson_data", s);
    else SCORM.set("cmi.suspend_data", s);
    SCORM.save();
    getSuspendedDataLength();
  };

  function removeInlineStyleFromBody() {
    var parent = document.getElementsByTagName("body")[0];
    var box = document.getElementsByClassName("modal-backdrop fade show");
    if (parent.style) {
      parent.removeAttribute("style");
    }
    if (box && box.length > 0) {
      for (var index = 0; index < box.length; index++) {
        box[index].setAttribute("class", "");
      }
    }
  }

  const goToPage = (id, group, topic) => {
    if (id != currentTopicIndex) {
      removeInlineStyleFromBody();
      setcurrentTopic(topic);
      setcurrentGroupName(group);
      updateVisitFlag(id);
      setnextTopicIndex(id);
    }
  };

  const moveToNextPage = () => {
    document.getElementById("logo1").focus();
    leftNavData.Groups.map((g) => {
      if (g.Topics.length == 0) {
        if (parseInt(g.id) - 1 == currentTopicIndex) {
          goToPage(g.id, g.GroupName, g.GroupName);
          setCurrentlyExpandedGroup(g.GroupName);
        }
      } else {
        g.Topics.map((t) => {
          if (parseInt(t.id) - 1 == currentTopicIndex) {
            goToPage(t.id, t.GroupName, t.Name);
            setCurrentlyExpandedGroup(g.GroupName);
          }
        });
      }
    });
  };

  const initCanvas = (canvas_nbr_arr) => {
    let mode = getMode();
    var defaultCanvas = { version: "5.2.4", objects: [], background: "white" };
    let new_data = lessonData;
    let needCanvasInit = false;
    let str = getFromScormStore();
    if (str.length > 0) {
      let LessonData = JSON.parse(str);
      if (!LessonData["canvas_init"]) needCanvasInit = true;
    } else needCanvasInit = true;
    if (needCanvasInit) {
      let prms = [];
      if (mode == "local") {
        canvas_nbr_arr.forEach((r) => {
          prms.push(
            new Promise(function (resolve, reject) {
              let min = 1000000;
              let max = 8000000;
              let random = Math.round(min + Math.random() * (max - min));
              let img_key = "img_base64_" + random.toString() + "_" + r;

              if (r == "4_1_ori") {
                localStorage.setItem(img_key, graph_canvas);
              } else if (r == "4_1") {
                localStorage.setItem(img_key, JSON.stringify(defaultCanvas));
              } else if (r == "2_1_ori")
                localStorage.setItem(img_key, graph_canvas1);
              else if (r == "2_1")
                localStorage.setItem(img_key, JSON.stringify(defaultCanvas));
              else localStorage.setItem(img_key, emty_canvas_base64str);

              resolve({ ["canvasstr" + "_" + r]: img_key });
            })
          );
        });
      } else if (mode == "prod" || mode == "stage" || mode == "prod_new") {
        var b64str = null;
        canvas_nbr_arr.forEach(async (r) => {
          prms.push(
            new Promise(async function (resolve, reject) {
              if (r == "4_1_ori") {
                b64str = graph_canvas;
              } else if (r == "4_1") {
                var file = new Blob([JSON.stringify(defaultCanvas)], {
                  type: "application/json",
                });
              } else if (r == "2_1_ori") {
                b64str = graph_canvas1;
              } else b64str = emty_canvas_base64str;
              if (b64str) {
                var blobBin = atob(b64str.split(",")[1]);
                var array = [];
                for (var i = 0; i < blobBin.length; i++) {
                  array.push(blobBin.charCodeAt(i));
                }
                var file = new Blob([new Uint8Array(array)], {
                  type: "image/png",
                });
              }
              const data = new FormData();
              data.append("file", file);

              if (mode == "stage")
                var url =
                  "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/";
              else if (mode == "prod")
                var url =
                  "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT/";
              else if (mode == "prod_new")
                var url =
                  "https://prod.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/";

              await axios.post(url, data, {}).then((res) => {
                let img_key = res["data"]["fileId"];
                resolve({ ["canvasstr" + "_" + r]: img_key });
              });
            })
          );
        });
      }
      Promise.all(prms).then((results) => {
        results.forEach((r) => {
          new_data = {
            ...new_data,
            ...r,
            ["canvas_init"]: true,
          };
        });
        uploadToSCORM(JSON.stringify(new_data));
        setCanvasReady(true);
      });
    } else setCanvasReady(true);
  };

  const moveToPrevPage = () => {
    leftNavData.Groups.map((g) => {
      if (g.Topics.length == 0) {
        if (parseInt(g.id) + 1 == currentTopicIndex) {
          goToPage(g.id, g.GroupName, g.GroupName);
          setCurrentlyExpandedGroup(g.GroupName);
        }
      } else {
        g.Topics.map((t) => {
          if (parseInt(t.id) + 1 == currentTopicIndex) {
            goToPage(t.id, t.GroupName, t.Name);
            setCurrentlyExpandedGroup(g.GroupName);
          }
        });
      }
    });
  };

  useEffect(() => {
    setTimeout(function () {
      setSDready(true);
      //your code to be executed after 1 second
      initCanvas([
        "1_1",
        "1_1_ori",
        "2_1",
        "2_1_ori",
        "3_1",
        "3_1_ori",
        "4_1",
        "4_1_ori",
      ]);
      loadVisitFlagData();
    }, 2000);
  }, []);

  useEffect(() => {
    window.scrollTo(1, 1);
  }, [currentTopicIndex]);

  const LoadPage = (id) => {
    leftNavData.Groups.map((g) => {
      if (g.Topics.length == 0) {
        if (parseInt(g.id) == id) {
          goToPage(g.id, g.GroupName, g.GroupName);
          setCurrentlyExpandedGroup(g.GroupName);
        }
      } else {
        g.Topics.map((t) => {
          if (parseInt(t.id) == id) {
            goToPage(t.id, t.GroupName, t.Name);
            setCurrentlyExpandedGroup(g.GroupName);
          }
        });
      }
    });
  };

  if (canvasReady && SDready && visitDataReady) {
    return (
      <Layout>
        <Suspense fallback={<SpinnerLoader />}>
          <Header
            currentTopic={currentTopic}
            currentTopicIndex={currentTopicIndex}
            currentGroupName={currentGroupName}
            lessonName={leftNavData.Lesson}
            setTabPopup={setTabPopup}
            tabpopup={tabpopup}
          />

          <div
            className={
              currentTopicIndex == 0 ? "content intro-content" : "content"
            }
          >
            <div className="container-fluid">
              <div className="row">
                {
                  <NavSection
                    addOrremoveToCurrentlyExpandedGroups={
                      addOrremoveToCurrentlyExpandedGroups
                    }
                    goToPage={goToPage}
                    setcurrentTopic={setcurrentTopic}
                    leftNavData={leftNavData}
                    setcurrentGroupName={setcurrentGroupName}
                    getVisitedFlag={getVisitedFlag}
                    currentTopicIndex={currentTopicIndex}
                    checkForExpand={checkForExpand}
                    setTabPopup={setTabPopup}
                    tabpopup={tabpopup}
                  />
                }
                <LengthContext.Provider value={lengthOfContent}>
                  <main className="col-md-9 ms-sm-auto col-lg-9 intro-main font-size flex-shrink-0">
                    {/* <ScrollToTop /> */}
                    <MobileHeader
                      day={currentGroupName}
                      title={currentTopic}
                      currentTopicIndex={currentTopicIndex}
                      unitName={"OSE Features and its Tutorial"}
                    />

                    <Lesson
                      mode={getMode()}
                      setcurrentTopicIndex={setcurrentTopicIndex}
                      currentTopicIndex={currentTopicIndex}
                      getFromScormStore={getFromScormStore}
                      uploadToSCORM={uploadToSCORM}
                      nextTopicIndex={nextTopicIndex}
                      leftshift={leftshift}
                      setPrintRefresh={setPrintRefresh}
                      printRefresh={printRefresh}
                      setnextTopicIndex={setnextTopicIndex}
                      getCurrentTopic={getCurrentTopic}
                      getCurrentGroupName={getCurrentGroupName}
                      lessonName={leftNavData.Lesson}
                      setLeftshift={setLeftshift}
                      LoadPage={LoadPage}
                      summarypagenumber={summarypagenumber}
                      printloadernumber={printloadernumber}
                      bookmarkloadernumber={bookmarkloadernumber}
                      exitloadernumber={exitloadernumber}
                      setTabPopup={setTabPopup}
                      tabpopup={tabpopup}
                      scormquit={saveSessionTime}
                    />
                  </main>
                  {/* <div className="col-2"></div> */}
                </LengthContext.Provider>
              </div>
            </div>
          </div>
          <Footer
            TopicsCount={summarypagenumber}
            currentTopicIndex={currentTopicIndex}
            moveToNextPage={moveToNextPage}
            moveToPrevPage={moveToPrevPage}
            summarypagenumber={summarypagenumber}
            setTabPopup={setTabPopup}
            tabpopup={tabpopup}
          />
        </Suspense>
      </Layout>
    );
  } else {
    return (
      <div className="spinners-loader">
        <FadeLoader
          color={"#2a7411"}
          loading={true}
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
          Configuring the application...
        </p>
      </div>
    );
  }
};
export default App;
