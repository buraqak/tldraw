import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import ttsConfigData from "../ttsConfigData";

import TextToSpeech from "../../Common/TextToSpeech";

import Tooltip from "../../Common/ToolTipComponent";
import { GlassMagnifier } from "react-image-magnifiers";
const Topic10 = forwardRef((props, ref) => {
  const ttsRef = useRef();

  function play() {
    if (ttsRef.current) ttsRef.current.playTts();
  }

  function pause() {
    if (ttsRef.current) ttsRef.current.pauseTts();
  }
  function stop() {
    if (ttsRef.current) ttsRef.current.stopTts();
  }

  useImperativeHandle(ref, () => ({ play, pause, stop }));
  useEffect(() => {
    document.title = "List of OSE Features and its Tutorial";
  }, []);

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

  return (
    <TextToSpeech ref={ttsRef} updateTtsState={props.ttsEnd}>
      <div className={props.leftshift ? "content-area " : "content-area"}>
        <div className="page-introduce-puzzling-phenomenon">
          <div className="icon-text-group">
            <div className="border pdf-form-outer ">
              <div className="glassmagnifier-features row">
                <div className="col-lg-4 d-flex justify-content-center align-items-center fs-5 mb-4 mb-lg-0">
                  To get a closer look at any part of the image, hover your
                  mouse over that area. The image will automatically enlarge for
                  better viewing.
                </div>
                <div
                  className="col-12 col-lg-8 pb-10 "
                  tabIndex={props.tabpopup == false ? 0 : -1}
                >
                  <GlassMagnifier
                    imageSrc="./img/8-6-12-image-4n1.jpg"
                    square={false}
                    magnifierSize="60%"
                    imageAlt="An illustration showing both modern and ancient horses over a time period of 60 million years. 

The Hyracotherium was a small horse that lived 60 million years ago. It was about the size of a small dog and had brown fur and white spots along a rounded back. It had a small head, short snout, and short tail with fur on the end. It had four small toes on the front feet and three small toes on the back feet. 

The Mesohippus lived approximately 40 to 50 million years ago. It was slightly larger than Hyracotherium and about the size of a medium sized dog. It had a head slightly larger than the Hyocotherium, a longer snout, and a tail with fur on the end. It had three small toes on all feet. Its head was larger with a more pronounced snout than Hyracotherium. 

The Miohippus lived approximately 35 to 45 million years ago. It was slightly larger than Mesohippus and about the size of a large dog. It had a head slightly larger than the Mesohippus, a longer snout, and a tail with fur on the end. It had three small toes on all feet. 

The Parahippus lived approximately 30 to 40 million years ago. It was slightly larger than Miohippus and the size of a large dog. It had three three toes on all feet, with the middle toe being the longest. It had a pronounced snout.

The Merychippus lived approximately 15 to 25 million years ago. It was roughly the size of a modern pony. It had three toes on all feet, with the middle toe being the longest and having a pronounced hoof. The two side toes were very small and short. It had a pronounced snout like that of a modern horse.

The Megahippus lived approximately 10 to 20 million years ago. It was roughly the size of a large, modern horse. It had three toes on all feet, with the middle toe being the longest and having a pronounced hoof. The two side toes were very small and short. It had a pronounced and narrow snout.

The Przewalski’s horse is a wild horse that can be found today. It looks like a domestic horse but has a stockier build. It has one, pronounced hoof on all feet.  

The Plains zebra can be found today. It looks like a domestic horse but has a smaller build and is shorter. It is white in color with black stripes. It has one, pronounced hoof on all feet."
                    title="A diagram of a group of horses"
                    largeImageSrc="./img/8-6-12-image-4n1.jpg" // Optional
                  />
                </div>
                {/* <div className="col-12 col-lg-6 font-12 mt-5">
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    *An illustration showing both modern and ancient horses over
                    a time period of 60 million years.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    The Hyracotherium was a small horse that lived 60 million
                    years ago. It was about the size of a small dog and had
                    brown fur and white spots along a rounded back. It had a
                    small head, short snout, and short tail with fur on the end.
                    It had four small toes on the front feet and three small
                    toes on the back feet.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    The Mesohippus lived approximately 40 to 50 million years
                    ago. It was slightly larger than Hyracotherium and about the
                    size of a medium sized dog. It had a head slightly larger
                    than the Hyocotherium, a longer snout, and a tail with fur
                    on the end. It had three small toes on all feet. Its head
                    was larger with a more pronounced snout than Hyracotherium.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    The Miohippus lived approximately 35 to 45 million years
                    ago. It was slightly larger than Mesohippus and about the
                    size of a large dog. It had a head slightly larger than the
                    Mesohippus, a longer snout, and a tail with fur on the end.
                    It had three small toes on all feet.
                  </p>
                </div> */}
              </div>
              {/* <div className="font-12 mb-20">
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  The Parahippus lived approximately 30 to 40 million years ago.
                  It was slightly larger than Miohippus and the size of a large
                  dog. It had three three toes on all feet, with the middle toe
                  being the longest. It had a pronounced snout.
                </p>
                <br />
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  The Merychippus lived approximately 15 to 25 million years
                  ago. It was roughly the size of a modern pony. It had three
                  toes on all feet, with the middle toe being the longest and
                  having a pronounced hoof. The two side toes were very small
                  and short. It had a pronounced snout like that of a modern
                  horse.
                </p>
                <br />
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  The Megahippus lived approximately 10 to 20 million years ago.
                  It was roughly the size of a large, modern horse. It had three
                  toes on all feet, with the middle toe being the longest and
                  having a pronounced hoof. The two side toes were very small
                  and short. It had a pronounced and narrow snout.
                </p>
                <br />
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  The Przewalski’s horse is a wild horse that can be found
                  today. It looks like a domestic horse but has a stockier
                  build. It has one, pronounced hoof on all feet.
                </p>
                <br />
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  The Plains zebra can be found today. It looks like a domestic
                  horse but has a smaller build and is shorter. It is white in
                  color with black stripes. It has one, pronounced hoof on all
                  feet.
                </p>
              </div> */}
              {/* <div className="center-image mb-20">
              <img
                tabIndex={props.tabpopup == false ? 0 : -1}
                src="./img/8-6-12-image-4n1.jpg"
                alt="A diagram of a group of horses"
                title="A diagram of a group of horses"
              />
            </div> */}
              {/*  <div
                className="mb-20 class-seasson-listing"
                tabIndex={props.tabpopup == false ? 0 : -1}
              >
                <span className="number">8.</span>
                <span className="text">
                  Discuss how the number of toes changed from the most ancient
                  to modern horses.
                </span>
              </div> */}
              {/*  <div className="glassmagnifier row ">
                <div
                  className="col-12 col-lg-6 pb-10"
                  tabIndex={props.tabpopup == false ? 0 : -1}
                >
                  <GlassMagnifier
                    imageSrc="./img/8-6-12-image-4n2.jpg"
                    square={false}
                    magnifierSize="60%"
                    imageAlt="A picture showing the evolution of horse toes.

Approximately 55 million years ago, the Hyracotherium had four small toes on the front feet and three small toes on the back feet. 

Approximately 45 million years ago, the Mesohippus had three small toes on all feet with the middle toe being more pronounced than the outer two toes.

Approximately 40 million years ago, the Miohippus had three small toes on all feet with the middle toe being larger and longer than the outer two toes.

Approximately 35 million years ago, the Parahippus had three toes on all feet, with the middle toe being the largest and longest. 

Approximately 20 million years ago, the Merychippus had three toes on all feet, with the middle toe being the longest and having a pronounced hoof.  The two side toes were very small and short.

Approximately 15 million years ago, the Megahippus had three toes on all feet, with the middle toe being the longest and having a pronounced hoof.  The two side toes were very small and short.

At present day, the Przewalski’s horse has one, pronounced hoof on all feet.  

At present day, the Plains zebra has one, pronounced hoof on all feet. "
                    title="A diagram of a group horses highlighting their toes."
                    largeImageSrc="./img/8-6-12-image-4n2.jpg" // Optional
                  />
                </div>
                <div className="col-12 col-lg-6 font-12 mt-5">
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    *A picture showing the evolution of horse toes.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 55 million years ago, the Hyracotherium had
                    four small toes on the front feet and three small toes on
                    the back feet.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 45 million years ago, the Mesohippus had three
                    small toes on all feet with the middle toe being more
                    pronounced than the outer two toes.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 40 million years ago, the Miohippus had three
                    small toes on all feet with the middle toe being larger and
                    longer than the outer two toes.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 35 million years ago, the Parahippus had three
                    toes on all feet, with the middle toe being the largest and
                    longest.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 20 million years ago, the Merychippus had
                    three toes on all feet, with the middle toe being the
                    longest and having a pronounced hoof. The two side toes were
                    very small and short.
                  </p>
                  <br />
                  <p tabIndex={props.tabpopup == false ? 0 : -1}>
                    Approximately 15 million years ago, the Megahippus had three
                    toes on all feet, with the middle toe being the longest and
                    having a pronounced hoof. The two side toes were very small
                    and short.
                  </p>
                </div>
              </div> */}
              {/*  <div className="font-12">
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  At present day, the Przewalski’s horse has one, pronounced
                  hoof on all feet.
                </p>
                <br />
                <p tabIndex={props.tabpopup == false ? 0 : -1}>
                  At present day, the Plains zebra has one, pronounced hoof on
                  all feet.
                </p>
              </div> */}
              {/* <div className="center-image">
              <img
                tabIndex={props.tabpopup == false ? 0 : -1}
                src="./img/8-6-12-image-4n2.jpg"
                alt="A diagram of a group horses highlighting their toes."
                title="A diagram of a group horses highlighting their toes."
              />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </TextToSpeech>
  );
});
export default Topic10;
