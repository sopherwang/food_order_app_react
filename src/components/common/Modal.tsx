import classes from './Modal.module.css'
import ReactDom from 'react-dom'
import React from "react";

const Backdrop: React.FC<{
    onClose: () => {}
}> = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay: React.FC = props => {
    return <div className={classes.modal}>
        <div> {props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal: React.FC<{
    onClose: () => {}
}> = props => {
    return <>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement!)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement!)}
    </>
}

export default Modal