function ToolTipComponent(props) {
    var position = "tooltiptext bottom"
    if (props.placement) {
        position = "tooltiptext " + props.placement
    }
    return (
        <div className="tooltipContent">{props.children}<span className={position}>{props.title}</span>
        </div>
    )
}

export default ToolTipComponent;