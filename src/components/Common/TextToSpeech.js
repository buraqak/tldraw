import { useTts } from "tts-react";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

const TextToSpeech = forwardRef((props, ref) => {
  const { ttsChildren, state, play, playOrPause, stop, pause } = useTts({
    children: props.children,
    markTextAsSpoken: true,
    markBackgroundColor: "yellow",
    lang: props.lang ? props.lang : "en-US",
    onEnd: () => {
      props.updateTtsState();

      if (props.updateAction)
        props.updateAction({ name: "", isStreaming: false });
    },
  });

  function playTts() {
    if (props.updateAction) {
      props.updateAction({ name: "tts", isStreaming: true });
    }
    playOrPause();
  }

  function pauseTts() {
    if (props.updateAction) {
      props.updateAction({ name: "", isStreaming: false });
    }
    pause();
  }

  function stopTts() {
    if (props.updateAction) {
      props.updateAction({ name: "", isStreaming: false });
    }
    stop();
    if (props && props.updateTtsState) props.updateTtsState();
  }

  useImperativeHandle(ref, () => ({
    playTts,
    pauseTts,
    stopTts,
  }));

  useEffect(() => {
    return () => {
      stopTts();
      /* if (props && props.updateTtsState) props.updateTtsState(); */
    };
  }, []);

  return <div>{ttsChildren}</div>;
});

export default TextToSpeech;

/* var configs = {
    OutputFormat: "mp3",
    VoiceId: "Russell",
    Text: textValue,
  };
  if (textValue) {
    textToSpeechConverter(configs, null);
  } */
/* 
const [tTSActive, setTTSActive] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState(0);
  const synth = window.speechSynthesis;

  function switchOption() {
    if (tTSActive) {
      setTTSActive(false)
      disableTextToSpeechConverter()
    } else {
      setTTSActive(true)
      textToSpeechConverter()
    }
  }

  function textToSpeechConverter(params, configs) {
    var t = document.getElementsByClassName('text-box');
    console.log({ t })
    for (let i = 0; i < t.length; i++) {
      t[i].addEventListener('mouseover', readout_handler);
      t[i].addEventListener('mouseout', stop_readout);
    }
  }

  const highlight = (text, from, to) => {
    let replacement = highlightBackground(text.slice(from, to));
    console.log(replacement);
    return text.substring(0, from) + replacement + text.substring(to);
  };
  const highlightBackground = (sample) =>
    `<span style={{backgroundColor:"yellow"}}>${sample}</span>`;

  function readout_handler(e) {
    let textValue = e.target.textContent;
    
    e.preventDefault();
    var utterance = new SpeechSynthesisUtterance(textValue);
    utterance.voice = synth.getVoices()[selectedVoice];
    synth.speak(utterance);
    utterance.addEventListener("boundary", (event) => {
      const { charIndex, charLength } = event;
      e.innerHTML = highlight(
        textValue,
        charIndex,
        charIndex + charLength
      );
      console.log({e})
    });
  }

  function stop_readout(e) {
    synth.cancel();
  }

  function disableTextToSpeechConverter(params, configs) {
    console.log("in disable")
    var t = document.getElementsByClassName('text-box');
    console.log("in disable", t)
    for (let i = 0; i < t.length; i++) {
      t[i].removeEventListener('mouseover', readout_handler);
    }
    console.log("in exit", t)
  }

  return (
    <img src="./img/speech.png" onClick={switchOption} />
  ) */
