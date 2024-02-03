import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import getCursor from "./cursors";
import SelectIcon from "./images/select.svg";
import EraserIcon from "./images/eraser.svg";
import TextIcon from "./images/text.svg";
import PencilIcon from "./images/pencil.svg";
import DeleteIcon from "./images/delete.svg";
import OpacityHelp from "./OpacityHelp";
import Modal from "react-bootstrap/Modal";
import "fabric-history";
import "./eraserBrush";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import FadeLoader from "react-spinners/FadeLoader";
import resizer from "./resizer";
const GraphComponent1 = (props) => {
  const [isShowHelp, setIsShowHelp] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [enableDeleteIcon, setEnableDeleteIcon] = useState(false);
  const [activeMode, setActiveMode] = useState("");
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(100);

  const [isZoom, setIsZoom] = useState(false);

  const [loading, setloading] = useState(1);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [isImageAddedinCurrentSession, setImageAddedInCurrentSession] =
    useState(false);
  const [isCleared, setisCleared] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(props.canvas_img_uploaded);
  const [objectAdded, setObjectAdded] = useState(props.canvas_img_uploaded);
  const [enableUndo, setEnableUndo] = useState(false);
  const [color, setColor] = useState("black");
  const [getImage, setImage] = useState("");
  const DEFAULT_MSG = "Type your text here";
  const canvasRef = useRef(null);
  const whiteboardRef = useRef(null);
  const [currentBase64, setcurrentBase64] = useState("");
  if (canvas && activeMode != "eraserObject")
    canvas.freeDrawingBrush.color = color;
  const modes = {
    PENCIL: "PENCIL",
    ERASER: "ERASER",
    LINE: "LINE",
  };

  function getMin(x, y) {
    if (x < y) return x;
    else if (y < x) return y;
    else return x;
  }

  function getMax(x, y) {
    if (x < 0 || y < 0) return getMin(x, y);
    else if (x > y) return x;
    else if (y > x) return y;
    else return x;
  }

  function zoomToContents(canvas) {
    if (isZoom) {
      setIsZoom(!isZoom);
    }
    let objects = canvas.getObjects();
    if (canvas.backgroundImage) {
      objects.push(canvas.backgroundImage);
    }
    //first check if there are any elemnts to zoom to
    if (objects.length < 1) {
      return;
    }
    /* if (canvas.getZoom() == 1) {
      return;
    } */
    // reset zoom so pan actions work as expected
    canvas.setZoom(1);

    let activeObject = canvas.getActiveObject();

    //group all the objects
    const group = new fabric.Group(objects); //, { left: 0, top: 0, originX: 'left', originY: 'top' });
    //find the centre of the group on the canvas
    let x = group.left + group.width / 2 - canvas.width / 2;
    let y = group.top + group.height / 2 - canvas.height / 2;
    group.destroy();
    canvas.remove(group);

    //and pan to it
    /* if (canvas.backgroundImage) {
      let bgImage = canvas.backgroundImage
      x = (getMax(bgImage.left, group.left) + (getMax(bgImage.width, group.width) / 2)) - (canvas.width / 2);
      y = (getMax(bgImage.top, group.top) + (getMax(bgImage.height, group.height) / 2)) - (canvas.height / 2);
    } */
    canvas.absolutePan({ x: x, y: y });
    let onlYObjects = canvas.getObjects();
    var selection = new fabric.ActiveSelection(onlYObjects, {
      canvas: canvas,
    });
    canvas.setActiveObject(selection); //selecting all objects...
    canvas.discardActiveObject();
    if (activeObject) canvas.setActiveObject(activeObject);
    //now we need to decide whether width or height should determine the scaling
    //e.g. a portrait box in a landscape canvas (height) needs scaling differently to a portrait box in a portrait canvas (could be height or width)
    //or a landscape box in a portrait canvas (width)
    //work out the distance between the edges of the group and the canvas
    const heightDist = canvas.getHeight() - group.height;
    const widthDist = canvas.getWidth() - group.width;
    let groupDimension = 0;
    let canvasDimension = 0;
    //the smaller the number then that's the side we need to use as a reference to scale
    //either group is inside the canvas (positive number) so the edge closest to the limits of the canvas will be used as the reference scale (smallest positive difference)
    //or the group extends outside the canvas so the edge that extends further will be the reference (large negative number)
    //either way, we want the smallest number
    if (heightDist < widthDist) {
      //height is the reference so need the height to scale to be nearly the height of the canvas
      groupDimension = group.height;
      canvasDimension = canvas.getHeight();
    } else {
      //width is the reference so need the width to scale to be nearly the width of the canvas
      groupDimension = group.width;
      canvasDimension = canvas.getWidth();
    }
    //work out how to scale the group to match the canvas size (then only make it zoom 80% of the way)
    const zoom = (canvasDimension / groupDimension) * 0.9;
    //we've already panned the canvas to the centre of the group, so now zomm using teh centre of teh canvas as teh reference point
    canvas.zoomToPoint({ x: canvas.width / 2, y: canvas.height / 2 }, zoom);
  }

  let dragMode = false;
  function changeToDragMode() {
    setActiveMode("moveObject");
    removeCanvasListener(canvas);

    if (canvas) canvas.discardActiveObject(); // Set the cursor to 'move'
    canvas.defaultCursor = "move";
    canvas.isDrawingMode = false;
    // Loop over all objects and disable events / selectable. We remember its value in a temp variable stored on each object
    canvas.forEachObject(function (object) {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });
    let lastClientX;
    let lastClientY;
    // Discard any active object

    // Remove selection ability on the canvas
    canvas.selection = false;
    removeCanvasListener();
    let isMove = false;
    // When MouseDown fires, we set the state to panning
    canvas.on("mouse:down", (e) => {
      isMove = true;
      lastClientX = e.e.clientX;
      lastClientY = e.e.clientY;
    });
    // When the mouse moves, and we're panning (mouse down), we continue
    canvas.on("mouse:move", (e) => {
      if (isMove && e && e.e) {
        // let delta = new fabric.Point(e.e.movementX, e.e.movementY); // No Safari support for movementX and movementY
        // For cross-browser compatibility, I had to manually keep track of the delta

        // Calculate deltas
        let deltaX = 0;
        let deltaY = 0;
        if (lastClientX) {
          deltaX = e.e.clientX - lastClientX;
        }
        if (lastClientY) {
          deltaY = e.e.clientY - lastClientY;
        }
        // Update the last X and Y values
        lastClientX = e.e.clientX;
        lastClientY = e.e.clientY;

        let delta = new fabric.Point(deltaX, deltaY);
        canvas.relativePan(delta);
        /* canvas.trigger('moved'); */
      }
    });
    canvas.on("mouse:up", function (o) {
      isMove = false;
      /*           onSelectMode(canvas)*/
    });
  }

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
        whiteboardRef.current.clientWidth * 0.7
      );
      // canvasData.clearHistory();
      // canvasData._historyInit();
      // canvasData.includeDefaultValues = false;
      setCanvas(canvasData);
      /* handleResize(resizeCanvas(canvasData, whiteboardRef.current)).observe(
        whiteboardRef.current
      ); */
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
      clearCanvas(canvas);
      if (!objectAdded && !imageUploaded)
        updateImageAvailabilityToParent(false);
      setEnableUndo(false);
    }
  }

  function saveImage(canvas) {}

  useEffect(() => {
    if (props.isSummary && props.graphFlag) {
      var bas64file = canvas.toDataURL({ format: "jpg", multiplier: 1 });
      sessionStorage.setItem(props.canvasImageFileId + "asImage", bas64file);
      props.setGraphFlag(false);
    }
  }, [props.graphFlag]);

  function setOptionValues() {
    let obj = canvas.getActiveObject();
    let existingColor = "black";
    if (obj.stroke) existingColor = obj.stroke;
    let existingOpacity = 1;
    if (obj.opacity) existingOpacity = obj.opacity;
    let existingWidth = 5;
    if (obj.strokeWidth) existingWidth = obj.strokeWidth;
    setBrushOpacity(existingOpacity * 100);
    if (!(obj.get("type") === "i-text")) setBrushWidth(existingWidth);
    setColor(existingColor);
  }

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", (e) => {
        if (!objectAdded) updateImageAvailabilityToParent(true);
        setEnableUndo(true);
        /* saveImage(canvas); */
      });

      canvas.on("object:modified");

      canvas.on("text:editing:entered", clearText);
      /* if (activeMode === "insertText")
        canvas.on("text:editing:exited", onSelectMode(canvas)); */

      canvas.on("path:created", (e) => {
        setEnableUndo(true);
        /* saveImage(canvas); */
      });
      var isObjectMoving = false;
      canvas.on("selection:created", function () {
        setEnableDeleteIcon(true);
        setOptionValues();
      });
      canvas.on("selection:updated", function () {
        setOptionValues();
      });

      canvas.on("object:moving", function (event) {
        isObjectMoving = true;
      });

      canvas.on("selection:cleared", function () {
        canvas.getObjects().forEach((item) => {
          if (item.get("type") === "image") {
            canvas.sendBackwards(item);
          }
        });
        setEnableDeleteIcon(false);
      });

      canvas.on("mouse:up", function (event) {
        //canvas.discardActiveObject();
        if (isObjectMoving) {
          isObjectMoving = false;
          if (!isZoom) {
            zoomToContents(canvas);
            removeCanvasListener(canvas);
          }
        }
      });
      canvas.on("history:undo", function () {
        if (imageUploaded) {
          checkBackgroundImageExists(canvas);
        }
        checkToDisableUndo();
      });

      /* canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.01 ** delta;
        if (zoom > 5) zoom = 5;
        if (zoom < 0.01) {
          zoomToContents(canvas)
          //canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        } else {
          canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
          setCanvasZoom(zoom);
        }
        opt.e.preventDefault();
        opt.e.stopPropagation();
      }); */

      /* else {
       // When we exit dragmode, we restore the previous values on all objects
       canvas.forEachObject(function (object) {
         object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
         object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
       });
       // Reset the cursor
       canvas.defaultCursor = 'default';
       // Remove the event listeners
       canvas.off('mouse:up');
       canvas.off('mouse:down');
       canvas.off('mouse:move');
       // Restore selection ability on the canvas
       canvas.selection = true;
     } */
    }
  }, [canvas]);

  // useEffect(() => {
  //   if (activeMode === "insertLine") {
  //     removeCanvasListener(canvas);
  //     var line, isDown;
  //     canvas.on("mouse:down", function (o) {
  //       isDown = true;
  //       var pointer = canvas.getPointer(o.e);
  //       var points = [pointer.x, pointer.y, pointer.x, pointer.y];
  //       line = new fabric.Line(points, {
  //         strokeWidth: brushWidth,
  //         fill: color,
  //         stroke: color,
  //         originX: "center",
  //         originY: "center",
  //         padding: 5,
  //       });
  //       if (activeMode === "insertLine") canvas.add(line);
  //     });

  //     canvas.on("mouse:move", function (o) {
  //       if (!isDown) return;
  //       if (activeMode === "insertLine") {
  //         var pointer = canvas.getPointer(o.e);
  //         line.set({ x2: pointer.x, y2: pointer.y });
  //         canvas.renderAll();
  //       }
  //     });

  //     canvas.on("mouse:up", function (o) {
  //       if (isDown) {
  //         isDown = false;
  //         setActiveMode("selectObject");
  //         canvas.historyNextState = canvas._historyNext();
  //         removeCanvasListener(canvas);
  //       }
  //     });
  //   }
  // });

  function resetZoom(canvas) {
    if (isZoom == false) {
      canvas.zoomToPoint(
        new fabric.Point(canvas.width / 2, canvas.height / 2),
        canvas.getZoom() / 0.5
      );
      removeCanvasListener(canvas);
      draw(canvas);
      //changeToDragMode(canvas)
    } else {
      zoomToContents(canvas);
    }
    setIsZoom(!isZoom);
  }

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

  function imageHandler(canvas, imageUrl) {
    fabric.Image.fromURL(imageUrl, function (img) {
      let imgWidth = img.width;
      let imgHeight = img.height;
      let canvasWidth = canvas.getWidth();
      let canvasHeight = canvas.getHeight();

      let imgRatio = imgWidth / imgHeight;
      let canvasRatio = canvasWidth / canvasHeight;
      if (imgRatio <= canvasRatio) {
        if (imgHeight > canvasHeight) {
          img.scaleToHeight(canvasHeight);
        }
      } else {
        if (imgWidth > canvasWidth) {
          img.scaleToWidth(canvasWidth);
        }
      }
      canvas.setBackgroundImage(null);
      canvas.offHistory();
      img.set({
        left: 0,
        top: 0,
      });
      canvas.setBackgroundImage(img);
      img.center();
      zoomToContents(canvas);
      canvas.onHistory();
      canvas.renderAll();
    });
  }

  function loadImage(imageSource) {
    let get_saved_url = null;
    let get_background_url = null;
    if (props.mode == "local") {
      if (canvas) {
        let imageUrl;
        let b64str = localStorage.getItem(props.canvasDefaultFileId);
        if (b64str != undefined) {
          var blobBin = atob(b64str.split(",")[1]);
          var array = [];
          for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
          var imge = new Blob([new Uint8Array(array)], { type: "image/png" });
          imageUrl = URL.createObjectURL(imge);
        }
        var data = JSON.parse(localStorage.getItem(imageSource));
        if (!data.backgroundImage) {
          imageHandler(canvas, imageUrl);
        } else {
          fitToCanvas(canvas, data);
        }

        props.addtocfns(
          props.pageid,
          props.seq_nbr,
          uploadCanvasAndupdateSCORM
        );
        setTimeout(function () {
          setloading(2);
          draw(canvas);
        }, 2000);
        setTimeout(function () {
          setloading(3);
          draw(canvas);
        }, 3000);
      }
    } else {
      if (props.mode == "stage") {
        get_saved_url =
          "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
        get_background_url =
          "https://stage.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          props.canvasDefaultFileId;
      } else if (props.mode == "prod") {
        get_saved_url =
          "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
        get_background_url =
          "https://carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          props.canvasDefaultFileId;
      } else if (props.mode == "prod_new") {
        get_saved_url =
          "https://prods.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          imageSource;
        get_background_url =
          "https://prods.carolinascienceonline.com/content/ugc/files/FROG_CONTENT" +
          "/" +
          props.canvasDefaultFileId;
      }
      get_saved_url = get_saved_url + "?" + Math.floor(Math.random() * 1000);
      if (canvas) {
        axios.get(get_saved_url).then((response) => {
          if (!response.data.backgroundImage) {
            imageHandler(canvas, get_background_url);
          } else {
            fitToCanvas(canvas, response.data);
          }
        });
      }

      props.addtocfns(props.pageid, props.seq_nbr, uploadCanvasAndupdateSCORM);
      setloading(2);
      setTimeout(function () {
        setloading(3);
        draw(canvas);
      }, 1000);
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
    if (props.isSummary) {
      var bas64file = canvas.toDataURL({ format: "jpg", multiplier: 1 });
      sessionStorage.setItem(props.canvasImageFileId + "asImage", bas64file);
    }
    if (canvasRef != null && canvasRef.current != null) {
      //canvas.discardActiveObject().renderAll();

      var details = canvas.toJSON();
      var bas64file = canvasRef.current.toDataURL({
        format: "png",
        multiplier: 3,
      });
      if (currentBase64 != bas64file) {
        setcurrentBase64(bas64file);
        if (props.mode == "local") {
          localStorage.setItem(
            props.canvasImageFileId,
            JSON.stringify(details)
          );
        } else if (
          props.mode == "stage" ||
          props.mode == "prod" ||
          props.mode == "prod_new"
        ) {
          const data = new FormData();
          const file = new Blob([JSON.stringify(details)], {
            type: "application/json",
          });
          data.append("file", file);
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

          if (props.canvasImageFileId)
            await axios.put(url, data, {}).then((res) => {});
        }
      }
      // if (isAutoSave && activeObjects[0]) {
      //   canvas.setActiveObject(activeObjects[0]);
      //   canvas.renderAll();
      // }
    }
  };
  async function fitToCanvas(canvas, data) {
    canvas.clearHistory();
    canvas.renderAll();
    var jsonObj = "";
    if (typeof data === "string") jsonObj = JSON.parse(data);
    else if (typeof data === "object") jsonObj = data;
    canvas.loadFromJSON(jsonObj, function () {
      saveImage(canvas);
      zoomToContents(canvas);
      canvas.renderAll();
    });
  }

  const initCanvas = (width, height) => {
    const _canvas = new fabric.Canvas(
      "canvas_" + props.pageid + "_" + props.seq_nbr,
      {
        height,
        width,
        backgroundColor: "white",
        perPixelTargetFind: true,
        targetFindTolerance: 5,
      }
    );
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.borderColor = "#4447A9";
    fabric.Object.prototype.cornerColor = "#4447A9";
    fabric.Object.prototype.cornerSize = 6;
    fabric.Object.prototype.padding = 10;
    fabric.Object.prototype.borderDashArray = [5, 5];
    fabric.Object.NUM_FRACTION_DIGITS = 10;
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
    onSelectMode(canvas);
  }

  function removeCanvasListener(canvas) {
    if (canvas) {
      canvas.defaultCursor = "default";
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    }
  }

  function insertLine(canvas) {
    setActiveMode("insertLine");
    canvas.isDrawingMode = false;
    removeCanvasListener(canvas);
    canvas.discardActiveObject().renderAll();
    var line, isDown;
    canvas.on("mouse:down", function (o) {
      canvas.getObjects().map((item) => item.set({ selectable: false }));
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
      line = new fabric.Line(points, {
        strokeWidth: brushWidth,
        fill: color,
        stroke: color,
        originX: "center",
        originY: "center",
        padding: 5,
      });
      canvas.add(line);
    });

    canvas.on("mouse:move", function (o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y, selectable: true });
      canvas.renderAll();
    });

    canvas.on("mouse:up", function (o) {
      isDown = false;
      canvas.historyNextState = canvas._historyNext();
      onSelectMode(canvas);
      removeCanvasListener();
    });
    canvas.renderAll();
  }

  function createText(canvas) {
    setActiveMode("insertText");
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
      canvas.hoverCursor = `url(${getCursor({ type: "eraser" })}), default `;
    }
  }

  function onSelectMode(canvas) {
    options.currentMode = "Select";
    canvas.isDrawingMode = false;
    canvas.selection = true;
    setActiveMode("selectObject");
    removeCanvasListener(canvas);
    //canvas.getObjects().map((item) => item.set({ selectable: true }));
    canvas.forEachObject(function (object) {
      object.prevEvented = true; //!object.evented;
      object.prevSelectable = true; // !object.selectable;
      object.evented = true;
      object.selectable = true;
    });
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
    if (props.mode == "local") {
      localStorage.setItem(props.canvasImageFileId, JSON.stringify({}));
      canvas.clearHistory();
      loadImage(props.canvasImageFileId);
      draw(canvas);
    } else if (
      props.mode == "stage" ||
      props.mode == "prod" ||
      props.mode == "prod_new"
    ) {
      const data = new FormData();
      const file = new Blob([JSON.stringify({})], {
        type: "application/json",
      });
      data.append("file", file);
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

      if (props.canvasImageFileId) {
        axios.put(url, data, {}).then((res) => {
          canvas.clearHistory();
          loadImage(props.canvasImageFileId);
          draw(canvas);
        });
      }
    }
    /* canvas.clearHistory();
    loadImage(props.canvasImageFileId);
    draw(canvas); */
  }

  function draw(canvas) {
    //  if (options.currentMode !== modes.PENCIL) {
    removeCanvasListener(canvas);
    setActiveMode("pencil");
    //setSaveaction(true);
    options.currentMode = modes.PENCIL;
    if (canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushWidth;
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.opacity = brushOpacity;

      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
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
        canvas.setBackgroundImage(img);
        img.center();
        canvas.onHistory();
        img.setCoords();
        canvas.renderAll();
        //onSelectMode(canvas);
        /* canvas.onHistory();
        canvas.clearHistory() */
      });
    };
    options.currentMode = modes.PENCIL;
    onSelectMode(canvas);
    if (file) reader.readAsDataURL(file);
  }
  function changeCurrentOpacity(e) {
    let value = parseInt(e.target.value);
    if (canvas) {
      canvas.freeDrawingBrush.opacity = value / 100;
      let obj = canvas.getActiveObject();
      if (obj) {
        obj.set("opacity", value / 100);
      }
      canvas.renderAll();
    }
    setBrushOpacity(() => value);
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

  function saveCanvas() {
    canvas.discardActiveObject().renderAll();
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "OSE_PanCanvas" + ".png");
    canvasRef.current.toBlob(function (blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    });
  }
  return props.isDisplayAsImage && getImage ? (
    <div>
      <img src={getImage} className="w-100" />
    </div>
  ) : (
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
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm{" "}
                </h5>
              </div>
              <div className="modal-body">
                Deleting image will reset the drawing canvas. Confirm to delete.
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
        <OpacityHelp
          closePopUp={() => setIsShowHelp(false)}
          thingsToShow={{
            pen: true,
            line: true,
            pan: true,
            zoom: true,
            opacity: true,
            circle: false,
            fitToScreen: true,
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
          <div className="d-grid justify-content-center align-items-center drawing-header-navi position-relative">
            <img
              src="./img/CanvasInfo/help_icon_1.png"
              className="cursor-pointer canvas-help-icon help_icon_35 canvas-help-icon position-absolute"
              title={"Help"}
              onClick={() => setIsShowHelp(true)}
            />
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
          </div>
        </div>

        <div className="d-grid align-items-center drawing-body">
          <div className="d-grid-column drawing-navi left">
            <ul className="d-grid justify-content-center align-items-center gap-2">
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
              <Tooltip title="Add line" placement="left">
                <li
                  type="button"
                  className={
                    activeMode == "insertLine" ? "button active" : "button"
                  }
                  id={"insertText"}
                  onClick={() => (loading > 1 ? insertLine(canvas) : null)}
                >
                  <img src="./img/drawing-line.svg" disabled={loading == 1} />
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
                  //changeToDragMode onSelectMode
                >
                  <img
                    src="./img/drawing-resizer.svg"
                    disabled={loading == 1}
                  />
                </li>
              </Tooltip>
              <Tooltip title="Pan" placement="left">
                <li
                  type="button"
                  id={"moveObject"}
                  className={
                    activeMode == "moveObject" ? "button active" : "button"
                  }
                  onClick={() =>
                    loading > 1 ? changeToDragMode(canvas) : null
                  }
                  //changeToDragMode onSelectMode
                >
                  <img src="./img/drawing-pan.svg" disabled={loading == 1} />
                </li>
              </Tooltip>
              {
                <Tooltip
                  title={isZoom ? "Zoom out" : "Zoom in"}
                  placement="left"
                >
                  <li
                    type="button"
                    id={"FitToScreen"}
                    onClick={() => (loading > 1 ? resetZoom(canvas) : null)}
                    disabled={loading == 1}
                  >
                    {isZoom ? (
                      <img src="./img/drawing-Zoom-Out.svg" />
                    ) : (
                      <img src="./img/drawing-Zoom-In.svg" />
                    )}
                  </li>
                </Tooltip>
              }
              {
                <Tooltip title={"Fit to screen"} placement="left">
                  <li
                    type="button"
                    id={"FitToScreen"}
                    onClick={() =>
                      loading > 1 ? zoomToContents(canvas) : null
                    }
                    disabled={loading == 1}
                  >
                    <img src="./img/drawing-resize.svg" />
                  </li>
                </Tooltip>
              }
              {/* <Tooltip title="Erase" placement="left">
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
              </Tooltip> */}
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

          <div className="d-grid-column" style={{ backgroundColor: "white" }}>
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
            <ul className="d-grid justify-content-center align-items-center ">
              <li className="drawing" id="opacityPencil">
                <Tooltip title="Line opacity">
                  <img
                    src="./img/drawing-opacity.svg"
                    className="canvas-cursor"
                  />
                </Tooltip>
              </li>{" "}
              <Tooltip title={brushOpacity / 100}>
                <li className="pb-3">
                  <div className="d-flex justify-content-center drawing-range">
                    <input
                      type="range"
                      onInput={changeCurrentOpacity}
                      min="1"
                      value={brushOpacity}
                      max="100"
                      orient="vertical"
                      className="pen-range"
                      tabIndex="-1"
                    />
                  </div>
                </li>
              </Tooltip>
              <li className="drawing pb-3 pb-lg-3 pe-2 pe-lg-0" id="drawPencil">
                <Tooltip title="Line Width">
                  <img
                    src="./img/brush_size.png"
                    width="32px"
                    height="32px"
                    className="canvas-cursor"
                  />
                </Tooltip>
              </li>{" "}
              <Tooltip title={brushWidth}>
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
                    />
                  </div>
                </li>
              </Tooltip>
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default GraphComponent1;
