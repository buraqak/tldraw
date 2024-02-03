import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { fabric } from "fabric";
import getCursor from "./cursors";
import SelectIcon from "./images/select.svg";
import EraserIcon from "./images/eraser.svg";
import TextIcon from "./images/text.svg";
import PencilIcon from "./images/pencil.svg";
import DeleteIcon from "./images/delete.svg";
import "fabric-history";
import "./eraserBrush";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import FadeLoader from "react-spinners/FadeLoader";
import zIndex from "@mui/material/styles/zIndex";
import CanvasHelp from "./CanvasHelp";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CanvasDraw = (props) => {
  var popUp = false;

  const [canvas, setCanvas] = useState(null);
  const [current_base64file, setCurrent_base64file] = useState("");
  const [enableDeleteIcon, setEnableDeleteIcon] = useState(false);
  const [activeMode, setActiveMode] = useState("");
  const [brushWidth, setBrushWidth] = useState(5);
  const [isShowHelp, setIsShowHelp] = useState(false);
  const [loading, setloading] = useState(3);
  const [isImageAddedinCurrentSession, setImageAddedInCurrentSession] =
    useState(false);
  const [isCleared, setisCleared] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(props.canvas_img_uploaded);
  const [objectAdded, setObjectAdded] = useState(props.canvas_img_uploaded);
  const [enableUndo, setEnableUndo] = useState(false);
  const [fileReaderInfo, setFileReaderInfo] = useState({
    file: "",
    totalPages: null,
    currentPageNumber: 1,
    currentPage: "",
  });

  const [color, setColor] = useState("black");
  const DEFAULT_MSG = "Type your text here";
  const canvasRef = useRef(null);
  const whiteboardRef = useRef(null);

  if (canvas && activeMode != "eraserObject")
    canvas.freeDrawingBrush.color = color;
  const modes = {
    PENCIL: "PENCIL",
    ERASER: "ERASER",
  };

  let options = {
    currentMode: modes.PENCIL,
    currentColor: "#000000",
    currentWidth: brushWidth,
    fill: false,
    group: {},
  };
  options.currentColor = color;

  const handleInput = (event) => {
    setBrushWidth(event.target.value);
  };

  useEffect(() => {
    if (!canvas && canvasRef.current) {
      const canvasData = initCanvas(
        whiteboardRef.current.clientWidth,
        whiteboardRef.current.clientWidth * 0.5
      );
      /* canvasData.clearHistory();
      canvasData._historyInit(); */
      setCanvas(canvasData);
      handleResize(resizeCanvas(canvasData, whiteboardRef.current)).observe(
        whiteboardRef.current
      );
    }
  }, [canvasRef]);

  function clearText() {
    var obj = canvas.getActiveObject();
    if (obj.text === DEFAULT_MSG) {
      obj.selectAll();
      obj.text = "";
      obj.hiddenTextarea.value = "";
      obj.dirty = true;
      obj.setCoords();
      canvas.renderAll();
    }
  }

  function checkToDisableUndo() {
    var allObjects = canvas.getObjects();
    if (allObjects.length == 0) {
      if (!objectAdded && !imageUploaded)
        updateImageAvailabilityToParent(false);
      setEnableUndo(false);
    }
  }

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", (e) => {
        if (!objectAdded) updateImageAvailabilityToParent(true);
        setEnableUndo(true);
      });

      canvas.on("text:editing:entered", clearText);
      /* if (activeMode === "insertText")
        canvas.on("text:editing:exited", onSelectMode(canvas)); */

      canvas.on("path:created", (e) => {
        setEnableUndo(true);
      });

      canvas.on("selection:created", function () {
        setEnableDeleteIcon(true);
      });

      canvas.on("selection:cleared", function () {
        canvas.getObjects().forEach((item) => {
          if (item.get("type") === "image") {
            canvas.sendBackwards(item);
          }
        });
        setEnableDeleteIcon(false);
      });

      canvas.on("history:undo", function () {
        if (imageUploaded) {
          checkBackgroundImageExists(canvas);
        }
        uploadCanvasAndupdateSCORM(true);
        checkToDisableUndo();
      });
    }
  });

  function checkBackgroundImageExists(canvas) {
    var canvasObjects = canvas.getObjects();
    var filteredImages = canvasObjects.filter(
      (data) => data.get("type") === "image"
    );
    if (filteredImages.length == 0 && isImageAddedinCurrentSession) {
      setImageUploaded(false);
      setImageAddedInCurrentSession(false);
    } else if (filteredImages.length == 0 && objectAdded && !setisCleared) {
      setImageUploaded(true);
    } else if (filteredImages.length == 0 && !setisCleared) {
      setImageUploaded(false);
    }
  }

  function setFontColor(textColor) {
    let obj = canvas.getActiveObject();
    if (obj && obj.get("type") == "i-text") {
      if (obj.isEditing) obj.setSelectionStyles({ fill: textColor });
      else {
        obj.set({ fill: textColor });
      }
    } else if (obj && obj.get("type") == "line") {
      obj.set("stroke", textColor);
    } else if (obj && obj.get("type") == "path") {
      obj.set("stroke", textColor);
    } else {
      canvas.discardActiveObject();
      if (activeMode != "insertText" && activeMode != "pencil") {
        draw(canvas);
      }
    }
    canvas.renderAll();
    setColor(textColor);
  }

  function setImageAsBackground() {
    let obj = canvas.getActiveObject();
    if (obj) {
      let source = obj._originalElement.currentSrc;

      fabric.Image.fromURL(source, function (myImg) {
        //i create an extra var for to change some image properties
        var imageToBeMadeAsBackground = myImg.set({
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          width: obj.width,
          height: obj.height,
          angle: obj.angle,
          left: obj.left,
          top: obj.top,
          originX: obj.originX,
          originY: obj.originY,
        });
        canvas.setBackgroundImage(imageToBeMadeAsBackground);
        canvas.renderAll();
        /* if (obj.get("type") === "image") {
          updateImageAvailabilityToParent(false)
        } */
      });
      removeObjectDirectly(obj);
      canvas.historyNextState = canvas._historyNext();
    }
  }

  function loadImage(imageSource) {
    let get_saved_url = null;

    if (props.mode == "local") {
      if (canvas) {
        let b64str = localStorage.getItem(imageSource);
        if (b64str != undefined) {
          var blobBin = atob(b64str.split(",")[1]);
          var array = [];
          for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
          var imge = new Blob([new Uint8Array(array)], { type: "image/png" });
          let imageUrl = URL.createObjectURL(imge);
          if (canvas) {
            fabric.Image.fromURL(imageUrl, (img) => {
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
              });
              canvas.historyNextState = canvas._historyNext();
              props.addtocfns(
                props.pageid,
                props.seq_nbr,
                uploadCanvasAndupdateSCORM
              );
              setTimeout(function () {
                draw(canvas);
              }, 2000);
              setTimeout(function () {
                setloading(3);
                draw(canvas);
              }, 3000);
            });
          }
        }
      }
    } else {
      if (props.mode == "stage") {
        get_saved_url =
          "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
      } else if (props.mode == "prod") {
        get_saved_url =
          "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
      } else if (props.mode == "prod_new") {
        get_saved_url =
          "https://prod.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
      }

      get_saved_url = get_saved_url + "?" + Math.floor(Math.random() * 1000);

      if (canvas) {
        fabric.Image.fromURL(get_saved_url, (img) => {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          });
          canvas.historyNextState = canvas._historyNext();

          props.addtocfns(
            props.pageid,
            props.seq_nbr,
            uploadCanvasAndupdateSCORM
          );
          setTimeout(function () {
            setloading(3);
            draw(canvas);
          }, 1000);
        });
      }
    }
  }

  /*   function removeExistingImage() {
      canvas.getObjects().forEach((item) => {
        if (item.get("type") === "image") {
          canvas.remove(item);
        }
      });
      updateImageAvailabilityToParent(false)
    } */

  useEffect(() => {
    loadImage(props.canvasImageFileId);
  }, [canvas]);

  const uploadCanvasAndupdateSCORM = async (isAutoSave) => {
    var activeObjects = canvas.getActiveObjects();
    if (canvasRef != null && canvasRef.current != null) {
      canvas.discardActiveObject().renderAll();
      var bas64file = canvasRef.current.toDataURL({
        format: "png",
        multiplier: 3,
      });
      if (current_base64file != bas64file) {
        setCurrent_base64file(bas64file);
        if (props.mode == "local") {
          localStorage.setItem(props.canvasImageFileId, bas64file);
        } else if (
          props.mode == "stage" ||
          props.mode == "prod" ||
          props.mode == "prod_new"
        ) {
          var blobBin = atob(bas64file.split(",")[1]);
          var array = [];
          for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
          var file = new Blob([new Uint8Array(array)], { type: "image/png" });
          let url = null;
          if (props.mode == "stage")
            url =
              "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
              props.canvasImageFileId;
          else if (props.mode == "prod")
            url =
              "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
              props.canvasImageFileId;
          else if (props.mode == "prod_new")
            url =
              "https://prod.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
              props.canvasImageFileId;
          const data = new FormData();
          data.append("file", file);
          if (props.canvasImageFileId)
            await axios.put(url, data, {}).then((res) => {});
        }
        /* var file = new Blob([new Uint8Array(array)], { type: "image/png" });
        let url = null;
        if (props.mode == "stage")
          url =
            "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
            props.canvasImageFileId;
        else if (props.mode == "prod")
          url =
            "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
            props.canvasImageFileId;
        else if (props.mode == "prod_new")
          url =
            "https://prod.carolinascienceonline.com/content/ugc/files/FROG_CONTENT/" +
            props.canvasImageFileId;
        const data = new FormData();
        data.append("file", file);
        if (props.canvasImageFileId)
          await axios.put(url, data, {}).then((res) => {}); */
      }
      if (isAutoSave && activeObjects[0])
        canvas.setActiveObject(activeObjects[0]);
      canvas.renderAll();
    }
  };

  const initCanvas = (width, height) => {
    const _canvas = new fabric.Canvas(
      "canvas_" + props.pageid + "_" + props.seq_nbr,
      {
        height,
        width,
        backgroundColor: "white",
      }
    );
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.borderColor = "#4447A9";
    fabric.Object.prototype.cornerColor = "#4447A9";
    fabric.Object.prototype.cornerSize = 6;
    fabric.Object.prototype.padding = 10;
    fabric.Object.prototype.borderDashArray = [5, 5];
    /* options.currentMode = modes.PENCIL;
    _canvas.freeDrawingBrush = new fabric.PencilBrush(_canvas);
    _canvas.freeDrawingBrush.width = brushWidth;
    _canvas.freeDrawingBrush.color = "black";
    _canvas.isDrawingMode = true; */
    return _canvas;
  };

  /* function removeObject(canvas) {
    return (e) => {
      if (options.currentMode === modes.ERASER) {
        var objectType = e.target.get("type");
        if (objectType === "image") {
          updateImageAvailabilityToParent(false)
        }
        options.currentMode = modes.PENCIL;
        canvas.remove(e.target);
        canvas.hoverCursor = null;
      }
    };
  } */

  function removeObjectDirectly(object) {
    for (let index = 0; index < object.length; index++) {
      if (object[index].get("type") == "image") {
        setImageUploaded(false);
        setImageAddedInCurrentSession(false);
      }
      canvas.remove(object[index]);
    }
    canvas.discardActiveObject().renderAll();
    /* var canvasObjects = canvas.getObjects()
    if (canvasObjects && canvasObjects.length < 1 && !props.canvas_img_uploaded) {
      updateImageAvailabilityToParent(false)
    } */
    checkToDisableUndo();
    setActiveMode("selectObject");
  }

  function removeCanvasListener(canvas) {
    if (canvas) {
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    }
  }

  function createText(canvas) {
    removeCanvasListener(canvas);
    canvas.isDrawingMode = false;
    const text = new fabric.IText(DEFAULT_MSG, {
      fontSize: 20,
      fill: options.currentColor,
      editable: true,
      editingBorderColor: "black",
    });
    canvas.add(text);
    /* text.selectAll();
    text.enterEditing(); */
    setActiveMode("insertText");
    /* onSelectMode(canvas); */
    canvas.renderAll();
  }

  function changeToErasingMode(canvas) {
    setActiveMode("eraserObject");
    removeCanvasListener(canvas);
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    options.currentMode = modes.PENCIL;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "white";
    canvas.freeDrawingBrush.width = 10;
  }

  function deleteObject() {
    var obj = canvas.getActiveObjects();
    setActiveMode("deleteObject");
    if (obj) {
      removeObjectDirectly(obj);
    } else {
      removeCanvasListener(canvas);
      options.currentMode = modes.ERASER;
      canvas.isDrawingMode = false;
      canvas.hoverCursor = `url(${getCursor({ type: "eraser" })}), default`;
    }
  }

  function onSelectMode(canvas) {
    options.currentMode = "Select";
    canvas.isDrawingMode = false;
    setActiveMode("selectObject");
    removeCanvasListener(canvas);
    canvas.getObjects().map((item) => item.set({ selectable: true }));
    canvas.hoverCursor = "all-scroll";
  }

  function updateImageAvailabilityToParent(availability) {
    //props.updateUploadFlag(props.pageid, props.seq_nbr, availability);
    setObjectAdded(availability);
  }

  useEffect(() => {
    if (objectAdded != props.canvas_img_uploaded)
      props.updateUploadFlag(props.pageid, props.seq_nbr, objectAdded);
    if (imageUploaded != props.canvas_img_uploaded) {
      props.updateUploadFlag(props.pageid, props.seq_nbr, imageUploaded);
    }
  }, [objectAdded, imageUploaded]);

  function clearCanvas(canvas) {
    setImageUploaded(false);
    updateImageAvailabilityToParent(false);
    setImageAddedInCurrentSession(false);
    setisCleared(true);
    options.currentMode = "Clear";
    canvas.getObjects().forEach((item) => {
      canvas.remove(item);
    });
    canvas.clearHistory();
    loadImage(props.canvasDefaultFileId);
    draw(canvas);
    uploadCanvasAndupdateSCORM();
  }

  function draw(canvas) {
    //  if (options.currentMode !== modes.PENCIL) {
    removeCanvasListener(canvas);
    setActiveMode("pencil");
    //setSaveaction(true);
    options.currentMode = modes.PENCIL;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = brushWidth;
    canvas.freeDrawingBrush.color = color;
    canvas.isDrawingMode = true;
    // }
  }

  function handleResize(callback) {
    const resize_ob = new ResizeObserver(callback);

    return resize_ob;
  }

  function resizeCanvas(canvas, whiteboard) {
    return () => {
      const ratio = canvas.getWidth() / canvas.getHeight();
      const whiteboardWidth = whiteboard.clientWidth;

      const scale = whiteboardWidth / canvas.getWidth();
      const zoom = canvas.getZoom() * scale;
      canvas.setDimensions({
        width: whiteboardWidth,
        height: whiteboardWidth / ratio,
      });
      canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    };
  }

  function undoRecent() {
    canvas.undo();
  }

  function uploadImage(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        let imgWidth = img.width;
        let imgHeight = img.height;
        let canvasWidth = canvas.getWidth();
        let canvasHeight = canvas.getHeight();

        let imgRatio = imgWidth / imgHeight;
        let canvasRatio = canvasWidth / canvasHeight;
        if (imgRatio <= canvasRatio) {
          if (imgHeight > canvasHeight) {
            img.scaleToHeight(canvasHeight * 0.9);
          }
        } else {
          if (imgWidth > canvasWidth) {
            img.scaleToWidth(canvasWidth * 0.9);
          }
        }
        setImageUploaded(true);
        setImageAddedInCurrentSession(true);
        canvas.setBackgroundImage(null);
        canvas.offHistory();
        canvas.add(img);
        img.center();
        canvas.onHistory();
        img.setCoords();
        onSelectMode(canvas);
        uploadCanvasAndupdateSCORM();

        /* canvas.onHistory();
        canvas.clearHistory() */
      });
    };
    options.currentMode = modes.PENCIL;
    onSelectMode(canvas);
    if (file) reader.readAsDataURL(file);
  }

  function changeCurrentWidth(e) {
    const intValue = parseInt(e.target.value);
    options.currentWidth = intValue;
    if (canvas) {
      canvas.freeDrawingBrush.width = intValue;
      let obj = canvas.getActiveObject();
      if (obj && obj.get("type") == "line") {
        obj.set("strokeWidth", intValue);
      } else if (obj && obj.get("type") == "path") {
        obj.set("strokeWidth", intValue);
      }
      canvas.renderAll();
    }
    setBrushWidth(() => intValue);
  }

  function onFileChange(event) {
    updateFileReaderInfo({ file: event.target.files[0], currentPageNumber: 1 });
  }

  function updateFileReaderInfo(data) {
    setFileReaderInfo({ ...fileReaderInfo, ...data });
  }

  function saveCanvas() {
    canvas.discardActiveObject().renderAll();
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "OSE_Canvas" + ".png");
    canvasRef.current.toBlob(function (blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    });
  }
  return (
    <React.Fragment>
      {
        <div
          className="modal modal-fullscreen-sm-down fade"
          id={"removalPopUp" + props.img_seq_nbr}
          tabIndex="-1"
          role="dialog"
          data-backdrop="static"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-sm"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header ">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm{" "}
                </h5>
              </div>
              <div className="modal-body">
                Deleting image will reset the drawing canvas. Conf irm to
                delete.
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    clearCanvas(canvas);
                  }}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {isShowHelp ? (
        <CanvasHelp
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
      <div onMouseLeave={() => uploadCanvasAndupdateSCORM(true)}>
        <div className="drawing-header">
          {loading == 1 ? (
            <>
              <div className="canvas-loading">
                <FadeLoader
                  className="loader"
                  color={"#2a7411"}
                  loading={true}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  cssOverride={{
                    display: "block",
                  }}
                />
                <h6 className="text-center">Setting up the Canvas</h6>
              </div>
            </>
          ) : loading == 2 ? (
            <>
              <div className="canvas-loading">
                <h6 className="text-center">Canvas Ready</h6>
              </div>
            </>
          ) : loading == 3 ? (
            <></>
          ) : (
            <></>
          )}
          <div
            className="d-grid justify-content-center align-items-center drawing-header-navi position-relative"
            id="canvas-popup-design"
          >
            <ul className="d-grid justify-content-center align-items-center drawing-colors">
              <Tooltip title="Red" placement="bottom">
                <li
                  className={
                    color == "Red"
                      ? "color red color-field active"
                      : "color red color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("Red") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Yellow" placement="bottom">
                <li
                  className={
                    color == "yellow"
                      ? "color yellow color-field active"
                      : "color yellow color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("yellow") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Blue" placement="bottom">
                <li
                  className={
                    color == "#10A3DD"
                      ? "color blue color-field active"
                      : "color blue color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("#10A3DD") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Green" placement="bottom">
                <li
                  className={
                    color == "green"
                      ? "color green color-field active"
                      : "color green color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("green") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Orange" placement="bottom">
                <li
                  className={
                    color == "orange"
                      ? "color orange color-field active"
                      : "color orange color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("orange") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Purple" placement="bottom">
                <li
                  className={
                    color == "#951B81"
                      ? "color lavender color-field active"
                      : "color lavender color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("#951B81") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="White" placement="bottom">
                <li
                  className={
                    color == "white"
                      ? "color white color-field active"
                      : "color white color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("white") : null)}
                ></li>
              </Tooltip>
              <Tooltip title="Black" placement="bottom">
                <li
                  className={
                    color == "black"
                      ? "color black color-field active"
                      : "color black color-field"
                  }
                  onClick={() => (loading > 1 ? setFontColor("black") : null)}
                ></li>
              </Tooltip>
            </ul>
            <img
              src="./img/CanvasInfo/help_icon_1.png"
              className="cursor-pointer canvas-help-icon help_icon_35 position-absolute "
              title={"Help"}
              onClick={() => setIsShowHelp(true)}
            />
          </div>
        </div>

        <div className="d-grid align-items-center drawing-body">
          <div className="d-grid-column drawing-navi left">
            <ul className="d-grid justify-content-center align-items-center">
              <Tooltip title="Pen" placement="left">
                <div
                  type="button"
                  className={
                    activeMode == "pencil" ? "button active" : "button"
                  }
                  id="drawPencil"
                  onClick={() => (loading > 1 ? draw(canvas) : null)}
                >
                  <img src="./img/Pencil.svg" disabled={loading == 1} />
                </div>
              </Tooltip>
              <Tooltip title="Add Text" placement="left">
                <li
                  type="button"
                  className={
                    activeMode == "insertText" ? "button active" : "button"
                  }
                  id={"insertText"}
                  onClick={() => (loading > 1 ? createText(canvas) : null)}
                >
                  <img src="./img/drawing-type.svg" disabled={loading == 1} />
                </li>
              </Tooltip>
              <Tooltip title="Select" placement="left">
                <li
                  type="button"
                  id={"selectObject"}
                  className={
                    activeMode == "selectObject" ? "button active" : "button"
                  }
                  onClick={() => (loading > 1 ? onSelectMode(canvas) : null)}
                >
                  <img
                    src="./img/drawing-resizer.svg"
                    disabled={loading == 1}
                  />
                </li>
              </Tooltip>
              <Tooltip title="Erase" placement="left">
                <li
                  type="button"
                  id={"eraser"}
                  className={
                    activeMode == "eraserObject" ? "button active" : "button"
                  }
                  onClick={() =>
                    loading > 1 ? changeToErasingMode(canvas) : null
                  }
                >
                  <img src="./img/drawing-eraser.svg" disabled={loading == 1} />
                </li>
              </Tooltip>
              <Tooltip title="Undo" placement="left">
                <li
                  type="button"
                  id={"undoAction"}
                  onClick={() =>
                    enableUndo && loading > 1 ? undoRecent(canvas) : null
                  }
                >
                  <img
                    src="./img/drawing-undo.svg"
                    disabled={!enableUndo || loading == 1}
                  />
                </li>
              </Tooltip>
              <Tooltip title="Delete" placement="left">
                <li
                  type="button"
                  id={"deleteObject"}
                  className={
                    activeMode == "deleteObject" ? "button active" : "button"
                  }
                  onClick={() =>
                    enableDeleteIcon ? deleteObject(canvas) : null
                  }
                >
                  <img
                    src="./img/Delete-Image.svg"
                    disabled={!enableDeleteIcon}
                  />
                </li>
              </Tooltip>
              {/* <Tooltip title="Set as Background" placement="left">
              <li
                className="button "
                onClick={() => setImageAsBackground(canvas)}
              >
                <img src="./img/Drawing-SetAsBackground.svg" />
              </li>
            </Tooltip> */}
            </ul>
          </div>
          <div className="d-grid-column" style={{ background: "#fff" }}>
            <div id="canvasParent" ref={whiteboardRef}>
              {
                /*               loading ? <SpinnerLoader /> :
                 */ <canvas
                  ref={canvasRef}
                  id={"canvas_" + props.pageid + "_" + props.seq_nbr}
                ></canvas>
              }
            </div>
          </div>
          <div className="d-grid-column drawing-navi right">
            <ul className="d-grid justify-content-center align-items-center">
              <li className="drawing" id="drawPencil">
                <Tooltip title="Line Width">
                  <img src="./img/brush_size.png" className="canvas-cursor" />
                </Tooltip>
              </li>{" "}
              <li>
                <div className="d-flex justify-content-center drawing-range">
                  <input
                    type="range"
                    onInput={changeCurrentWidth}
                    min="1"
                    value={brushWidth}
                    max="100"
                    orient="vertical"
                    className="pen-range"
                    tabIndex="-1"
                    disabled={loading == 1}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center drawing-footer">
          {/* <Tooltip title="Reset">
            <div
              className="mr-20 drawing-save"
              onClick={() => (loading > 1 ? clearCanvas(canvas) : null)}
              disabled={loading == 1}
            >
              <img
                className="drawing-save-icon cursor-pointer"
                src="./img/drawing-reset.svg"
              />
            </div>
          </Tooltip> */}

          {imageUploaded ? (
            <div
              className="upload remove"
              data-bs-toggle="modal"
              data-bs-target={"#removalPopUp" + props.img_seq_nbr}
            >
              <div className="icon">
                <Tooltip title="Clear All">
                  <img
                    className="file"
                    src="./img/drawing-reset.svg"
                    disabled={loading == 1}
                  />
                </Tooltip>
              </div>
              <p className="m-0 fw-300">
                Click here to Clear All and Start Over.
              </p>
            </div>
          ) : (
            <div>
              <div className="upload">
                <div className="icon">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                    tabIndex="-1"
                    disabled={loading == 1}
                  />
                  <Tooltip title="Upload">
                    <img
                      className="file"
                      src="./img/upload.svg"
                      disabled={loading == 1}
                    />
                  </Tooltip>
                </div>

                {imageUploaded ? (
                  <p className="m-0 fw-300">
                    Click on the Clear All button to start over.
                  </p>
                ) : (
                  <p className="m-0 fw-300">Click here to Upload New Image.</p>
                )}
              </div>
            </div>
          )}

          <Tooltip title="Download">
            <div
              type="button"
              className={
                loading == 1 && objectAdded
                  ? "ml-20 drawing-save active"
                  : "ml-20 drawing-save"
              }
              onClick={() => (loading > 1 ? saveCanvas() : null)}
            >
              <img
                className="drawing-save-icon cursor-pointer"
                src="./img/drawing-save.svg"
                disabled={loading < 2}
              />
            </div>
          </Tooltip>
          {/* <div className="ml-35">
            <div
              className="upload remove"
              data-bs-toggle="modal"
              data-bs-target={"#removalPopUp" + props.pageid}
            >
              <div className="icon">
                <Tooltip title="Clear All">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => clearCanvas(canvas)}
                    // disabled={!imageAvailable}
                  >
                    Clear All
                  </button>
                </Tooltip>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CanvasDraw;
