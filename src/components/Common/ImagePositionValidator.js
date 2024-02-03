import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

function ImagePositionValidator({
  id,
  activeSelected,
  updateImageSequence,
  isValid,
}) {
  const [selectedImage, setSelectedImage] = useState(activeSelected);
  var imageIds = [
    "a4df6fa21e8e94d90ad4cd72b7a0e6c3e", //1
    "a2bfbcea9e66346a99965d08c0a866fb8", //2
    "a8776a6e1cee74b0190c7864c7047f706", //3
    "a5f1389985bd14ae7b12d33d71ccadd18", //4
    "a9203c5f4c5d34f5fa6e1e47b3d86788a", //5
    "a00de91c638b447eca0d6ad94ea8dfb54", //6
    "ae7ca7387a27f4a22969af097411e7e7a", //7
    "a8c63f390f8544e86ab597f3630950049", //8
    "a166e6b2bda1e4723a60538afe19e2d90", //9
    "a4e6af6674a7c4a4f85b24b332fda9a73", //10
    "a4045bcc54c1f45a9a63662e5b8d564ea", //11
    "ae5d0d1209cf1429cb88f3c5d4d13e73d", //12
    "a823a850ed2ce4d39ae21ddb319b960a4", //13
    "ac26f74dea2ea47c094cef1108a74116e", //14
    "a0deeb406d6f4490285c32dd2932ee916", //15
  ];
  var defaultIndex = imageIds.indexOf(activeSelected);
  const [index, setIndex] = useState(defaultIndex);

  useEffect(() => {
    let getIndex = index;
    /* if (getIndex > 14) {
      getIndex = getIndex - 15;
    } else if (getIndex < 0) {
      getIndex = getIndex + 15;
    } */
    updateImageSequence(id, imageIds[getIndex]);
  }, [index]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="mb-20 d-flex align-items-center number-slider">
      <div className="slide-number">
        <p className="single-green-header-title border-0 p-10">{id + 1}</p>
      </div>
      <div className="slider">
        <Carousel
          activeIndex={index}
          indicators={!isValid}
          controls={!isValid}
          interval={null}
          slide={false}
          onSelect={handleSelect}
        >
          {/* <ol class="carousel-indicators">
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="0"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="1"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="2"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="3" ></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="4"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="5"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="6"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="7"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="8"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="9"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="10"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="11"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="12"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="13"></li>
                        <li data-target={"#myCarousel" + id + 1} data-slide-to="14"></li>
                    </ol> */}
          <Carousel.Item>
            <img
              className="bd-placeholder-img active"
              src="./img/m3.png"
              id={"a4df6fa21e8e94d90ad4cd72b7a0e6c3e"}
              alt="The partial lunar eclipse was began at about 6.45 PM UTC"
              title="The partial lunar eclipse was began at about 6.45 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m6.png"
              id={"a2bfbcea9e66346a99965d08c0a866fb8"}
              alt="The maximum lunar eclipse began at 7: 30 PM UTC"
              title="The maximum lunar eclipse began at 7: 30 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m1.png"
              id={"a8776a6e1cee74b0190c7864c7047f706"}
              alt="The view of the moon shortly before the eclipse began"
              title="The view of the moon shortly before the eclipse began"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m2.png"
              id={"a5f1389985bd14ae7b12d33d71ccadd18"}
              alt="The penumbral eclipse began at about 6.30 PM UTC"
              title="The penumbral eclipse began at about 6.30 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m5.png"
              id={"a9203c5f4c5d34f5fa6e1e47b3d86788a"}
              alt="The full lunar eclipse was seen at about 7: 28 PM UTC"
              title="The full lunar eclipse was seen at about 7: 28 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m10.png"
              id={"a00de91c638b447eca0d6ad94ea8dfb54"}
              alt="The full lunar eclipse at 9:15 PM UTC"
              title="The full lunar eclipse at 9:15 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m12.png"
              id={"ae7ca7387a27f4a22969af097411e7e7a"}
              alt="The partial eclipse seen at 9:35 PM UTC"
              title="The partial eclipse seen at 9:35 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m4.png"
              id={"a8c63f390f8544e86ab597f3630950049"}
              alt="The full lunar eclipse began at about 7:15 PM UTC"
              title="The full lunar eclipse began at about 7:15 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m9.png"
              id={"a166e6b2bda1e4723a60538afe19e2d90"}
              alt="The Maximum lunar eclipse ended at 8: 45 PM UTC"
              title="The Maximum lunar eclipse ended at 8: 45 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m13.png"
              id={"a4e6af6674a7c4a4f85b24b332fda9a73"}
              alt="The partial eclipse ended at 9:55 PM UTC"
              title="The partial eclipse ended at 9:55 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m11.png"
              id={"a4045bcc54c1f45a9a63662e5b8d564ea"}
              alt="The full lunar eclipse ended at 9:20 PM UTC"
              title="The full lunar eclipse ended at 9:20 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m7.png"
              id={"ae5d0d1209cf1429cb88f3c5d4d13e73d"}
              alt="The maximum lunar eclipse was seen at 7:50 PM UTC"
              title="The maximum lunar eclipse was seen at 7:50 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m14.png"
              id={"a823a850ed2ce4d39ae21ddb319b960a4"}
              alt="The penumbral eclipse ended at 10:15 PM UTC"
              title="The penumbral eclipse ended at 10:15 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m8.png"
              id={"ac26f74dea2ea47c094cef1108a74116e"}
              alt="The Maximum lunar eclipse was continuous at 8:20 PM UTC"
              title="The Maximum lunar eclipse was continuous at 8:20 PM UTC"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="bd-placeholder-img"
              src="./img/m15.png"
              id={"a0deeb406d6f4490285c32dd2932ee916"}
              alt="The view of the moon shortly after the lunar eclipse ended"
              title="The view of the moon shortly after the lunar eclipse ended"
            />
          </Carousel.Item>
        </Carousel>
        <div className="carousel-inner pt-5">
          <p className="float-end">Reprinted by permission of Kwon O Chul</p>
        </div>
      </div>

      {/* isValid ? (
          <button className="carousel-control-prev" id="btn_1" type="button">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
        ) : (
          <button
            className="carousel-control-prev"
            id="btn_1"
            type="button"
            data-bs-target={"#myCarousel" + id + 1}
            data-bs-slide="prev"
            onClick={() => setIndex(index - 1)}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
        ) */}
      {/* isValid ? (
          <button
            className="carousel-control-next"
            id="btn_2"
            type="button"
            disabled={true}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        ) : (
          <button
            className="carousel-control-next"
            id="btn_2"
            type="button"
            data-bs-target={"#myCarousel" + id + 1}
            data-bs-slide="next"
            onClick={() => setIndex(index + 1)}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        ) */}
    </div>
  );
}

export default ImagePositionValidator;
