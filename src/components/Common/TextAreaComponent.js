import LengthContext from "./lengthContext";
import { useContext } from "react";

const TextAreaComponent = ({ id, value, name, className, rows, onChange, placeholder, maxLength }) => {
    const lengthOfData = useContext(LengthContext);


    function textChanged(e) {
        var characters = e.target.value
        if (characters.length < maxLength || lengthOfData + characters.length < 34000) {
            onChange(e)
        }
    }

    return (
        <textarea
            id={id}
            name={name}
            onChange={textChanged}
            value={value}
            className={className}
            rows={rows}
            placeholder={placeholder}
            maxLength={maxLength ? maxLength : 1500}
        >
        </textarea >
    )
}

export default TextAreaComponent
