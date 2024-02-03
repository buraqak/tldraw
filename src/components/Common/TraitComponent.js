import ImageViewerComponent from "./ImageViewerComponent";
import VariationComponent from "./VariationComponent";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

function TraitsComponent({
  id,
  index,
  name,
  displayName,
  details,
  downloadableImage,
  onUpdate,
  maxVariations,
  groupName,
}) {
  const [variationDetail, setVariations] = useState(details.variations);
  const [galleryDetail, setGalleryDetails] = useState(details.gallery);
  const [traitName, setTraitName] = useState(name);
  const [listOfData, setListOfData] = useState(details);
  function changeName(e) {
    setTraitName(e.target.value);
  }
  function updateName() {
    onUpdate(groupName, index, "name", traitName);
  }

  useEffect(() => {
    setListOfData(details);
    setVariations(details.variations);
    setGalleryDetails(details.gallery);
  }, [details]);

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const onDragEnd = (result) => {
    var sourceCharacterLoc;
    var destCharacterLoc;
    if (!result.destination) {
      return;
    }
    const listCopy = { ...listOfData };

    var sourceList = listCopy[result.source.droppableId];
    if (result.source.droppableId.includes("gallery")) {
      sourceList = listCopy["gallery"];
    } else {
      sourceCharacterLoc = result.source.droppableId.charAt(
        result.source.droppableId.length - 1
      );
      sourceList = listCopy["variations"][sourceCharacterLoc].images;
    }
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );

    if (result.source.droppableId.includes("gallery")) {
      listCopy["gallery"] = newSourceList;
    } else {
      sourceCharacterLoc = result.source.droppableId.charAt(
        result.source.droppableId.length - 1
      );
      listCopy["variations"][sourceCharacterLoc].images = newSourceList;
    }
    var destinationList = listCopy[result.destination.droppableId];
    if (result.destination.droppableId.includes("gallery")) {
      destinationList = listCopy["gallery"];
    } else {
      destCharacterLoc = result.destination.droppableId.charAt(
        result.destination.droppableId.length - 1
      );
      destinationList = listCopy["variations"][destCharacterLoc].images;
    }

    if (result.destination.droppableId.includes("gallery")) {
      listCopy["gallery"] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
    } else {
      destCharacterLoc = result.destination.droppableId.charAt(
        result.destination.droppableId.length - 1
      );
      listCopy["variations"][destCharacterLoc].images = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
    }
    setListOfData(listCopy);
    onUpdate(groupName, index, "gallery", listCopy.gallery);
    onUpdate(groupName, index, "variations", listCopy.variations);
    setGalleryDetails(listCopy.gallery);
    setVariations(listCopy.variations);
  };

  function updateVariation(_index, field, value) {
    var _variations = variationDetail;
    _variations[_index][field] = value;

    onUpdate(groupName, index, "variations", _variations);
    setVariations(_variations);
  }

  function createNewVariation() {
    var _variations = variationDetail;
    var variant = {
      name: "",
      images: [],
    };
    _variations.push(variant);
    onUpdate(groupName, index, "variations", _variations);
    setVariations(_variations);
  }

  function removeImageFromVariation(variationIndex, imageIndex) {
    var _variations = variationDetail;
    var _gallery = [...galleryDetail];
    if (_variations[variationIndex].images.length > 0) {
      var _images = _variations[variationIndex].images[imageIndex];
      _gallery.push(_images);
      onUpdate(groupName, index, "gallery", _gallery);
      setGalleryDetails(_gallery);
    }
    _variations[variationIndex].images.splice(imageIndex, 1);
    setVariations(_variations);
    onUpdate(groupName, index, "variations", _variations);
    let dummyData = { gallery: _gallery, variations: _variations };
    setListOfData(dummyData);
  }

  function removeVariation(_index) {
    var _variations = variationDetail;
    var _gallery = [];
    if (_variations[_index].images.length > 0) {
      var _images = _variations[_index].images;
      _gallery = [...galleryDetail, ..._images];
      onUpdate(groupName, index, "gallery", _gallery);
      setGalleryDetails(_gallery);
    } else {
      _gallery = [...galleryDetail];
      onUpdate(groupName, index, "gallery", _gallery);
      setGalleryDetails(_gallery);
    }
    _variations.splice(_index, 1);
    setVariations(_variations);
    onUpdate(groupName, index, "variations", _variations);
    let dummyData = { gallery: _gallery, variations: _variations };
    setListOfData(dummyData);
    if (_variations.length == 0) createNewVariation();
  }
  const [isShowHelp, setIsShowHelp] = useState(false);
  return (
    <div>
      <div className="trait-input">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="traitName"
          value={traitName}
          onChange={changeName}
          onBlur={updateName}
          placeholder="<Type your Traits here>"
        />
      </div>
      <div className="popup">
        <div className="float-end images-list-popup-icon">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={"#staticBackdrop" + "accord1"}
          >
            <img src="./img/image-popup-icon.svg" />
          </button>
        </div>

        <div
          className="modal fade"
          id={"staticBackdrop" + "accord1"}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Organism: Apple
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="float-end">
                  <a
                    className="btn btn-primary"
                    href={"./img/apple/AppleCard.png"}
                    download
                  >
                    Download image
                  </a>
                </div>
                <div className="trait-images-listings">
                  <div className="trait-image">
                    {<img src={"./img/apple/AppleCard.png"} width="100%" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ImageViewerComponent images={galleryDetail} />
        {variationDetail && variationDetail.length > 0 ? (
          <div className="variation-cards">
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-4">
              {variationDetail.map((item, index) => (
                <VariationComponent
                  images={item.images}
                  index={index}
                  key={index}
                  variationName={item.name}
                  maxVariations={maxVariations}
                  updateVariation={updateVariation}
                  length={variationDetail.length}
                  createVariation={createNewVariation}
                  removeVariation={removeVariation}
                  removeImage={removeImageFromVariation}
                />
              ))}
            </div>
          </div>
        ) : null}
      </DragDropContext>
    </div>
  );
}

export default TraitsComponent;
