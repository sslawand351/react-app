import { useEffect, useState } from "react";

export function PopupMessage(props) {
    let [style, setStyle] = useState({display:"none"})
    useEffect(() => {
        setStyle({display:"block"})
    }, [props.message, props.qty])
    const onError = (event) => {
        console.log(event.target.parentNode.parentNode)
        // event.target.parentNode.parentNode.className = 'modal show'
        setTimeout(() => { 
            // event.target.parentNode.parentNode.className = 'modal hidden';
            setStyle({display:"none"});
        }, 1000)
    }
    // let style = props.message ? {display:"block"} : {display:"none"}
    return <div className="modal" style={style}><div className="alert">
        <a className="close" data-dismiss="alert">×</a>
        {props.message}
        {props.message && <img src={props.message + props.qty} style={{display:"none"}} onError={onError} />}
    </div></div>
}