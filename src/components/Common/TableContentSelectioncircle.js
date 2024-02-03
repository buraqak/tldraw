function TableContentSelectioncircle({
  index,
  active,
  updateSelectedValues,
  displayValue,
  tabpopup,
}) {
  function clicked() {
    updateSelectedValues(index, !active);
  }

  return (
    <span
      className="cursor-pointer text-primary color-grey"
      onClick={clicked}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          clicked();
        }
      }}
    >
      {active ? (
        <span
          className="ql-custom-circle-sketch-highlight"
          dangerouslySetInnerHTML={{ __html: displayValue }}
        ></span>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: displayValue }} />
      )}
    </span>
  );
}

export default TableContentSelectioncircle;
