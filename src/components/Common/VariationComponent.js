import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function VariationComponent({
    images,
    index,
    variationName,
    length,
    maxVariations,
    createVariation,
    removeVariation,
    removeImage,
    updateVariation,
}) {
    const [items, setItems] = useState(images);
    const [name, setName] = useState(variationName);
    const [show, setShow] = useState(false);
    const shadow = { background: "rgba(0, 0, 0, .65)" };
    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        setItems(images);
    }, [images]);

    useEffect(() => {
        setName(variationName);
    }, [variationName]);

    const grid = 8;

    const getListStyle = (isDraggingOver) => ({
        /* background: isDraggingOver ? 'lightblue' : 'lightgrey', */
        overflow: "auto",
        height: "100%",
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 1,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "#e6dcdc",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    function changeName(e) {
        setName(e.target.value);
    }

    function updateName() {
        updateVariation(index, "name", name);
    }

    function remove() {
        setShow(true);
    }
    return (
        <div className="col" key={index}>
            <Modal
                size="sm"
                show={show}
                /* onHide={handleClose} */
                className="remove-modal"
                aria-labelledby="contained-modal-title-vcenter"
                data-backdrop="static"
                centered
                style={{ ...shadow }}
            >
                <Modal.Body className="pdf-download-modal">
                    <h6>Are you sure you want to delete the variation?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <div className="submit">
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleClose(), removeVariation(index);
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                    <div className="text-end submit">
                        <Button variant="danger" onClick={() => handleClose()}>
                            No
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <div className="card h-100">
                <div className="variation-remove" onClick={remove}>
                    <img src="./img/variation-remove.svg" />
                </div>
                <div className="card-body">
                    <div className="trait-input variation-input">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="name"
                            value={name}
                            onChange={changeName}
                            onBlur={updateName}
                            placeholder="<Type your variation here>"
                        />
                    </div>
                    <div className="variation-body">
                        <Droppable droppableId={"variant" + index} direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {" "}
                                    <div
                                        className={
                                            items.length > 0
                                                ? "variation-selection-none variation-selection"
                                                : "variation-selection-none"
                                        }
                                    >
                                        {items && items.length ? (
                                            items.map((item, _index) => (
                                                <Draggable
                                                    key={"key" + _index}
                                                    draggableId={"variantImage" + index + _index}
                                                    index={_index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                            title={item.name}
                                                        >
                                                            <div
                                                                className="variation-selected-list"
                                                                key={item.id}
                                                            >
                                                                <p className="text-center py-1">{item.name}</p>
                                                                <div className="variation-selected-image">
                                                                    <img src={item.location} alt={item.alt} />
                                                                </div>
                                                                <div
                                                                    className="variation-remove"
                                                                    onClick={() => removeImage(index, _index)}
                                                                >
                                                                    <img src="./img/variation-selected-remove.svg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        ) : (
                                            <p className="variation-message">Drop here!</p>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
                {index + 1 === length && length < maxVariations ? (
                    <div className="variation-add" onClick={createVariation}>
                        <img src="./img/variation-add.svg" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default VariationComponent;
