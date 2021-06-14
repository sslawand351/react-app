import { useDispatch } from "react-redux";

export function PopupMessage(props) {
    let dispatch = useDispatch()
    // let [style, setStyle] = useState({display:"none"})
    // useEffect(() => {
    //     setStyle({display:"block"})
    // }, [props.message])
    const onError = (event) => {
        // console.log(event.target.parentNode.parentNode)
        // event.target.parentNode.parentNode.className = 'modal show'
        setTimeout(() => {
            dispatch({type: 'CLEAR_MESSAGE'})
            event.target.parentNode.parentNode.className = 'modal hidden';
            // setStyle({display:"none"});
        }, 1000)
    }
    return <div className="modal show" ><div className="alert">
        <a href="#close" className="close" data-dismiss="alert">×</a>
        {props.message}
        {props.message && <img src={props.message} style={{display:"none"}} onError={onError} alt="" />}
    </div></div>
}
