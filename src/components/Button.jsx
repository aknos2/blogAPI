function Button({
  color,
  backgroundColor,
  text,
  onClick,
  id = "",
  className = "",
  tabIndex = 0,
  ariaLabel= "",
}) {
    const buttonStyle = {
        color: color,
        backgroundColor: backgroundColor
    }

    return (
        <button style={buttonStyle} onClick={onClick} id={id} className={className} tabIndex={tabIndex} ariaLabel={ariaLabel}>
            {text}
        </button>
    )
}

export default Button;