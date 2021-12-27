import "./styles.css"

function Button (props) {

    return(
        <button onClick={props.action} className={`button-component ${props.color}`}>{props.text}</button>
    );
}

export default Button;