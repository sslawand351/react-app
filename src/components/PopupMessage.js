import { useDispatch } from "react-redux";

export function PopupMessage(props) {
    let dispatch = useDispatch()

    const onError = (event) => {
        setTimeout(() => {
            dispatch({type: 'CLEAR_MESSAGE'})
            event.target.parentNode.parentNode.className = 'modal popup-message hidden';
        }, props.timeout || 1000)
    }
    return <div className="modal popup-message show " ><div className="alert">
        <a href="#close" className="close" data-dismiss="alert">×</a>
        {props.message}
        {props.message && <img src={props.message} style={{display:"none"}} onError={onError} alt="" />}
    </div></div>
}
