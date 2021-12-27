import "./styles.css"

function Input (props) {

    return(
        <div className="input-component">
            <label htmlFor="">{props.label}</label>
            <input value={props.value} type={props.type} required={props.required} onChange={props.onChange} placeholder={props.placeholder} maxLength={props.maxLength}/>
        </div>
    );
}

export default Input;