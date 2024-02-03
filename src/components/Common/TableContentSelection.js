function TableContentSelection({
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
        <p
          className="text-decoration-line-through"
          dangerouslySetInnerHTML={{ __html: displayValue }}
        ></p>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: displayValue }} />
      )}
    </span>
  );
}

export default TableContentSelection;
