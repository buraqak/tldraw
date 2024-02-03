import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Resources from "../../Common/Resources";
import FormikQuill from "../../Common/FormikQuill";
import TraitsComponent from "../../Common/TraitComponent";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TraitHelp from "../../Common/TraitHelp";

import {
  cattleImages,
  tulipImages,
  newVariation,
} from "../../Lesson/traitsData";

const Topic6 = (props) => {
  useEffect(() => {
    document.title = "List of OSE Features and its Tutorial";
  }, []);
  useEffect(() => {
    setCattleTraitsData(props.cattleTraits);
    setTulipTraitsData(props.tulipTraits);
  }, [props]);
  const [show, setShow] = useState(false);
  const shadow = { background: "rgba(0, 0, 0, .65)" };

  const [cattleSelectedColumn, setCattleSelectedColumn] = useState(0);
  const [tulipSelectedColumn, setTulipSelectedColumn] = useState(0);
  const [appleSelectedColumn, setAppleSelectedColumn] = useState(0);
  const [nameToBeDeleted, setNameToBeDeleted] = useState(0);
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(0);
  const [cattleTraitsData, setCattleTraitsData] = useState(props.cattleTraits);
  const [tulipTraitsData, setTulipTraitsData] = useState(props.tulipTraits);
  const [appleTraitsData, setAppleTraitsData] = useState(props.appleTraits);
  const [traitsData, setTraitsData] = useState(props.traits);
  const [isShowHelp, setIsShowHelp] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  function updateTraitDetails(index, field, value) {
    var _traits = traitsData;
    if (field != "name") _traits[index]["details"][field] = value;
    else _traits[index][field] = value;
    setTraitsData(_traits);
    props.updateText("traits", _traits);
  }
  function updateTraitDetails(groupName, index, field, value) {
    var _traits = [];
    if (groupName == "cattle") {
      _traits = cattleTraitsData;
    } else if (groupName == "tulip") {
      _traits = tulipTraitsData;
    } else if (groupName == "apple") {
      _traits = appleTraitsData;
    }
    if (field != "name") _traits[index]["details"][field] = value;
    else _traits[index][field] = value;

    if (groupName == "cattle") {
      setCattleTraitsData(_traits);
      props.updateText("cattleTraits", _traits);
    } else if (groupName == "tulip") {
      setTulipTraitsData(_traits);
      props.updateText("tulipTraits", _traits);
    } else if (groupName == "apple") {
      setAppleTraitsData(_traits);
      props.updateText("appleTraits", _traits);
    }
  }

  function deleteTrait() {
    if (nameToBeDeleted == "cattle") {
      deleteCattleTrait(indexToBeDeleted);
    } else if (nameToBeDeleted == "tulip") {
      deleteTulipTrait(indexToBeDeleted);
    } else if (nameToBeDeleted == "apple") {
      deleteAppleTrait(indexToBeDeleted);
    }
    setIndexToBeDeleted(null);
    setNameToBeDeleted(null);
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
  const [actionChooser, setActionChooser] = useState(actions);

  function remove(_name, _index) {
    setShow(true);
    setIndexToBeDeleted(_index);
    setNameToBeDeleted(_name);
  }

  function addNewCattleTrait() {
    let lengthOfCattleTrait = cattleTraitsData.length;
    var _traits = cattleTraitsData;
    var variant = {
      name: "",
      images: [],
    };
    var newData = {
      id: "cattle" + lengthOfCattleTrait,
      displayName: "Trait " + lengthOfCattleTrait,
      downloadImage: "./img/cattle/CattleCard.png",
      name: "",
      maxVariations: 6,
      details: {
        gallery: cattleImages,
        variations: [variant],
      },
    };
    _traits.push(newData);
    setCattleTraitsData(_traits);
    setCattleSelectedColumn(_traits.length - 1);

    props.updateText("cattleTraits", _traits);
  }

  function deleteCattleTrait(_index) {
    var _traits = cattleTraitsData;
    _traits.splice(_index, 1);

    if (_index == cattleSelectedColumn)
      setCattleSelectedColumn(_traits.length - 1);
    else setCattleSelectedColumn(_traits.length - 1);

    if (_traits.length == 0) {
      addNewCattleTrait();
    }
    setCattleTraitsData(_traits);
    props.updateText("cattleTraits", _traits);
  }

  function addNewTulipTrait() {
    let lengthOfCattleTrait = tulipTraitsData.length;
    var _traits = tulipTraitsData;
    var variant = {
      name: "",
      images: [],
    };
    var newData = {
      id: "tulip" + lengthOfCattleTrait,
      displayName: "Trait " + lengthOfCattleTrait,
      downloadImage: "./img/cattle/TulipCard.png",
      name: "",
      maxVariations: 6,
      details: {
        gallery: tulipImages,
        variations: [variant],
      },
    };
    _traits.push(newData);
    setTulipTraitsData(_traits);
    setTulipSelectedColumn(_traits.length - 1);

    props.updateText("tulipTraits", _traits);
  }

  function deleteTulipTrait(_index) {
    var _traits = tulipTraitsData;
    _traits.splice(_index, 1);

    if (_index == tulipSelectedColumn)
      setTulipSelectedColumn(_traits.length - 1);
    else setTulipSelectedColumn(_traits.length - 1);

    if (_traits.length == 0) {
      addNewTulipTrait();
    }
    setTulipTraitsData(_traits);
    props.updateText("tulipTraits", _traits);
  }

  function addNewAppleTrait() {
    let lengthOfCattleTrait = appleTraitsData.length;
    var _traits = appleTraitsData;
    var variant = {
      name: "",
      images: [],
    };
    var newData = {
      id: "apple" + lengthOfCattleTrait,
      displayName: "apple " + lengthOfCattleTrait,
      downloadImage: "./img/apple/AppleCard.png",
      name: "",
      maxVariations: 6,
      details: {
        gallery: appleImages,
        variations: [variant],
      },
    };
    _traits.push(newData);
    setAppleTraitsData(_traits);
    setAppleSelectedColumn(_traits.length - 1);

    props.updateText("appleTraits", _traits);
  }

  function deleteAppleTrait(_index) {
    var _traits = appleTraitsData;
    _traits.splice(_index, 1);

    if (_index == appleSelectedColumn)
      setAppleSelectedColumn(_traits.length - 1);
    else setAppleSelectedColumn(_traits.length - 1);

    if (_traits.length == 0) {
      addNewAppleTrait();
    }
    setAppleTraitsData(_traits);
    props.updateText("appleTraits", _traits);
  }

  return (
    <div className={props.leftshift ? "content-area " : "content-area"}>
      <div className="page-introduce-puzzling-phenomenon">
        <div className="icon-text-group">
          <div className="border pdf-form-outer">
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
                <h6>Are you sure you want to delete the trait?</h6>
              </Modal.Body>
              <Modal.Footer>
                <div className="submit">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose(), deleteTrait();
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
            {console.log({ cattleTraitsData })}

            {appleTraitsData && appleTraitsData.length > 0 ? (
              <div className="pt-15 image-matches">
                <div
                  className="accordion accordion-flush image-matches-accordion show"
                  id="accordionExample1"
                >
                  <div
                    id={"accord1"}
                    className={"accordion-item image-matches-accordion-list"}
                    key={"accord1"}
                  >
                    {isShowHelp ? (
                      <TraitHelp
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
                    <h2 className="accordion-header" id={"accord1"}>
                      <button
                        className="accordion-button collapsed position-relative cursor-context"
                        type="button"
                      >
                        <span className="cursor-context">Organism: Apple</span>{" "}
                        <img
                          src="./img/CanvasInfo/help_icon_1.png"
                          className="cursor-pointer help-icon-60  help_icon_35-traits position-absolute"
                          title={"Help"}
                          onClick={() => setIsShowHelp(true)}
                        />
                      </button>
                    </h2>
                    <div
                      id={"collapse" + "accord1"}
                      className={"accordion-collapse collapse show"}
                      aria-labelledby={"accord1"}
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="accordion-body p-0 ">
                        <div className="container px-0">
                          <div>
                            {props.appleTraits.map((item, index) => (
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className={
                                    appleSelectedColumn == index
                                      ? "tab-pane fade show active"
                                      : "tab-pane fade show"
                                  }
                                  id={"trait" + item.id}
                                  role="tabpanel"
                                  aria-labelledby="Color-tab"
                                >
                                  <TraitsComponent
                                    id={item.id}
                                    index={index}
                                    key={item.id}
                                    name={item.name}
                                    displayName={item.displayName}
                                    maxVariations={item.maxVariations}
                                    details={item.details}
                                    availableVariants={item.availableVariants}
                                    downloadableImage={item.downloadImage}
                                    onUpdate={updateTraitDetails}
                                    groupName={"apple"}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topic6;
