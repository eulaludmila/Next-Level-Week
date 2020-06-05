import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './modal.css';

interface ModalProps{
    class:string;
}

const Modal:React.FC<ModalProps> = (props) => {
    return (
        <div id="modal" className={props.class}>
            <FiCheckCircle/>
            <h2>Cadastro concluído!</h2>
        </div>
    )
}

export default Modal;