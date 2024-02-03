import TextToSpeech from "./TextToSpeech";
import ReactMicComponent from "./SST.js"
import { useState, useEffect } from 'react';

function TextAreaAndStt({ title, updateParentState }) {
    const [content, setContent] = useState("");

    function handleChange(e) {
        setContent(e.target.value);
    }
    useEffect(() => {
        updateParentState(content);
    }, [content])
    return (
        <div className="mt-10 interesting-phenomenon-notes">
            <div className="text-to-speech-section">
                <div className="text-to-speech-box mb-15">
                    <div className="text-to-speech-section-box right">
                        <div className="text-center text-to-speech-box-title">
                            <span style={{ position: "absolute", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", left: "10px", cursor: "pointer", width: "31px", height: "30px" }}>
                                <img id="text_1" className="audioClick" src="./img/speech.png" alt="Speaker" onClick={() => content ? TextToSpeech(content) : null} title="speaker" />
                            </span>
                            {title ? title : ""}
                            <span className="speach-text-btn">
                                <ReactMicComponent updateParent={(data) => setContent([...content, data])} />
                            </span>
                        </div>
                        <div className="text-to-speech-box-content">
                            <div className="notepad-outer">
                                <div className="pt-10 pb-10 notepad-footer">
                                    <ul className="d-flex justify-content-start notepad-footer-actions">
                                        <li className="pl-10"><a href="#"><img src="./img/type-bold.svg" alt="type-bold" title="type-bold" /></a></li>
                                        <li className="pl-10"><a href="#"><img src="./img/type-italic.svg" alt="type-italic" title="type-italic" /></a></li>
                                        <li className="pl-10"><a href="#"><img src="./img/type-underline.svg" alt="type-underline" title="type-underline" /></a></li>
                                        <li className="pl-10"><a href="#"><img src="./img/format-text-strikethrough.svg" alt="format-text-strikethrough" title="format-text-strikethrough" /></a></li>
                                        <li className="pl-10"><a href="#"><img src="./img/format-list-bulleted.svg" alt="format-list-bulleted" title="format-list-bulleted" /></a></li>
                                    </ul>
                                </div>
                                <div className="notepad-content">
                                    <textarea id="speectText_2" className="form-control" name="speechToText2" rows="3" value={content} onChange={handleChange}
                                        placeholder="<Record your response here>"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextAreaAndStt;