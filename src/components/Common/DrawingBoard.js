import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
console.log("Fabric.js Version:", fabric.version);

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const [canvasData, setCanvasData] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });

    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushSize;

    // Update canvas data whenever a path or text is created
    canvas.on("path:created", updateCanvasData);
    canvas.on("text:created", updateCanvasData);

    return () => {
      canvas.off("path:created", updateCanvasData);
      canvas.off("text:created", updateCanvasData);
      canvas.dispose();
    };
  }, []);

  const updateCanvasData = () => {
    const jsonData = canvasRef.current.toJSON([
      "objects",
      "path",
      "text",
      "type",
      "left",
      "top",
      "width",
      "height",
      "fill",
      "stroke",
      "strokeWidth",
      "fontSize",
      "fontFamily",
    ]);
    setCanvasData(jsonData);
  };

  const handleColorChange = (color) => {
    setBrushColor(color);
    updateCanvasData();
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
    updateCanvasData();
  };

  return (
    <div>
      <div>
        <label>Color:</label>
        <input
          type="color"
          value={brushColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>

      <div>
        <label>Brush Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
        />
        {brushSize}
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #000" }}
      />
      <h3>Canvas Data:</h3>
      <pre>{JSON.stringify(canvasData, null, 2)}</pre>
    </div>
  );
};

export default DrawingBoard;
