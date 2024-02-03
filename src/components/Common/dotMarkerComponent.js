function DotMarkerComponent({ id, onChange, currentSelection }) {
  function updateValue(e) {
    onChange(id, e.target.id);
  }

  return (
    <ul className="m-0 p-0 ratings">
      <li
        tabIndex={0}
        className={currentSelection >= 1 ? "rating ckecked" : "rating"}
        onClick={updateValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(e);
          }
        }}
        id={1}
      ></li>
      <li
        tabIndex={0}
        className={currentSelection >= 2 ? "rating ckecked" : "rating"}
        onClick={updateValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(e);
          }
        }}
        id={2}
      ></li>
      <li
        tabIndex={0}
        className={currentSelection >= 3 ? "rating ckecked" : "rating"}
        onClick={updateValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(e);
          }
        }}
        id={3}
      ></li>
      <li
        tabIndex={0}
        className={currentSelection >= 4 ? "rating ckecked" : "rating"}
        onClick={updateValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(e);
          }
        }}
        id={4}
      ></li>
      <li
        tabIndex={0}
        className={currentSelection >= 5 ? "rating ckecked" : "rating"}
        onClick={updateValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(e);
          }
        }}
        id={5}
      ></li>
    </ul>
  );
}

export default DotMarkerComponent;
