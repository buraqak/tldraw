import { Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";

function ImageViewerComponent({ images }) {
  const [items, setItems] = useState([]);
  const [rerender, setRerender] = useState("");
  const grid = 8;

  useEffect(() => {
    setItems(images);
  }, [images]);

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    width: "100%",
    overflowX: "auto",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 1,
    height: "auto",
    margin: `0 ${grid}px 0 0`,
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#e6dcdc",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Droppable droppableId="gallery" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className="image-container"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(_provided, snapshot) => (
                  <div
                    ref={_provided.innerRef}
                    {..._provided.draggableProps}
                    {..._provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      _provided.draggableProps.style
                    )}
                    title={item.name}
                  >
                    <div key={item.id}>
                      <h6 className="text-center">{item.name}</h6>
                      <img src={item.location} width="250px" alt={item.alt} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          {items && items.length == 0 ? (
            <h6 className="text-center py-4 w-100">
              You're Done{" "}
              <img src="./img/thumbsUp.svg" height="50px" width="50px" />
            </h6>
          ) : null}
          {/* </Carousel> */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default ImageViewerComponent;
