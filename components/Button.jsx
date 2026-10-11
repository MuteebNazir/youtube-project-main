
const Button = ({name, onClick, isSelected}) => {
    return(
        <div className="button-list">
            <button className={`category-button ${isSelected ? "selected" : ""}`} onClick={onClick}>{name}</button>
        </div>
    )
}

export default Button;